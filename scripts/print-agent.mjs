#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * NexPrint — Print Agent Inteligente
 * Ponte entre o Dashboard NexPrint e a Entrust Sigma DS3
 * ═══════════════════════════════════════════════════════════════
 * 
 * Este script roda LOCALMENTE na máquina conectada à impressora.
 * Ele:
 *   1. Monitora a impressora (telemetria a cada 10s)
 *   2. Atualiza o banco de dados via API
 *   3. Consome jobs da fila (QUEUED → PRINTING → COMPLETED)
 *   4. Faz self-healing em caso de erros
 * 
 * Uso: node scripts/print-agent.mjs
 * ═══════════════════════════════════════════════════════════════
 */

import { execSync, exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

// ═══════════════════════════════════════════════════════
// CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════

const CONFIG = {
  // API do NexPrint (quando rodando local)
  API_BASE: process.env.NEXPRINT_API || "https://nexprint.alvanex.com.br",

  // SDK da Sigma DS3
  SDK_PATH: String.raw`c:\Users\bruno\Desktop\sigma ds2\XPS_Card_Printer_SDK_v8.7_RevB\exes\csharp\AnyCPU`,
  PRINTER_NAME: "XPS Card Printer",

  // Intervalos
  TELEMETRY_INTERVAL: 10_000,   // 10 segundos
  JOB_POLL_INTERVAL: 5_000,     // 5 segundos
  RECONNECT_INTERVAL: 30_000,   // 30 segundos

  // Limites de segurança
  MIN_RIBBON_PERCENT: 5,        // Bloqueio de impressão abaixo disso
  MAX_RETRY_COUNT: 2,           // Máximo de retentativas por job
  CLEANING_THRESHOLD: 250,      // Cartões antes de recomendar limpeza
};

// ═══════════════════════════════════════════════════════
// ESTADO DO AGENT
// ═══════════════════════════════════════════════════════

const state = {
  isConnected: false,
  isPrinting: false,
  lastTelemetry: null,
  errorCount: 0,
  jobsCompleted: 0,
  startedAt: new Date(),
};

// ═══════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════

function log(emoji, msg) {
  const time = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${time}] ${emoji} ${msg}`);
}

function logError(msg, error) {
  const time = new Date().toLocaleTimeString("pt-BR");
  console.error(`[${time}] ❌ ${msg}`, error?.message || error || "");
}

async function apiRequest(endpoint, method = "GET", body = null) {
  const url = `${CONFIG.API_BASE}${endpoint}`;
  const options = {
    method,
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PRINT_AGENT_SECRET_KEY || "nexprint_local_agent_secret_2024"}`
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API ${method} ${endpoint} → ${response.status}`);
  }
  return response.json();
}

function executeSDK(exe, args = "") {
  const command = `"${CONFIG.SDK_PATH}\\${exe}" -n "${CONFIG.PRINTER_NAME}" ${args}`;
  try {
    const output = execSync(command, { 
      timeout: 30_000, 
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: "", error: error.message };
  }
}

// ═══════════════════════════════════════════════════════
// PARSER DE TELEMETRIA
// ═══════════════════════════════════════════════════════

function parseTelemetryOutput(output) {
  const get = (key) => {
    const regex = new RegExp(`${key}:\\s*(.+?)\\r?\\n`, "i");
    const match = output.match(regex);
    return match ? match[1].trim() : "";
  };
  const getInt = (key) => parseInt(get(key)) || 0;

  // Parse hopper status
  const hopper1Match = output.match(/Name:\s*Hopper1[\s\S]*?Status:\s*(.+?)[\r\n]/);
  const exceptionMatch = output.match(/Name:\s*Exception[\s\S]*?Status:\s*(.+?)[\r\n]/);

  return {
    printerModel: get("PrinterModel"),
    serialNumber: get("PrinterSerialNumber"),
    firmwareVersion: get("PrinterVersion"),
    printerStatus: get("PrinterStatus") || "Offline",
    connectionType: get("ConnectionPortType") || "USB",
    ribbonType: get("PrintRibbonType"),
    ribbonRemaining: getInt("RibbonRemaining"),
    ribbonPartNumber: get("PrintRibbonPartNumber"),
    ribbonSerialNumber: get("PrintRibbonSerialNumber"),
    totalCompleted: getInt("TotalCompleted"),
    totalPicked: getInt("TotalPicked"),
    totalRejected: getInt("TotalRejected"),
    totalLost: getInt("TotalLost"),
    currentCompleted: getInt("CurrentCompleted"),
    currentPicked: getInt("CurrentPicked"),
    currentRejected: getInt("CurrentRejected"),
    cardsSinceClean: getInt("CardsPickedSinceCleaningCard"),
    cleaningsRun: getInt("CleaningCardsRun"),
    hopper1Status: hopper1Match ? hopper1Match[1].trim() : "Unknown",
    exceptionStatus: exceptionMatch ? exceptionMatch[1].trim() : "Unknown",
    colorMode: get("PrinterColorMode")?.split("|")[0]?.trim() || "Vivid",
  };
}

// ═══════════════════════════════════════════════════════
// LOOP DE TELEMETRIA
// ═══════════════════════════════════════════════════════

async function updateTelemetry() {
  try {
    const result = executeSDK("status.exe");

    if (!result.success) {
      if (state.isConnected) {
        log("🔴", "Impressora DESCONECTADA");
        state.isConnected = false;
        await apiRequest("/api/printer/telemetry", "PATCH", {
          printerStatus: "Offline",
        });
      }
      return null;
    }

    const telemetry = parseTelemetryOutput(result.output);

    if (!state.isConnected) {
      log("🟢", `Impressora CONECTADA: ${telemetry.printerModel} (SN: ${telemetry.serialNumber})`);
      state.isConnected = true;
      state.errorCount = 0;
    }

    // Atualizar banco via API
    await apiRequest("/api/printer/telemetry", "PATCH", telemetry);
    state.lastTelemetry = telemetry;

    // Alertas inteligentes
    if (telemetry.ribbonRemaining > 0 && telemetry.ribbonRemaining <= 10) {
      log("⚠️", `ALERTA: Ribbon BAIXO — ${telemetry.ribbonRemaining}% restante!`);
    }

    if (telemetry.cardsSinceClean >= CONFIG.CLEANING_THRESHOLD) {
      log("🧹", `ALERTA: ${telemetry.cardsSinceClean} cartões desde última limpeza. Recomendado limpar!`);
    }

    return telemetry;
  } catch (error) {
    logError("Erro ao atualizar telemetria", error);
    return null;
  }
}

// ═══════════════════════════════════════════════════════
// PRE-FLIGHT CHECKS (Verificações antes de imprimir)
// ═══════════════════════════════════════════════════════

function preFlightChecks(telemetry) {
  const errors = [];

  // 1. Impressora precisa estar Ready
  if (telemetry.printerStatus !== "Ready" && telemetry.printerStatus !== "Busy") {
    errors.push(`Impressora não está pronta. Status: ${telemetry.printerStatus}`);
  }

  // 2. Ribbon precisa ter carga mínima
  if (telemetry.ribbonRemaining > 0 && telemetry.ribbonRemaining < CONFIG.MIN_RIBBON_PERCENT) {
    errors.push(`Ribbon muito baixo: ${telemetry.ribbonRemaining}%. Mínimo: ${CONFIG.MIN_RIBBON_PERCENT}%`);
  }

  // 3. Hopper precisa ter cartões
  if (telemetry.hopper1Status === "Empty") {
    errors.push("Hopper principal vazio! Adicione cartões.");
  }

  return {
    canPrint: errors.length === 0,
    errors,
  };
}

// ═══════════════════════════════════════════════════════
// PROCESSAMENTO DE JOBS
// ═══════════════════════════════════════════════════════

async function processJobs() {
  if (state.isPrinting || !state.isConnected) return;

  try {
    // Buscar jobs na fila
    const jobs = await apiRequest("/api/print?status=QUEUED");

    if (!jobs || jobs.length === 0) return;

    const job = jobs[0]; // Pega o primeiro da fila
    log("📋", `Job encontrado: ${job.id} (Order: ${job.orderId})`);

    // Pre-flight checks
    const telemetry = state.lastTelemetry;
    if (!telemetry) {
      log("⏳", "Aguardando telemetria antes de imprimir...");
      return;
    }

    const checks = preFlightChecks(telemetry);
    if (!checks.canPrint) {
      log("🛑", `Pre-flight FALHOU: ${checks.errors.join(", ")}`);
      await apiRequest("/api/print", "PATCH", {
        id: job.id,
        status: "ERROR",
        errorMsg: checks.errors.join("; "),
      });
      return;
    }

    // Marcar como imprimindo
    state.isPrinting = true;
    await apiRequest("/api/print", "PATCH", {
      id: job.id,
      status: "PRINTING",
    });

    log("🖨️", `Processando imagens do job ${job.id}...`);

    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempFilePaths = [];
    let images = [];

    try {
      // Tenta ler como array JSON (lote)
      if (job.imageUrl && job.imageUrl.trim().startsWith("[")) {
        images = JSON.parse(job.imageUrl);
      } else if (job.imageUrl) {
        images = [job.imageUrl];
      }
    } catch (e) {
      // Fallback para string base64 simples
      if (job.imageUrl) images = [job.imageUrl];
    }

    if (images.length === 0) {
      throw new Error("Nenhuma imagem encontrada no job de impressao.");
    }

    images.forEach((imgBase64, index) => {
      const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const tempImage = path.join(tempDir, `agent_${job.id}_${index}.png`);
      fs.writeFileSync(tempImage, buffer);
      tempFilePaths.push(tempImage.replace(/\\/g, "\\\\"));
    });

    // Fazer parse do campo dpi para extrair resolução e orientação
    let isHighDPI = true;
    let badgeOrientation = "landscape";
    
    if (job.dpi) {
      const parts = job.dpi.split("_");
      isHighDPI = parts[0] === "600";
      if (parts[1]) badgeOrientation = parts[1];
    }

    log("🖨️", `Imprimindo ${tempFilePaths.length} imagem(ns) na ${CONFIG.PRINTER_NAME} (${isHighDPI ? "600" : "300"} DPI, ${badgeOrientation})...`);

    // Script do PowerShell para impressão física
    const pathsArrayPS = "@('" + tempFilePaths.join("','") + "')";
    const desiredDPI = isHighDPI ? 600 : 300;

    const psScript = `
      Add-Type -AssemblyName System.Drawing;
      Add-Type -AssemblyName System.Windows.Forms;
      $printerName = "${CONFIG.PRINTER_NAME}";
      $imagePaths = ${pathsArrayPS};
      $script:currentIndex = 0;
      
      $doc = New-Object System.Drawing.Printing.PrintDocument;
      $doc.PrinterSettings.PrinterName = $printerName;
      
      $targetPaperSize = $null;
      foreach ($ps in $doc.PrinterSettings.PaperSizes) {
        if ($ps.PaperName -eq "ISO ID-1 Retransfer" -or $ps.PaperName -eq "ISO ID-1 (85.60 x 53.98 mm)") {
          $targetPaperSize = $ps;
          break;
        }
      }
      if ($targetPaperSize -ne $null) { $doc.DefaultPageSettings.PaperSize = $targetPaperSize; }
      
      $targetRes = $null;
      foreach ($res in $doc.PrinterSettings.PrinterResolutions) {
        if ($res.X -eq ${desiredDPI} -and $res.Y -eq ${desiredDPI}) { $targetRes = $res; break; }
      }
      if ($targetRes -ne $null) { 
        $doc.DefaultPageSettings.PrinterResolution = $targetRes; 
      } else {
        $doc.DefaultPageSettings.PrinterResolution = $doc.PrinterSettings.PrinterResolutions[0];
      }

      $doc.DefaultPageSettings.Landscape = $("${badgeOrientation}" -eq "landscape");
      $doc.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0,0,0,0);
      
      $doc.add_PrintPage({
        param($sender, $e);
        
        $currentPath = $imagePaths[$script:currentIndex];
        $img = [System.Drawing.Image]::FromFile($currentPath);
        $rect = New-Object System.Drawing.Rectangle(0, 0, $e.PageBounds.Width, $e.PageBounds.Height);
        
        $e.Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
        $e.Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None;
        $e.Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
        
        $e.Graphics.DrawImage($img, $rect);
        $img.Dispose();

        $script:currentIndex++;
        if ($script:currentIndex -lt $imagePaths.Count) {
            $e.HasMorePages = $true;
        } else {
            $e.HasMorePages = $false;
        }
      });
      
      $doc.Print();
    `;

    // Executar o script PowerShell usando arquivo temporário .ps1 para evitar problemas de escape de aspas
    const tempPs1Path = path.join(tempDir, `print_agent_batch_${job.id}.ps1`);
    fs.writeFileSync(tempPs1Path, psScript, "utf-8");

    let printSuccess = false;
    let printError = "";

    try {
      const { stdout, stderr } = await execAsync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tempPs1Path}"`, { timeout: 120000 });
      printSuccess = true;
      log("✅", `Documento enviado ao Spooler do Windows.`);
    } catch (err) {
      printSuccess = false;
      printError = err.message;
      logError("Falha ao rodar script PowerShell de impressao", err);
    } finally {
      // Apaga o arquivo script .ps1 temporário
      try {
        if (fs.existsSync(tempPs1Path)) fs.unlinkSync(tempPs1Path);
      } catch (err) {
        logError(`Falha ao remover script ps1 temporario`, err);
      }
    }

    // Limpar arquivos temporários criados em temp/
    tempFilePaths.forEach(p => {
      try {
        const cleanPath = p.replace(/\\\\/g, "\\");
        if (fs.existsSync(cleanPath)) fs.unlinkSync(cleanPath);
      } catch (err) {
        logError(`Falha ao remover arquivo temporario ${p}`, err);
      }
    });

    if (printSuccess) {
      await apiRequest("/api/print", "PATCH", {
        id: job.id,
        status: "COMPLETED",
      });
      state.jobsCompleted++;
      log("✅", `Job ${job.id} CONCLUÍDO! (Total: ${state.jobsCompleted})`);
    } else {
      const retryCount = (job.retryCount || 0) + 1;

      if (retryCount <= CONFIG.MAX_RETRY_COUNT) {
        log("🔄", `Job ${job.id} falhou. Tentando restart (${retryCount}/${CONFIG.MAX_RETRY_COUNT})...`);
        
        // Tentar restart do hardware
        executeSDK("printer_control.exe", "-r");
        
        await apiRequest("/api/print", "PATCH", {
          id: job.id,
          status: "QUEUED",
          retryCount,
          errorMsg: `Retry ${retryCount}: ${printError}`,
        });
      } else {
        log("❌", `Job ${job.id} FALHOU após ${retryCount} tentativas.`);
        await apiRequest("/api/print", "PATCH", {
          id: job.id,
          status: "ERROR",
          errorMsg: printError,
        });
      }
    }
  } catch (error) {
    logError("Erro ao processar jobs", error);
  } finally {
    state.isPrinting = false;
  }
}

// ═══════════════════════════════════════════════════════
// STARTUP
// ═══════════════════════════════════════════════════════

async function start() {
  console.log("");
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║       🖨️  NexPrint — Print Agent v1.0             ║");
  console.log("║       Entrust Sigma DS3 Integration               ║");
  console.log("╚═══════════════════════════════════════════════════╝");
  console.log("");
  log("🚀", `Iniciando Print Agent...`);
  log("📡", `API: ${CONFIG.API_BASE}`);
  log("💻", `SDK: ${CONFIG.SDK_PATH}`);
  log("🖨️", `Impressora: ${CONFIG.PRINTER_NAME}`);
  console.log("");

  // Primeiro check de conexão
  const initialTelemetry = await updateTelemetry();

  if (initialTelemetry) {
    log("📊", `Modelo: ${initialTelemetry.printerModel}`);
    log("📊", `Serial: ${initialTelemetry.serialNumber}`);
    log("📊", `Firmware: ${initialTelemetry.firmwareVersion}`);
    log("📊", `Ribbon: ${initialTelemetry.ribbonRemaining}%`);
    log("📊", `Cartões impressos: ${initialTelemetry.totalCompleted}`);
    log("📊", `Modo de cor: ${initialTelemetry.colorMode}`);
  } else {
    log("⚠️", "Não foi possível conectar à impressora. Tentando novamente...");
  }

  console.log("");
  log("♻️", "Loops iniciados. Pressione Ctrl+C para parar.");
  console.log("");

  // Loop de telemetria
  setInterval(updateTelemetry, CONFIG.TELEMETRY_INTERVAL);

  // Loop de processamento de jobs
  setInterval(processJobs, CONFIG.JOB_POLL_INTERVAL);
}

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("");
  log("👋", "Print Agent encerrado graciosamente.");
  log("📊", `Sessão: ${state.jobsCompleted} jobs completados.`);
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  logError("Erro não tratado", error);
  // Não encerra — self-healing
});

// GO! 🚀
start();

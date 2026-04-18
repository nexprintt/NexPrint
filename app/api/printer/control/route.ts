import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

// Caminho dos executáveis do SDK
const SDK_PATH = String.raw`c:\Users\bruno\Desktop\sigma ds2\XPS_Card_Printer_SDK_v8.7_RevB\exes\csharp\AnyCPU`;
const PRINTER_NAME = "XPS Card Printer";

type ControlAction =
  | "restart"
  | "clean"
  | "sleep"
  | "wake"
  | "resetCounters"
  | "setColorMode"
  | "online"
  | "offline"
  | "suspend"
  | "status"
  | "printTest"
  | "addStock";

// POST: Executa comandos remotos na impressora
export async function POST(request: Request) {
  let action: ControlAction | "unknown" = "unknown";
  try {
    const body = await request.json();
    action = body.action;
    const value = body.value;

    let exeName = "";
    let args: string[] = ["-n", PRINTER_NAME];

    switch (action) {
      case "restart":
        exeName = "printer_control.exe";
        args.push("-r");
        break;
      case "clean":
        exeName = "printer_control.exe";
        args.push("-q");
        break;
      case "sleep":
        exeName = "printer_control.exe";
        args.push("-x");
        break;
      case "wake":
        exeName = "printer_control.exe";
        args.push("-w");
        break;
      case "resetCounters":
        exeName = "printer_control.exe";
        args.push("-e");
        break;
      case "setColorMode":
        if (!value) {
          return NextResponse.json(
            { error: "O campo 'value' é obrigatório para setColorMode" },
            { status: 400 }
          );
        }
        exeName = "printer_control.exe";
        args.push("-s", value);
        break;
      case "online":
        exeName = "printer_state.exe";
        args.push("-s", "on");
        break;
      case "offline":
        exeName = "printer_state.exe";
        args.push("-s", "off");
        break;
      case "suspend":
        exeName = "printer_state.exe";
        args.push("-s", "suspend");
        break;
      case "status":
        exeName = "status.exe";
        break;
      case "printTest":
        // Emite um documento de texto simples bypassando grafismos pesados, ideal para verificar o alinhamento
        const cmdTest = `powershell -Command "Out-Printer -Name '${PRINTER_NAME}' -InputObject '=== NEXPRINT DIAGNOSTIC TEST ===' "`;
        const { stdout: tOut, stderr: tErr } = await execFileAsync("cmd.exe", ["/c", cmdTest], { timeout: 30000 });
        return NextResponse.json({ success: true, action, output: tOut || tErr || "Cartão de teste enviado ao Spooler." });

      case "printImage":
      case "printBatch": // Novo suporte para lote
        if (!value) {
          return NextResponse.json({ error: "O campo 'value' (base64 ou array) é obrigatório" }, { status: 400 });
        }
        
        try {
          const badgeOrientation = body.orientation || "landscape";
          const images: string[] = Array.isArray(value) ? value : [value];
          
          // Caminho temporário para as imagens
          const tempDir = path.join(process.cwd(), "temp");
          const fs = require("fs");
          if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
          
          const tempFilePaths: string[] = [];
          
          images.forEach((imgBase64, index) => {
            const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            const tempImage = path.join(tempDir, `batch_${Date.now()}_${index}.png`);
            fs.writeFileSync(tempImage, buffer);
            tempFilePaths.push(tempImage.replace(/\\/g, "\\\\"));
          });

          const pathsArrayPS = "@('" + tempFilePaths.join("','") + "')";

          const psScript = `
            Add-Type -AssemblyName System.Drawing;
            Add-Type -AssemblyName System.Windows.Forms;
            $printerName = "${PRINTER_NAME}";
            $imagePaths = ${pathsArrayPS};
            $currentIndex = 0;
            
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
            
            # Ajuste de Qualidade
            $targetRes = $null;
            foreach ($res in $doc.PrinterSettings.PrinterResolutions) {
              if ($res.X -eq 600 -and $res.Y -eq 600) { $targetRes = $res; break; }
              if ($res.X -eq 300 -and $res.Y -eq 300) { $targetRes = $res; }
            }
            if ($targetRes -ne $null) { $doc.DefaultPageSettings.PrinterResolution = $targetRes; }

            $doc.DefaultPageSettings.Landscape = $("${badgeOrientation}" -eq "landscape");
            $doc.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0,0,0,0);
            
            # Evento que roda para cada PÁGINA do documento
            $doc.add_PrintPage({
              param($sender, $e);
              
              $currentPath = $imagePaths[$currentIndex];
              $img = [System.Drawing.Image]::FromFile($currentPath);
              $rect = New-Object System.Drawing.Rectangle(0, 0, $e.PageBounds.Width, $e.PageBounds.Height);
              
              $e.Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
              $e.Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None;
              $e.Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
              
              $e.Graphics.DrawImage($img, $rect);
              $img.Dispose();

              # SEGUNDO SEGREDO: Incrementar o índice e dizer se tem mais páginas
              $script:currentIndex++;
              if ($script:currentIndex -lt $imagePaths.Count) {
                  $e.HasMorePages = $true;
              } else {
                  $e.HasMorePages = $false;
              }
            });
            
            $doc.Print();
          `;

          const { stdout: pOut, stderr: pErr } = await execFileAsync("powershell", ["-Command", psScript], { timeout: 120000 });
          
          return NextResponse.json({ 
            success: true, 
            action, 
            message: `Lote de ${images.length} crachás enviado com sucesso.` 
          });
        } catch (err: any) {
          return NextResponse.json({ success: false, error: "Erro no lote: " + err.message }, { status: 500 });
        }

      default:
        return NextResponse.json(
          { error: `Ação desconhecida: ${action}` },
          { status: 400 }
        );
    }

    const executablePath = path.join(SDK_PATH, exeName);
    
    // Executa e garante que espaços no SDK_PATH não quebrem o CMD
    const { stdout, stderr } = await execFileAsync(executablePath, args, { timeout: 30000 });
    const result = stdout || stderr;

    return NextResponse.json({
      success: true,
      action,
      output: result,
    });
  } catch (error: any) {
    console.error("Erro ao executar controle:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    
    // Intercepta a exceção boba do C# que pausa aguardando o usuário apertar uma tecla ("Press any key to continue...")
    if (message.includes("Console.ReadKey") || message.includes("entrada do console") || message.includes("No  possvel ler chaves")) {
      return NextResponse.json({
        success: true,
        action: action,
        output: "Comando executado com sucesso (Console Pause Ignorado).",
      });
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}


"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Printer,
  RefreshCw,
  Trash2,
  Moon,
  Sun,
  Palette,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Droplets,
  CreditCard,
  Cpu,
  Wifi,
  ZapOff,
  RotateCcw,
  Power,
  Loader2,
} from "lucide-react";

interface TelemetryData {
  id: string;
  printerModel: string;
  serialNumber: string;
  firmwareVersion: string;
  printerStatus: string;
  connectionType: string;
  ribbonType: string;
  ribbonRemaining: number;
  ribbonPartNumber: string;
  ribbonSerialNumber: string;
  totalCompleted: number;
  totalPicked: number;
  totalRejected: number;
  totalLost: number;
  currentCompleted: number;
  currentPicked: number;
  currentRejected: number;
  cardsSinceClean: number;
  cleaningsRun: number;
  hopper1Status: string;
  exceptionStatus: string;
  colorMode: string;
  cardsVirtualStock: number;
  cardsPrintedSite: number;
  lastUpdated: string;
}

function RibbonGauge({ percent }: { percent: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color =
    percent > 50
      ? "#10b981" // emerald
      : percent > 20
        ? "#f59e0b" // amber
        : percent > 10
          ? "#ef4444" // red
          : "#dc2626";

  return (
    <div className="relative flex flex-col items-center">
      <svg width="160" height="160" className="transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#f1f5f9" // slate-100 para o fundo circular track
          strokeWidth="12"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-black"
          style={{ color }}
        >
          {percent}%
        </span>
        <span className="text-xs text-slate-500 font-bold mt-1">RIBBON</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { color: string; bg: string; icon: React.ReactNode; pulse: boolean }
  > = {
    Ready: {
      color: "text-emerald-700",
      bg: "bg-emerald-100",
      icon: <CheckCircle2 size={14} />,
      pulse: true,
    },
    Busy: {
      color: "text-amber-700",
      bg: "bg-amber-100",
      icon: <Loader2 size={14} className="animate-spin" />,
      pulse: false,
    },
    Offline: {
      color: "text-red-700",
      bg: "bg-red-100",
      icon: <XCircle size={14} />,
      pulse: false,
    },
    Suspended: {
      color: "text-orange-700",
      bg: "bg-orange-100",
      icon: <ZapOff size={14} />,
      pulse: false,
    },
  };

  const c = config[status] || config.Offline;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${c.color} ${c.bg}`}
    >
      {c.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {c.icon}
      {status}
    </span>
  );
}

function CounterCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-brand-teal/50 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-xl ${color}`}>{icon}</div>
        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
          {label}
        </span>
      </div>
      <p className="text-3xl font-black text-brand-navy">{value.toLocaleString()}</p>
    </div>
  );
}

export default function ImpressoraPage() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Controles de estoque
  const [stockInput, setStockInput] = useState<string>("100");
  const [stockLoading, setStockLoading] = useState(false);

  // Estados do Modal super customizado
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: string;
    value?: string;
    title: string;
    description: string;
  }>({
    isOpen: false,
    action: "",
    title: "",
    description: "",
  });

  const fetchTelemetry = useCallback(async () => {
    try {
      // 1. Busca dados ao vivo da impressora via /control status
      const statusRes = await fetch("/api/printer/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status" }),
      });

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (statusData.success && statusData.output) {
          const parsed = parseStatusOutput(statusData.output);
          
          // Debug no console pra entendermos se achou os dados
          console.log("Raw Output: ", statusData.output);
          console.log("Parsed Data: ", parsed);

          // Salva no banco
          await fetch("/api/printer/telemetry", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          });
        }
      }

      // 2. Traz a verdade do banco
      const res = await fetch("/api/printer/telemetry");
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
        setLastRefresh(new Date());
      }
    } catch (e) {
      console.error("Erro ao buscar telemetria", e);
    } finally {
      setLoading(false);
    }
  }, []);

  function parseStatusOutput(output: string): Partial<TelemetryData> {
    const get = (key: string): string => {
      // Exige que a chave seja palavra completa (ancorada pelo início ou espaço) para evitar falsos-positivos
      const regex = new RegExp(`(?:^|\\s)${key}:\\s*(.+?)\\r?\\n`, "i");
      const match = output.match(regex);
      return match ? match[1].trim() : "";
    };

    // Pega Ints de forma segura
    const getInt = (key: string): number => {
      const rawValue = get(key).replace(/\D+/g, ""); 
      return parseInt(rawValue) || 0;
    };

    // Parser especializado nas tabelas Hopper Multi-line
    const getHopper = (id: number): string => {
      const rx = new RegExp(`Hopper Index:\\s*${id}[\\s\\S]*?Status:\\s*(.+?)\\r?\\n`, "i");
      const match = output.match(rx);
      return match ? match[1].trim() : "Unknown";
    }

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
      hopper1Status: getHopper(1), // Main hopper está no index 1
      exceptionStatus: getHopper(0), // Exception card slot está no index 0
      colorMode: get("PrinterColorMode")?.split("|")[0]?.trim() || "Vivid",
    };
  }

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000); // Auto-refresh a cada 10s
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  const confirmAndExecute = (action: string, value?: string, confirmMsg?: string, title?: string) => {
    if (confirmMsg) {
      setConfirmModal({
        isOpen: true,
        action,
        value,
        title: title || "Atenção",
        description: confirmMsg,
      });
      return;
    }
    executeAction(action, value);
  };

  const handleUpdateStock = async () => {
    const qty = parseInt(stockInput);
    if (!telemetry || isNaN(qty) || qty <= 0) return;
    setStockLoading(true);
    try {
      const novaQtd = (telemetry.cardsVirtualStock || 0) + qty;
      const res = await fetch("/api/printer/telemetry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardsVirtualStock: novaQtd }),
      });
      if (res.ok) {
        setTelemetry({ ...telemetry, cardsVirtualStock: novaQtd });
        setStockInput("100");
      }
    } catch {
      alert("Erro ao adicionar estoque virtual");
    } finally {
      setStockLoading(false);
    }
  };

  const executeAction = async (action: string, value?: string) => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    setActionLoading(action);

    try {
      const res = await fetch("/api/printer/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, value }),
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(fetchTelemetry, 3000);
      } else {
        alert(`Erro da Impressora: ${data.error}`);
      }
    } catch {
      alert("Erro de comunicação com a API da impressora");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <Loader2 size={48} className="animate-spin text-brand-teal" />
          <p className="text-brand-navy font-bold">
            Conectando à Impressora...
          </p>
          <p className="text-slate-500 text-sm">Consultando Entrust SDK no hardware via USB</p>
        </div>
      </div>
    );
  }

  const cleaningProgress = Math.min(
    ((telemetry?.cardsSinceClean ?? 0) / 250) * 100,
    100
  );
  const needsCleaning = (telemetry?.cardsSinceClean ?? 0) >= 200;
  const lowRibbon = (telemetry?.ribbonRemaining ?? 0) <= 10;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Interno - Complementar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-brand-navy p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/10 rounded-2xl">
            <Printer className="text-brand-teal" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black">
              Entrust {telemetry?.printerModel || "DS3"}
            </h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-300">
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white">{telemetry?.serialNumber || "—"}</span>
              <span>•</span>
              <StatusBadge status={telemetry?.printerStatus || "Offline"} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span className="text-sm font-medium text-slate-400 bg-white/5 px-4 py-2 rounded-xl">
              Atualizado: <span className="text-white">{lastRefresh.toLocaleTimeString("pt-BR")}</span>
            </span>
          )}
          <button
            onClick={() => {
              setLoading(true);
              fetchTelemetry();
            }}
            className="p-3 bg-brand-teal text-brand-navy font-bold rounded-xl hover:bg-brand-teal/90 transition-all shadow-lg flex items-center gap-2"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Alertas Críticos */}
      {(lowRibbon || needsCleaning) && (
        <div className="flex flex-col gap-3">
          {lowRibbon && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
              <AlertTriangle className="text-red-500" size={24} />
              <div>
                <p className="text-red-800 font-bold">
                  Nível de Ribbon Crítico — Apenas {telemetry?.ribbonRemaining}% Restante
                </p>
                <p className="text-red-600/80 text-sm">
                  Substitua o ribbon YMCKT (P/N {telemetry?.ribbonPartNumber}) urgentemente para evitar travamento da fila.
                </p>
              </div>
            </div>
          )}
          {needsCleaning && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
              <AlertTriangle className="text-amber-500" size={24} />
              <div>
                <p className="text-amber-800 font-bold">
                  Manutenção Sugerida — {telemetry?.cardsSinceClean} cartões
                  desde a limpeza
                </p>
                <p className="text-amber-700/80 text-sm">
                  Passe o cartão isopropílico no sistema de roletes (ideal: a cada 250 cards).
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-brand-navy flex items-center gap-2 border-b border-slate-100 pb-3">
            <Cpu size={20} className="text-brand-teal" />
            Especificações de Hardware
          </h2>

          <div className="space-y-4">
            {[
              ["Firmware", telemetry?.firmwareVersion || "—"],
              ["Conexão", telemetry?.connectionType || "—"],
              ["Modo de Cor", telemetry?.colorMode || "—"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center group">
                <span className="text-sm font-medium text-slate-500">{label}</span>
                <span className="text-sm text-brand-navy bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 font-bold group-hover:border-brand-teal/30 transition-all">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Wifi size={14} className="text-emerald-500" />
              <span>Conexão Segura IP / SDK v8.7 BidiSpl</span>
            </div>
          </div>
        </div>

        {/* Ribbon Gauge */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
          {/* Fundo decorativo leve */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-full pointer-events-none" />
          
          <h2 className="text-lg font-black text-brand-navy flex items-center gap-2 self-start w-full border-b border-slate-100 pb-3 mb-2">
            <Droplets size={20} className="text-brand-teal" />
            Ribbon & Suprimentos
          </h2>

          <RibbonGauge percent={telemetry?.ribbonRemaining ?? 0} />

          <div className="w-full space-y-2 mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-500">Mídia</span>
              <span className="text-brand-navy font-bold">
                {telemetry?.ribbonType || "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-500">P/N</span>
              <span className="text-brand-navy font-mono bg-slate-50 px-2 rounded">
                {telemetry?.ribbonPartNumber || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Hoppers e Manutenção */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-brand-navy flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard size={20} className="text-brand-teal" />
            Bandejas e Ciclo
          </h2>

          <div className="space-y-3">
            {[
              {
                name: "Alimentador (H1)",
                status: telemetry?.hopper1Status || "Desconhecido",
              },
              {
                name: "Exception Slot",
                status: telemetry?.exceptionStatus || "Desconhecido",
              },
            ].map((hopper) => (
              <div
                key={hopper.name}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl"
              >
                <span className="text-sm font-bold text-slate-600">{hopper.name}</span>
                <span
                  className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                    hopper.status.includes("Present") || hopper.status.includes("Presente")
                      ? "text-emerald-700 bg-emerald-100"
                      : hopper.status.includes("Empty") || hopper.status.includes("Vazio")
                        ? "text-red-700 bg-red-100"
                        : "text-slate-600 bg-slate-200"
                  }`}
                >
                  {hopper.status.includes("Present") || hopper.status.includes("Presente")
                    ? "OK (Cheio)"
                    : hopper.status.includes("Empty") || hopper.status.includes("Vazio")
                      ? "Vazio"
                      : hopper.status}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-500">Uso desde a limpeza</span>
              <span
                className={`font-black ${needsCleaning ? "text-amber-500" : "text-brand-navy"}`}
              >
                {telemetry?.cardsSinceClean ?? 0} / 250
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  needsCleaning ? "bg-amber-500" : "bg-brand-teal"
                }`}
                style={{ width: `${cleaningProgress}%` }}
              />
            </div>
            <p className="text-xs font-medium text-slate-400 text-right">
              Total de ciclos lavados: {telemetry?.cleaningsRun ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Visão de Controle Físico e Virtual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pt-4">
        {/* Painel Virtual do Site */}
        <div className="bg-brand-navy rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full pointer-events-none" />
          <div>
            <h3 className="text-lg font-black flex items-center gap-2 mb-1">
              <CreditCard className="text-brand-teal" size={20} />
              Inventário Virtual NexPrint
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Gerencie a quantidade física remanescente sem abrir a gaveta principal (Hopper 1). Deduziremos automaticamente.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex-1 text-center md:text-left">
               <span className="text-sm font-bold text-slate-400 block mb-1">Restantes na Gaveta Física</span>
               <span className="text-5xl font-black text-brand-teal">
                 {telemetry?.cardsVirtualStock ?? 0}
               </span>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0 flex gap-2">
              <input
                type="number"
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
                placeholder="Qtd (ex: 100)"
                className="w-24 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold outline-none focus:border-brand-teal/50 transition-all text-center"
                min="1"
              />
              <button
                onClick={handleUpdateStock}
                disabled={stockLoading}
                className="px-5 py-3 bg-brand-teal text-brand-navy font-bold rounded-xl hover:bg-brand-teal/90 transition-all shadow-lg whitespace-nowrap disabled:opacity-50"
              >
                {stockLoading ? "..." : "+ Adicionar"}
              </button>
            </div>
          </div>
        </div>

        {/* Visão de Computadores e Avariados */}
        <div>
          <h2 className="text-lg font-black text-brand-navy mb-4 flex items-center gap-2">
            <Activity size={20} className="text-brand-teal" />
            Visão Geral de Desempenho (Vida Útil)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <CounterCard
              label="Completados"
              value={telemetry?.totalCompleted ?? 0}
              icon={<CheckCircle2 size={20} className="text-emerald-600" />}
              color="bg-emerald-100"
            />
            <CounterCard
              label="Tracionados Geral"
              value={telemetry?.totalPicked ?? 0}
              icon={<CreditCard size={20} className="text-blue-600" />}
              color="bg-blue-100"
            />
            <CounterCard
              label="Rejeições Máquina"
              value={telemetry?.totalRejected ?? 0}
              icon={<XCircle size={20} className="text-red-600" />}
              color="bg-red-100"
            />
            <CounterCard
              label="Atolamento Perdidos"
              value={telemetry?.totalLost ?? 0}
              icon={<AlertTriangle size={20} className="text-amber-600" />}
              color="bg-amber-100"
            />
          </div>
        </div>
      </div>

      {/* Ações de Controle Remoto */}
      <div>
        <h2 className="text-lg font-black text-brand-navy mb-4 flex items-center gap-2">
          <Power size={20} className="text-brand-teal" />
          Ações Remotas & Utilidades
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              action: "restart",
              label: "Soft Restart",
              icon: <RotateCcw size={22} />,
              color: "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300 hover:bg-blue-100",
              confirm: "Reiniciar o hardware da impressora agora?",
            },
            {
              action: "clean",
              label: "Rodar Limpeza",
              icon: <Trash2 size={22} />,
              color: "text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-300 hover:bg-amber-100",
              confirm: "Você deve inserir o cartão de álcool isopropílico. Continuar com ciclo?",
            },
            {
              action: "sleep",
              label: "Suspender",
              icon: <Moon size={22} />,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-100",
            },
            {
              action: "wake",
              label: "Acordar (Wake)",
              icon: <Sun size={22} />,
              color: "text-orange-600 bg-orange-50 border-orange-100 hover:border-orange-300 hover:bg-orange-100",
            },
            {
              action: "setColorMode",
              label: telemetry?.colorMode === "Vivid" ? "Ativar TrueColor" : "Ativar Vivid",
              icon: <Palette size={22} />,
              color: "text-pink-600 bg-pink-50 border-pink-100 hover:border-pink-300 hover:bg-pink-100",
              value: telemetry?.colorMode === "Vivid" ? "TrueColor (ICC)" : "Vivid",
            },
            {
              action: "resetCounters",
              label: "Zerar Vida Útil",
              icon: <RefreshCw size={22} />,
              color: "text-red-600 bg-red-50 border-red-100 hover:border-red-300 hover:bg-red-100",
              confirm: "CUIDADO: Isso zerará todo o histórico da Entrust Sigma DS3. Tem 100% de certeza?",
            },
            {
              action: "printTest",
              label: "Teste de Alinhamento",
              icon: <Printer size={22} />,
              color: "text-brand-teal bg-brand-navy/5 border-brand-navy/10 hover:border-brand-teal/30 hover:bg-brand-navy/10",
              confirm: "A impressora puxará 1 cartão branco caso haja para imprimir o padrão de diagnóstico. Continuar?",
            },
          ].map((btn) => (
            <button
              key={btn.action}
              onClick={() =>
                confirmAndExecute(
                  btn.action,
                  (btn as { value?: string }).value,
                  (btn as { confirm?: string }).confirm,
                  btn.label
                )
              }
              disabled={actionLoading !== null}
              className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${btn.color}`}
            >
              {actionLoading === btn.action ? (
                <Loader2 size={24} className="animate-spin text-current" />
              ) : (
                btn.icon
              )}
              <span className="text-sm font-bold text-center">
                {btn.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Customizado Lucide/Tailwind */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6 transform animate-bounce-in">
            <div>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-navy mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-2">{confirmModal.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {confirmModal.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => executeAction(confirmModal.action, confirmModal.value)}
                className="flex-1 px-4 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-navy/90 border border-brand-navy transition-all shadow-md"
              >
                Sim, Confirmo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


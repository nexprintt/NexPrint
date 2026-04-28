"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { 
  Search, Filter, Printer, Clock, CheckCircle, 
  CreditCard, DollarSign, Users, ChevronDown, 
  ChevronRight, AlertCircle, Trash2, Eye, Undo, Download, FileText, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import OrderDetailsModal from "./OrderDetailsModal";
import { AnimatePresence, motion } from "framer-motion";
import { updateOrderStatus, bulkUpdateStatus, deleteOrders } from "@/app/admin/pedidos/actions";
import BadgeCanvas from "../canvas/BadgeCanvas";
import { toast } from "sonner";

interface OrdersTableClientProps {
  initialOrders: any[];
}

export default function OrdersTableClient({ initialOrders }: OrdersTableClientProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [confirmStatusModal, setConfirmStatusModal] = useState<{
    orderId: string;
    nextStatus: string;
    currentStatus: string;
    clientName: string;
  } | null>(null);
  const { mutate } = useSWRConfig();

  // Abas de Status
  const [activeTab, setActiveTab] = useState<string>("PENDING");
  const [filterPayment, setFilterPayment] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL"); 
  const [showBatchPreview, setShowBatchPreview] = useState(false);
  const [isPrintingBatch, setIsPrintingBatch] = useState(false);
  const [batchSettings, setBatchSettings] = useState({
    highDPI: true,
    monochrome: false,
    autoUpdateStatus: true
  });

  const handleTogglePaymentGroup = async (e: React.MouseEvent, group: any) => {
    e.stopPropagation();
    setUpdatingId(group.id);
    const nextPayment = group.mainOrder.paymentStatus === "PAID" ? "PENDING" : "PAID";
    await Promise.all(group.allOrders.map((o: any) => updateOrderStatus(o.id, { paymentStatus: nextPayment })));
    mutate('orders-list');
    setUpdatingId(null);
  };

  const handleUpdateStatus = async (orderId: string, nextStatus: string) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatus(orderId, { status: nextStatus });
    if (res?.success) {
      mutate('orders-list');
      toast.success(`Status atualizado para ${getStatusLabel(nextStatus)}`);
    } else {
      toast.error("Erro ao atualizar status");
    }
    setUpdatingId(null);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "Aguardando Impressão";
      case "PRINTING": return "Em Produção";
      case "PRINTED": return "Produzido";
      case "DELIVERED": return "Entregue";
      default: return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "PRINTING": return "bg-brand-teal/10 text-brand-teal border-brand-teal/20";
      case "PRINTED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  // Ordenar para agrupar famílias
  const sortedOrders = [...initialOrders].sort((a, b) => {
    if (a.groupId && b.groupId && a.groupId === b.groupId) return 0;
    if (a.groupId && b.groupId) return a.groupId.localeCompare(b.groupId);
    if (a.groupId) return -1;
    if (b.groupId) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filteredOrders = sortedOrders.filter(order => {
    const searchLow = searchTerm.toLowerCase();
    const matchesSearch = (
      order.clientName.toLowerCase().includes(searchLow) ||
      order.event.name.toLowerCase().includes(searchLow) ||
      (order.congregation && order.congregation.toLowerCase().includes(searchLow)) ||
      order.id.toLowerCase().includes(searchLow) ||
      (order.groupId && order.groupId.toLowerCase().includes(searchLow))
    );

    const matchesPayment = filterPayment === "ALL" || order.paymentStatus === filterPayment;
    const matchesTab = activeTab === "ALL" || order.status === activeTab;

    return matchesSearch && matchesPayment && matchesTab;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map(o => o.id));
    }
  };

  const toggleSelectGroup = (e: React.MouseEvent, group: any) => {
    e.stopPropagation();
    const isSelected = group.allOrders.every((o: any) => selectedIds.includes(o.id));
    if (isSelected) {
      setSelectedIds(prev => prev.filter(id => !group.allOrders.find((o: any) => o.id === id)));
    } else {
      const newIds = group.allOrders.map((o: any) => o.id);
      setSelectedIds(prev => [...new Set([...prev, ...newIds])]);
    }
  };

  // Agrupamento para renderização (1 linha por pedido/família)
  const groupedOrdersToRender: {
    id: string; // groupId ou order.id
    isGroup: boolean;
    mainOrder: any;
    allOrders: any[];
    totalItems: number;
  }[] = [];
  const seenGroupIds = new Set<string>();

  for (const order of filteredOrders) {
    if (order.groupId) {
      if (!seenGroupIds.has(order.groupId)) {
        seenGroupIds.add(order.groupId);
        const familyOrders = filteredOrders.filter((o: any) => o.groupId === order.groupId);
        groupedOrdersToRender.push({
          id: order.groupId,
          isGroup: true,
          mainOrder: order,
          allOrders: familyOrders,
          totalItems: familyOrders.length
        });
      }
    } else {
      groupedOrdersToRender.push({
        id: order.id,
        isGroup: false,
        mainOrder: order,
        allOrders: [order],
        totalItems: 1
      });
    }
  }

  // --- MOTOR DE LOTE ---
  const [isBatching, setIsBatching] = useState(false);
  const [batchStep, setBatchStep] = useState(0);
  const [batchImages, setBatchImages] = useState<string[]>([]);
  const [currentBatchOrder, setCurrentBatchOrder] = useState<any>(null);
  const [batchMode, setBatchMode] = useState<"print" | "pdf" | "zip">("print");
  const [isDeleting, setIsDeleting] = useState(false);

  const loadJsZip = async () => {
    if ((window as any).JSZip) return (window as any).JSZip;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => resolve((window as any).JSZip);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const generateZip = async (images: string[], orders: any[]) => {
    try {
      const JSZip = await loadJsZip();
      const zip = new JSZip();
      
      images.forEach((imgData, index) => {
        const order = orders[index];
        const fileName = `${order.clientName.replace(/\s+/g, '_')}_${order.id.slice(-6)}.png`;
        const base64Data = imgData.split(',')[1];
        zip.file(fileName, base64Data, { base64: true });
      });

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `nexprint-lote-${new Date().getTime()}.zip`;
      link.click();
      toast.success("Imagens exportadas com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar ZIP.");
    } finally {
      setIsBatching(false);
      setBatchStep(0);
      setBatchImages([]);
    }
  };

  const loadJsPdf = async () => {
    if ((window as any).jspdf) return (window as any).jspdf;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => resolve((window as any).jspdf);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const generatePdf = async (images: string[], orientation: string) => {
    try {
      const jspdfLib = await loadJsPdf();
      const { jsPDF } = jspdfLib;
      
      const isPortrait = orientation === "portrait";
      const pdf = new jsPDF({
        orientation: isPortrait ? "p" : "l",
        unit: "mm",
        format: [85.6, 54] // Tamanho padrão de crachá CR80
      });

      images.forEach((imgData, index) => {
        if (index > 0) pdf.addPage([85.6, 54], isPortrait ? "p" : "l");
        // Ajuste para preencher o PDF
        pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 54, undefined, 'FAST');
      });

      pdf.save(`nexprint-lote-${new Date().getTime()}.pdf`);
      toast.success("PDF gerado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setIsBatching(false);
      setBatchStep(0);
      setBatchImages([]);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmDelete = window.confirm(`Atenção: Você tem certeza que deseja deletar ${selectedIds.length} pedido(s)?\nEssa ação apagará do banco de dados e não pode ser desfeita.`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    const res = await deleteOrders(selectedIds);
    if (res?.success) {
      mutate('orders-list');
      toast.success(`${selectedIds.length} pedido(s) excluído(s) para sempre.`);
      setSelectedIds([]);
    } else {
      toast.error("Erro ao tentar excluir.");
    }
    setIsDeleting(false);
  };

  const startBatch = async (mode: "print" | "pdf" | "zip") => {
    if (selectedIds.length === 0) return;
    
    setBatchMode(mode);
    setIsBatching(true);
    setBatchStep(0);
    setBatchImages([]);
    
    const ordersToProcess = initialOrders.filter(o => selectedIds.includes(o.id));
    setCurrentBatchOrder(ordersToProcess[0]);
  };

   const handleCanvasReady = async (dataUrl: string) => {
    if (!isBatching) return;

    const newImages = [...batchImages, dataUrl];
    setBatchImages(newImages);

    const nextStep = batchStep + 1;
    const ordersToPrint = initialOrders.filter(o => selectedIds.includes(o.id));

    if (nextStep < ordersToPrint.length) {
      setTimeout(() => {
        setBatchStep(nextStep);
        setCurrentBatchOrder(ordersToPrint[nextStep]);
      }, 300);
    } else {
      setCurrentBatchOrder(null);
      
      if (batchMode === "pdf") {
        await generatePdf(newImages, ordersToPrint[0].template.configJson?.orientation || "landscape");
        setIsBatching(false);
        setBatchStep(0);
        setBatchImages([]);
      } else if (batchMode === "zip") {
        await generateZip(newImages, ordersToPrint);
        setIsBatching(false);
        setBatchStep(0);
        setBatchImages([]);
      } else {
        // Modo Impressão: Abrir o preview para revisão
        setShowBatchPreview(true);
      }
    }
  };

  const handleFinalBatchPrint = async () => {
    const ordersToPrint = initialOrders.filter(o => selectedIds.includes(o.id));
    setIsPrintingBatch(true);
    try {
      const res = await fetch("/api/printer/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "printBatch", 
          value: batchImages,
          orientation: ordersToPrint[0].template.configJson?.orientation || "landscape",
          settings: batchSettings
        })
      });
      const data = await res.json();
      if (data.success) {
        // Se a opção estiver ativa, atualiza para "PRINTING" (Em Produção)
        if (batchSettings.autoUpdateStatus) {
          await bulkUpdateStatus(selectedIds, "PRINTING");
        }
        mutate('orders-list');
        toast.success(`Sucesso! ${batchImages.length} crachás enviados para a Sigma.`);
        setShowBatchPreview(false);
        setIsBatching(false);
        setBatchStep(0);
        setBatchImages([]);
        setSelectedIds([]);
      } else {
        toast.error("Erro na impressora: " + data.error);
      }
    } catch (err) {
      toast.error("Erro ao conectar com a impressora.");
    } finally {
      setIsPrintingBatch(false);
    }
  };

  return (
    <>
      {/* Topo: Busca e Filtros */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6 mb-6">
        {/* Abas de Status */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          {[
            { id: "PENDING", label: "Aguardando", count: initialOrders.filter(o => o.status === "PENDING").length, color: "text-amber-600" },
            { id: "PRINTING", label: "Em Produção", count: initialOrders.filter(o => o.status === "PRINTING").length, color: "text-brand-teal" },
            { id: "PRINTED", label: "Produzido", count: initialOrders.filter(o => o.status === "PRINTED").length, color: "text-blue-600" },
            { id: "ALL", label: "Todos", count: initialOrders.length, color: "text-slate-500" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3",
                activeTab === tab.id 
                  ? "bg-white text-brand-navy shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {tab.label}
              <span className={cn("px-2 py-0.5 rounded-md bg-slate-200/50 text-[9px]", activeTab === tab.id && tab.color)}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, #lote, congregação..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-teal/20 rounded-2xl outline-none transition-all font-bold text-brand-navy text-sm shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase border-none outline-none cursor-pointer"
            >
              <option value="ALL">💰 Todos Pagamentos</option>
              <option value="PAID">PAGO</option>
              <option value="PENDING">PENDENTE</option>
            </select>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-2xl"
          >
            <div className="flex items-center gap-3">
               <span className="w-8 h-8 bg-brand-teal text-white rounded-xl flex items-center justify-center font-black text-xs">
                 {selectedIds.length}
               </span>
               <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Pedidos Selecionados</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                disabled={isDeleting || isBatching}
                onClick={handleDelete}
                className="px-6 py-3.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-red-200 disabled:opacity-50"
              >
                <Trash2 size={14} /> {isDeleting ? "Excluindo..." : `Excluir (${selectedIds.length})`}
              </button>

              <button 
                disabled={isBatching}
                onClick={() => startBatch("pdf")}
                className="px-6 py-3.5 bg-white text-brand-navy hover:bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-200 shadow-sm disabled:opacity-50"
              >
                {isBatching && batchMode === "pdf" ? (
                  <>
                    <div className="w-3 h-3 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
                    Gerando {batchStep + 1}/{selectedIds.length}
                  </>
                ) : (
                  <><Download size={14} /> PDF</>
                )}
              </button>

              <button 
                disabled={isBatching}
                onClick={() => startBatch("zip")}
                className="px-6 py-3.5 bg-white text-brand-navy hover:bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-200 shadow-sm disabled:opacity-50"
              >
                {isBatching && batchMode === "zip" ? (
                  <>
                    <div className="w-3 h-3 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
                    ZIP {batchStep + 1}/{selectedIds.length}
                  </>
                ) : (
                  <><FileText size={14} /> ZIP</>
                )}
              </button>

              <button 
                disabled={isBatching}
                onClick={() => startBatch("print")}
                className="px-6 py-3.5 bg-brand-navy text-white hover:bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-brand-navy/20 disabled:opacity-50"
              >
                {isBatching && batchMode === "print" ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando {batchStep + 1}/{selectedIds.length}
                  </>
                ) : (
                  <><Printer size={14} /> Imprimir em Lote</>
                )}
              </button>

              <button 
                disabled={isBatching}
                onClick={() => setSelectedIds([])}
                className="px-4 py-2 text-slate-400 hover:text-brand-navy font-black text-[9px] uppercase tracking-widest transition-all disabled:opacity-30"
              >
                Limpar Seleção
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Renderizador de Lote Invisível (Off-screen) */}
      {isBatching && currentBatchOrder && (
        <div className="fixed -left-[2000px] -top-[2000px] pointer-events-none opacity-0">
          <BadgeCanvas 
            key={currentBatchOrder.id}
            name={currentBatchOrder.clientName}
            congregation={currentBatchOrder.congregation || ""}
            photoUrl={currentBatchOrder.photoUrl}
            bgImageUrl={currentBatchOrder.template.bgImageUrl}
            orientation={currentBatchOrder.template.configJson?.orientation || "landscape"}
            config={JSON.parse(currentBatchOrder.customConfigJson || currentBatchOrder.template.configJson || "{}")}
            onReady={handleCanvasReady}
          />
        </div>
      )}

      {/* Modal de Prévia do Lote */}
      <AnimatePresence>
        {showBatchPreview && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/90 backdrop-blur-xl z-[110] flex items-center justify-center p-4 md:p-10"
          >
            <div className="bg-slate-900 border border-white/10 rounded-[48px] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Revisão de Impressão</h3>
                  <p className="text-brand-teal text-[10px] font-black uppercase tracking-[0.2em] mt-1">Lote com {batchImages.length} identificadores prontos</p>
                </div>
                <button 
                  onClick={() => { setShowBatchPreview(false); setIsBatching(false); setBatchImages([]); }}
                  className="p-4 bg-white/5 text-slate-400 hover:text-white rounded-2xl transition-all"
                >
                  Cancelar Lote
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {batchImages.map((img, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative"
                    >
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand-teal text-brand-navy rounded-full flex items-center justify-center font-black text-xs z-10 shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-brand-teal/50 transition-all shadow-xl">
                        <img src={img} alt={`Preview ${idx}`} className="w-full h-auto" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <footer className="p-8 border-t border-white/5 bg-black/40 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Configurações de Hardware</span>
                    <div className="flex items-center gap-3 mt-1">
                      <button 
                        onClick={() => setBatchSettings(s => ({ ...s, highDPI: !s.highDPI }))}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border",
                          batchSettings.highDPI ? "bg-brand-teal text-brand-navy border-brand-teal" : "bg-white/5 text-slate-500 border-white/5 hover:border-white/10"
                        )}
                      >
                        600 DPI (Nitidez Máxima)
                      </button>
                      <button 
                        onClick={() => setBatchSettings(s => ({ ...s, monochrome: !s.monochrome }))}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border",
                          batchSettings.monochrome ? "bg-brand-teal text-brand-navy border-brand-teal" : "bg-white/5 text-slate-500 border-white/5 hover:border-white/10"
                        )}
                      >
                        Preto e Branco (Mono)
                      </button>
                    </div>
                  </div>

                  <div className="hidden lg:block w-[1px] h-10 bg-white/5"></div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fluxo de Trabalho</span>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={batchSettings.autoUpdateStatus}
                        onChange={(e) => setBatchSettings(s => ({ ...s, autoUpdateStatus: e.target.checked }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-teal focus:ring-brand-teal transition-all"
                      />
                      <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-white transition-colors">Auto 'Em Produção'</span>
                    </label>
                  </div>

                  <div className="hidden lg:block w-[1px] h-10 bg-white/5"></div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                      <AlertCircle size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-400 text-[9px] font-bold uppercase leading-tight max-w-[240px]">
                        {batchSettings.highDPI ? "• 600 DPI: Máxima definição para textos e logotipos." : "• 300 DPI: Processamento mais rápido para grandes volumes."}
                      </p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase leading-tight max-w-[240px]">
                        {batchSettings.monochrome ? "• Modo Mono: Otimizado para fitas K (Preto)." : "• Modo Colorido: Requer fita YMCKT para fotos reais."}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleFinalBatchPrint}
                  disabled={isPrintingBatch}
                  className="px-12 py-6 bg-brand-teal hover:bg-brand-teal-dark text-brand-navy rounded-[28px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-teal/20 transition-all active:scale-95 flex items-center gap-4 disabled:opacity-50"
                >
                  {isPrintingBatch ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Enviando Lote...
                    </>
                  ) : (
                    <>
                      <Printer size={24} />
                      Confirmar e Imprimir Tudo
                    </>
                  )}
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de Bloqueio durante o Lote */}
      <AnimatePresence>
        {isBatching && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center space-y-6 shadow-2xl scale-in-center">
              <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto text-brand-teal animate-bounce">
                {batchMode === "print" ? <Printer size={32} /> : batchMode === "pdf" ? <FileText size={32} /> : <Download size={32} />}
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-brand-navy text-xl uppercase tracking-tight">
                  {batchMode === "print" ? "Preparando Lote" : batchMode === "pdf" ? "Gerando PDF" : "Gerando ZIP"}
                </h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  {batchMode === "print" ? "Artes geradas" : "Processando"}: {batchStep + 1} de {selectedIds.length}
                </p>
              </div>
              {/* Barra de Progresso Real */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-brand-teal"
                    initial={{ width: 0 }}
                    animate={{ width: `${((batchStep + 1) / selectedIds.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-tighter italic px-4">
                {batchMode === "print" 
                  ? "Por favor, não feche o navegador enquanto os dados são enviados para a Sigma DS3."
                  : "Aguarde um momento enquanto preparamos seu arquivo de alta resolução."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabela de Pedidos */}
      <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-brand-navy/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="pl-8 py-6 w-12">
                   <div 
                     onClick={toggleSelectAll}
                     className={cn(
                       "w-5 h-5 rounded-md border-2 cursor-pointer transition-all flex items-center justify-center",
                       selectedIds.length === filteredOrders.length ? "bg-brand-teal border-brand-teal" : "border-slate-200"
                     )}
                   >
                     {selectedIds.length === filteredOrders.length && <CheckCircle size={12} className="text-white" />}
                   </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente / Família</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pagamento</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Local / Congregação</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Itens</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="pr-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {groupedOrdersToRender.map((group) => {
                const { mainOrder, allOrders, isGroup, totalItems } = group;
                const isSelected = allOrders.every((o: any) => selectedIds.includes(o.id));
                const isUpdating = updatingId === group.id;

                return (
                  <tr 
                    key={group.id} 
                    className={cn(
                      "group transition-all select-none",
                      isSelected ? "bg-brand-teal/5" : "hover:bg-slate-50/50"
                    )}
                  >
                    <td className="pl-8 py-6 border-b border-slate-50">
                      <div 
                        onClick={(e) => toggleSelectGroup(e, group)}
                        className={cn(
                          "w-5 h-5 rounded-md border-2 cursor-pointer transition-all flex items-center justify-center",
                          isSelected ? "bg-brand-teal border-brand-teal" : "border-slate-200 group-hover:border-brand-teal/50"
                        )}
                      >
                        {isSelected && <CheckCircle size={12} className="text-white" />}
                      </div>
                    </td>
                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(mainOrder)}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <p className="font-black text-brand-navy group-hover:text-brand-teal transition-colors">{mainOrder.clientName}</p>
                           {isGroup && (
                             <span className="px-2 py-0.5 bg-brand-navy/5 text-[8px] text-brand-navy rounded-full font-black uppercase flex items-center gap-1 border border-brand-navy/10" title={mainOrder.groupId}>
                               <Users size={8} /> #{mainOrder.groupId.substring(0, 6).toUpperCase()}
                             </span>
                           )}
                        </div>
                        {isGroup && totalItems > 1 ? (
                          <p className="text-[10px] text-brand-teal font-black uppercase tracking-tighter mt-1">+ {totalItems - 1} crachás</p>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">#{mainOrder.id.slice(-6).toUpperCase()}</p>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-6 border-b border-slate-50 text-center">
                       <div className="flex flex-col items-center gap-1.5">
                         <span className="text-[11px] font-black text-brand-navy bg-slate-50 px-2 py-0.5 rounded-md">
                           R$ {allOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0).toFixed(2)}
                         </span>
                         <button 
                           disabled={isUpdating}
                           onClick={(e) => handleTogglePaymentGroup(e, group)}
                           className={cn(
                             "relative w-20 py-1.5 rounded-xl border-2 font-black text-[9px] uppercase tracking-widest transition-all overflow-hidden",
                             mainOrder.paymentStatus === "PAID" 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                              : "bg-white border-slate-100 text-slate-300 hover:border-slate-300"
                           )}
                         >
                           {isUpdating ? "..." : mainOrder.paymentStatus === "PAID" ? "Pago ✅" : "Pendente"}
                         </button>
                       </div>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(mainOrder)}>
                      <div>
                        <p className="text-xs font-black text-slate-600 uppercase tracking-tight">{mainOrder.event.name}</p>
                        <p className="text-[11px] text-slate-400 font-bold italic mt-0.5">{mainOrder.congregation || "-"}</p>
                      </div>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(mainOrder)}>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {mainOrder.items.length === 0 ? (
                          <span className="text-[10px] text-slate-300 font-black uppercase italic">Nenhum extra</span>
                        ) : (
                          mainOrder.items.slice(0, 2).map((oi: any) => (
                            <span key={oi.id} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[8px] font-black uppercase tracking-tight">
                              {oi.item.name}
                            </span>
                          ))
                        )}
                        {mainOrder.items.length > 2 && <span className="text-[8px] font-black text-slate-400">+{mainOrder.items.length - 2}</span>}
                      </div>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50">
                      <div className="flex flex-col gap-1">
                        <button 
                          disabled={isUpdating}
                          onClick={() => setConfirmStatusModal({
                            orderId: group.id, // Passando o ID do grupo para o modal
                            orderIds: allOrders.map((o: any) => o.id),
                            currentStatus: mainOrder.status,
                            nextStatus: mainOrder.status === "PENDING" ? "PRINTING" : mainOrder.status === "PRINTING" ? "PRINTED" : "PENDING",
                            clientName: isGroup ? `${mainOrder.clientName} e família (${totalItems} itens)` : mainOrder.clientName
                          } as any)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] transition-all hover:scale-105 active:scale-95", 
                            getStatusStyle(mainOrder.status)
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full bg-current", mainOrder.status !== "PRINTED" && "animate-pulse")} />
                          {isUpdating ? "..." : getStatusLabel(mainOrder.status)}
                        </button>
                        
                        {/* Atalhos rápidos se não estiver na aba final */}
                        {mainOrder.status === "PENDING" && (
                          <button 
                            onClick={() => setConfirmStatusModal({
                              orderId: group.id,
                              orderIds: allOrders.map((o: any) => o.id),
                              currentStatus: mainOrder.status,
                              nextStatus: "PRINTED",
                              clientName: isGroup ? `${mainOrder.clientName} e família (${totalItems} itens)` : mainOrder.clientName
                            } as any)} 
                            className="text-[8px] font-black text-slate-300 hover:text-brand-teal uppercase tracking-widest text-left pl-3"
                          >
                            Pular para Produzido
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="pr-8 py-6 border-b border-slate-50 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={`/admin/pedidos/imprimir/${mainOrder.id}`}
                          title="Estúdio de Pré-Impressão" 
                          className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-xl transition-all flex items-center justify-center border border-transparent hover:border-brand-teal/20"
                        >
                          <Printer size={18} />
                        </a>
                        <button 
                          onClick={() => setSelectedOrder(mainOrder)}
                          title="Detalhes" 
                          className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-brand-navy hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-32 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200 relative">
               <div className="absolute inset-0 bg-brand-teal/5 blur-2xl rounded-full"></div>
               <Search size={40} className="relative z-10" />
            </div>
            <div className="space-y-2">
              <p className="text-brand-navy font-black text-lg">Nenhum resultado encontrado</p>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Tente mudar os filtros ou a busca para "{searchTerm}"</p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder} 
            groupOrders={selectedOrder.groupId ? initialOrders.filter((o: any) => o.groupId === selectedOrder.groupId) : [selectedOrder]}
            onClose={() => setSelectedOrder(null)} 
          />
        )}

        {/* Modal de Confirmação de Status */}
        {confirmStatusModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-2">Mudar Status?</h3>
              <p className="text-slate-500 mb-6 text-sm">
                Deseja avançar o crachá de <strong>{confirmStatusModal.clientName}</strong> para <span className="font-bold text-brand-teal uppercase text-xs">{getStatusLabel(confirmStatusModal.nextStatus)}</span>?
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button 
                    onClick={() => setConfirmStatusModal(null)}
                    className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={async () => {
                      const idsToUpdate = (confirmStatusModal as any).orderIds || [confirmStatusModal.orderId];
                      setUpdatingId(confirmStatusModal.orderId);
                      setConfirmStatusModal(null);
                      
                      await Promise.all(idsToUpdate.map((id: string) => 
                        updateOrderStatus(id, { status: confirmStatusModal.nextStatus })
                      ));
                      
                      mutate('orders-list');
                      toast.success(`Status atualizado para ${getStatusLabel(confirmStatusModal.nextStatus)}`);
                      setUpdatingId(null);
                    }}
                    className="flex-1 py-3 bg-brand-teal text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-teal-500 transition-colors"
                  >
                    Confirmar
                  </button>
                </div>

                {confirmStatusModal.currentStatus !== "PENDING" && (
                  <button 
                    onClick={async () => {
                      const idsToUpdate = (confirmStatusModal as any).orderIds || [confirmStatusModal.orderId];
                      const prevStatus = confirmStatusModal.currentStatus === "PRINTED" ? "PRINTING" : "PENDING";
                      
                      setUpdatingId(confirmStatusModal.orderId);
                      setConfirmStatusModal(null);
                      
                      await Promise.all(idsToUpdate.map((id: string) => 
                        updateOrderStatus(id, { status: prevStatus })
                      ));
                      
                      mutate('orders-list');
                      toast.success(`Status revertido para ${getStatusLabel(prevStatus)}`);
                      setUpdatingId(null);
                    }}
                    className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Undo size={14} /> Desfazer (Voltar para {getStatusLabel(confirmStatusModal.currentStatus === "PRINTED" ? "PRINTING" : "PENDING")})
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { 
  Search, Filter, Printer, Clock, CheckCircle, 
  CreditCard, DollarSign, Users, ChevronDown, 
  ChevronRight, AlertCircle, Trash2, Eye
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

  // Filtros
  const [filterPayment, setFilterPayment] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const handleTogglePayment = async (orderId: string, current: string) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, { 
      paymentStatus: current === "PAID" ? "PENDING" : "PAID" 
    });
    setUpdatingId(null);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "PRINTED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  const filteredOrders = initialOrders.filter(order => {
    const searchLow = searchTerm.toLowerCase();
    const matchesSearch = (
      order.clientName.toLowerCase().includes(searchLow) ||
      order.event.name.toLowerCase().includes(searchLow) ||
      (order.congregation && order.congregation.toLowerCase().includes(searchLow)) ||
      order.id.toLowerCase().includes(searchLow) ||
      (order.groupId && order.groupId.toLowerCase().includes(searchLow))
    );

    const matchesPayment = filterPayment === "ALL" || order.paymentStatus === filterPayment;
    const matchesStatus = filterStatus === "ALL" || order.status === filterStatus;

    return matchesSearch && matchesPayment && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map(o => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // --- MOTOR DE LOTE ---
  const [isBatching, setIsBatching] = useState(false);
  const [batchStep, setBatchStep] = useState(0);
  const [batchImages, setBatchImages] = useState<string[]>([]);
  const [currentBatchOrder, setCurrentBatchOrder] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmDelete = window.confirm(`Atenção: Você tem certeza que deseja deletar ${selectedIds.length} pedido(s)?\nEssa ação apagará do banco de dados e não pode ser desfeita.`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    const res = await deleteOrders(selectedIds);
    if (res?.success) {
      toast.success(`${selectedIds.length} pedido(s) excluído(s) para sempre.`);
      setSelectedIds([]);
    } else {
      toast.error("Erro ao tentar excluir.");
    }
    setIsDeleting(false);
  };

  const startBatchPrint = async () => {
    if (selectedIds.length === 0) return;
    
    setIsBatching(true);
    setBatchStep(0);
    setBatchImages([]);
    
    const ordersToPrint = initialOrders.filter(o => selectedIds.includes(o.id));
    setCurrentBatchOrder(ordersToPrint[0]);
  };

  const handleCanvasReady = async (dataUrl: string) => {
    if (!isBatching) return;

    const newImages = [...batchImages, dataUrl];
    setBatchImages(newImages);

    const nextStep = batchStep + 1;
    const ordersToPrint = initialOrders.filter(o => selectedIds.includes(o.id));

    if (nextStep < ordersToPrint.length) {
      setBatchStep(nextStep);
      setCurrentBatchOrder(ordersToPrint[nextStep]);
    } else {
      // TODOS GERADOS! Mandar para a Impressora
      setCurrentBatchOrder(null);
      
      try {
        const res = await fetch("/api/printer/control", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            action: "printBatch", 
            value: newImages,
            orientation: ordersToPrint[0].template.configJson?.orientation || "landscape"
          })
        });

        const result = await res.json();
        
        if (result.success) {
          // Atualizar no Banco para "IMPRESSO"
          await bulkUpdateStatus(selectedIds, "PRINTED");
          alert(`Sucesso! ${newImages.length} crachás enviados para a Sigma.`);
          setSelectedIds([]);
        } else {
          alert("Erro na impressora: " + result.error);
        }
      } catch (err) {
        alert("Erro ao conectar com a impressora.");
      } finally {
        setIsBatching(false);
        setBatchStep(0);
        setBatchImages([]);
      }
    }
  };

  return (
    <>
      {/* Topo: Busca e Filtros */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, família, evento ou congregação..." 
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
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase border-none outline-none cursor-pointer"
            >
              <option value="ALL">📋 Todos os Status</option>
              <option value="PENDING">PENDENTE</option>
              <option value="PRINTED">IMPRESSO</option>
              <option value="DELIVERED">ENTREGUE</option>
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
            <div className="flex gap-2">
               <button 
                onClick={handleDelete}
                disabled={isBatching || isDeleting}
                className="px-6 py-2 bg-red-50 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all border border-transparent shadow-sm"
               >
                 {isDeleting ? "Aguarde..." : <><Trash2 size={14} /> Excluir ({selectedIds.length})</>}
               </button>
               <button 
                onClick={startBatchPrint}
                disabled={isBatching || isDeleting}
                className="px-6 py-2 bg-brand-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-brand-navy/90 disabled:opacity-50 transition-all"
               >
                 {isBatching ? (
                   <>
                     <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Processando {batchStep + 1}/{selectedIds.length}
                   </>
                 ) : (
                   <>
                    <Printer size={14} /> Imprimir em Lote
                   </>
                 )}
               </button>
               <button 
                disabled={isBatching}
                onClick={() => setSelectedIds([])} 
                className="px-4 py-2 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest disabled:opacity-30"
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

      {/* Overlay de Bloqueio durante o Lote */}
      <AnimatePresence>
        {isBatching && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
           >
              <div className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center space-y-6 shadow-2xl scale-in-center">
                 <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto text-brand-teal animate-bounce">
                    <Printer size={32} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="font-black text-brand-navy text-xl uppercase tracking-tight">Preparando Lote</h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                       Gerando artes: {batchStep + 1} de {selectedIds.length}
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
                 <p className="text-[10px] text-slate-300 font-black uppercase tracking-tighter italic">
                    Por favor, não feche o navegador enquanto os dados são enviados para a Sigma DS3.
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
              {filteredOrders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                const isUpdating = updatingId === order.id;

                return (
                  <tr 
                    key={order.id} 
                    className={cn(
                      "group transition-all select-none",
                      isSelected ? "bg-brand-teal/5" : "hover:bg-slate-50/50"
                    )}
                  >
                    <td className="pl-8 py-6 border-b border-slate-50">
                      <div 
                        onClick={(e) => { e.stopPropagation(); toggleSelect(order.id); }}
                        className={cn(
                          "w-5 h-5 rounded-md border-2 cursor-pointer transition-all flex items-center justify-center",
                          isSelected ? "bg-brand-teal border-brand-teal" : "border-slate-200 group-hover:border-brand-teal/50"
                        )}
                      >
                        {isSelected && <CheckCircle size={12} className="text-white" />}
                      </div>
                    </td>
                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(order)}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <p className="font-black text-brand-navy group-hover:text-brand-teal transition-colors">{order.clientName}</p>
                           {order.groupId && (
                             <span className="px-2 py-0.5 bg-brand-navy text-[8px] text-white rounded-full font-black uppercase flex items-center gap-1" title={order.groupId}>
                               <Users size={8} /> Lote #{order.groupId.substring(0, 6).toUpperCase()}
                             </span>
                           )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">#{order.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-6 border-b border-slate-50 text-center">
                       <button 
                         disabled={isUpdating}
                         onClick={(e) => { e.stopPropagation(); handleTogglePayment(order.id, order.paymentStatus); }}
                         className={cn(
                           "relative w-20 py-2 rounded-xl border-2 font-black text-[9px] uppercase tracking-widest transition-all overflow-hidden",
                           order.paymentStatus === "PAID" 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                            : "bg-white border-slate-100 text-slate-300 hover:border-slate-300"
                         )}
                       >
                         {isUpdating ? "..." : order.paymentStatus === "PAID" ? "Pago ✅" : "Pendente"}
                       </button>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(order)}>
                      <div>
                        <p className="text-xs font-black text-slate-600 uppercase tracking-tight">{order.event.name}</p>
                        <p className="text-[11px] text-slate-400 font-bold italic mt-0.5">{order.congregation || "-"}</p>
                      </div>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(order)}>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {order.items.length === 0 ? (
                          <span className="text-[10px] text-slate-300 font-black uppercase italic">Nenhum extra</span>
                        ) : (
                          order.items.slice(0, 2).map((oi: any) => (
                            <span key={oi.id} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[8px] font-black uppercase tracking-tight">
                              {oi.item.name}
                            </span>
                          ))
                        )}
                        {order.items.length > 2 && <span className="text-[8px] font-black text-slate-400">+{order.items.length - 2}</span>}
                      </div>
                    </td>

                    <td className="px-6 py-6 border-b border-slate-50" onClick={() => setSelectedOrder(order)}>
                      <div className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.15em]", getStatusStyle(order.status))}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {order.status === "PENDING" ? "Aguardando" : order.status === "PRINTED" ? "Impresso" : "Entregue"}
                      </div>
                    </td>

                    <td className="pr-8 py-6 border-b border-slate-50 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={`/admin/pedidos/imprimir/${order.id}`}
                          title="Estúdio de Pré-Impressão" 
                          className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-xl transition-all flex items-center justify-center border border-transparent hover:border-brand-teal/20"
                        >
                          <Printer size={18} />
                        </a>
                        <button 
                          onClick={() => setSelectedOrder(order)}
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
      </AnimatePresence>
    </>
  );
}

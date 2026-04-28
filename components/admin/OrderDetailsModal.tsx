"use client";

import React, { useState, useEffect } from "react";
import { X, User, Phone, MapPin, Truck, CreditCard, Package, Printer, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrderDetailsModalProps {
  order: any;
  groupOrders?: any[];
  onClose: () => void;
}

export default function OrderDetailsModal({ order: initialOrder, groupOrders = [], onClose }: OrderDetailsModalProps) {
  const [activeOrder, setActiveOrder] = useState(initialOrder);

  useEffect(() => {
    setActiveOrder(initialOrder);
  }, [initialOrder]);

  if (!activeOrder) return null;

  const order = activeOrder;
  const realGroupOrders = groupOrders.length > 0 ? groupOrders : [initialOrder];

  // Parsing crachá config
  let badgeConfig = null;
  try {
    if (order.customConfigJson) {
      badgeConfig = JSON.parse(order.customConfigJson);
    }
  } catch (e) {
    console.error("Erro ao processar config do crachá", e);
  }

  const formatWhatsApp = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    return `https://wa.me/55${clean}`;
  };

  // Injeta o CSS da fonte dinamicamente se ainda não existir
  const loadGoogleFont = (fontName: string) => {
    if (!fontName) return;
    const fontId = `google-font-${fontName.replace(/\s+/g, '-')}`;
    if (typeof document !== 'undefined' && !document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700;800;900&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  };

  useEffect(() => {
    if (badgeConfig?.namePos?.fontFamily) loadGoogleFont(badgeConfig.namePos.fontFamily);
    if (badgeConfig?.congPos?.fontFamily) loadGoogleFont(badgeConfig.congPos.fontFamily);
  }, [badgeConfig]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 relative">
          <div>
            <h2 className="text-2xl font-black text-brand-navy uppercase tracking-tight">Detalhes do Pedido</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                ID: #{order.id.slice(-8).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </p>
              {realGroupOrders.length > 1 && (
                <span className="px-2 py-0.5 bg-brand-teal text-white rounded-md text-[9px] font-black uppercase shadow-sm">
                  Lote: {realGroupOrders.length} Membros
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-brand-navy hover:border-slate-200 transition-all flex items-center justify-center shadow-sm shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Abas de Membros do Lote */}
        {realGroupOrders.length > 1 && (
          <div className="px-8 py-4 bg-slate-50/80 border-b border-slate-100 flex gap-2 overflow-x-auto custom-scrollbar shadow-inner">
            {realGroupOrders.map((go: any, i: number) => (
              <button
                key={go.id}
                onClick={() => setActiveOrder(go)}
                className={cn(
                  "flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  activeOrder.id === go.id
                    ? "bg-brand-navy text-white shadow-md scale-105"
                    : "bg-white border border-slate-200 text-slate-400 hover:text-brand-navy hover:bg-slate-100"
                )}
              >
                Membro {i + 1}: {go.clientName.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Coluna Esquerda: Dados do Cliente e Entrega */}
            <div className="space-y-8">
              {/* Cliente */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-brand-teal">
                  <User size={18} strokeWidth={2.5} />
                  <h3 className="font-black uppercase tracking-wider text-[10px]">Informações do Cliente</h3>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-xl font-black text-brand-navy mb-1">{order.clientName}</p>
                  <p className="text-slate-500 font-bold text-sm mb-4">{order.congregation || "Nenhuma congregação informada"}</p>
                  <a
                    href={formatWhatsApp(order.phone)}
                    target="_blank"
                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-4 py-2.5 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all group"
                  >
                    <Phone size={16} />
                    {order.phone}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </div>
              </section>

              {/* Entrega */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-brand-teal">
                  <Truck size={18} strokeWidth={2.5} />
                  <h3 className="font-black uppercase tracking-wider text-[10px]">Logística e Entrega</h3>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  {order.isFromItabira ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-xl">
                        🏘️
                      </div>
                      <div>
                        <p className="font-black text-brand-navy">Retirada / Entrega em Itabira</p>
                        <p className="text-[10px] text-brand-teal font-black uppercase tracking-widest">Frete Grátis</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                          <p className="font-bold text-brand-navy text-sm">{order.shippingService || "Transportadora"}</p>
                        </div>
                        <p className="font-black text-brand-teal">R$ {order.shippingCost.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-3">
                        <MapPin size={20} className="text-slate-300 shrink-0 mt-1" />
                        <div className="text-sm">
                          <p className="text-slate-600 font-bold">
                            {order.address}, {order.number} {order.complement && `• ${order.complement}`}
                          </p>
                          <p className="text-slate-500 font-medium">
                            {order.neighborhood} • {order.city} - {order.state}
                          </p>
                          <p className="text-slate-400 font-black mt-2 bg-white px-3 py-1 rounded-lg border border-slate-100 w-fit">CEP {order.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Coluna Direita: Pedido e Crachá */}
            <div className="space-y-8">
              {/* Pagamento e Itens */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-brand-teal">
                  <CreditCard size={18} strokeWidth={2.5} />
                  <h3 className="font-black uppercase tracking-wider text-[10px]">Resumo Financeiro</h3>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Método</span>
                    <span className="font-black text-brand-navy bg-white px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
                      {order.paymentMethod === "PIX" ? "📱 PIX" : "💵 DINHEIRO"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Itens Adicionais</p>
                    <div className="space-y-2">
                      {order.items.length === 0 ? (
                        <p className="text-xs text-slate-300 italic py-2">Nenhum acessório extra</p>
                      ) : (
                        order.items.map((oi: any) => (
                          <div key={oi.id} className="flex justify-between items-center text-sm bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="font-bold text-brand-navy flex items-center gap-2">
                              <Package size={14} className="text-slate-300" />
                              {oi.item.name}
                            </span>
                            <span className="text-slate-400 font-black text-xs">R$ {oi.priceAtTime.toFixed(2)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Geral</p>
                      <p className="font-black text-brand-navy">Valor Liquido</p>
                    </div>
                    <p className="text-4xl font-black text-brand-teal tracking-tighter">R$ {order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </section>

              {/* Preview Crachá */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-brand-teal">
                    <Package size={18} strokeWidth={2.5} />
                    <h3 className="font-black uppercase tracking-wider text-[10px]">Dossiê Visual do Crachá</h3>
                  </div>
                </div>

                {/* O crachá renderizado (Mini Preview) */}
                <div className="relative group w-full aspect-[1.586/1] bg-slate-100 rounded-[32px] overflow-hidden border-4 border-white shadow-xl shadow-slate-200/50 container-badge">
                  {order.template?.backgroundUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={order.template.backgroundUrl}
                        alt="Badge Background"
                        className={`w-full h-full object-cover ${badgeConfig?.orientation === 'landscape' ? '' : 'rotate-90'}`}
                      />
                      {/* Overlay com os textos usando as coordenadas originais escaladas */}
                      {badgeConfig && (
                        <div className="absolute inset-0" style={{ containerType: 'size' }}>
                          {/* Nome */}
                          <div
                            className="absolute pointer-events-none text-center transform -translate-x-1/2 -translate-y-1/2 leading-tight"
                            style={{
                              left: `${(badgeConfig.namePos.x / 1012) * 100}%`,
                              top: `${(badgeConfig.namePos.y / 638) * 100}%`,
                              fontSize: `${(badgeConfig.namePos.fontSize / 638) * 100}cqh`,
                              fontFamily: `${badgeConfig.namePos.fontFamily || 'Inter'}, sans-serif`,
                              color: badgeConfig.namePos.color,
                              fontWeight: badgeConfig.namePos.fontWeight || 'bold',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {order.clientName}
                          </div>
                          {/* Congregação */}
                          <div
                            className="absolute pointer-events-none text-center transform -translate-x-1/2 -translate-y-1/2 leading-tight opacity-80"
                            style={{
                              left: `${(badgeConfig.congPos.x / 1012) * 100}%`,
                              top: `${(badgeConfig.congPos.y / 638) * 100}%`,
                              fontSize: `${(badgeConfig.congPos.fontSize / 638) * 100}cqh`,
                              fontFamily: `${badgeConfig.congPos.fontFamily || 'Inter'}, sans-serif`,
                              color: badgeConfig.congPos.color,
                              fontWeight: badgeConfig.congPos.fontWeight || 'normal',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {order.congregation}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                      <Package size={48} />
                      <p className="text-xs font-bold mt-2 font-black uppercase">Background Ausente</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <button
            onClick={onClose}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black hover:bg-slate-100 transition-all text-xs uppercase tracking-widest"
          >
            Fechar Janela
          </button>
          <a
            href={`/admin/pedidos/imprimir/${order.id}`}
            className="px-8 py-4 bg-brand-navy text-white rounded-2xl font-black hover:bg-brand-navy/90 transition-all text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-navy/20 active:scale-95 transform"
          >
            <Printer size={18} />
            Preparar Impressão
          </a>
        </div>
      </motion.div>
    </div>
  );
}

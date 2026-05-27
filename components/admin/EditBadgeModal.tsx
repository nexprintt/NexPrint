"use client";

import React, { useState, useEffect } from "react";
import { X, Save, User, Building2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import BadgeCanvas from "../canvas/BadgeCanvas";
import { updateOrderBadgeData } from "@/app/admin/pedidos/actions";
import { toast } from "sonner";

interface EditBadgeModalProps {
  order: any;
  onClose: () => void;
  onSave: (updatedOrder: any) => void;
}

export default function EditBadgeModal({ order, onClose, onSave }: EditBadgeModalProps) {
  const [clientName, setClientName] = useState(order.clientName || "");
  const [congregation, setCongregation] = useState(order.congregation || "");
  const [isSaving, setIsSaving] = useState(false);

  // Parsing da configuração do crachá do pedido
  const [config, setConfig] = useState(() => {
    try {
      if (order.customConfigJson) {
        return JSON.parse(order.customConfigJson);
      }
      if (order.template?.configJson) {
        return JSON.parse(order.template.configJson);
      }
    } catch (e) {
      console.error("Erro ao fazer o parse das coordenadas iniciais do crachá:", e);
    }
    return {
      orientation: "landscape",
      namePos: null,
      congPos: null
    };
  });

  const handleSave = async () => {
    if (clientName.trim().length < 3) {
      toast.error("O nome do participante precisa ter pelo menos 3 caracteres.");
      return;
    }

    setIsSaving(true);
    try {
      const configStr = JSON.stringify(config);
      const res = await updateOrderBadgeData(order.id, {
        clientName: clientName.trim(),
        congregation: congregation.trim(),
        customConfigJson: configStr,
      });

      if (res.success) {
        toast.success("Crachá atualizado com sucesso!");
        onSave({
          ...order,
          clientName: clientName.trim(),
          congregation: congregation.trim() || null,
          customConfigJson: configStr,
        });
        onClose();
      } else {
        toast.error(res.error || "Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar crachá:", error);
      toast.error("Ocorreu um erro crítico ao tentar salvar o crachá.");
    } finally {
      setIsSaving(false);
    }
  };

  const orientation = config?.orientation || order.template?.configJson?.orientation || "landscape";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/70 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <header className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Editar Crachá</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              Pedido #{order.id.slice(-8).toUpperCase()} • Ajuste visual do crachá em tempo real
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-brand-navy hover:border-slate-200 transition-all flex items-center justify-center shadow-sm"
          >
            <X size={20} />
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lado Esquerdo: Inputs de Formulário (4 colunas) */}
            <div className="lg:col-span-5 space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <h4 className="text-[11px] font-black text-brand-teal uppercase tracking-widest flex items-center gap-2">
                ✍️ Informações no Crachá
              </h4>

              {/* Campo Nome */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Digite o nome no crachá"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-slate-200/80 focus:border-brand-teal/40 focus:ring-0 rounded-2xl outline-none transition-all font-bold text-brand-navy text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Campo Congregação */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Congregação
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={congregation}
                    onChange={(e) => setCongregation(e.target.value)}
                    placeholder="Digite a congregação (opcional)"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-slate-200/80 focus:border-brand-teal/40 focus:ring-0 rounded-2xl outline-none transition-all font-bold text-brand-navy text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Instruções de Uso */}
              <div className="p-4 bg-brand-teal/5 border border-brand-teal/10 rounded-2xl text-[10px] font-medium text-slate-500 leading-relaxed space-y-1.5">
                <p className="font-black text-brand-teal uppercase tracking-tight">💡 Dica de Edição Visual:</p>
                <p>No editor à direita, clique diretamente sobre o **Nome** ou a **Congregação** para abrir a barra de ferramentas de fontes, tamanhos e cores.</p>
                <p>Você pode arrastar os textos para qualquer lugar da arte de fundo para garantir o encaixe perfeito.</p>
              </div>
            </div>

            {/* Lado Direito: Badge Canvas Interativo (7 colunas) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50 p-6 rounded-[32px] border border-slate-100 min-h-[400px]">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200/50">
                {order.template?.bgImageUrl ? (
                  <BadgeCanvas
                    name={clientName}
                    congregation={congregation}
                    photoUrl={order.photoUrl}
                    bgImageUrl={order.template.bgImageUrl}
                    orientation={orientation as any}
                    config={config}
                    interactive={true}
                    onUpdateConfig={(newConfig) => setConfig(newConfig)}
                  />
                ) : (
                  <div className="py-20 text-center text-slate-400 font-bold uppercase text-xs">
                    Imagem de fundo do template não encontrada
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4 shadow-inner">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-100 transition-all text-xs uppercase tracking-wider"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy/90 transition-all text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-navy/15"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            )}
          </button>
        </footer>
      </motion.div>
    </div>
  );
}

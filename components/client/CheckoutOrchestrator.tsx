"use client";

import React, { useState, useEffect } from "react";
import TemplateSelector from "./TemplateSelector";
import BadgePedidoClient from "./BadgePedidoClient";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ParticleNetwork from "./ParticleNetwork";

interface CheckoutOrchestratorProps {
  event: any;
  templates: any[];
}

export default function CheckoutOrchestrator({ event, templates }: CheckoutOrchestratorProps) {
  const searchParams = useSearchParams();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Efeito para pegar o template da URL se existir
  useEffect(() => {
    const tid = searchParams.get("templateId");
    if (tid && templates.some(t => t.id === tid)) {
      setSelectedTemplateId(tid);
    }
  }, [searchParams, templates]);

  // Encontra o template selecionado
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
  const config = selectedTemplate ? JSON.parse(selectedTemplate.configJson) : null;

  const handleBack = () => {
    setSelectedTemplateId(null);
  };

  return (
    <div className="relative w-full">
      {/* Fundo de Constelação também na página de pedido para imersão total */}
      <ParticleNetwork />

      <AnimatePresence mode="wait">
        {!selectedTemplateId ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 pt-10"
          >
            <TemplateSelector 
              templates={templates} 
              onSelect={(id) => setSelectedTemplateId(id)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Botão de Voltar Premium */}
            <div className="max-w-[1300px] mx-auto mb-6 px-4 pt-4">
               <button 
                  onClick={handleBack}
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
               >
                 <div className="w-10 h-10 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-brand-navy transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                    <ArrowLeft size={20} />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest">Alterar Modelo</span>
               </button>
            </div>

            <BadgePedidoClient 
              event={event}
              template={selectedTemplate}
              config={config}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

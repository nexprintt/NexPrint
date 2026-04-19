"use client";

import React, { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import BadgePedidoClient from "./BadgePedidoClient";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface CheckoutOrchestratorProps {
  event: any;
  templates: any[];
}

export default function CheckoutOrchestrator({ event, templates }: CheckoutOrchestratorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Encontra o template selecionado
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
  const config = selectedTemplate ? JSON.parse(selectedTemplate.configJson) : null;

  const handleBack = () => {
    setSelectedTemplateId(null);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!selectedTemplateId ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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
          >
            {/* Botão de Voltar Premium */}
            <div className="max-w-[1300px] mx-auto mb-6 px-4">
               <button 
                  onClick={handleBack}
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
               >
                 <div className="w-10 h-10 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-brand-navy transition-all">
                    <ArrowLeft size={20} />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest">Mudar de Modelo</span>
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

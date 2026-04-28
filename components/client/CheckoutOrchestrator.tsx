"use client";

import React, { useEffect } from "react";
import BadgePedidoClient from "./BadgePedidoClient";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface CheckoutOrchestratorProps {
  event: any;
  templates: any[];
}

export default function CheckoutOrchestrator({ event, templates }: CheckoutOrchestratorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const templateId = searchParams.get("templateId");
  const selectedTemplate = templates.find((t) => t.id === templateId);

  // Redireciona para a home caso o templateId seja inválido ou não exista
  useEffect(() => {
    if (!selectedTemplate) {
      router.replace("/");
    }
  }, [selectedTemplate, router]);

  // Se não tem template válido, renderiza nada enquanto redireciona
  if (!selectedTemplate) {
    return null;
  }

  const config = JSON.parse(selectedTemplate.configJson);

  return (
    <div className="relative w-full max-w-4xl mx-auto">

      <motion.div
        key="checkout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Botão de Voltar Premium - Agora usando Link puro para Home */}
        <div className="max-w-[1300px] mx-auto mb-6 px-4 pt-4">
           <Link 
              href="/"
              className="group w-fit flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all shadow-sm">
                <ArrowLeft size={24} />
             </div>
             <span className="text-sm font-black uppercase tracking-widest">Voltar para o Início</span>
           </Link>
        </div>

        <BadgePedidoClient 
          key={selectedTemplate.id}
          event={event}
          template={selectedTemplate}
          config={config}
        />
      </motion.div>
    </div>
  );
}

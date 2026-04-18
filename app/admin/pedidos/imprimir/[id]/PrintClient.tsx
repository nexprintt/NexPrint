"use client";

import React, { useState, useRef, useEffect } from "react";
import { Printer, ArrowLeft, Loader2, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";
import BadgeCanvas from "@/components/canvas/BadgeCanvas";
import { motion, AnimatePresence } from "framer-motion";

interface PrintClientProps {
  order: any;
}

export default function PrintClient({ order }: PrintClientProps) {
  const [status, setStatus] = useState<"idle" | "printing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Ref para o canvas do BadgeCanvas (precisamos acessar o fabric instance ou o DOM)
  // Como o BadgeCanvas não exporta o fabricRef, vamos usar um hack de espera ou clonar a lógica
  
  const badgeConfig = order.customConfigJson ? JSON.parse(order.customConfigJson) : {};

  const handleSilentPrint = async () => {
    setStatus("printing");
    try {
      // Pequeno delay para garantir que o canvas renderizou
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = document.querySelector("canvas");
      if (!canvas) throw new Error("Canvas não encontrado na página.");
      
      // Captura a imagem do canvas
      // Idealmente queremos o tamanho real (1011x638)
      // O BadgeCanvas no preview usa um tamanho menor, mas para impressão vamos forçar a exportação
      
      const base64Image = canvas.toDataURL("image/png", 1.0);

      const badgeOrientation = badgeConfig.orientation || order.template.orientation || "landscape";

      const res = await fetch("/api/printer/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "printImage", 
          value: base64Image,
          orientation: badgeOrientation
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        // Volta para a lista após 3 segundos
        setTimeout(() => {
           window.location.href = "/admin/pedidos";
        }, 3000);
      } else {
        throw new Error(data.error || "Erro desconhecido na impressora");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Barra de Topo */}
      <div className="flex items-center justify-between text-white">
        <Link 
          href="/admin/pedidos" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={16} /> Voltar para Pedidos
        </Link>
        <div className="text-right">
           <h1 className="text-xl font-black uppercase tracking-tight">Módulo de Impressão Direta</h1>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Pedido #{order.id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      {/* Visualizador */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[64px] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-[100px] -z-10" />
         
         <div className="flex flex-col items-center gap-10">
            <div className="space-y-2 text-center">
               <span className="px-4 py-1.5 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-brand-teal/20">
                 Visualização em Alta Definição
               </span>
               <h2 className="text-white text-3xl font-black tracking-tighter">Estúdio de Pré-Impressão</h2>
            </div>

            {/* O Crachá Real */}
            <div className="scale-125 transform transition-all duration-700 hover:scale-110">
               <BadgeCanvas 
                 name={order.clientName}
                 congregation={order.congregation}
                 bgImageUrl={order.template.bgImageUrl}
                 orientation={badgeConfig.orientation || order.template.orientation}
                 config={badgeConfig}
                 interactive={false}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
               <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-brand-teal/20 rounded-2xl flex items-center justify-center text-brand-teal">
                     <Eye size={24} />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm uppercase tracking-tight">Auditoria Visual</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase leading-tight">Verifique nomes e cargos antes de imprimir</p>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm uppercase tracking-tight">Status da Sigma DS3</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase leading-tight">Impressora pronta para tracionar</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Ações */}
      <div className="flex flex-col items-center gap-6">
         <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.button 
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleSilentPrint}
                className="group relative px-12 py-6 bg-brand-teal hover:bg-brand-teal-dark text-brand-navy rounded-[32px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-teal/40 transition-all active:scale-95 flex items-center gap-4"
              >
                <Printer size={28} className="group-hover:rotate-12 transition-transform" />
                <span className="text-lg">Imprimir Agora</span>
                <div className="absolute -inset-1 bg-brand-teal blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10" />
              </motion.button>
            )}

            {status === "printing" && (
               <motion.div 
                 key="printing"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex flex-col items-center gap-4 py-6"
               >
                 <div className="relative">
                    <Loader2 size={64} className="text-brand-teal animate-spin" />
                    <Printer size={24} className="absolute inset-0 m-auto text-white animate-bounce" />
                 </div>
                 <p className="text-white font-black uppercase tracking-widest text-xs animate-pulse">Enviando para o hardware...</p>
               </motion.div>
            )}

            {status === "success" && (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center gap-4 py-4"
               >
                 <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 size={48} />
                 </div>
                 <p className="text-emerald-400 font-black uppercase tracking-widest text-sm">Impressão iniciada com sucesso!</p>
                 <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">O cartão sairá na bandeja de saída em breve.</p>
               </motion.div>
            )}

            {status === "error" && (
               <motion.div 
                 key="error"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center gap-4"
               >
                 <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center">
                    <AlertCircle size={32} />
                 </div>
                 <p className="text-red-400 font-black uppercase tracking-widest text-xs">{errorMsg}</p>
                 <button 
                   onClick={() => setStatus("idle")}
                   className="px-6 py-2 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase"
                 >
                   Tentar Novamente
                 </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          canvas { 
            visibility: visible !important;
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
          }
           @page {
             size: landscape;
             margin: 0;
           }
        }
      `}</style>
    </div>
  );
}

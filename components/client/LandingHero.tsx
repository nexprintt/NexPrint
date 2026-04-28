"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Sparkles, Layout } from "lucide-react";
import Link from "next/link";
import TemplateSelector from "./TemplateSelector";
import { useRouter } from "next/navigation";

interface LandingHeroProps {
  event: any; 
}

export default function LandingHero({ event }: LandingHeroProps) {
  const router = useRouter();
  const activeTemplates = event?.templates || [];

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/pedido/${event.slug}?templateId=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-teal/20 overflow-x-hidden relative font-outfit">
      
      <nav className="relative z-50 px-8 h-28 flex items-center justify-center md:justify-between max-w-7xl mx-auto border-b border-slate-100">
        <Link href="/" className="flex items-center gap-1 font-black text-4xl md:text-5xl tracking-tighter uppercase relative">
          <span className="text-slate-800">NEX</span>
          <span className="text-brand-teal">PRINT</span>
          <div className="w-2 h-2 rounded-full absolute -right-4 bottom-2 bg-brand-teal mt-1 ml-0.5 shadow-[0_0_15px_rgba(0,229,192,0.8)]" />
        </Link>
      </nav>

      <main className="relative z-10 container mx-auto px-4 md:px-6 pt-12 pb-32 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal/10 text-brand-teal rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-brand-teal/20">
            <div className="w-3 h-3 bg-brand-teal rounded-full animate-pulse mr-1"></div>
            Identificação Inteligente
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-8 uppercase text-slate-900">
            Congresso das <br className="hidden md:block" />
            <span className="text-brand-teal">Testemunhas de Jeová.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Faça seu pedido de crachá de forma fácil e rápida.
          </p>
        </motion.div>

        {/* Vitrine de Modelos */}
        <div className="w-full">
          {event && activeTemplates.length > 0 ? (
            <TemplateSelector 
              templates={activeTemplates} 
              onSelect={handleSelectTemplate}
            />
          ) : (
            <div className="max-w-2xl mx-auto py-20 bg-slate-50 border border-slate-200 rounded-[40px] text-center">
               <Ticket size={64} className="mx-auto text-slate-300 mb-6" />
               <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Nenhum modelo ativo</h3>
               <p className="text-slate-500 max-w-md mx-auto text-lg">Ainda não há templates de crachás disponibilizados para o congresso.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-16 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-6 flex flex-col items-center">
          
          {/* Botão de WhatsApp Integrado */}
          <div className="mb-12">
            <a 
              href="https://wa.me/553173211332?text=Olá! Estou no site da NexPrint e gostaria de tirar uma dúvida."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-6 px-10 py-6 bg-white border-2 border-slate-200 hover:border-brand-teal rounded-[32px] transition-all shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white text-brand-teal transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Dúvidas ou suporte?</p>
                <p className="text-2xl font-black text-slate-900 group-hover:text-brand-teal transition-colors">Fale no WhatsApp</p>
              </div>
              <div className="ml-4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </a>
          </div>

          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            NexPrint Hub de Identificação • {new Date().getFullYear()}
          </p>

          <Link 
            href="/admin" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-brand-teal transition-colors flex items-center gap-2"
          >
            <Layout size={12} /> Acessar Gestão
          </Link>
        </div>
      </footer>
    </div>
  );
}

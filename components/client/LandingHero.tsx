"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Sparkles, Layout } from "lucide-react";
import Link from "next/link";
import ParticleNetwork from "./ParticleNetwork";
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
    <div className="min-h-screen bg-brand-navy text-white selection:bg-brand-teal/20 overflow-x-hidden relative font-outfit">
      
      {/* Interactive Constellation Background */}
      <ParticleNetwork />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
        {/* Glows styled after reference */}
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-teal/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal/5 blur-[120px] mix-blend-screen" />
      </div>

      <nav className="relative z-50 px-8 h-28 flex items-center justify-between max-w-7xl mx-auto border-b border-[#0f2835]">
        <Link href="/" className="flex items-center gap-1 font-black text-4xl md:text-5xl tracking-tighter uppercase relative">
          <span className="text-gray-300">NEX</span>
          <span className="text-brand-teal text-glow-cyan">PRINT</span>
          <div className="w-2 h-2 rounded-full absolute -right-4 bottom-2 bg-brand-teal mt-1 ml-0.5 shadow-[0_0_15px_rgba(0,229,192,0.8)]" />
        </Link>
        
        <Link 
          href="/admin" 
          className="btn-submit-cyan px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2"
        >
          <Layout size={16} /> Acessar Gestão
        </Link>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-brand-teal/20 backdrop-blur-md">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-1"></div>
            Identificação Inteligente em Tempo Real
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8 uppercase">
            Congresso das <br className="hidden md:block" />
            <span className="text-brand-teal text-glow-cyan">Testemunhas de Jeová.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Imprima seu crachá com a impressora <span className="text-white">Sigma DS3</span>: 
            garanta cores vibrantes, nitidez absoluta e a máxima durabilidade.
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
            <div className="max-w-2xl mx-auto py-20 form-card-dark rounded-2xl text-center">
               <Ticket size={48} className="mx-auto text-brand-teal/50 mb-6" />
               <h3 className="text-xl font-bold text-gray-300 mb-2 uppercase tracking-tight">Nenhum modelo ativo</h3>
               <p className="text-gray-500 max-w-md mx-auto text-sm">Ainda não há templates de crachás disponibilizados para o congresso. Configure pelo painel administrativo.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-[#0f2835]">
        <div className="container mx-auto px-6 text-center">
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
             NexPrint Hub de Identificação • {new Date().getFullYear()}
           </p>
        </div>
      </footer>
    </div>
  );
}

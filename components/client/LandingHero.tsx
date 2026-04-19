"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Sparkles, Layout } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  slug: string;
}

interface LandingHeroProps {
  events: Event[];
}

export default function LandingHero({ events }: LandingHeroProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-brand-teal/20 overflow-x-hidden relative font-outfit">
      
      {/* Elementos de Fundo Estilo Premium/Espacial */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-teal/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/15 blur-[120px] mix-blend-screen" />
        {/* Grid animado e granulado */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <nav className="relative z-50 px-6 h-24 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-1 font-black text-2xl tracking-tighter">
          <span>Nex</span>
          <span className="text-brand-teal">Print</span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1 ml-0.5 shadow-[0_0_15px_rgba(0,229,192,0.8)]" />
        </Link>
        
        <Link 
          href="/admin" 
          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
        >
          <Layout size={16} /> Acessar Gestão
        </Link>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-brand-teal/20 backdrop-blur-md">
            <Sparkles size={14} /> Identificação Inteligente em Tempo Real
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
            Escolha seu <span className="text-brand-teal italic">Evento</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Selecione um evento ativo abaixo para configurar e imprimir o seu crachá profissional instantaneamente.
          </p>
        </motion.div>

        {/* Grid de Eventos */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={`/pedido/${event.slug}`}
                  className="group relative block bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-brand-teal hover:border-brand-teal transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-12">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-teal group-hover:bg-brand-navy group-hover:text-brand-teal transition-colors">
                        <Ticket size={28} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white group-hover:text-brand-navy mb-4 leading-tight uppercase tracking-tight">
                      {event.name}
                    </h3>
                    
                    <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-teal group-hover:text-brand-navy transition-colors">
                      Entrar no Evento <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Detalhe de fundo do card */}
                  <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-brand-teal/10 rounded-full blur-[40px] group-hover:bg-brand-navy/20 transition-all pointer-events-none" />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white/5 backdrop-blur-md rounded-[40px] border border-dashed border-white/10 text-center">
               <Ticket size={48} className="mx-auto text-slate-700 mb-6" />
               <h3 className="text-2xl font-black text-slate-400 mb-2 uppercase tracking-tight">Nenhum evento ativo</h3>
               <p className="text-slate-500 max-w-md mx-auto">Não encontramos eventos públicos no momento. Acesse o painel administrativo para configurar um novo evento.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
             NexPrint Hub de Identificação • {new Date().getFullYear()}
           </p>
        </div>
      </footer>
    </div>
  );
}

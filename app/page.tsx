"use client";

import React from "react";
import Link from "next/link";
import { 
  Printer, 
  ShieldCheck, 
  ArrowRight, 
  Layout, 
  Cpu, 
  Workflow,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-brand-navy selection:bg-brand-teal/30">
      {/* Header / Nav */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 font-black text-2xl tracking-tighter">
            <span>Nex</span>
            <span className="text-brand-teal">Print</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1 ml-0.5" />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-slate-400">
            <Link href="#features" className="hover:text-brand-navy transition-colors">Tecnologia</Link>
            <Link href="#solutions" className="hover:text-brand-navy transition-colors">Soluções</Link>
            <Link 
              href="/admin" 
              className="px-6 py-2 border-2 border-brand-navy text-brand-navy rounded-xl hover:bg-brand-navy hover:text-white transition-all transform hover:scale-105"
            >
              Acessar Gestão
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-brand-teal/20">
              <Sparkles size={14} className="animate-pulse" /> Solução SaaS para Eventos de Alta Performance
            </div>
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight text-balance text-brand-navy">
              Identificação em <span className="text-brand-teal italic relative">
                Tempo Real
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-brand-teal/20 -skew-x-12 rounded-full" />
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Gestão completa de crachás, automação de impressão via USB e controle total em uma interface única, premium e livre de atritos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/pedido/congresso-2025" 
                className="w-full sm:w-auto px-12 py-6 bg-brand-teal text-white font-black rounded-[28px] flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl shadow-brand-teal/30 hover:brightness-110"
              >
                Criar Crachá Agora <ArrowRight size={22} />
              </Link>
              <Link 
                href="/admin" 
                className="w-full sm:w-auto px-10 py-6 bg-white text-brand-navy font-black rounded-[28px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all border-2 border-slate-100"
              >
                Painel Admin <Layout size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl opacity-50" />
        </div>
      </header>

      {/* Features Simple */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[{ 
                icon: Printer, 
                title: "Impressão Automatizada", 
                desc: "Integração direta com hardware via agente local, sem necessidade de PDF manual ou drivers complexos." 
              },
              { 
                icon: Workflow, 
                title: "Fluxo Dinâmico", 
                desc: "Editor Visual (Studio) que permite visualização real do crachá e dos acessórios antes da confirmação." 
              },
              { 
                icon: ShieldCheck, 
                title: "Segurança de Dados", 
                desc: "Painel administrativo protegido por autenticação e logs detalhados de cada pedido realizado." 
              }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-brand-teal/5 rounded-2xl flex items-center justify-center text-brand-teal mb-8 group-hover:scale-110 transition-transform">
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-1 font-black text-xl tracking-tighter mb-4 grayscale opacity-50">
            <span>Nex</span>
            <span className="text-brand-teal">Print</span>
            <div className="w-1 h-1 rounded-full bg-brand-teal mt-1 ml-0.5" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            Identificação de Próxima Geração • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

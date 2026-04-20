"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, CreditCard, Clock } from "lucide-react";
import Image from "next/image";

interface Template {
  id: string;
  name: string;
  bgImageUrl: string;
  basePrice: number;
}

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => onSelect(template.id)}
            className="group cursor-pointer relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden hover:border-brand-teal/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500"
          >
            {/* Imagem de Fundo com Overlay */}
            <div className="aspect-[1.6/1] relative overflow-hidden">
              <Image
                src={template.bgImageUrl}
                alt={template.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Badge de Preço */}
              <div className="absolute top-6 right-6 px-4 py-2 bg-brand-teal text-brand-navy rounded-full font-black text-sm shadow-xl">
                {template.basePrice > 0 ? `R$ ${template.basePrice.toFixed(2)}` : "GRÁTIS"}
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white group-hover:text-brand-teal transition-colors">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-400">
                     <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest">
                        <Clock size={12} className="text-brand-teal" /> Envio Rápido
                     </span>
                     <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest">
                        <Check size={12} className="text-brand-teal" /> Alta Qualidade
                     </span>
                  </div>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="w-full flex items-center justify-between gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-brand-teal group-hover:border-brand-teal transition-all duration-300">
                <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-brand-navy transition-colors">
                  Criar este crachá
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-teal group-hover:bg-brand-navy flex items-center justify-center transition-all duration-300">
                   <ArrowRight size={16} className="text-brand-navy group-hover:text-brand-teal" />
                </div>
              </div>
            </div>

            {/* Efeito de Vidro na Borda Inferior */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-8 py-6 px-12 bg-slate-900/20 backdrop-blur-md rounded-full border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-teal">
              <CreditCard size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Pagamento Seguro</p>
              <p className="text-sm font-bold text-white leading-none">PIX ou Dinheiro</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-teal">
              <Check size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Qualidade NexPrint</p>
              <p className="text-sm font-bold text-white leading-none">Premium PVC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

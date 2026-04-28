"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, CreditCard, Clock } from "lucide-react";
import Image from "next/image";
import TemplateImage from "./TemplateImage";

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
            className="group cursor-pointer relative bg-white border-2 border-slate-200 rounded-[40px] overflow-hidden hover:border-brand-teal hover:shadow-2xl transition-all duration-300"
          >
            {/* Imagem de Fundo com Overlay */}
            <div className="aspect-[1011/638] relative overflow-hidden bg-slate-100 border-b-2 border-slate-100">
              <TemplateImage
                src={template.bgImageUrl}
                alt={template.name}
                fill
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">
                    {template.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-slate-500">
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      <Clock size={14} className="text-brand-teal" /> Rápido
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      <Check size={14} className="text-brand-teal" /> Qualidade
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-slate-100 text-slate-900 rounded-xl font-black text-xs md:text-sm shrink-0 shadow-sm border border-slate-200/50">
                  {template.basePrice > 0 ? `R$ ${template.basePrice.toFixed(2)}` : "GRÁTIS"}
                </div>
              </div>

              {/* Botão de Ação Gigante */}
              <div className="w-full flex items-center justify-center gap-4 p-6 bg-brand-teal hover:bg-brand-teal-dark rounded-2xl transition-all duration-300 shadow-lg shadow-brand-teal/20 mt-4 group-hover:scale-[1.02]">
                <span className="text-lg md:text-xl font-black uppercase tracking-widest text-slate-900">
                  Criar Este Crachá
                </span>
                <ArrowRight size={24} className="text-slate-900" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 md:mt-20 text-center pb-12 overflow-x-hidden">
        <div className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-12 py-8 md:py-6 px-8 md:px-16 bg-white rounded-3xl md:rounded-full border-2 border-slate-100 shadow-sm max-w-[90%] mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-teal shrink-0">
              <CreditCard size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Pagamento Seguro</p>
              <p className="text-base md:text-lg font-black text-slate-900 leading-none">PIX ou Dinheiro</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-teal shrink-0">
              <Check size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Qualidade NexPrint</p>
              <p className="text-base md:text-lg font-black text-slate-900 leading-none">Premium PVC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

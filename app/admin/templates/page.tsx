import React from "react";
import prisma from "@/lib/prisma";
import { Plus, Layout, Link as LinkIcon, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TemplateActions from "@/components/admin/TemplateActions";

export default async function TemplatesPage() {
  const templates = await prisma.badgeTemplate.findMany({
    include: { event: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-brand-navy">Templates e Eventos</h2>
        <Link href="/admin/templates/novo">
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-teal-dark transition-all">
            <Plus size={20} /> Novo Template
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm group hover:shadow-lg transition-all">
            {/* Preview da Arte */}
            <div className="aspect-[1.6/1] relative bg-slate-100 overflow-hidden border-b border-slate-50">
              <Image 
                src={template.bgImageUrl} 
                alt={template.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-navy/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${template.isActive ? "bg-brand-teal text-brand-navy" : "bg-slate-200 text-slate-500"}`}>
                  {template.isActive ? "Ativo" : "Pausado"}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0 flex-1 mr-2">
                  <h3 className="text-base font-black text-brand-navy truncate leading-tight">{template.name}</h3>
                  <p className="text-slate-400 text-[11px] truncate">{template.event.name}</p>
                </div>
                <div className="shrink-0 flex items-center">
                  <TemplateActions id={template.id} isActive={template.isActive} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-50">
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5">
                  <LinkIcon size={12} /> Link de Pedido
                </p>
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                  <code className="text-[11px] font-bold text-brand-navy truncate opacity-70">
                    {`/pedido/${template.event.slug}`}
                  </code>
                  <button className="p-1.5 text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-all">
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {templates.length === 0 && (
          <div className="col-span-full py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-100 text-center">
            <Layout size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">Nenhum template cadastrado para este evento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

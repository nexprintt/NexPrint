import React from "react";
import prisma from "@/lib/prisma";
import BadgePedidoClient from "@/components/client/BadgePedidoClient";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      templates: {
        include: {
          items: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    return notFound();
  }

  // Pega o template ativo, ou o mais recente como fallback
  const template =
    event.templates.find((t) => t.isActive) || event.templates[0];

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md">
          <div className="text-6xl mb-6">🎫</div>
          <h1 className="text-2xl font-black text-brand-navy mb-4">
            Evento em Configuração
          </h1>
          <p className="text-slate-500 mb-6 text-lg">
            O evento <strong>{event.name}</strong> ainda não possui um modelo
            de crachá ativo. Por favor, aguarde ou entre em contato com o
            organizador.
          </p>
        </div>
      </div>
    );
  }

  const config = JSON.parse(template.configJson);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-brand-teal/20 overflow-x-hidden relative flex flex-col font-outfit">
      
      {/* Elementos de Fundo Estilo Premium/Espacial */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-teal/10 blur-[120px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/15 blur-[120px] mix-blend-screen" />
        {/* Grid animado e granulado */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_60%,transparent_100%)]" />
      </div>

      <main className="relative z-10 w-full flex-grow px-4 py-8 md:py-12">
        <div className="flex flex-col items-center mb-10 text-center">
          {/* Logo Centralizado */}
          <div className="flex items-center gap-1 font-black text-xl tracking-wide mb-3 relative z-10">
            <span className="text-white">Nex</span>
            <span className="text-brand-teal">Print</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-teal ml-0.5 shadow-[0_0_10px_rgba(0,229,192,0.8)]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {event.name}
          </h1>
          
          <p className="mt-2 text-slate-400 text-xs font-medium max-w-xl">
             Siga os passos abaixo para garantir seu crachá oficial em alta performance.
          </p>
        </div>

        {/* Componente principal */}
        <BadgePedidoClient
          event={event}
          template={template}
          config={config}
        />

        {/* Botão de WhatsApp */}
        <div className="mt-16 mb-8 flex justify-center">
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-800 hover:bg-slate-900 transition-colors bg-slate-950 text-slate-400 text-xs font-medium"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-500">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Fale com a gente pelo WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}

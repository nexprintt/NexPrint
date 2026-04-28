"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BadgeCanvas from "../canvas/BadgeCanvas";

interface Member {
  name: string;
  congregation: string;
  selectedItems: string[];
}

interface PreviewCarouselProps {
  members: Member[];
  template: any;
  config: any;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export default function PreviewCarousel({
  members,
  template,
  config,
  isSubmitting,
  onSubmit,
  onBack,
}: PreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = members.length;
  const current = members[currentIndex];

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(total - 1, i + 1));

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < total - 1;

  return (
    <div className="space-y-6">

      {/* Título */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-1">
          {total > 1 ? "Seus Crachás" : "Seu Crachá"}
        </h2>
        <p className="text-lg text-slate-500">Confira como ficou e aprove para finalizar.</p>
      </div>

      {/* Indicador + nome — bloco principal, muito obvio */}
      {total > 1 && (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 text-center space-y-2">
          {/* Número grande */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-brand-teal flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-slate-900">{currentIndex + 1}</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Você está vendo
              </p>
              <p className="text-xl font-black text-slate-700 leading-tight">
                Crachá {currentIndex + 1} de {total}
              </p>
            </div>
          </div>

          {/* Nome em destaque */}
          <div className="pt-2 border-t-2 border-slate-200">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Nome neste crachá</p>
            <p className="text-2xl font-black text-slate-900">{current.name}</p>
            {current.congregation && (
              <p className="text-base text-slate-500 font-bold">{current.congregation}</p>
            )}
          </div>

          {/* Instrução de navegação */}
          {hasNext && (
            <div className="pt-2 border-t-2 border-slate-200">
              <p className="text-sm font-bold text-brand-teal">
                👉 Toque na seta verde à direita para ver o próximo crachá
              </p>
            </div>
          )}
          {!hasNext && (
            <div className="pt-2 border-t-2 border-slate-200">
              <p className="text-sm font-bold text-green-600">
                ✅ Você viu todos os crachás! Pode aprovar abaixo.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Se tiver só 1 crachá, mostra o nome de forma mais simples */}
      {total === 1 && (
        <div className="text-center space-y-1">
          <p className="text-2xl md:text-3xl font-black text-slate-900">{current.name}</p>
          {current.congregation && (
            <p className="text-lg text-slate-500 font-bold">{current.congregation}</p>
          )}
        </div>
      )}

      {/* Crachá centralizado sem vão — responsivo para celular */}
      <div className="flex justify-center w-full overflow-hidden">
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-100 max-w-full">
          <BadgeCanvas
            key={currentIndex}
            name={current.name}
            congregation={current.congregation}
            photoUrl={null}
            bgImageUrl={template.bgImageUrl}
            orientation={config?.orientation || "landscape"}
            config={config}
            interactive={false}
          />
        </div>
      </div>

      {/* Setas abaixo do crachá */}
      {total > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            disabled={!hasPrev}
            aria-label="Crachá anterior"
            className={`flex-1 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-2 md:gap-3 font-black text-lg md:text-xl border-4 transition-all ${
              hasPrev
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95"
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ArrowLeft size={24} strokeWidth={3} className="shrink-0" />
            <span>Anterior</span>
          </button>

          <button
            onClick={next}
            disabled={!hasNext}
            aria-label="Próximo crachá"
            className={`flex-1 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-2 md:gap-3 font-black text-lg md:text-xl border-4 transition-all ${
              hasNext
                ? "bg-brand-teal border-brand-teal text-slate-900 hover:opacity-80 active:scale-95"
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
          >
            <span>Próximo</span>
            <ArrowRight size={24} strokeWidth={3} className="shrink-0" />
          </button>
        </div>
      )}

      {/* Bolinhas de indicação */}
      {total > 1 && (
        <div className="flex justify-center gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ver crachá ${i + 1}`}
              className={`rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 h-4 bg-brand-teal"
                  : "w-4 h-4 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Dica visual se ainda há próximos */}
      {hasNext && (
        <p className="text-center text-slate-400 font-bold text-sm animate-pulse">
          👉 Toque na seta para ver o próximo crachá
        </p>
      )}

      {/* Botões de ação */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-5 md:py-7 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-sm md:text-xl flex items-center justify-center gap-2 md:gap-3 transition-all shadow-2xl shadow-green-500/30 disabled:opacity-50 active:scale-[0.98] px-4"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Enviando...</span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="truncate">APROVAR E IR PARA O WHATSAPP</span>
            </>
          )}
        </button>

        <button
          onClick={onBack}
          className="w-full py-3 md:py-4 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm md:text-base"
        >
          <ArrowLeft size={18} className="shrink-0" /> Voltar ao resumo
        </button>
      </div>
    </div>
  );
}

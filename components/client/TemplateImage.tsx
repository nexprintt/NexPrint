"use client";

import React, { useEffect, useState } from "react";

interface TemplateImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export default function TemplateImage({ src, alt, className = "", fill = false }: TemplateImageProps) {
  const isPdf = src.toLowerCase().endsWith(".pdf") || src.startsWith("data:application/pdf");
  const [pdfImageUrl, setPdfImageUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isPdf) return;
    let cancelled = false;

    const renderPdf = async () => {
      try {
        setHasError(false);
        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) return;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        let pdfParams: any;
        if (src.startsWith("data:application/pdf;base64,")) {
          const base64Content = src.split(",")[1];
          const binaryString = window.atob(base64Content);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          pdfParams = { data: bytes };
        } else {
          pdfParams = { url: src };
        }

        const pdf = await pdfjsLib.getDocument(pdfParams).promise;
        const page = await pdf.getPage(1);

        // Mesma lógica de rotação do BadgeCanvas:
        // Se o PDF é portrait mas queremos landscape, rotaciona 90°
        const originalViewport = page.getViewport({ scale: 1 });
        const isPdfPortrait = originalViewport.height > originalViewport.width;
        const needsRotation = isPdfPortrait; // thumbnail sempre landscape

        const scale = 1.5;
        const viewport = page.getViewport({ scale, rotation: needsRotation ? 90 : 0 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        if (!cancelled) {
          setPdfImageUrl(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        console.error("Erro ao renderizar PDF thumbnail:", err);
        if (!cancelled) {
          setHasError(true);
        }
      }
    };

    renderPdf();
    return () => { cancelled = true; };
  }, [src, isPdf]);

  if (isPdf) {
    if (hasError) {
      return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50 p-6 ${fill ? "absolute inset-0" : ""}`}>
          <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-3 shadow-inner">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest text-center">{alt}</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Modelo PDF • Clique para prosseguir</p>
        </div>
      );
    }

    if (!pdfImageUrl) {
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-slate-800 ${fill ? "absolute inset-0" : ""}`}>
          <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent animate-spin rounded-full" />
        </div>
      );
    }

    return (
      <img
        src={pdfImageUrl}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : undefined}
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      style={fill ? { position: "absolute", inset: 0 } : undefined}
      loading="lazy"
    />
  );
}

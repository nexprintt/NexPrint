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

  useEffect(() => {
    if (!isPdf) return;
    let cancelled = false;

    const renderPdf = async () => {
      try {
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

        const pdf = await pdfjsLib.getDocument(src).promise;
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
      }
    };

    renderPdf();
    return () => { cancelled = true; };
  }, [src, isPdf]);

  if (isPdf) {
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

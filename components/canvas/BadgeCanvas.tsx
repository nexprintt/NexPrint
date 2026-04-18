"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricText, Rect } from "fabric";
import { Minus, Plus, Type, Maximize2, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeCanvasProps {
  name: string;
  congregation: string;
  photoUrl?: string | null;
  bgImageUrl: string;
  orientation?: "landscape" | "portrait";
  config: {
    namePos?: { x: number; y: number; fontSize: number; fontFamily: string; color: string; maxWidth?: number };
    congPos?: { x: number; y: number; fontSize: number; fontFamily: string; color: string; maxWidth?: number };
    photoPos?: { x: number; y: number; width: number; height: number; shape: "circle" | "square" | "portrait" };
    orientation?: string;
  };
  onUpdateConfig?: (config: any) => void;
  interactive?: boolean;
  lockVertical?: boolean; // Trava o eixo Y (Cima/Baixo)
  onReady?: (dataUrl: string) => void; // Gatilho para captura automática
}

const GOOGLE_FONTS = [
  "Inter",
  "Montserrat",
  "Open Sans",
  "Roboto",
  "Poppins",
  "Nunito",
  "Raleway",
  "Lato",
  "Oswald",
  "Ubuntu",
  "Playfair Display",
  "Merriweather"
];

// Injeta o CSS da fonte dinamicamente se ainda não existir
const loadGoogleFont = (fontName: string) => {
  const fontId = `google-font-${fontName.replace(/\s+/g, '-')}`;
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700;800;900&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};

export default function BadgeCanvas({
  name,
  congregation,
  photoUrl,
  bgImageUrl,
  orientation = "landscape",
  config,
  onUpdateConfig,
  interactive = false,
  lockVertical = false,
  onReady,
}: BadgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  
  const nameObjRef = useRef<FabricText | null>(null);
  const congObjRef = useRef<FabricText | null>(null);

  // Estados para a Toolbar de Edição
  const [selectedObjectId, setSelectedObjectId] = useState<"name" | "cong" | null>(null);
  const [currentFont, setCurrentFont] = useState("Inter");
  const [currentSize, setCurrentSize] = useState(14);
  const [fontsLoaded, setFontsLoaded] = useState<string[]>(["Inter"]); // Para forçar renderização após carregar

  const BASE_WIDTH = 1011;
  const BASE_HEIGHT = 638;
  const isPortrait = orientation === "portrait";

  const displayWidth = isPortrait ? 319 : 505;
  const displayHeight = isPortrait ? 505 : 319;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: displayWidth,
      height: displayHeight,
      backgroundColor: "#ffffff",
      enableRetinaScaling: true, 
      selection: false,
    });
    fabricRef.current = canvas;

    const scaleFactorX = displayWidth / BASE_WIDTH;
    const scaleFactorY = displayHeight / BASE_HEIGHT;
    const centerX = displayWidth / 2;

    // Pré-carregar fontes que estão no config
    if (config?.namePos?.fontFamily) loadGoogleFont(config.namePos.fontFamily);
    if (config?.congPos?.fontFamily) loadGoogleFont(config.congPos.fontFamily);

    FabricImage.fromURL(bgImageUrl, { crossOrigin: "anonymous" }).then((img) => {
      if (!canvas || canvas.destroyed) return;

      img.set({
        left: 0, top: 0, originX: "left", originY: "top",
        scaleX: displayWidth / img.width!, scaleY: displayHeight / img.height!,
        selectable: false, evented: false,
      });
      canvas.add(img);
      canvas.sendObjectToBack(img);

      // --- TEXTOS ---
      const defaultFontSize = 14; 
      
      const nameX = config?.namePos?.x ? (config.namePos.x * scaleFactorX) : centerX;
      const nameY = config?.namePos?.y ? (config.namePos.y * scaleFactorY) : (isPortrait ? displayHeight * 0.62 : displayHeight * 0.72);
      const nameFont = config?.namePos?.fontFamily || "Inter";
      const nameSize = config?.namePos?.fontSize ? (config.namePos.fontSize * scaleFactorX) : defaultFontSize;

      const nameText = new FabricText(name || "NOME DO PARTICIPANTE", {
        left: nameX, top: nameY,
        fontFamily: nameFont, fontWeight: "800", fontSize: nameSize,
        fill: config?.namePos?.color || "#000000", textAlign: "center",
        originX: "center", originY: "center",
        selectable: interactive, hasControls: false, objectCaching: false,
        lockRotation: true, lockScalingX: true, lockScalingY: true, lockMovementY: lockVertical,
        hoverCursor: interactive ? "grab" : "default", moveCursor: interactive ? "grabbing" : "default",
      });
      // @ts-ignore
      nameText.id = "name";
      nameObjRef.current = nameText;
      canvas.add(nameText);

      const congX = config?.congPos?.x ? (config.congPos.x * scaleFactorX) : centerX;
      const congY = config?.congPos?.y ? (config.congPos.y * scaleFactorY) : (isPortrait ? displayHeight * 0.78 : displayHeight * 0.87);
      const congFont = config?.congPos?.fontFamily || "Inter";
      const congSize = config?.congPos?.fontSize ? (config.congPos.fontSize * scaleFactorX) : defaultFontSize;

      const congText = new FabricText(congregation || "CONGREGAÇÃO", {
        left: congX, top: congY,
        fontFamily: congFont, fontWeight: "800", fontSize: congSize,
        fill: config?.congPos?.color || "#000000", textAlign: "center",
        originX: "center", originY: "center",
        selectable: interactive, hasControls: false, objectCaching: false,
        lockRotation: true, lockScalingX: true, lockScalingY: true, lockMovementY: lockVertical,
        hoverCursor: interactive ? "grab" : "default", moveCursor: interactive ? "grabbing" : "default",
      });
      // @ts-ignore
      congText.id = "cong";
      congObjRef.current = congText;
      canvas.add(congText);

      // --- EVENTOS INTERATIVOS E SELEÇÃO ---
      if (interactive) {
        
        // Seleção para a Toolbar
        const handleSelection = (e: any) => {
          const obj = e.selected?.[0] || e.target;
          if (obj && (obj.id === "name" || obj.id === "cong")) {
            setSelectedObjectId(obj.id);
            setCurrentFont(obj.fontFamily || "Inter");
            setCurrentSize(Math.round(obj.fontSize || defaultFontSize));
            
            // Highlight
            obj.set({ shadow: { color: "rgba(15, 23, 42, 0.4)", blur: 8, offsetX: 0, offsetY: 4 } as any });
            canvas.renderAll();
          } else {
            setSelectedObjectId(null);
            nameText.set({ shadow: null });
            congText.set({ shadow: null });
            canvas.renderAll();
          }
        };

        canvas.on("selection:created", handleSelection);
        canvas.on("selection:updated", handleSelection);
        canvas.on("selection:cleared", () => handleSelection({}));

        // Limitações de Movimento (Só esquerda/direita e trava de bordas)
        canvas.on("object:moving", (e) => {
          const obj = e.target;
          if (!obj) return;
          
          // Snap Magnético no Centro
          if (Math.abs(obj.left! - centerX) < 12) { 
            obj.set({ left: centerX });
          }

          // Bound limits para não jogar fora da tela
          const w2 = (obj.width! * (obj.scaleX || 1)) / 2;
          if (obj.left! - w2 < 10) obj.set({ left: w2 + 10 });
          if (obj.left! + w2 > displayWidth - 10) obj.set({ left: displayWidth - w2 - 10 });
        });

        // Atualização de Config no Final do Arraste
        canvas.on("mouse:up", () => {
          if (!onUpdateConfig) return;
          const invScaleX = BASE_WIDTH / displayWidth;
          const invScaleY = BASE_HEIGHT / displayHeight;
          
          // Aplica fisicamente a escala ajustada no corner do objeto como tamanho real de Fonte
          const newNameSize = (nameText.fontSize || defaultFontSize) * (nameText.scaleX || 1);
          const newCongSize = (congText.fontSize || defaultFontSize) * (congText.scaleX || 1);
          
          nameText.set({ fontSize: newNameSize, scaleX: 1, scaleY: 1 });
          congText.set({ fontSize: newCongSize, scaleX: 1, scaleY: 1 });
          canvas.renderAll();

          onUpdateConfig({
            ...config,
            namePos: { 
              ...(config.namePos || {}),
              x: Math.round(nameText.left! * invScaleX), 
              y: Math.round(nameText.top! * invScaleY), 
              fontSize: Math.round(newNameSize * invScaleX), 
              color: nameText.fill 
            },
            congPos: { 
              ...(config.congPos || {}),
              x: Math.round(congText.left! * invScaleX), 
              y: Math.round(congText.top! * invScaleY), 
              fontSize: Math.round(newCongSize * invScaleX), 
              color: congText.fill 
            }
          });
        });
      }

      canvas.renderAll();

      // Se for modo de captura (lote), dispara o onReady após um tempinho para as fontes assentarem
      if (onReady) {
        setTimeout(() => {
          const dataUrl = canvas.toDataURL({
            format: "png",
            multiplier: 2, // Garante 300dpi+ para a Sigma DS3
          });
          onReady(dataUrl);
        }, 500);
      }
    });

    return () => {
      canvas.dispose().catch(() => {});
      fabricRef.current = null;
      nameObjRef.current = null;
      congObjRef.current = null;
    };
  }, [bgImageUrl, orientation, interactive, displayWidth, displayHeight]);

  // Atualização em tempo real de Nomes e Auto-Shrink (sem re-init)
  useEffect(() => {
    const canvas = fabricRef.current;
    const nameObj = nameObjRef.current;
    const congObj = congObjRef.current;

    if (canvas && nameObj && congObj) {
      nameObj.set({ text: name || "NOME DO PARTICIPANTE" });
      congObj.set({ text: congregation || "CONGREGAÇÃO" });
      
      const defaultSize = 14;
      if (!config?.namePos) {
        nameObj.set({ left: displayWidth / 2, fontSize: defaultSize });
        setCurrentSize(defaultSize);
      }
      if (!config?.congPos) {
        congObj.set({ left: displayWidth / 2, fontSize: defaultSize });
      }

      nameObj.setCoords();
      congObj.setCoords();
      canvas.renderAll();
    }
  }, [name, congregation, config, displayWidth]);

  // Força re-render das fontes quando carregarem da internet (mata o bug de ter que clicar pra fonte mudar)
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        if (fabricRef.current) fabricRef.current.renderAll();
      });
    }
  }, []);

  // Ações da Toolbar
  const updateSelectedObject = (updates: any) => {
    if (!fabricRef.current || !selectedObjectId) return;
    const obj = selectedObjectId === "name" ? nameObjRef.current : congObjRef.current;
    if (obj) {
      obj.set(updates);
      obj.setCoords(); // PREVINE CLIPPING DOS CONTORNOS AO MUDAR A FONTE!
      fabricRef.current.renderAll();
      
      // Forçar salvar ao mexer na toolbar
      if (onUpdateConfig) {
        const invScaleX = BASE_WIDTH / displayWidth;
        const invScaleY = BASE_HEIGHT / displayHeight;
        const nameText = nameObjRef.current!;
        const congText = congObjRef.current!;
        
        onUpdateConfig({
          ...config,
          namePos: { 
            x: Math.round(nameText.left! * invScaleX), y: Math.round(nameText.top! * invScaleY), 
            fontSize: Math.round((nameText.fontSize || 14) * invScaleX), 
            fontFamily: nameText.fontFamily, color: nameText.fill 
          },
          congPos: { 
            x: Math.round(congText.left! * invScaleX), y: Math.round(congText.top! * invScaleY), 
            fontSize: Math.round((congText.fontSize || 14) * invScaleX), 
            fontFamily: congText.fontFamily, color: congText.fill 
          }
        });
      }
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    loadGoogleFont(font);
    setCurrentFont(font);
    // Timeout para dar tempo de renderizar a fonte se não estiver cached
    setTimeout(() => {
      updateSelectedObject({ fontFamily: font });
    }, 150);
  };

  const alterSize = (delta: number) => {
    const newSize = Math.max(8, Math.min(36, currentSize + delta)); // Limites de 8 a 36 no preview
    setCurrentSize(newSize);
    updateSelectedObject({ fontSize: newSize });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Canvas Principal */}
      <div 
        className="relative shadow-2xl rounded-[32px] overflow-hidden bg-white border border-slate-200 group transition-all duration-500 hover:shadow-brand-teal/10" 
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
      >
        <canvas 
          ref={canvasRef} 
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Painel de Controle (Aparece ao selecionar algo no crachá) */}
      {interactive && selectedObjectId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl px-8 py-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-brand-teal/20 flex flex-nowrap gap-6 items-center w-fit mt-4"
        >
          <div className="flex items-center gap-5 w-full justify-center">
            {/* Combo Font */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2.5 rounded-full text-brand-teal shadow-inner">
                <Type size={16} strokeWidth={3} />
              </div>
              <select 
                className="text-sm font-black text-white bg-transparent outline-none cursor-pointer hover:text-brand-teal transition-colors"
                value={currentFont}
                onChange={handleFontChange}
              >
                {GOOGLE_FONTS.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                ))}
              </select>
            </div>

            {/* Separator */}
            <div className="w-[1px] h-6 bg-slate-700"></div>

            {/* Combo Size */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1.5 rounded-full shadow-inner border border-white/5">
              <button 
                onClick={() => alterSize(-1)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-300 transition-all font-black"
                title="Diminuir"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="text-sm font-black text-white w-6 text-center">{currentSize}</span>
              <button 
                onClick={() => alterSize(1)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 text-brand-teal transition-all font-black"
                title="Aumentar"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>

            {/* Separator */}
            <div className="w-[1px] h-6 bg-slate-700"></div>

            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-teal flex items-center gap-2">
              <MousePointer2 size={12} strokeWidth={3} /> {selectedObjectId === "name" ? "NOME" : "CONGREGAÇÃO"}
            </div>
          </div>
        </motion.div>
      )}

      {interactive && !selectedObjectId && (
        <div className="mt-4 bg-slate-900/40 px-8 py-4 rounded-full border border-dashed border-slate-600 text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 w-fit animate-pulse flex items-center justify-center gap-4">
          <div className="bg-white p-2 rounded-xl text-brand-teal drop-shadow-md">
            <MousePointer2 size={14} strokeWidth={3} />
          </div>
          <span>Clique no nome ou congregação para personalizar</span>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricText, Rect } from "fabric";
import { Minus, Plus, Type, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeCanvasProps {
  name: string;
  congregation: string;
  photoUrl?: string | null;
  bgImageUrl: string;
  orientation?: "landscape" | "portrait";
  config: {
    namePos?: { x: number; y: number; fontSize: number; fontFamily: string; color: string; fontWeight?: string; maxWidth?: number };
    congPos?: { x: number; y: number; fontSize: number; fontFamily: string; color: string; fontWeight?: string; maxWidth?: number };
    photoPos?: { x: number; y: number; width: number; height: number; shape: "circle" | "square" | "portrait" };
    orientation?: string;
    previewName?: string;
    previewCongregation?: string;
    maxCharsName?: number;
    maxCharsCong?: number;
  };
  onUpdateConfig?: (config: any) => void;
  interactive?: boolean;
  lockVertical?: boolean;
  onReady?: (dataUrl: string) => void;
  width?: number;
  height?: number;
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
  width: propWidth,
  height: propHeight,
}: BadgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);

  const nameObjRef = useRef<FabricText | null>(null);
  const congObjRef = useRef<FabricText | null>(null);

  // Estados para a Toolbar de Edição
  const [selectedObjectId, setSelectedObjectId] = useState<"name" | "cong" | null>(null);
  const [currentFont, setCurrentFont] = useState("Inter");
  const [currentSize, setCurrentSize] = useState(14);
  const [isBold, setIsBold] = useState(true);

  const BASE_WIDTH = 1011;
  const BASE_HEIGHT = 638;
  const isPortrait = orientation === "portrait";

  // Responsividade absoluta para Mobile
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 550;
  // Subtrai 100px para garantir que compensa todos os paddings (p-6) e bordas do layout pai
  const maxAllowedWidth = isMobile ? windowWidth - 100 : 505; 

  const displayWidth = propWidth || (isPortrait
    ? Math.min(319, maxAllowedWidth)
    : Math.min(505, maxAllowedWidth));

  const displayHeight = propHeight || (isPortrait
    ? (displayWidth / 319) * 505
    : (displayWidth / 505) * 319);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: displayWidth,
      height: displayHeight,
      backgroundColor: "transparent",
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

    const isPdf = bgImageUrl?.startsWith("data:application/pdf") || bgImageUrl?.toLowerCase().endsWith(".pdf");

    const setupTextsAndEvents = () => {
      if (!canvas || canvas.destroyed) return;

      // --- TEXTOS ---
      const defaultFontSize = 14;

      const nameFont = config?.namePos?.fontFamily || "Inter";
      const nameSize = config?.namePos?.fontSize ? (config.namePos.fontSize * scaleFactorX) : (80 * scaleFactorX);
      const nameColor = config?.namePos?.color || "#000000";

      // Segurança: Se estiver fora do canvas, traz para o centro
      const finalNameX = (config?.namePos?.x && config.namePos.x < BASE_WIDTH) ? (config.namePos.x * scaleFactorX) : centerX;
      const finalNameY = (config?.namePos?.y && config.namePos.y < BASE_HEIGHT) ? (config.namePos.y * scaleFactorY) : (isPortrait ? displayHeight * 0.62 : displayHeight * 0.72);

      const nameText = new FabricText(name || config?.previewName || "NOME DO PARTICIPANTE", {
        left: finalNameX, top: finalNameY,
        fontFamily: `${nameFont}, sans-serif`, fontWeight: config?.namePos?.fontWeight || "900", fontSize: nameSize,
        fill: nameColor, textAlign: "center",
        originX: "center", originY: "center",
        selectable: interactive, hasControls: false, objectCaching: false,
        lockRotation: true, lockScalingX: true, lockScalingY: true, lockMovementY: lockVertical,
        hoverCursor: interactive ? "grab" : "default", moveCursor: interactive ? "grabbing" : "default",
      });
      nameText.set({ data: { id: "name" } });
      nameObjRef.current = nameText;
      canvas.add(nameText);

      const congFont = config?.congPos?.fontFamily || "Inter";
      const congSize = config?.congPos?.fontSize ? (config.congPos.fontSize * scaleFactorX) : (50 * scaleFactorX);
      const congColor = config?.congPos?.color || "#000000";

      const finalCongX = (config?.congPos?.x && config.congPos.x < BASE_WIDTH) ? (config.congPos.x * scaleFactorX) : centerX;
      const finalCongY = (config?.congPos?.y && config.congPos.y < BASE_HEIGHT) ? (config.congPos.y * scaleFactorY) : (isPortrait ? displayHeight * 0.78 : displayHeight * 0.87);

      const congText = new FabricText(congregation || config?.previewCongregation || "CONGREGAÇÃO", {
        left: finalCongX, top: finalCongY,
        fontFamily: `${congFont}, sans-serif`, fontWeight: config?.congPos?.fontWeight || "700", fontSize: congSize,
        fill: congColor, textAlign: "center",
        originX: "center", originY: "center",
        selectable: interactive, hasControls: false, objectCaching: false,
        lockRotation: true, lockScalingX: true, lockScalingY: true, lockMovementY: lockVertical,
        hoverCursor: interactive ? "grab" : "default", moveCursor: interactive ? "grabbing" : "default",
      });
      congText.set({ data: { id: "cong" } });
      congObjRef.current = congText;
      canvas.add(congText);

      // --- EVENTOS INTERATIVOS E SELEÇÃO ---
      if (interactive) {
        const handleSelection = (e: any) => {
          const obj = e.selected?.[0] || e.target;
          const objId = obj?.get("data")?.id;

          if (objId === "name" || objId === "cong") {
            setSelectedObjectId(objId as any);
            setCurrentFont(obj.fontFamily || "Inter");
            setCurrentSize(Math.round(obj.fontSize || defaultFontSize));
            setIsBold(obj.fontWeight === "900" || obj.fontWeight === "bold" || obj.fontWeight === "800");
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

        canvas.on("object:moving", (e) => {
          const obj = e.target;
          if (!obj) return;
          if (Math.abs(obj.left! - centerX) < 12) obj.set({ left: centerX });
          const w2 = (obj.width! * (obj.scaleX || 1)) / 2;
          if (obj.left! - w2 < 10) obj.set({ left: w2 + 10 });
          if (obj.left! + w2 > displayWidth - 10) obj.set({ left: displayWidth - w2 - 10 });
        });

        canvas.on("mouse:up", () => {
          if (!onUpdateConfig) return;
          const invScaleX = BASE_WIDTH / displayWidth;
          const invScaleY = BASE_HEIGHT / displayHeight;
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
              fontFamily: nameText.fontFamily?.split(',')[0], // Remove fallback para salvar
              fontWeight: nameText.fontWeight,
              color: nameText.fill
            },
            congPos: {
              ...(config.congPos || {}),
              x: Math.round(congText.left! * invScaleX),
              y: Math.round(congText.top! * invScaleY),
              fontSize: Math.round(newCongSize * invScaleX),
              fontFamily: congText.fontFamily?.split(',')[0], // Remove fallback para salvar
              fontWeight: congText.fontWeight,
              color: congText.fill
            }
          });
        });
      }

      // --- FOTO DO PARTICIPANTE ---
      if (photoUrl) {
        FabricImage.fromURL(photoUrl, { crossOrigin: "anonymous" }).then((photoImg) => {
          if (!canvas || canvas.destroyed) return;

          const photoCfg = config?.photoPos || {
            x: isPortrait ? BASE_WIDTH * 0.5 : BASE_WIDTH * 0.15,
            y: isPortrait ? BASE_HEIGHT * 0.35 : BASE_HEIGHT * 0.5,
            width: 250,
            height: 250,
            shape: "circle"
          };

          const pWidth = photoCfg.width * scaleFactorX;
          const pHeight = photoCfg.height * scaleFactorY;
          const pScaleX = pWidth / photoImg.width!;
          const pScaleY = pHeight / photoImg.height!;
          const pRenderScale = Math.max(pScaleX, pScaleY);

          photoImg.set({
            left: photoCfg.x * scaleFactorX,
            top: photoCfg.y * scaleFactorY,
            originX: "center",
            originY: "center",
            scaleX: pRenderScale,
            scaleY: pRenderScale,
            selectable: interactive,
            hasControls: false,
            hoverCursor: interactive ? "grab" : "default",
            moveCursor: interactive ? "grabbing" : "default",
          });

          // Clip se for círculo
          if (photoCfg.shape === "circle") {
            const clipPath = new Rect({
              left: photoImg.left,
              top: photoImg.top,
              width: pWidth,
              height: pHeight,
              originX: "center",
              originY: "center",
              rx: pWidth / 2,
              ry: pHeight / 2,
            });
            photoImg.set({ clipPath });
          }

          canvas.add(photoImg);
          // Manter fotos atrás dos textos mas na frente do fundo
          canvas.moveObjectTo(photoImg, 1);
          canvas.renderAll();
        }).catch(err => console.error("Erro ao carregar foto:", err));
      }

      canvas.renderAll();

      if (onReady) {
        setTimeout(() => {
          const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
          onReady(dataUrl);
        }, 500);
      }
    };

    const loadBgImage = async (url: string) => {
      try {
        let finalUrl = url;

        if (isPdf) {
          if (!(window as any).pdfjsLib) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }

          const pdfjsLib = (window as any).pdfjsLib;
          if (pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            const pdf = await pdfjsLib.getDocument(url).promise;
            const page = await pdf.getPage(1);

            const originalViewport = page.getViewport({ scale: 1 });
            const isPdfPortrait = originalViewport.height > originalViewport.width;
            const needsRotation = (isPortrait && !isPdfPortrait) || (!isPortrait && isPdfPortrait);

            // Ajuste de escala para alta definição
            const scale = 2.5;
            const viewport = page.getViewport({ scale, rotation: needsRotation ? 90 : 0 });

            const tempCanvas = document.createElement('canvas');
            const context = tempCanvas.getContext('2d')!;
            tempCanvas.width = viewport.width;
            tempCanvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport }).promise;
            finalUrl = tempCanvas.toDataURL("image/png");
          } else {
            throw new Error("PDF.js not found");
          }
        }

        // AGORA SIM: Só chamamos o Fabric quando temos um PNG/JPG garantido
        const isExternal = finalUrl.startsWith("http://") || finalUrl.startsWith("https://");
        const img = await FabricImage.fromURL(finalUrl, isExternal ? { crossOrigin: "anonymous" } : {});
        if (!canvas || canvas.destroyed) return;

        // Escalonamento inteligente: Stretch leve se a proporção for parecida, senão Cover
        const imgRatio = img.width! / img.height!;
        const canvasRatio = displayWidth / displayHeight;
        const ratioDiff = Math.abs(imgRatio - canvasRatio);

        // Se a diferença for pequena (< 5%), esticamos para não cortar nada
        // Se for grande, usamos Cover para preencher o crachá
        const scaleX = displayWidth / img.width!;
        const scaleY = displayHeight / img.height!;
        const useStretch = ratioDiff < 0.05;

        img.set({
          left: displayWidth / 2,
          top: displayHeight / 2,
          originX: "center",
          originY: "center",
          scaleX: useStretch ? scaleX : Math.max(scaleX, scaleY),
          scaleY: useStretch ? scaleY : Math.max(scaleX, scaleY),
          selectable: false,
          evented: false,
        });

        canvas.add(img);
        canvas.sendObjectToBack(img);
        setupTextsAndEvents();
      } catch (err) {
        console.error("Erro ao carregar fundo:", err);
        setupTextsAndEvents();
      }
    };

    loadBgImage(bgImageUrl);

    return () => {
      canvas.dispose().catch(() => { });
      fabricRef.current = null;
      nameObjRef.current = null;
      congObjRef.current = null;
    };
  }, [bgImageUrl, photoUrl, orientation, interactive, displayWidth, displayHeight]);

  // Atualização em tempo real de Nomes, Cores, Fontes e Auto-Shrink (sem re-init)
  useEffect(() => {
    const canvas = fabricRef.current;
    const nameObj = nameObjRef.current;
    const congObj = congObjRef.current;

    if (canvas && nameObj && congObj) {
      // Carregar fontes se mudarem no config via sidebar ou inicialização
      const nameFont = config?.namePos?.fontFamily || "Inter";
      const congFont = config?.congPos?.fontFamily || "Inter";
      
      loadGoogleFont(nameFont);
      loadGoogleFont(congFont);

      nameObj.set({
        text: name || config?.previewName || "NOME DO PARTICIPANTE",
        fill: config?.namePos?.color || "#000000",
        fontWeight: config?.namePos?.fontWeight || "900",
        fontFamily: `${nameFont}, sans-serif`
      });
      congObj.set({
        text: congregation || config?.previewCongregation || "CONGREGAÇÃO",
        fill: config?.congPos?.color || "#000000",
        fontWeight: config?.congPos?.fontWeight || "700",
        fontFamily: `${congFont}, sans-serif`
      });

      const defaultSize = 14;
      if (!config?.namePos) {
        nameObj.set({ left: displayWidth / 2, fontSize: defaultSize });
        setCurrentSize(defaultSize);
      }
      if (!config?.congPos) {
        congObj.set({ left: displayWidth / 2, fontSize: defaultSize });
      }

      // Aplicar Auto-Shrink de Segurança (Máximo 85% da largura)
      const maxWidth = displayWidth * 0.85;

      const shrinkTextToFit = (textObj: FabricText, maxW: number) => {
        if (!textObj) return;
        let fontSize = textObj.fontSize || 12;
        const minFontSize = 6;
        while (textObj.width! > maxW && fontSize > minFontSize) {
          fontSize -= 0.5;
          textObj.set({ fontSize });
        }
      };

      shrinkTextToFit(nameObj, maxWidth);
      shrinkTextToFit(congObj, maxWidth);

      nameObj.setCoords();
      congObj.setCoords();
      
      // Sincronizar o estado local da toolbar caso o config mude externamente
      if (selectedObjectId) {
        const activeObj = selectedObjectId === "name" ? nameObj : congObj;
        setCurrentSize(Math.round(activeObj.fontSize || 14));
        setCurrentFont(activeObj.fontFamily?.split(',')[0].replace(/['"]/g, '') || "Inter");
        setIsBold(activeObj.fontWeight === "900" || activeObj.fontWeight === "bold" || activeObj.fontWeight === "800");
      }

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
            fontFamily: nameText.fontFamily?.split(',')[0].replace(/['"]/g, ''), 
            fontWeight: nameText.fontWeight, color: nameText.fill
          },
          congPos: {
            x: Math.round(congText.left! * invScaleX), y: Math.round(congText.top! * invScaleY),
            fontSize: Math.round((congText.fontSize || 14) * invScaleX),
            fontFamily: congText.fontFamily?.split(',')[0].replace(/['"]/g, ''), 
            fontWeight: congText.fontWeight, color: congText.fill
          }
        });
      }
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    loadGoogleFont(font);
    setCurrentFont(font);
    
    // Aguarda a fonte carregar de verdade no navegador antes de aplicar ao canvas
    if (typeof document !== 'undefined' && 'fonts' in document) {
      (document.fonts as any).load(`1em "${font}"`).then(() => {
        updateSelectedObject({ fontFamily: `${font}, sans-serif` });
      }).catch(() => {
        // Fallback caso falhe o carregamento específico
        updateSelectedObject({ fontFamily: `${font}, sans-serif` });
      });
    } else {
      updateSelectedObject({ fontFamily: `${font}, sans-serif` });
    }
  };

  const alterSize = (delta: number) => {
    const newSize = Math.max(8, Math.min(36, currentSize + delta)); // Limites de 8 a 36 no preview
    setCurrentSize(newSize);
    updateSelectedObject({ fontSize: newSize });
  };

  const toggleBold = () => {
    const nextBold = !isBold;
    setIsBold(nextBold);
    updateSelectedObject({ fontWeight: nextBold ? (selectedObjectId === "name" ? "900" : "800") : "normal" });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Canvas Principal — Sem moldura interna duplicada */}
      <div
        className="relative overflow-hidden rounded-[24px] md:rounded-[32px] group transition-all duration-500"
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
      >

        {/* Container estável para o Fabric.js não quebrar a reconciliação do React */}
        <div className="relative z-10 w-full h-full">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
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

            <div className="w-[1px] h-6 bg-slate-700"></div>

            {/* Toggle Bold */}
            <button
              onClick={toggleBold}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border ${isBold ? 'bg-brand-teal text-brand-navy border-brand-teal' : 'bg-slate-800 text-slate-400 border-white/5 hover:text-white'}`}
              title="Alternar Negrito"
            >
              <span className="font-black text-base">B</span>
            </button>

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

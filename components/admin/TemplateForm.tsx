"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Layout, Image as ImageIcon, RotateCcw, Package, Check, Settings2, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import BadgeCanvas from "@/components/canvas/BadgeCanvas";
import { useRouter } from "next/navigation";
import { BadgeItem } from "@prisma/client";
import { saveTemplate } from "@/app/admin/templates/actions";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface TemplateFormProps {
  initialData?: {
    id?: string;
    name: string;
    bgImageUrl: string;
    orientation: "landscape" | "portrait";
    config?: any;
    basePrice?: number;
    associatedItems?: { id: string; isRequired: boolean; isHidden: boolean; exclusiveWith?: string }[];
  };
  availableItems: BadgeItem[];
  title: string;
  isEdit?: boolean;
}

export default function TemplateForm({ initialData, title, isEdit, availableItems }: TemplateFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"design" | "accessories">("design");
  
  const [template, setTemplate] = useState({
    name: initialData?.name || "Novo Modelo de Crachá",
    bgImageUrl: initialData?.bgImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    orientation: initialData?.orientation || ("landscape" as const),
    basePrice: initialData?.basePrice || 0,
  });

  const [selectedItems, setSelectedItems] = useState<{ id: string; isRequired: boolean; isHidden: boolean; exclusiveWith?: string }[]>(
    initialData?.associatedItems || []
  );

  const [previewTexts, setPreviewTexts] = useState({
    name: initialData?.config?.previewName || "Participante de Exemplo",
    congregation: initialData?.config?.previewCongregation || "Congregação Brasília - DF"
  });

  const [config, setConfig] = useState(initialData?.config || {
    orientation: initialData?.orientation || "landscape",
    namePos: null,
    congPos: null
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await saveTemplate({
        id: initialData?.id,
        name: template.name,
        bgImageUrl: template.bgImageUrl,
        orientation: template.orientation,
        config: { 
          ...config, 
          orientation: template.orientation,
          previewName: previewTexts.name,
          previewCongregation: previewTexts.congregation
        },
        basePrice: template.basePrice,
        // eventId não é enviado na edição — o servidor busca o original
        items: selectedItems,
      });

      if (result.success) {
        showToast("Modelo salvo com sucesso!", "success");
        router.push("/admin/templates");
        router.refresh();
      } else {
        showToast(result.error || "Erro ao salvar template", "error");
      }
    } catch (error) {
      showToast("Erro crítico ao salvar o modelo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfig({
      ...config,
      namePos: null,
      congPos: null
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate({ ...template, bgImageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === itemId);
      if (exists) {
        return prev.filter(i => i.id !== itemId);
      } else {
        return [...prev, { id: itemId, isRequired: false, isHidden: false, exclusiveWith: "" }];
      }
    });
  };

  const toggleRequired = (itemId: string) => {
    setSelectedItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, isRequired: !i.isRequired } : i
    ));
  };

  const toggleExclusion = (sourceId: string, targetId: string) => {
    setSelectedItems(prev => prev.map(item => {
      if (item.id !== sourceId) return item;
      
      const currentExclusions = item.exclusiveWith ? item.exclusiveWith.split(",").filter(Boolean) : [];
      let newExclusions: string[];
      
      if (currentExclusions.includes(targetId)) {
        newExclusions = currentExclusions.filter(id => id !== targetId);
      } else {
        newExclusions = [...currentExclusions, targetId];
      }
      
      return { ...item, exclusiveWith: newExclusions.join(",") };
    }));
  };

  const toggleHidden = (itemId: string) => {
    setSelectedItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, isHidden: !i.isHidden } : i
    ));
  };

  return (
    <div className="w-full flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="px-8 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/templates" className="p-2.5 text-slate-400 hover:text-brand-navy hover:bg-slate-50 rounded-xl transition-all">
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-brand-navy leading-none">{title}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Painel de Personalização • NexPrint Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 bg-brand-teal text-white rounded-xl font-black flex items-center gap-2 hover:bg-brand-teal-dark shadow-lg shadow-brand-teal/20 transition-all disabled:opacity-50 text-sm"
          >
            <Save size={18} /> {loading ? "Salvando..." : "Salvar Template"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Canvas Area (Left) */}
        <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">

          <div className="absolute top-8 right-8">
            <button 
              onClick={handleReset}
              className="p-3 bg-white text-slate-400 hover:text-brand-teal rounded-xl border border-slate-200 shadow-sm transition-all"
              title="Resetar Posições"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-brand-navy/5 border border-white/50 relative">
             <div className="absolute -inset-4 bg-brand-teal/5 blur-3xl -z-10 rounded-full"></div>
             <BadgeCanvas 
                name={previewTexts.name}
                congregation={previewTexts.congregation}
                bgImageUrl={template.bgImageUrl}
                orientation={template.orientation}
                config={config}
                interactive={true}
                onUpdateConfig={(newConfig) => setConfig(newConfig)}
              />
          </div>

          <p className="mt-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] text-center max-w-sm">
            Arraste os elementos para ajustar a posição dinâmica
          </p>
        </div>

        {/* Form Area (Right) */}
        <div className="w-[420px] border-l border-slate-100 flex flex-col shrink-0 overflow-y-auto">
          {/* Aba Seletora Superior (Sidebar) */}
          <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-20">
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200 overflow-hidden">
               <button 
                 onClick={() => setActiveTab("design")}
                 className={cn("flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 tracking-widest", activeTab === "design" ? "bg-brand-navy text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
               >
                 <Settings2 size={14} /> DESIGN
               </button>
               <button 
                 onClick={() => setActiveTab("accessories")}
                 className={cn("flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 tracking-widest", activeTab === "accessories" ? "bg-brand-navy text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
               >
                 <Plus size={14} /> ACESSÓRIOS
               </button>
            </div>
          </div>

          {activeTab === "design" ? (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                  <h3 className="text-sm font-black text-brand-navy mb-4 flex items-center gap-2">
                    <Sparkles className="text-brand-teal" size={18} /> Aparência do Crachá
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Modelo</label>
                      <input 
                        type="text" 
                        value={template.name}
                        onChange={(e) => setTemplate({...template, name: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-brand-teal outline-none transition-all font-bold text-brand-navy text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orientação da Arte</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setTemplate({ ...template, orientation: "landscape" });
                            setConfig({ ...config, orientation: "landscape" });
                          }}
                          className={cn("py-4 rounded-2xl border-2 font-black text-[11px] uppercase tracking-wider transition-all", template.orientation === "landscape" ? "border-brand-teal bg-brand-teal/10 text-brand-teal" : "border-slate-50 bg-slate-50 text-slate-400")}
                        >
                          Horizontal
                        </button>
                        <button
                          onClick={() => {
                            setTemplate({ ...template, orientation: "portrait" });
                            setConfig({ ...config, orientation: "portrait" });
                          }}
                          className={cn("py-4 rounded-2xl border-2 font-black text-[11px] uppercase tracking-wider transition-all", template.orientation === "portrait" ? "border-brand-teal bg-brand-teal/10 text-brand-teal" : "border-slate-50 bg-slate-50 text-slate-400")}
                        >
                          Vertical
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Preço Base do Crachá (R$)</label>
                       <input 
                         type="number" 
                         step="0.01"
                         value={template.basePrice}
                         onChange={(e) => setTemplate({...template, basePrice: parseFloat(e.target.value) || 0})}
                         className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-brand-teal/20 focus:border-brand-teal outline-none transition-all font-bold text-brand-navy text-sm"
                         placeholder="0.00"
                       />
                       <p className="text-[9px] font-bold text-slate-400 italic leading-tight">* Este é o valor principal do crachá. Acessórios extras serão somados a este valor.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arte de Fundo (PDF/PNG/JPG)</label>
                      <div className="relative group">
                        <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full px-6 py-12 rounded-2xl border-2 border-dashed border-slate-200 group-hover:border-brand-teal group-hover:bg-brand-teal/5 bg-slate-50 flex flex-col items-center justify-center gap-4 transition-all">
                          <ImageIcon className="text-slate-300 group-hover:text-brand-teal" size={32} />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Clique para trocar a arte</span>
                        </div>
                      </div>
                    </div>

                    {/* Controles de Cor Avançados */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cor do Nome</label>
                        <div className="flex bg-slate-50 rounded-2xl p-2 border-2 border-slate-100">
                           <input 
                             type="color" 
                             value={config.namePos?.color || "#000000"} 
                             onChange={(e) => setConfig({...config, namePos: {...(config.namePos || {}), color: e.target.value}})}
                             className="w-8 h-8 rounded-xl cursor-pointer border-none bg-transparent"
                             title="Preto (#000000) ativa a resina da impressora!"
                           />
                           <input 
                             type="text" 
                             value={config.namePos?.color || "#000000"}
                             readOnly
                             className="bg-transparent flex-1 w-full outline-none px-3 text-xs font-bold text-slate-600 uppercase"
                           />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cor da Congregação</label>
                        <div className="flex bg-slate-50 rounded-2xl p-2 border-2 border-slate-100">
                           <input 
                             type="color" 
                             value={config.congPos?.color || "#000000"} 
                             onChange={(e) => setConfig({...config, congPos: {...(config.congPos || {}), color: e.target.value}})}
                             className="w-8 h-8 rounded-xl cursor-pointer border-none bg-transparent"
                           />
                           <input 
                             type="text" 
                             value={config.congPos?.color || "#000000"}
                             readOnly
                             className="bg-transparent flex-1 w-full outline-none px-3 text-xs font-bold text-slate-600 uppercase"
                           />
                        </div>
                      </div>
                    </div>

                    {/* Textos de Exemplo */}
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Textos de Exemplo (Preview)</label>
                      <div className="grid grid-cols-1 gap-3">
                        <input 
                          type="text" 
                          placeholder="Nome de Exemplo"
                          value={previewTexts.name}
                          onChange={(e) => setPreviewTexts({...previewTexts, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-brand-teal outline-none transition-all font-bold text-brand-navy text-xs"
                        />
                        <input 
                          type="text" 
                          placeholder="Congregação de Exemplo"
                          value={previewTexts.congregation}
                          onChange={(e) => setPreviewTexts({...previewTexts, congregation: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-brand-teal outline-none transition-all font-bold text-brand-navy text-xs"
                        />
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-300">
               <div>
                  <h3 className="text-sm font-black text-brand-navy mb-2 flex items-center gap-2 text-brand-teal">
                    <Package size={20} /> Vincular Acessórios
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed mb-6 italic">
                    Configure quais itens serão oferecidos ou incluídos obrigatoriamente neste template. 
                    <span className="block mt-1 text-brand-teal font-black uppercase tracking-tighter">* O Crachá é o produto principal e seu preço é definido na aba Design.</span>
                  </p>

                  <div className="space-y-3">
                    {availableItems.map((item) => {
                      const isSelected = selectedItems.find(si => si.id === item.id);
                      return (
                        <div 
                          key={item.id}
                          className={cn(
                            "group p-4 rounded-2xl border-2 transition-all",
                            isSelected ? "border-brand-teal bg-white shadow-sm" : "border-slate-50 bg-slate-50/50 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                          )}
                        >
                          <div className="flex items-center gap-4">
                             <div 
                               onClick={() => toggleItem(item.id)}
                               className={cn(
                                 "w-12 h-12 rounded-xl flex items-center justify-center border-2 cursor-pointer transition-all",
                                 isSelected ? "bg-brand-teal border-brand-teal text-white" : "bg-white border-slate-200 text-slate-300"
                               )}
                             >
                               {isSelected ? <Check size={20} /> : <Plus size={20} />}
                             </div>
                             <div className="flex-1" onClick={() => toggleItem(item.id)}>
                                <h4 className="text-xs font-black text-brand-navy leading-tight">{item.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">R$ {item.price.toFixed(2)} • Estoque: {item.stock}</p>
                             </div>
                          </div>

                          {isSelected && (
                            <>
                             <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                               <span className="text-[10px] font-black text-slate-500 uppercase">É Item Obrigatório?</span>
                               <button 
                                 onClick={() => toggleRequired(item.id)}
                                 className={cn(
                                   "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all",
                                   isSelected.isRequired ? "bg-red-50 text-red-500 border border-red-100" : "bg-slate-100 text-slate-400 border border-slate-200"
                                 )}
                               >
                                 {isSelected.isRequired ? "SIM (Incluso)" : "NÃO (Opcional)"}
                               </button>
                             </div>

                             {/* Regras de Exclusão */}
                             <div className="mt-4 pt-4 border-t border-slate-100">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Bloqueia o uso de:</p>
                               <div className="flex flex-wrap gap-2">
                                 {selectedItems.filter(si => si.id !== item.id).map(other => {
                                   const otherDetails = availableItems.find(ai => ai.id === other.id);
                                   const isExcluded = isSelected.exclusiveWith?.split(",").includes(other.id);
                                   return (
                                     <button
                                       key={other.id}
                                       type="button"
                                       onClick={() => toggleExclusion(item.id, other.id)}
                                       className={cn(
                                         "px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border",
                                         isExcluded 
                                           ? "bg-red-50 text-red-500 border-red-100" 
                                           : "bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200"
                                       )}
                                     >
                                       {otherDetails?.name}
                                     </button>
                                   );
                                 })}
                                 {selectedItems.length <= 1 && (
                                   <span className="text-[9px] text-slate-300 font-medium italic">Adicione outros itens para criar regras</span>
                                 )}
                               </div>
                             </div>
                          </>
                          )}
                        </div>
                      );
                    })}

                    {availableItems.length === 0 && (
                      <div className="py-12 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl">
                        Nenhum item em estoque para vincular.
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


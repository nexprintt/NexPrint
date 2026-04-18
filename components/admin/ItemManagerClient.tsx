"use client";

import React, { useState, useRef } from "react";
import { Plus, Package, Edit, Trash2, ShoppingBag, Image as ImageIcon, Upload, X } from "lucide-react";
import { createBadgeItem, updateBadgeItem, deleteBadgeItem } from "@/app/admin/itens/actions";
import { BadgeItem } from "@prisma/client";

interface ItemManagerClientProps {
  initialItens: BadgeItem[];
}

export default function ItemManagerClient({ initialItens }: ItemManagerClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNewItemModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCustomUrl("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BadgeItem) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setName(item.name);
    setDescription((item as any).description || "");
    setPrice(item.price.toString());
    setStock(item.stock.toString());
    setCustomUrl(item.imageUrl || "");
    setSelectedFile(null);
    setPreviewUrl(item.imageUrl);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCustomUrl(""); // Clear URL if a file is uploaded
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      
      if (selectedFile) {
        formData.append("image", selectedFile);
      } else if (customUrl) {
        formData.append("customUrl", customUrl);
      }

      if (isEditMode && editingId) {
        const result = await updateBadgeItem(editingId, formData);
        if (!result.success) alert(result.error);
      } else {
        const result = await createBadgeItem(formData);
        if (!result.success) alert(result.error);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Ocorreu um erro ao salvar o item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o item "${name}"?`)) {
      const result = await deleteBadgeItem(id);
      if (!result.success) {
        alert(result.error || "Erro ao excluir o item.");
      }
    }
  };

  const handleExportCSV = () => {
    // Cabeçalhos
    const headers = ["ID", "Nome do Produto", "Preço Unitário", "Quantidade em Estoque", "Valor Total em Estoque"];
    
    // Linhas
    const rows = initialItens.map(item => [
      item.id,
      `"${item.name}"`, // Aspas para previnir bugs com vírgula no nome
      item.price.toFixed(2),
      item.stock,
      (item.price * item.stock).toFixed(2)
    ]);

    // Calcular totais p/ a última linha
    const totalEstoque = initialItens.reduce((acc, item) => acc + item.stock, 0);
    const totalValor = initialItens.reduce((acc, item) => acc + (item.price * item.stock), 0);
    
    rows.push(["-", '"TOTAL"', "-", totalEstoque, totalValor.toFixed(2)]);

    // Gerar string CSV
    const csvContent = "data:text/csv;charset=utf-8," + 
      headers.join(",") + "\n" + 
      rows.map(e => e.join(",")).join("\n");

    // Fazer Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inventario-nexprint-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-brand-navy">Itens e Acessórios</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            Relatório
          </button>
          <button 
            onClick={openNewItemModal}
            className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-teal-dark transition-all shadow-sm shadow-brand-teal/20"
          >
            <Plus size={20} /> Novo Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialItens.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] border border-slate-100 p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-lg transition-all relative overflow-hidden group">
            {/* Indicador de estoque baixo */}
            {item.stock <= 10 && (
               <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-bl-2xl">
                 Estoque Baixo
               </div>
            )}
            
            <div className="w-20 h-20 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 overflow-hidden relative border border-slate-100">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <Package size={32} />
              )}
            </div>
            
            <div className="flex-1 w-full">
              <h3 className="font-black text-brand-navy mb-1 leading-tight pr-4">{item.name}</h3>
              {(item as any).description && (
                <p className="text-slate-400 text-xs font-medium mb-1 leading-tight">{(item as any).description}</p>
              )}
              <p className="text-brand-teal font-black text-lg">R$ {item.price.toFixed(2)}</p>
              
              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 w-full">
                <div className="bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase text-slate-400 border border-slate-100">
                  Estoque: <span className={item.stock <= 10 ? "text-red-500" : "text-brand-navy"}>{item.stock}</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {initialItens.length === 0 && (
          <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-200 text-center space-y-4">
            <ShoppingBag className="mx-auto text-slate-200" size={48} />
            <p className="text-slate-400 font-medium">Nenhum acessório cadastrado.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-brand-navy rounded-full transition-all"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-brand-navy mb-6">
              {isEditMode ? "Editar Item" : "Novo Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-brand-navy block uppercase tracking-wide">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Imã para Crachá" 
                  className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-brand-teal transition-all text-brand-navy font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-brand-navy block uppercase tracking-wide">Descrição Curta <span className="text-slate-400 normal-case font-medium">(aparece para o cliente)</span></label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Fica no verso do crachá para prender na roupa" 
                  className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-brand-teal transition-all text-brand-navy font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-brand-navy block uppercase tracking-wide">Preço (R$)</label>
                  <input 
                    type="number" 
                    required
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00" 
                    className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-brand-teal transition-all text-brand-navy font-bold placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-brand-navy block uppercase tracking-wide">Estoque Atual</label>
                  <input 
                    type="number" 
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0" 
                    className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-brand-teal transition-all text-brand-navy font-bold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-brand-navy block uppercase tracking-wide">Imagem do Produto (Opcional)</label>
                
                <div className="flex gap-4 items-start">
                   {previewUrl ? (
                     <div className="relative w-24 h-24 rounded-2xl border-2 border-slate-200 overflow-hidden group shrink-0">
                       <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                       <button 
                         type="button"
                         onClick={() => {
                           setPreviewUrl(null);
                           setSelectedFile(null);
                           setCustomUrl("");
                         }}
                         className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white"
                       >
                         <Trash2 size={20} />
                       </button>
                     </div>
                   ) : (
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-all shrink-0"
                     >
                       <Upload size={24} className="mb-1" />
                       <span className="text-[10px] font-bold uppercase">Upload</span>
                     </div>
                   )}

                   <div className="flex-1 space-y-3">
                     <input 
                       type="file" 
                       accept="image/*"
                       className="hidden"
                       ref={fileInputRef}
                       onChange={handleFileChange}
                     />
                     <div className="flex items-center gap-2">
                       <div className="h-px bg-slate-300 flex-1"></div>
                       <span className="text-xs font-black text-slate-400 uppercase">OU</span>
                       <div className="h-px bg-slate-300 flex-1"></div>
                     </div>
                     <input 
                        type="url" 
                        value={customUrl}
                        onChange={(e) => {
                          setCustomUrl(e.target.value);
                          if(e.target.value) {
                             setPreviewUrl(e.target.value);
                             setSelectedFile(null);
                          }
                        }}
                        placeholder="Cole a URL da Imagem aqui" 
                        className="w-full px-4 py-3 text-sm bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-brand-teal transition-all text-brand-navy font-bold placeholder:text-slate-400"
                      />
                   </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-teal-dark transition-all disabled:opacity-50 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : (isEditMode ? "Salvar Alterações" : "Adicionar Item")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

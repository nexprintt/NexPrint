"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  Phone,
  User,
  Building2,
  Package,
  Check,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Search,
  CheckCircle
} from "lucide-react";
import { calculateShippingAction } from "@/app/pedido/[slug]/actions";

interface PedidoFormProps {
  onDataChange: (data: any) => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  items: any[];
  basePrice: number;
  membersCount: number;
  onAddMember: (memberData: any) => void;
}

export default function PedidoForm({
  onDataChange,
  onSubmit,
  isSubmitting,
  items,
  basePrice,
  membersCount,
  onAddMember,
}: PedidoFormProps) {
  const [step, setStep] = useState(1);
  const [loadingCep, setLoadingCep] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [totalCrachas, setTotalCrachas] = useState(1);

  // Itens obrigatórios são pré-selecionados e não podem ser desmarcados
  const mandatoryItemIds =
    items
      ?.filter((ti: any) => ti.isRequired)
      ?.map((ti: any) => ti.itemId) || [];

  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    congregation: "",
    photoUrl: null as string | null,
    items: mandatoryItemIds,
    
    // Entrega
    isFromItabira: true,
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    shippingCost: 0,
    shippingService: "",
    
    // Pagamento
    paymentMethod: "CASH", // CASH, PIX
  });



  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const maskCep = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
  };

  const isPhoneValid = formData.phone.replace(/\D/g, "").length === 11;
  
  // Wpp só exigido se for o primeiro
  const canProceedStep1 = formData.clientName.trim().length >= 3 && (membersCount > 0 || isPhoneValid);
  const canProceedStep2 = formData.isFromItabira || formData.shippingService !== "";

  const isLastMemberForm = membersCount + 1 >= totalCrachas;

  const handleUpdate = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const fetchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    setLoadingShipping(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        handleUpdate({
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          shippingCost: 0,
          shippingService: ""
        });
        
        // Calcular frete com Melhor Envio
        try {
          const currentTotalExtras = items
            .filter((ti: any) => formData.items.includes(ti.itemId) && !ti.isRequired)
            .reduce((acc: number, ti: any) => acc + ti.item.price, 0);
          const currentSubtotal = basePrice + currentTotalExtras;
            
          const options = await calculateShippingAction(cleanCep, currentSubtotal);
          setShippingOptions(options || []);
        } catch(err) {
           console.error("Erro no frete", err);
           setShippingOptions([]);
        }
      }
    } catch (e) {
      console.error("Erro ao buscar CEP", e);
    } finally {
      setLoadingCep(false);
      setLoadingShipping(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const toggleItem = (itemId: string) => {
    const isMandatory = items.find((ti) => ti.itemId === itemId)?.isRequired;
    if (isMandatory) return;
    const newItems = formData.items.includes(itemId)
      ? formData.items.filter((i) => i !== itemId)
      : [...formData.items, itemId];
    handleUpdate({ items: newItems });
  };

  // Separa itens que não são o crachá principal
  const accessoryItems = items.filter((ti: any) => {
    const name = ti.item?.name?.toLowerCase() || "";
    return !name.includes("crachá") && !name.includes("cracha");
  });

  const totalOptionalExtras = items
    .filter(
      (ti) =>
        formData.items.includes(ti.itemId) &&
        !ti.isRequired &&
        !["crachá", "cracha"].some((w) =>
          ti.item?.name?.toLowerCase().includes(w)
        )
    )
    .reduce((acc, ti) => acc + ti.item.price, 0);

  const subtotal = basePrice + totalOptionalExtras;
  const totalAmount = subtotal + formData.shippingCost;

  // Efeito para notificar mudanças em tempo real (preview e checkout)
  useEffect(() => {
    onDataChange({
      ...formData,
      subtotal,
      totalAmount
    });
  }, [formData, subtotal, totalAmount]);

  // Variantes de animação
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="w-full">
      {/* Indicador de Progresso — Estilo Aceternity / Glowing Premium */}
      <div className="mb-10 sm:mb-14 w-full max-w-sm mx-auto px-0 sm:px-4 mt-2">
        <div className="flex items-center justify-between relative">
          {[1, 2, 3, 4].map((num) => {
            const isActive = step >= num;
            const isCurrent = step === num;
            return (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center z-10 transition-all duration-500 flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full transition-all duration-700 mx-auto ${
                      isActive
                        ? "bg-[#00f2fe] text-[#020b12] shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                        : "bg-transparent border border-white/5 text-slate-600"
                    }`}
                  >
                    {step > num ? (
                      <span className="font-black text-lg sm:text-xl font-outfit">{num}</span>
                    ) : (
                      <span className="font-black text-lg sm:text-xl font-outfit">{num}</span>
                    )}
                  </div>
                  <span className={`mt-2 sm:mt-3 text-[8.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-[0.1em] transition-all duration-500 text-center ${isActive ? "text-[#00f2fe]" : "text-slate-500"}`}>
                    {num === 1 ? "Identidade" : num === 2 ? "Logística" : num === 3 ? "Acessórios" : "Checkout"}
                  </span>
                </div>
                {num < 4 && (
                  <div className="flex-1 h-[1px] mb-6 sm:mb-8 mx-1 sm:mx-2 bg-white/5 relative overflow-hidden rounded-full font-outfit">
                    <motion.div 
                      initial={false}
                      animate={{ width: step > num ? "100%" : "0%" }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      className="absolute inset-0 bg-[#00f2fe]"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" custom={step}>
        {/* STEP 1: Dados pessoais */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <div className="space-y-8">
              {/* Member Tracker - Dark Premium */}
              {totalCrachas > 1 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1.5 bg-brand-teal/10 text-brand-teal text-[10px] font-black rounded-xl uppercase tracking-widest border border-brand-teal/20 flex gap-2 items-center">
                    <Package size={14} className="animate-pulse" />
                    {membersCount + 1} de {totalCrachas} identificadores ativos
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {membersCount === 0 && (
                  <div className="p-6 rounded-3xl bg-[#09151c]/50 border border-white/5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4 block">Quantos identificadores?</label>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 bg-[#050b10] rounded-full p-2 border border-white/5">
                        <button 
                          onClick={() => setTotalCrachas(Math.max(1, totalCrachas - 1))} 
                          className="w-10 h-10 rounded-full text-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center font-bold text-xl"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold text-white w-8 text-center tabular-nums font-outfit">
                          {totalCrachas}
                        </span>
                        <button 
                           onClick={() => setTotalCrachas(Math.min(10, totalCrachas + 1))} 
                           className="w-10 h-10 rounded-full bg-[#00f2fe] text-[#020b12] flex items-center justify-center font-bold text-xl hover:scale-105 transition-transform"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium leading-relaxed max-w-[140px]">
                        Você pode adicionar até 10 pessoas no mesmo pedido para economizar no frete.
                      </p>
                    </div>
                  </div>
                )}

                <header className="mb-2">
                  <h2 className="text-[32px] font-black text-white tracking-tight font-outfit">
                    {membersCount === 0 ? "Dados do Titular" : `Identificador #${membersCount + 1}`}
                  </h2>
                </header>

                <div className="space-y-6">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: João Silva"
                      className="w-full px-5 py-4 rounded-[16px] border border-white/5 bg-black/40 focus:border-[#00f2fe]/50 outline-none transition-all font-semibold text-white placeholder:text-slate-600 shadow-inner"
                      value={formData.clientName}
                      onChange={(e) => handleUpdate({ clientName: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Congregação</label>
                      <input
                        type="text"
                        placeholder="Ex: Central"
                        className="w-full px-5 py-4 rounded-[16px] border border-white/5 bg-black/40 focus:border-[#00f2fe]/50 outline-none transition-all font-semibold text-white placeholder:text-slate-600 shadow-inner"
                        value={formData.congregation}
                        onChange={(e) => handleUpdate({ congregation: e.target.value })}
                      />
                    </div>
                    
                    {membersCount === 0 && (
                      <div className="space-y-2.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fone Celular</label>
                        <input
                          type="tel"
                          placeholder="(31) 99999-9999"
                          className={`w-full px-5 py-4 rounded-[16px] border bg-black/40 outline-none transition-all font-semibold text-white placeholder:text-slate-600 shadow-inner ${
                            formData.phone && !isPhoneValid ? "border-red-900 focus:border-red-500" : "border-white/5 focus:border-[#00f2fe]/50"
                          }`}
                          value={formData.phone}
                          onChange={(e) => handleUpdate({ phone: maskPhone(e.target.value) })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={canProceedStep1 ? { scale: 1.02 } : {}}
                    whileTap={canProceedStep1 ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (canProceedStep1) {
                        if (!isLastMemberForm) {
                          onAddMember({ ...formData });
                          handleUpdate({ clientName: "", photoUrl: null });
                        } else {
                          nextStep();
                        }
                      }
                    }}
                    className={`btn-submit-cyan w-full py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                      canProceedStep1 
                        ? "opacity-100" 
                        : "opacity-30 cursor-not-allowed pointer-events-none grayscale"
                    }`}
                  >
                    {!isLastMemberForm 
                      ? `PRÓXIMO IDENTIFICADOR` 
                      : "PROSSEGUIR"} 
                    <ArrowRight size={20} className="text-[#020b12]" strokeWidth={3} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Entrega */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <header>
              <h2 className="text-2xl font-black text-white tracking-tight font-outfit">Logística de Entrega</h2>
              <p className="text-slate-400 text-sm font-medium">Selecione como deseja receber seus crachás.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleUpdate({ isFromItabira: true, shippingCost: 0, shippingService: "", zipCode: "", address: "", number: "", complement: "", city: "", state: "", neighborhood: "" })}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-5 text-left ${
                  formData.isFromItabira ? "border-brand-teal bg-brand-teal/5" : "border-white/5 bg-slate-900/40 hover:border-white/10"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.isFromItabira ? "bg-brand-teal text-brand-navy" : "bg-slate-950 text-slate-600 shadow-inner"}`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <span className={`font-black text-sm block ${formData.isFromItabira ? "text-brand-teal" : "text-white"}`}>Retirada Local</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Grátis p/ Itabira - MG</span>
                </div>
              </button>

              <button
                onClick={() => handleUpdate({ isFromItabira: false, shippingCost: 0, shippingService: "" })}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-5 text-left ${
                  !formData.isFromItabira ? "border-brand-teal bg-brand-teal/5" : "border-white/5 bg-slate-900/40 hover:border-white/10"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${!formData.isFromItabira ? "bg-brand-teal text-brand-navy" : "bg-slate-950 text-slate-600 shadow-inner"}`}>
                  <Truck size={24} />
                </div>
                <div>
                  <span className={`font-black text-sm block ${!formData.isFromItabira ? "text-brand-teal" : "text-white"}`}>Entrega Especial</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Via Transportadora</span>
                </div>
              </button>
            </div>

            {!formData.isFromItabira && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">CEP</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="00000-000"
                        className="w-full px-5 py-4 rounded-xl border border-white/5 bg-slate-950/40 font-bold text-white focus:border-brand-teal/50 outline-none shadow-inner"
                        value={formData.zipCode}
                        onChange={(e) => {
                          const val = maskCep(e.target.value);
                          handleUpdate({ zipCode: val });
                          if (val.length === 9) fetchCep(val);
                        }}
                      />
                       {loadingCep && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent animate-spin rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-7 space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Cidade / UF</label>
                    <input
                      disabled
                      className="w-full px-5 py-4 rounded-xl bg-slate-900/50 font-bold text-slate-500 cursor-not-allowed border border-white/5"
                      value={formData.city ? `${formData.city} - ${formData.state}` : "Informe o CEP"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Endereço de Entrega</label>
                  <input
                    placeholder="Rua, Av..."
                    className="w-full px-5 py-4 rounded-xl border border-white/5 focus:border-brand-teal/50 outline-none font-bold text-white bg-slate-950/40 shadow-inner"
                    value={formData.address}
                    onChange={(e) => handleUpdate({ address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    placeholder="Número"
                    className="w-full px-5 py-4 rounded-xl border border-white/5 bg-slate-950/40 font-bold text-white shadow-inner"
                    value={formData.number}
                    onChange={(e) => handleUpdate({ number: e.target.value })}
                  />
                  <input
                    placeholder="Complemento"
                    className="w-full px-5 py-4 rounded-xl border border-white/5 bg-slate-950/40 font-bold text-white shadow-inner"
                    value={formData.complement}
                    onChange={(e) => handleUpdate({ complement: e.target.value })}
                  />
                </div>

                {formData.zipCode.length >= 8 && (
                  <div className="pt-4">
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">Escolha o serviço:</p>
                    
                    {loadingShipping ? (
                       <div className="flex flex-col items-center justify-center py-10 bg-slate-900/40 rounded-2xl border border-white/5 animate-pulse">
                          <div className="w-8 h-8 border-3 border-brand-teal border-t-transparent animate-spin rounded-full mb-3" />
                          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">CALCULANDO FRETE...</p>
                       </div>
                    ) : shippingOptions.length > 0 ? (
                       <div className="space-y-3">
                         {shippingOptions.map((opt: any) => {
                           const price = parseFloat(opt.custom_price || opt.price);
                           const isSelected = formData.shippingService === opt.name;
                           
                           return (
                             <div 
                               key={opt.id}
                               onClick={() => handleUpdate({ shippingService: opt.name, shippingCost: price })}
                               className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? 'border-brand-teal bg-brand-teal/5' : 'border-white/5 bg-slate-950/30 hover:bg-slate-950/50'}`}
                             >
                                <div className="flex items-center gap-4">
                                  {opt.company?.picture && (
                                    <div className="w-10 h-10 bg-white/10 rounded-lg border border-white/5 p-1 flex items-center justify-center overflow-hidden">
                                      <img src={opt.company.picture} alt={opt.company.name} className="w-full object-contain grayscale brightness-125" />
                                    </div>
                                  )}
                                  <div>
                                    <p className={`font-black text-sm uppercase tracking-wide ${isSelected ? 'text-brand-teal' : 'text-white'}`}>{opt.name}</p>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{opt.delivery_time} dias úteis</span>
                                  </div>
                                </div>
                                <div className={`font-black text-base ${isSelected ? 'text-brand-teal' : 'text-slate-400'}`}>
                                  R$ {price.toFixed(2)}
                                </div>
                             </div>
                           )
                         })}
                       </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={prevStep}
                className="w-16 h-16 flex items-center justify-center border border-white/10 text-slate-500 rounded-2xl hover:bg-slate-900 transition-all shadow-sm"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={nextStep}
                disabled={!canProceedStep2}
                className="flex-1 h-16 bg-slate-900 hover:bg-black text-white border border-white/5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 disabled:bg-slate-950 disabled:text-slate-700 transition-all shadow-lg"
              >
                Prosseguir <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Acessórios */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <header className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-center shadow-inner">
                <Package size={28} className="text-brand-teal drop-shadow-[0_0_8px_rgba(0,229,192,0.5)]" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter font-outfit">Setup de Acessórios</h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Otimize a experiência do crachá</p>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {accessoryItems.map((ti: any) => {
                const isSelected = formData.items.includes(ti.itemId);
                return (
                  <div
                    key={ti.itemId}
                    onClick={() => toggleItem(ti.itemId)}
                    className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-6 cursor-pointer group ${
                      isSelected ? "border-brand-teal bg-brand-teal/5 ring-1 ring-brand-teal/20" : "border-white/5 bg-slate-900/40 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden transition-all relative ${isSelected ? "bg-brand-teal text-brand-navy shadow-[0_0_15px_rgba(0,229,192,0.4)]" : "bg-slate-950 text-slate-700 shadow-inner"}`}>
                      {isSelected ? (
                         <Check size={28} strokeWidth={4} />
                      ) : ti.item.imageUrl ? (
                         <img src={ti.item.imageUrl} alt={ti.item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      ) : (
                         <Package size={28} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-black text-lg leading-tight tracking-tight ${isSelected ? "text-white" : "text-slate-200"}`}>{ti.item.name}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1.5 ${isSelected ? "text-brand-teal" : "text-slate-500"}`}>
                        {ti.isRequired ? "INCLUSO NO KIT" : `+ VALOR ADICIONAL: R$ ${ti.item.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={prevStep}
                className="w-16 h-16 flex items-center justify-center border border-white/10 text-slate-500 rounded-2xl hover:bg-slate-900 transition-all shadow-sm"
              >
                <ArrowLeft size={24} />
              </button>
              <div 
                onClick={nextStep}
                className="flex-1 h-16 bg-brand-teal hover:bg-brand-teal-dark text-brand-navy rounded-2xl flex items-center justify-between px-4 sm:px-8 cursor-pointer shadow-[0_0_30px_rgba(0,229,192,0.3)] transition-all active:scale-[0.98]"
              >
                <span className="font-black text-sm sm:text-base uppercase tracking-wider">Ver Pagamento</span>
                <div className="flex items-center gap-3 sm:gap-5 border-l border-brand-navy/20 pl-3 sm:pl-5">
                   <div className="text-right">
                      <span className="text-[10px] font-black opacity-60 uppercase block leading-none tracking-widest">Subtotal</span>
                      <span className="font-black text-xl leading-none tabular-nums">R$ {subtotal.toFixed(2)}</span>
                   </div>
                   <ArrowRight size={22} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Pagamento */}
        {step === 4 && (
          <motion.div
            key="step4"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <header>
              <h2 className="text-2xl font-black text-white tracking-tight font-outfit">Resumo & Checkout</h2>
              <p className="text-slate-500 text-sm font-medium">Confira os valores e conclua o pedido.</p>
            </header>

            {/* Resumo Estilizado */}
            <div className="bg-slate-900/60 border border-white/5 backdrop-blur-md rounded-[32px] p-5 sm:p-8 text-white space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShoppingBag size={80} />
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Itens ({membersCount + 1})</span>
                <span className="font-black text-white">R$ {subtotal.toFixed(2)}</span>
              </div>
              
              {formData.shippingCost > 0 && (
                <div className="flex justify-between items-center text-xs font-bold text-brand-teal uppercase tracking-widest">
                  <span>Frete ({formData.shippingService})</span>
                  <span className="font-black">R$ {formData.shippingCost.toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                <div className="relative z-10">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] block mb-2">Total a Pagar</span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-outfit tabular-nums text-glow-cyan">
                    R$ {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleUpdate({ paymentMethod: "PIX" })}
                className={`w-full p-5 rounded-[24px] border-2 transition-all flex items-center gap-5 text-left group ${
                  formData.paymentMethod === "PIX" ? "border-brand-teal bg-brand-teal/5" : "border-white/5 bg-slate-900/40 hover:bg-slate-900/60"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === "PIX" ? "bg-brand-teal text-brand-navy shadow-[0_0_15px_rgba(0,229,192,0.4)]" : "bg-slate-950 text-slate-600 shadow-inner"}`}>
                  <QrCode size={28} />
                </div>
                <div className="flex-1">
                  <p className={`font-black text-lg ${formData.paymentMethod === "PIX" ? "text-white" : "text-slate-400"}`}>Pix Automático</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Aprovação Imediata & Segura</p>
                </div>
                {formData.paymentMethod === "PIX" && <CheckCircle size={24} className="text-brand-teal" />}
              </button>

              {formData.isFromItabira && (
                <button
                  onClick={() => handleUpdate({ paymentMethod: "CASH" })}
                  className={`w-full p-5 rounded-[24px] border-2 transition-all flex items-center gap-5 text-left group ${
                    formData.paymentMethod === "CASH" ? "border-slate-700 bg-slate-800 text-white" : "border-white/5 bg-slate-900/40 hover:bg-slate-900/60"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === "CASH" ? "bg-white/10 text-white" : "bg-slate-950 text-slate-600 shadow-inner"}`}>
                    <CreditCard size={28} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-lg ${formData.paymentMethod === "CASH" ? "text-white" : "text-slate-400"}`}>Pagar na Retirada</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Disponível para Itabira - MG</p>
                  </div>
                  {formData.paymentMethod === "CASH" && <CheckCircle size={24} className="text-white" />}
                </button>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={prevStep}
                className="w-16 h-16 flex items-center justify-center border border-white/10 text-slate-500 rounded-2xl hover:bg-slate-900 transition-all shadow-sm"
              >
                <ArrowLeft size={24} strokeWidth={3} />
              </button>
              <button
                onClick={() => onSubmit(formData)}
                disabled={isSubmitting}
                className={`btn-submit-cyan flex-1 h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all ${
                  isSubmitting ? "opacity-50" : "text-brand-navy"
                }`}
              >
                {isSubmitting ? "Enviando..." : "Finalizar Pedido"}
                {!isSubmitting && <CheckCircle2 size={24} strokeWidth={4} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Support Button */}
      <div className="mt-8 flex justify-center pb-4">
        <a 
          href="https://wa.me/5531999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full bg-[#09151c]/50 border border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all hover:text-white group"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
          Fale com a gente pelo WhatsApp
        </a>
      </div>
    </div>
  );
}


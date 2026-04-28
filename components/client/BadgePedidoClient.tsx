"use client";

import React, { useState } from "react";
import { createOrder } from "@/app/pedido/[slug]/actions";
import { Check, Package, ArrowRight, ArrowLeft } from "lucide-react";
import BadgeCanvas from "../canvas/BadgeCanvas";
import PreviewCarousel from "./PreviewCarousel";

interface MemberData {
  name: string;
  congregation: string;
  selectedItems: string[];
}

interface BadgePedidoClientProps {
  event: any;
  template: any;
  config: any;
}

// mainStep: "init" → "members" → "summary" → "preview"
// memberSubStep 1 = dados, 2 = acessórios

export default function BadgePedidoClient({ event, template, config }: BadgePedidoClientProps) {
  const mandatoryItemIds: string[] =
    template.items?.filter((ti: any) => ti.isRequired)?.map((ti: any) => ti.itemId) ?? [];
  const accessoryItems: any[] = template.items ?? [];

  // ── estado global ──────────────────────────────────────
  const [mainStep, setMainStep] = useState<"init" | "members" | "summary" | "preview">("init");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── membros já confirmados ──────────────────────────────
  const [members, setMembers] = useState<MemberData[]>([]);

  // ── estado do membro atual ──────────────────────────────
  const [currentIdx, setCurrentIdx] = useState(0);
  const [memberSubStep, setMemberSubStep] = useState<1 | 2>(1);
  const [curName, setCurName] = useState("");
  const [curCong, setCurCong] = useState("");
  const [curItems, setCurItems] = useState<string[]>([...mandatoryItemIds]);

  // ── helpers ─────────────────────────────────────────────
  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  const isPhoneValid = phone.replace(/\D/g, "").length === 11;

  const toggleItem = (itemId: string) => {
    const ti = accessoryItems.find((t) => t.itemId === itemId);
    if (ti?.isRequired) return;
    const adding = !curItems.includes(itemId);
    let next = adding ? [...curItems, itemId] : curItems.filter((i) => i !== itemId);
    if (adding && ti?.exclusiveWith) {
      const ex = ti.exclusiveWith.split(",").filter(Boolean);
      next = next.filter((id) => !ex.includes(id));
    }
    setCurItems(next);
  };

  const memberTotal = (m: MemberData) => {
    const base = template.basePrice ?? 0;
    const extras = accessoryItems
      .filter((ti) => m.selectedItems.includes(ti.itemId) && !ti.isRequired)
      .reduce((s: number, ti: any) => s + (ti.item.price ?? 0), 0);
    return base + extras;
  };
  const grandTotal = () => members.reduce((s, m) => s + memberTotal(m), 0);

  // ── navegação entre membros ─────────────────────────────
  const startMemberFlow = () => {
    setMembers([]);
    setCurrentIdx(0);
    setCurName(""); setCurCong(""); setCurItems([...mandatoryItemIds]);
    setMemberSubStep(1);
    setMainStep("members");
  };

  const goToMemberData = () => setMemberSubStep(1);
  const goToMemberAccessories = () => setMemberSubStep(2);

  const confirmCurrentMember = () => {
    const saved: MemberData = { name: curName, congregation: curCong, selectedItems: [...curItems] };
    const newMembers = [...members, saved];
    setMembers(newMembers);
    if (currentIdx + 1 < quantity) {
      setCurrentIdx(currentIdx + 1);
      setCurName(""); setCurCong(""); setCurItems([...mandatoryItemIds]);
      setMemberSubStep(1);
    } else {
      setMainStep("summary");
    }
  };

  const goBackToPrevMember = () => {
    const prevIdx = currentIdx - 1;
    const prev = members[prevIdx];
    setMembers(members.slice(0, prevIdx));
    setCurrentIdx(prevIdx);
    setCurName(prev.name); setCurCong(prev.congregation); setCurItems([...prev.selectedItems]);
    setMemberSubStep(2);
  };

  const goBackFromSummary = () => {
    const lastIdx = quantity - 1;
    const last = members[lastIdx];
    setMembers(members.slice(0, lastIdx));
    setCurrentIdx(lastIdx);
    setCurName(last.name); setCurCong(last.congregation); setCurItems([...last.selectedItems]);
    setMemberSubStep(2);
    setMainStep("members");
  };

  // ── submit ──────────────────────────────────────────────
  const openWhatsapp = (allMembers: MemberData[]) => {
    const num = "553173211332";
    let txt = `*NOVO PEDIDO - NEXPRINT*\n\n*Evento:* ${event.name}\n*Telefone:* ${phone}\n*Pagamento:* ${paymentMethod === "PIX" ? "PIX" : "Dinheiro"}\n\n`;
    allMembers.forEach((m, i) => {
      const extras = accessoryItems.filter((ti) => m.selectedItems.includes(ti.itemId) && !ti.isRequired);
      txt += `*Crachá ${i + 1}:* ${m.name}${m.congregation ? ` (${m.congregation})` : ""}\n`;
      if (extras.length) txt += `  Acessórios: ${extras.map((ti: any) => ti.item.name).join(", ")}\n`;
      txt += `  Valor: R$ ${memberTotal(m).toFixed(2)}\n\n`;
    });
    txt += `*TOTAL: R$ ${grandTotal().toFixed(2)}*`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(txt)}`, "_blank");
    setTimeout(() => { window.location.href = "/"; }, 1500);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await createOrder({
      eventId: event.id,
      badgeTemplateId: template.id,
      phone,
      members: members.map((m) => ({
        clientName: m.name,
        congregation: m.congregation,
        photoUrl: null,
        items: m.selectedItems,
        customConfigJson: template.configJson,
      })),
      isFromItabira: true,
      zipCode: "", address: "", number: "", complement: "",
      neighborhood: "", city: "Itabira", state: "MG",
      shippingCost: 0, shippingService: "Retirada",
      paymentMethod,
    } as any);

    if (result.success) {
      openWhatsapp(members);
    } else {
      alert("Erro ao salvar o pedido: " + (result.error ?? "Tente novamente."));
    }
    setIsSubmitting(false);
  };

  // ── renderização ─────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">

      {/* ── STEP INIT ── */}
      {mainStep === "init" && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">Seu Pedido</h2>
            <p className="text-lg text-slate-500">Vamos começar com as informações básicas.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-lg font-bold text-slate-700">Telefone / WhatsApp</label>
              <input type="tel" placeholder="(31) 99999-9999"
                className={`w-full px-6 py-5 text-xl rounded-2xl border-2 outline-none transition-colors font-bold text-slate-900 bg-slate-50 ${phone && !isPhoneValid ? "border-red-400" : "border-slate-200 focus:border-brand-teal"}`}
                value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} />
            </div>

            <div className="space-y-3">
              <label className="text-lg font-bold text-slate-700">Quantos crachás quer fazer?</label>
              <div className="flex items-center gap-6 bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-black text-slate-600 hover:bg-slate-300 transition-colors">-</button>
                <span className="flex-1 text-center text-4xl font-black text-slate-900">{quantity}</span>
                <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-16 h-16 rounded-full bg-brand-teal flex items-center justify-center text-3xl font-black text-slate-900 hover:opacity-80 transition-colors">+</button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-lg font-bold text-slate-700">Forma de Pagamento</label>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setPaymentMethod("PIX")}
                  className={`p-4 md:p-6 rounded-2xl border-4 font-black text-lg md:text-xl transition-all ${paymentMethod === "PIX" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 text-slate-500 hover:bg-slate-50"}`}>PIX</button>
                <button onClick={() => setPaymentMethod("CASH")}
                  className={`p-4 md:p-6 rounded-2xl border-4 font-black text-lg md:text-xl transition-all ${paymentMethod === "CASH" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 text-slate-500 hover:bg-slate-50"}`}>DINHEIRO</button>
              </div>
            </div>
          </div>

          <button disabled={!isPhoneValid} onClick={startMemberFlow}
            className={`w-full py-5 md:py-6 rounded-2xl font-black text-xl md:text-2xl flex items-center justify-center gap-3 md:gap-4 transition-all ${isPhoneValid ? "bg-brand-teal text-slate-900 hover:scale-[1.02] shadow-xl" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
            Preencher os Crachás <ArrowRight size={28} className="shrink-0" />
          </button>
        </div>
      )}

      {/* ── STEP MEMBERS ── */}
      {mainStep === "members" && (
        <div className="space-y-6">
          {/* barra de progresso */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Crachá {currentIdx + 1} de {quantity}</span>
            <div className="flex gap-1">
              {Array.from({ length: quantity }).map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i < currentIdx ? "w-8 bg-brand-teal" : i === currentIdx ? "w-8 bg-brand-teal/40" : "w-2 bg-slate-200"}`} />
              ))}
            </div>
          </div>

          {/* SUB 1: DADOS */}
          {memberSubStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">
                  {currentIdx === 0 ? "Seus Dados" : `Crachá #${currentIdx + 1}`}
                </h2>
                <p className="text-lg text-slate-500">Preencha as informações desta pessoa.</p>
              </div>

              <div className="space-y-3">
                <label className="text-lg font-bold text-slate-700">Nome Completo</label>
                <input type="text" placeholder="Digite o nome completo"
                  className="w-full px-6 py-5 text-xl rounded-2xl border-2 border-slate-200 focus:border-brand-teal outline-none transition-colors font-bold text-slate-900 bg-slate-50"
                  value={curName} onChange={(e) => setCurName(e.target.value)} />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-bold text-slate-700">Congregação</label>
                <input type="text" placeholder="Qual a congregação?"
                  className="w-full px-6 py-5 text-xl rounded-2xl border-2 border-slate-200 focus:border-brand-teal outline-none transition-colors font-bold text-slate-900 bg-slate-50"
                  value={curCong} onChange={(e) => setCurCong(e.target.value)} />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button disabled={curName.trim().length < 3} onClick={goToMemberAccessories}
                  className={`w-full py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 transition-all ${curName.trim().length >= 3 ? "bg-brand-teal text-slate-900 hover:scale-[1.02] shadow-xl" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
                  Escolher Acessórios <ArrowRight size={28} />
                </button>
                <button onClick={currentIdx > 0 ? goBackToPrevMember : () => setMainStep("init")}
                  className="w-full py-4 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all font-bold text-base">
                  <ArrowLeft size={18} /> Voltar
                </button>
              </div>
            </div>
          )}

          {/* SUB 2: ACESSÓRIOS */}
          {memberSubStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">Acessórios de {curName}</h2>
                <p className="text-lg text-slate-500">Escolha os itens para este crachá.</p>
              </div>

              <div className="space-y-4">
                {accessoryItems.length > 0 ? accessoryItems.map((ti: any) => {
                  const isSelected = curItems.includes(ti.itemId);
                  const blockedBy = accessoryItems.find((o: any) => curItems.includes(o.itemId) && o.exclusiveWith?.split(",").includes(ti.itemId));
                  const isBlocked = !!blockedBy;
                  return (
                    <div key={ti.itemId} onClick={() => !isBlocked && toggleItem(ti.itemId)}
                      className={`p-6 rounded-2xl border-4 transition-all flex items-center gap-6 cursor-pointer ${isSelected ? "border-brand-teal bg-brand-teal/5" : isBlocked ? "opacity-50 border-slate-100 bg-slate-50 cursor-not-allowed grayscale" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"}`}>
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden shrink-0 transition-all ${isSelected ? "bg-brand-teal text-slate-900" : "bg-slate-100 text-slate-400"}`}>
                        {isSelected ? <Check size={40} strokeWidth={3} /> : ti.item.imageUrl ? <img src={ti.item.imageUrl} alt={ti.item.name} className="w-full h-full object-cover" /> : <Package size={32} />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-black text-2xl ${isSelected ? "text-slate-900" : "text-slate-700"}`}>{ti.item.name}</p>
                        <p className={`text-sm font-black uppercase tracking-widest mt-1 ${isSelected ? "text-brand-teal" : "text-slate-500"}`}>
                          {ti.isRequired ? "INCLUSO NO KIT" : isBlocked ? "INCOMPATÍVEL" : `+ R$ ${ti.item.price.toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-center text-slate-500 text-xl font-bold py-10 bg-slate-50 rounded-2xl">Nenhum acessório disponível.</p>
                )}
              </div>

              {/* Placar de preço — acumula conforme o usuário avança */}
              {(() => {
                const base = template.basePrice ?? 0;
                const extras = accessoryItems
                  .filter((ti: any) => curItems.includes(ti.itemId) && !ti.isRequired)
                  .reduce((s: number, ti: any) => s + (ti.item.price ?? 0), 0);
                const curTotal = base + extras;
                const accumulated = members.reduce((s, m) => s + memberTotal(m), 0) + curTotal;
                return (
                  <div className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Este crachá</p>
                      <p className="text-2xl font-black text-white">R$ {curTotal.toFixed(2)}</p>
                    </div>
                    {quantity > 1 && (
                      <>
                        <div className="w-px h-10 bg-slate-700" />
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total até agora</p>
                          <p className="text-2xl font-black text-brand-teal">R$ {accumulated.toFixed(2)}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}

              <div className="flex flex-col gap-3">
                <button onClick={confirmCurrentMember}
                  className="w-full py-6 bg-brand-teal text-slate-900 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-xl hover:scale-[1.02]">
                  {currentIdx + 1 < quantity ? `Próximo Crachá (#${currentIdx + 2})` : "Ver Resumo"} <ArrowRight size={28} />
                </button>
                <button onClick={goToMemberData}
                  className="w-full py-4 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all font-bold text-base">
                  <ArrowLeft size={18} /> Voltar para os dados
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── STEP SUMMARY ── */}
      {mainStep === "summary" && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">Resumo</h2>
            <p className="text-lg text-slate-500">Confira todos os crachás antes de finalizar.</p>
          </div>

          <div className="space-y-3">
            {members.map((m, i) => {
              const extras = accessoryItems.filter((ti: any) => m.selectedItems.includes(ti.itemId) && !ti.isRequired);
              return (
                <div key={i} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-xl text-slate-900">{m.name}</p>
                      {m.congregation && <p className="text-sm text-slate-500 font-bold">{m.congregation}</p>}
                    </div>
                    <span className="font-black text-xl text-brand-teal">R$ {memberTotal(m).toFixed(2)}</span>
                  </div>
                  {extras.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {extras.map((ti: any) => (
                        <span key={ti.itemId} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-black text-slate-600 uppercase tracking-wide">
                          {ti.item.name} +R${ti.item.price.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center p-5 bg-slate-900 rounded-2xl">
            <span className="text-white font-black text-xl">Total Geral</span>
            <span className="font-black text-2xl text-brand-teal">R$ {grandTotal().toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button onClick={() => setMainStep("preview")}
              className="w-full py-5 md:py-6 bg-brand-teal text-slate-900 rounded-2xl font-black text-xl md:text-2xl flex items-center justify-center gap-3 md:gap-4 transition-all shadow-xl hover:scale-[1.02]">
              Ver Crachá e Aprovar <ArrowRight size={28} className="shrink-0" />
            </button>
            <button onClick={goBackFromSummary}
              className="w-full py-3 md:py-4 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm md:text-base">
              <ArrowLeft size={18} className="shrink-0" /> Voltar e corrigir
            </button>
          </div>
        </div>
      )}

      {/* ── STEP PREVIEW ── */}
      {mainStep === "preview" && members.length > 0 && (
        <PreviewCarousel
          members={members}
          template={template}
          config={config}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={() => setMainStep("summary")}
        />
      )}
    </div>
  );
}

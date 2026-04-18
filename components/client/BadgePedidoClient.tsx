"use client";

import React, { useState } from "react";
import BadgeCanvas from "../canvas/BadgeCanvas";
import PedidoForm from "./PedidoForm";
import FeedbackModal from "../ui/FeedbackModal";
import PixModal from "./PixModal"; // Novo import
import { createOrder } from "@/app/pedido/[slug]/actions";

interface BadgePedidoClientProps {
  event: any;
  template: any;
  config: any;
}

export default function BadgePedidoClient({
  event,
  template,
  config,
}: BadgePedidoClientProps) {
  const [name, setName] = useState("");
  const [congregation, setCongregation] = useState("");
  const [photoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [localConfig, setLocalConfig] = useState(config);

  const [modalOpen, setModalOpen] = useState(false);
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);

  const [modal, setModal] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    type: "success",
    title: "",
    message: "",
  });

  const [groupMembers, setGroupMembers] = useState<any[]>([]);

  const handleAddMember = (memberData: any) => {
    // Adiciona o membro atual à lista com sua configuração de crachá específica
    setGroupMembers(prev => [...prev, {
      clientName: memberData.clientName,
      congregation: memberData.congregation,
      photoUrl: memberData.photoUrl,
      items: memberData.items,
      customConfigJson: JSON.stringify(localConfig)
    }]);

    // Feedback visual
    setModal({
      type: "success",
      title: "✨ Membro Adicionado!",
      message: `${memberData.clientName} foi adicionado à sua família. Agora você pode cadastrar o próximo crachá ou ir para o pagamento.`,
    } as any);
    setModalOpen(true);

    // Reseta o nome para o preview ficar limpo para o próximo
    setName("");
  };

  const openWhatsapp = () => {
    const phone = "553173211332";
    const text = encodeURIComponent(`Olá! Acabei de fazer um pedido de crachá no NexPrint para o evento: ${event.name}.\n\n- Nome: ${name}\n- Congregação: ${congregation}\n\n* Estou enviando o comprovante do pagamento.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };


  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    // 1. MONTAR O LOTE FINAL (O que está no form agora + o que já estava na lista)
    const currentMemberFull = {
      clientName: formData.clientName,
      congregation: formData.congregation,
      photoUrl: formData.photoUrl,
      items: formData.items,
      customConfigJson: JSON.stringify(localConfig)
    };

    const allMembers = [...groupMembers, currentMemberFull];

    // 2. CALCULAR TOTAL DO GRUPO
    const basePrice = template.basePrice || 0;
    const requiredItemIds = new Set(template.items?.filter((ti: any) => ti.isRequired).map((ti: any) => ti.itemId) || []);

    let subtotalGeral = 0;
    allMembers.forEach(m => {
      // Base do crachá
      subtotalGeral += basePrice;
      // Itens Extras de cada cada crachá
      const extras = m.items.filter((id: string) => !requiredItemIds.has(id)).reduce((acc: number, id: string) => {
        const ti = template.items.find((i: any) => i.itemId === id);
        return acc + (ti?.item?.price || 0);
      }, 0);
      subtotalGeral += extras;
    });

    const totalFinal = subtotalGeral + (formData.shippingCost || 0);
    setOrderAmount(totalFinal);

    // 3. ENVIAR PARA O BACKEND
    const result = await createOrder({
      eventId: event.id,
      badgeTemplateId: template.id,
      phone: formData.phone, // Celular único do responsável
      members: allMembers,

      // Dados de Entrega (Do último formulário preenchido)
      isFromItabira: formData.isFromItabira,
      zipCode: formData.zipCode,
      address: formData.address,
      number: formData.number,
      complement: formData.complement,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      shippingCost: formData.shippingCost,
      shippingService: formData.shippingService,
      paymentMethod: formData.paymentMethod,
    } as any);

    if (result.success) {
      if (formData.paymentMethod === "PIX") {
        setPixModalOpen(true);
      } else {
        setModal({
          type: "success",
          title: "✅ Pedidos Concluídos!",
          message:
            `Recebemos os ${allMembers.length} crachás da sua família com sucesso! \n\nClique abaixo para nos avisar no WhatsApp.`,
          actionLabel: "Avisar no WhatsApp",
          onAction: openWhatsapp
        } as any);
        setModalOpen(true);
      }
    } else {
      setModal({
        type: "error",
        title: "Ops! Ocorreu um problema",
        message: result.error || "Não foi possível confirmar o pedido.",
      } as any);
      setModalOpen(true);
    }
    setIsSubmitting(false);
  };

  // Componente do preview do crachá (reutilizado em ambos os layouts)
  const badgePreview = (
    <div className="flex flex-col min-h-full h-full w-full justify-start pt-6">
      <div className="w-full flex-grow flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8">
          <svg className="w-4 h-4 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] font-outfit">
            Preview do {groupMembers.length + 1}º Crachá
          </span>
        </div>

        {/* Crachá Simples e Elegante */}
        <div className="relative mx-auto rounded-[32px] overflow-hidden shadow-2xl">
          <BadgeCanvas
            name={name}
            congregation={congregation}
            photoUrl={photoUrl}
            bgImageUrl={template.bgImageUrl}
            config={localConfig}
            interactive={true}
            lockVertical={true}
            onUpdateConfig={(newConfig: any) => setLocalConfig(newConfig)}
          />
        </div>

        <div className="mt-auto w-full pt-10">
          <div className="p-4 bg-[#1a2235]/60 border border-white/5 rounded-2xl flex items-start gap-4">
            <div className="pt-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 5a7 7 0 0 1 7 7c0 2.22-1.18 4.25-3 5.37V18H8v-.63C6.18 16.25 5 14.22 5 12a7 7 0 0 1 7-7Z"/></svg>
            </div>
            <div className="text-xs font-medium text-slate-400">
              <strong className="text-white">Dica de Especialista:</strong> Arraste os elementos no crachá para personalizar a posição. O que você vê é exatamente o que será impresso.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-[1300px] mx-auto">
        {/* Layout Simétrico App-Like - Flat Dark Style */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Lado do Formulário */}
          <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#0f172a]/90 p-8 md:p-10 rounded-[32px] border border-slate-800 shadow-xl flex flex-col">
            <PedidoForm
              onDataChange={(data: any) => {
                setName(data.clientName);
                setCongregation(data.congregation);
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              items={template.items || []}
              basePrice={template.basePrice || 0}
              membersCount={groupMembers.length}
              onAddMember={handleAddMember}
            />
          </div>

          {/* Lado do Preview */}
          <div className="w-full lg:w-[55%] xl:w-[60%] bg-[#0f172a]/90 p-8 md:p-10 rounded-[32px] border border-slate-800 shadow-xl flex items-center justify-center">
            {badgePreview}
          </div>

        </div>
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModalOpen(false)}
        actionLabel={(modal as any).actionLabel}
        onAction={(modal as any).onAction}
      />

      <PixModal
        isOpen={pixModalOpen}
        onClose={() => {
          setPixModalOpen(false);
          // Logo após fechar o PIX, mostramos a mensagem de sucesso com botão do WhatsApp
          setModal({
            type: "success",
            title: "✅ Quase lá!\nPedido no Sistema!",
            message: "Seu pedido foi registrado. \n\nClique no botão abaixo para nos enviar o **comprovante via WhatsApp** e agilizar sua produção!",
            actionLabel: "Enviar Comprovante (WhatsApp)",
            onAction: openWhatsapp
          } as any);
          setModalOpen(true);
        }}
        amount={orderAmount}
      />
    </>
  );
}



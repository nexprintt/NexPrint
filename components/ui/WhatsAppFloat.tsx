"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phone = "553173211332";
  const message = encodeURIComponent("Olá! Estou no site da NexPrint e gostaria de tirar uma dúvida.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group"
      aria-label="Falar no WhatsApp"
    >
      {/* Tooltip de Texto */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-slate-100">
        Fale com a gente! 🚀
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-slate-100"></div>
      </div>

      {/* Botão Principal */}
      <div className="relative">
        {/* Efeito de Pulso */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
        
        <div className="relative size-14 md:size-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transform hover:scale-110 active:scale-95 transition-all duration-300">
          <MessageCircle size={32} fill="currentColor" className="text-white" />
        </div>
        
        {/* Badge Online */}
        <div className="absolute top-0 right-0 size-4 bg-red-500 border-2 border-white rounded-full"></div>
      </div>
    </a>
  );
}

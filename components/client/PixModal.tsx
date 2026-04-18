"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function PixModal({ isOpen, onClose, amount }: PixModalProps) {
  const [copied, setCopied] = useState(false);
  const pixKey = "31982925128"; // Chave Celular do cliente
  const pixPayload = `00020101021126580014BR.GOV.BCB.PIX0111${pixKey}5204000053039865802BR5908NEXPRINT6007ITABIRA62070503***6304ABCD`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm p-0 border-0 rounded-[44px] overflow-hidden shadow-2xl">
        {/* Título acessível */}
        <DialogHeader className="sr-only">
          <DialogTitle>Pagamento via PIX</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie o código para pagar R$ {amount.toFixed(2)}.
          </DialogDescription>
        </DialogHeader>

        {/* Header escuro premium */}
        <div className="bg-slate-900 px-8 pt-10 pb-8 text-white text-center relative">
          <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30 scale-110">
            <QrCode size={30} className="text-white" />
          </div>
          <h3 className="text-2xl font-black font-outfit tracking-tight">Pagamento PIX</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">
            Setup Instantâneo
          </p>
        </div>

        {/* Corpo */}
        <div className="px-8 pb-10 pt-6 space-y-7 bg-white">
          {/* Valor */}
          <div className="text-center py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
              Total a Transferir
            </p>
            <p className="text-4xl font-black text-foreground tabular-nums font-outfit">
              R$ {amount.toFixed(2)}
            </p>
          </div>

          {/* QR Code */}
          <div className="relative mx-auto size-52 bg-white rounded-[32px] flex items-center justify-center p-5 shadow-inner border border-slate-100">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`}
              alt="QR Code PIX"
              className="w-full h-full rounded-2xl"
            />
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className={`w-full h-12 font-black rounded-2xl transition-all border-2 ${
                copied
                  ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
                  : "border-border hover:border-primary hover:text-primary hover:bg-accent"
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} strokeWidth={3} data-icon="inline-start" />
                  Código Copiado!
                </>
              ) : (
                <>
                  <Copy size={18} data-icon="inline-start" />
                  Copiar Código PIX
                </>
              )}
            </Button>

            <Button
              onClick={onClose}
              className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-base shadow-xl border-0"
            >
              Confirmar Pagamento
            </Button>
          </div>

          {/* Rodapé */}
          <p className="text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
            Confirmação automática após a transferência.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

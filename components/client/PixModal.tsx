"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Check, X } from "lucide-react";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Nova prop para sucesso
  amount: number;
}

export default function PixModal({ isOpen, onClose, onConfirm, amount }: PixModalProps) {
  const [copied, setCopied] = useState(false);

  // Função oficial para calcular o CRC16 (padrão PIX)
  const calculateCRC16 = (data: string) => {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
  };

  const generatePixPayload = (value: number) => {
    const pixKey = "dd0ded1f-35ce-40c6-bef6-c9e33d505240";
    const amountStr = value.toFixed(2);
    const merchantName = "NEXPRINT";
    const merchantCity = "ITABIRA";

    const parts = [
      "000201", // Payload Format Indicator
      `26580014BR.GOV.BCB.PIX0136${pixKey}`, // Merchant Account Info
      "52040000", // Category Code
      "5303986",  // Currency BRL
      `54${amountStr.length.toString().padStart(2, "0")}${amountStr}`, // Amount
      "5802BR",   // Country
      `59${merchantName.length.toString().padStart(2, "0")}${merchantName}`,
      `60${merchantCity.length.toString().padStart(2, "0")}${merchantCity}`,
      "62070503***", // Info Adicional
      "6304",      // CRC16 Indicator
    ];

    const payload = parts.join("");
    return payload + calculateCRC16(payload);
  };

  const pixPayload = generatePixPayload(amount);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm p-0 border-0 rounded-[44px] overflow-hidden shadow-2xl bg-white">
        <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Título acessível */}
          <DialogHeader className="sr-only">
            <DialogTitle>Pagamento via PIX</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code ou copie o código para pagar R$ {amount.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>

          {/* Header escuro premium mais compacto */}
          <div className="bg-slate-900 px-6 pt-10 pb-8 text-white text-center relative">
            <div className="size-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <QrCode size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black font-outfit tracking-tight">Pagamento PIX</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Setup Instantâneo
            </p>
          </div>

          {/* Corpo mais distribuído */}
          <div className="px-6 pb-10 pt-8 space-y-6 bg-white">
            {/* Valor mais discreto e elegante */}
            <div className="text-center py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total:</span>
              <span className="text-3xl font-black text-foreground tabular-nums font-outfit">
                R$ {amount.toFixed(2)}
              </span>
            </div>

            {/* QR Code otimizado */}
            <div className="relative mx-auto size-48 bg-white rounded-[24px] flex items-center justify-center p-4 shadow-inner border border-slate-50">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`}
                alt="QR Code PIX"
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Ações aproximadas */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className={`w-full h-12 text-xs font-black rounded-xl transition-all border-2 ${
                  copied
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
                    : "border-border hover:border-primary hover:text-primary hover:bg-accent"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} strokeWidth={3} className="mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2" />
                    Copiar Código PIX
                  </>
                )}
              </Button>

              <Button
                onClick={onConfirm}
                className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-sm shadow-lg border-0"
              >
                Confirmar Pagamento
              </Button>
            </div>

            {/* Rodapé minimalista */}
            <p className="text-center text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed px-4">
              Aprovação automática após transferência.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

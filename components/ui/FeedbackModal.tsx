"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeedbackModalProps {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export default function FeedbackModal({
  isOpen,
  type,
  title,
  message,
  onClose,
  actionLabel,
  onAction,
}: FeedbackModalProps) {
  const handleAction = () => {
    if (onAction) onAction();
    onClose();
  };

  const isSuccess = type === "success";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-[40px] border border-white/5 bg-[#0a0f1c] p-10 shadow-2xl text-center overflow-hidden">
        {/* Título para acessibilidade (visualmente oculto se não necessário) */}
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6">
          {/* Ícone animado */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className={`size-24 rounded-3xl flex items-center justify-center ${
              isSuccess
                ? "bg-brand-teal/20 text-brand-teal"
                : "bg-red-950/80 text-white"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 size={40} strokeWidth={2.5} />
            ) : (
              <AlertCircle size={40} strokeWidth={2.5} />
            )}
          </motion.div>

          {/* Conteúdo */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white tracking-tight font-outfit whitespace-pre-line leading-tight">
              {title}
            </h3>
            <p className="text-slate-400 text-sm font-medium whitespace-pre-line leading-relaxed px-2">
              {message}
            </p>
          </div>

          {/* Ação */}
          <Button
            onClick={handleAction}
            className={`w-full h-14 text-base font-black rounded-2xl transition-colors ${
              isSuccess 
                ? "bg-brand-teal text-brand-navy hover:bg-brand-teal-dark" 
                : "bg-[#1f0909] text-red-500 hover:bg-red-950 border border-red-900/30"
            }`}
            variant="ghost"
          >
            {actionLabel || (isSuccess ? "Entendido" : "Corrigir Agora")}
          </Button>
        </div>

        {/* Detalhe de fundo */}
        <div
          className={`absolute -bottom-24 -left-24 size-60 rounded-full blur-[80px] opacity-10 pointer-events-none ${
            isSuccess ? "bg-primary" : "bg-destructive"
          }`}
        />
      </DialogContent>
    </Dialog>
  );
}

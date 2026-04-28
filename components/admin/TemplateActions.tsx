"use client";

import React, { useState } from "react";
import { Trash2, Edit3, Play, Pause } from "lucide-react";
import { deleteTemplate, toggleTemplateStatus } from "../../app/admin/templates/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { motion } from "framer-motion";

interface TemplateActionsProps {
  id: string;
  isActive: boolean;
}

export default function TemplateActions({ id, isActive }: TemplateActionsProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;
    
    // Usando confirm do navegador por simplicidade, mas o feedback será via Toast
    if (confirm("Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.")) {
      setLoading(true);
      try {
        const result = await deleteTemplate(id);
        if (result.success) {
          if (result.archived) {
            showToast("Template arquivado (não pode ser excluído por ter pedidos).", "info");
          } else {
            showToast("Template excluído com sucesso!", "success");
          }
        } else {
          showToast(result.error || "Erro ao excluir template", "error");
        }
      } catch (err) {
        showToast("Erro ao processar exclusão", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggle = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const result = await toggleTemplateStatus(id, isActive);
      if (result.success) {
        showToast(result.isActive ? "Template ativado!" : "Template pausado com sucesso.", "success");
      } else {
        showToast(result.error || "Erro ao alterar status", "error");
      }
    } catch (err) {
      showToast("Erro ao processar alteração de status", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1.5">
      {/* Botão de Toggle (Play/Pause) */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        disabled={loading}
        className={`p-2 rounded-xl transition-all shadow-sm flex items-center justify-center ${
          isActive 
            ? "bg-amber-50 text-amber-500 hover:bg-amber-100" 
            : "bg-emerald-50 text-emerald-500 hover:bg-emerald-100"
        }`}
        title={isActive ? "Pausar Template" : "Ativar Template"}
      >
        {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </motion.button>

      {/* Botão de Editar */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push(`/admin/templates/${id}/editar`)}
        disabled={loading}
        className="p-2 bg-slate-50 text-slate-400 hover:text-brand-teal hover:bg-slate-100 rounded-xl transition-all shadow-sm flex items-center justify-center"
        title="Editar Template"
      >
        <Edit3 size={18} />
      </motion.button>

      {/* Botão de Excluir */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={handleDelete}
        disabled={loading}
        className="p-2 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all shadow-sm flex items-center justify-center"
        title="Excluir Template"
      >
        <Trash2 size={18} />
      </motion.button>
    </div>
  );
}

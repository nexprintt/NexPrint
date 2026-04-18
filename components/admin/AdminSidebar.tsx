"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  Users, 
  Box, 
  PlusCircle,
  Printer,
  LogOut,
  Cpu,
  Droplets,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/login/actions";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Printer, label: "Pedidos", href: "/admin/pedidos" },
  { icon: Box, label: "Produtos / Itens", href: "/admin/itens" },
  { icon: PlusCircle, label: "Templates", href: "/admin/templates" },
  { icon: Users, label: "Clientes", href: "/admin/clientes" },
  { icon: Cpu, label: "Impressora", href: "/admin/impressora" },
  { icon: Settings, label: "Configurações", href: "/admin/config" },
];

interface PrinterStatus {
  printerStatus: string;
  ribbonRemaining: number;
  printerModel: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [printerInfo, setPrinterInfo] = useState<PrinterStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPrinterStatus = async () => {
      try {
        const res = await fetch("/api/printer/telemetry");
        if (res.ok) {
          const data = await res.json();
          setPrinterInfo(data);
        }
      } catch {
        // Silenciosamente falha se a impressora não responder
      }
    };

    fetchPrinterStatus();
    const interval = setInterval(fetchPrinterStatus, 30000); // Refresh 30s
    return () => clearInterval(interval);
  }, []);

  // Fechar sidebar ao mudar de rota no mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isOnline = printerInfo?.printerStatus === "Ready" || printerInfo?.printerStatus === "Busy";
  const ribbonPercent = printerInfo?.ribbonRemaining ?? 0;
  const ribbonColor = ribbonPercent > 50 ? "bg-emerald-400" : ribbonPercent > 20 ? "bg-yellow-400" : "bg-red-400";

  return (
    <>
      {/* Botão Hambúrguer Mobile */}
      <div className="lg:hidden fixed top-6 left-6 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-brand-navy text-white rounded-2xl shadow-xl shadow-brand-navy/20 border border-white/10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay de fundo no mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-brand-navy text-white p-8 flex flex-col gap-10 transition-transform duration-300 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl shadow-black/50" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center font-black text-brand-navy text-xl shadow-lg shadow-brand-teal/20">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight leading-none text-white">NexPrint</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-teal/60 mt-1">Console de Gestão</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isPrinter = item.href === "/admin/impressora";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm relative group",
                  isActive 
                    ? "bg-brand-teal text-brand-navy shadow-lg shadow-brand-teal/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive ? "bg-brand-navy/10" : "bg-transparent group-hover:bg-white/5"
                )}>
                  <Icon size={18} />
                </div>
                <span>{item.label}</span>
                {/* Badge de status da impressora */}
                {isPrinter && printerInfo && (
                  <span className={cn(
                    "ml-auto w-2 h-2 rounded-full",
                    isOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-6">
          {/* Painel de Status da Impressora - Visual Renewed */}
          <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/[0.05] space-y-4">
            <header className="flex items-center justify-between">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Impressora</p>
              <div className={cn(
                "w-2 h-2 rounded-full",
                isOnline ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" : "bg-red-400"
              )} />
            </header>
            
            <div className="flex flex-col gap-1">
              <span className="text-white font-black text-sm tracking-tight leading-none">
                {isOnline ? "Pronta para Impressão" : "Dispositivo Offline"}
              </span>
              {printerInfo?.printerModel && (
                <span className="text-slate-500 text-[10px] font-bold">
                  {printerInfo.printerModel}
                </span>
              )}
            </div>

            {/* Mini barra do ribbon */}
            {printerInfo && ribbonPercent >= 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tight">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Droplets size={12} className="text-brand-teal" />
                    Fita Ribbon
                  </span>
                  <span className={cn(
                    ribbonPercent > 50 ? "text-emerald-400" : ribbonPercent > 20 ? "text-yellow-400" : "text-red-400"
                  )}>
                    {ribbonPercent}%
                  </span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${ribbonPercent}%` }}
                    className={cn("h-full rounded-full", ribbonColor)}
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-5 py-5 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>
    </>
  );
}

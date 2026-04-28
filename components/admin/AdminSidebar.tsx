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
  X,
  ChevronLeft,
  ChevronRight
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Carregar estado inicial do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    if (saved === "true") setIsCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("admin-sidebar-collapsed", String(next));
  };

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
        "fixed inset-y-0 left-0 z-50 bg-brand-navy text-white flex flex-col gap-10 transition-all duration-300 lg:static lg:translate-x-0",
        isCollapsed ? "w-24 p-5 items-center" : "w-72 p-8",
        isOpen ? "translate-x-0 shadow-2xl shadow-black/50" : "-translate-x-full"
      )}>
        <div className={cn("flex items-center gap-3 transition-all", isCollapsed ? "px-0 justify-center" : "px-2")}>
          <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center font-black text-brand-navy text-xl shadow-lg shadow-brand-teal/20 shrink-0">
            N
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-xl font-black tracking-tight leading-none text-white">NexPrint</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-teal/60 mt-1">Console de Gestão</span>
            </div>
          )}
        </div>

        {/* Botão para colapsar (Desktop) */}
        <button 
          onClick={toggleCollapse}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-brand-teal text-brand-navy rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform z-[60]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

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
                  "flex items-center rounded-2xl transition-all font-bold text-sm relative group",
                  isCollapsed ? "px-0 justify-center w-12 h-12 mx-auto" : "gap-4 px-5 py-4",
                  isActive 
                    ? "bg-brand-teal text-brand-navy shadow-lg shadow-brand-teal/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
                title={isCollapsed ? item.label : ""}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors shrink-0",
                  isActive ? "bg-brand-navy/10" : "bg-transparent group-hover:bg-white/5"
                )}>
                  <Icon size={isCollapsed ? 20 : 18} />
                </div>
                {!isCollapsed && <span>{item.label}</span>}
                {/* Badge de status da impressora */}
                {isPrinter && printerInfo && (
                  <span className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    isCollapsed ? "absolute top-1 right-1" : "ml-auto",
                    isOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-6">
          {/* Painel de Status da Impressora - Visual Renewed */}
          {!isCollapsed ? (
            <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/[0.05] space-y-4">
              <header className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Impressora</p>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isOnline ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" : "bg-red-400"
                )} />
              </header>
              
              <div className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
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
          ) : (
            <div className="flex justify-center py-2">
               <div className={cn(
                "w-3 h-3 rounded-full",
                isOnline ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" : "bg-red-400"
              )} title="Status da Impressora" />
            </div>
          )}

          <button 
            onClick={() => logout()}
            className={cn(
              "w-full flex items-center rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-black uppercase tracking-widest",
              isCollapsed ? "justify-center py-4" : "gap-4 px-5 py-5 text-xs"
            )}
            title={isCollapsed ? "Encerrar Sessão" : ""}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Encerrar Sessão</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

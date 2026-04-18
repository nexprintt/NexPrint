"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`
                flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[320px] max-w-md
                ${toast.type === "success" ? "bg-emerald-50/90 border-emerald-100 text-emerald-900" : ""}
                ${toast.type === "error" ? "bg-rose-50/90 border-rose-100 text-rose-900" : ""}
                ${toast.type === "info" ? "bg-blue-50/90 border-blue-100 text-blue-900" : ""}
              `}>
                <div className={`shrink-0 p-2 rounded-xl ${
                  toast.type === "success" ? "bg-emerald-100" : 
                  toast.type === "error" ? "bg-rose-100" : "bg-blue-100"
                }`}>
                  {toast.type === "success" && <CheckCircle2 size={18} className="text-emerald-600" />}
                  {toast.type === "error" && <AlertCircle size={18} className="text-rose-600" />}
                  {toast.type === "info" && <Info size={18} className="text-blue-600" />}
                </div>
                
                <p className="flex-1 text-sm font-bold leading-tight">{toast.message}</p>
                
                <button 
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X size={16} className="opacity-40 hover:opacity-100" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

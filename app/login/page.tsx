"use client";

import React, { useState, useTransition } from "react";
import { login } from "./actions";
import { ShieldCheck, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal rounded-3xl mb-6 shadow-lg shadow-brand-teal/20">
            <ShieldCheck className="text-brand-navy" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">NexPrint Admin</h1>
          <p className="text-slate-400">Acesso restrito ao painel de gestão.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 shadow-2xl">
          <form action={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-widest pl-2">E-mail</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-teal transition-all" size={20} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-widest pl-2">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-teal transition-all" size={20} />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/10 transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <button
              disabled={isPending}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-brand-navy font-black py-5 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-xl shadow-brand-teal/10"
            >
              {isPending ? (
                <>Processando... <Loader2 className="animate-spin" size={20} /></>
              ) : (
                <>Entrar no Painel <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
          Tecnologia em Impressão de Alta Performance
        </p>
      </div>
    </div>
  );
}

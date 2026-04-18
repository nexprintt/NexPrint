import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-6 pt-24 lg:pt-12 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-1">Controle Central</h1>
            <p className="text-3xl font-black text-brand-navy tracking-tight">Painel de Gestão</p>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <div className="bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 px-5">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-brand-navy leading-none">Bruno</span>
                <span className="text-[10px] font-bold text-slate-400">Administrador</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center text-sm font-black shadow-lg shadow-brand-navy/10">
                B
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

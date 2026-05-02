import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Skeleton de Header */}
      <div className="w-full max-w-7xl mx-auto h-20 flex items-center justify-between mb-12 animate-pulse">
        <div className="w-48 h-10 bg-slate-100 rounded-lg"></div>
        <div className="hidden md:block w-32 h-6 bg-slate-50 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Skeleton do Lado Esquerdo (Preview) */}
        <div className="space-y-8 animate-pulse">
          <div className="aspect-[1011/638] bg-slate-100 rounded-[40px] shadow-sm"></div>
          <div className="space-y-4">
            <div className="w-3/4 h-8 bg-slate-100 rounded-lg"></div>
            <div className="w-1/2 h-4 bg-slate-50 rounded-lg"></div>
          </div>
        </div>

        {/* Skeleton do Lado Direito (Formulário) */}
        <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 md:p-12 space-y-8 shadow-sm animate-pulse">
          <div className="w-1/3 h-6 bg-slate-100 rounded-lg mb-8"></div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-24 h-4 bg-slate-50 rounded"></div>
                <div className="w-full h-14 bg-slate-100 rounded-2xl"></div>
              </div>
            ))}
          </div>

          <div className="w-full h-20 bg-brand-teal/10 rounded-[32px] mt-12"></div>
        </div>
      </div>

      {/* Spinner Flutuante para dar feedback extra */}
      <div className="fixed bottom-12 right-12 flex items-center gap-3 px-6 py-3 bg-white shadow-2xl rounded-full border border-slate-100">
        <Loader2 className="animate-spin text-brand-teal" size={20} />
        <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Preparando Formulário...</span>
      </div>
    </div>
  );
}

import React from "react";
import prisma from "@/lib/prisma";
import ItemManagerClient from "@/components/admin/ItemManagerClient";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function ItensList() {
  const itens = await prisma.badgeItem.findMany({
    orderBy: { name: 'asc' }
  });

  return <ItemManagerClient initialItens={itens} />;
}

function TableSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-12 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-brand-teal animate-spin" />
      <span className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Carregando Itens...</span>
    </div>
  );
}

export default function ItensPage() {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-black text-brand-navy tracking-tight uppercase">Estoque de Peças</h2>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
             Carregando itens...
           </p>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <ItensList />
      </Suspense>
    </div>
  );
}

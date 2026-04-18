import React from "react";
import prisma from "@/lib/prisma";
import { Download, Printer } from "lucide-react";
import OrdersTableClient from "@/components/admin/OrdersTableClient";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function PedidosList() {
  const orders = await prisma.order.findMany({
    include: {
      event: true,
      template: true, // Adicionado para o preview do crachá
      items: {
        include: { item: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <div className="mb-4">
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
          {orders.length} pedidos realizados no total
        </p>
      </div>
      <OrdersTableClient initialOrders={orders} />
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-12 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-brand-teal animate-spin" />
      <span className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Carregando Pedidos...</span>
    </div>
  );
}

export default function PedidosPage() {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-black text-brand-navy tracking-tight uppercase">Gerenciar Pedidos</h2>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
             Carregando banco de dados...
           </p>
        </div>
        <div className="flex gap-3">
          <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand-navy hover:border-slate-300 transition-all shadow-sm">
            <Download size={20} />
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-brand-navy text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-navy/90 transition-all shadow-xl shadow-brand-navy/20">
            <Printer size={20} /> Imprimir Lote
          </button>
        </div>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <PedidosList />
      </Suspense>
    </div>
  );
}

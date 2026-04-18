import React from "react";
import prisma from "@/lib/prisma";
import { Users, Search, Filter, Download, Mail, Phone } from "lucide-react";

export default async function ClientesPage() {
  // Buscamos os nomes únicos e congregações dos pedidos realizados
  const orders = await prisma.order.findMany({
    select: {
      clientName: true,
      congregation: true,
      createdAt: true,
    },
    orderBy: {
      clientName: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-brand-navy">Participantes / Clientes</h2>
          <p className="text-slate-400 text-sm">Lista de todos que solicitaram crachás no sistema.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Download size={20} /> Exportar CSV
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Filtrar por nome ou congregação..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-teal/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Participante</th>
              <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Congregação</th>
              <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Primeiro Pedido</th>
              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Contato</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((client, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-6 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold">
                      {client.clientName.charAt(0)}
                    </div>
                    <span className="font-black text-brand-navy">{client.clientName}</span>
                  </div>
                </td>
                <td className="px-6 py-6 border-b border-slate-50">
                  <span className="text-sm font-bold text-slate-600">{client.congregation || "Nacional"}</span>
                </td>
                <td className="px-6 py-6 border-b border-slate-50">
                  <span className="text-sm text-slate-400">{new Date(client.createdAt).toLocaleDateString("pt-BR")}</span>
                </td>
                <td className="px-8 py-6 border-b border-slate-50 text-right">
                  <div className="flex justify-end gap-2 text-slate-300">
                    <button className="p-2 hover:text-brand-teal transition-all"><Mail size={18} /></button>
                    <button className="p-2 hover:text-brand-navy transition-all"><Phone size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="py-24 text-center">
            <Users size={48} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-400 font-medium">Nenhum participante registrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import prisma from "@/lib/prisma";
import { 
  ShoppingBag, 
  CreditCard, 
  Users,
  Printer,
  Timer,
  CheckCircle2,
  Package,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// Helper para tempo relativo simples
function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Agora mesmo";
  if (diffInMinutes < 60) return `Há ${diffInMinutes} min`;
  if (diffInHours < 24) return `Há ${diffInHours}h`;
  if (diffInDays === 1) return "Ontem";
  return date.toLocaleDateString("pt-BR");
}

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function DashboardData() {
  // Buscar métricas reais do banco
  const ordersCount = await prisma.order.count();
  const totalFaturamento = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { paymentStatus: "PAID" }
  });
  
  const pendingOrders = await prisma.order.count({
    where: { status: "PENDING" }
  });

  // Buscar os 5 últimos alertas reais
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          item: true
        }
      }
    }
  });

  // Agregação para o Gráfico de Desempenho (Últimos 7 dias)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const chartDataRaw = await prisma.order.findMany({
    where: {
      createdAt: { gte: sevenDaysAgo },
      paymentStatus: "PAID"
    },
    select: {
      totalAmount: true,
      createdAt: true
    }
  });

  // Montar objeto de dias para garantir que todos os dias apareçam no gráfico
  const dailyData: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyData[d.toLocaleDateString("pt-BR", { weekday: "short" })] = 0;
  }

  chartDataRaw.forEach(order => {
    const day = order.createdAt.toLocaleDateString("pt-BR", { weekday: "short" });
    if (day in dailyData) {
      dailyData[day] += order.totalAmount;
    }
  });

  const chartEntries = Object.entries(dailyData).reverse();
  const maxDayValue = Math.max(...Object.values(dailyData), 100);

  const metrics = [
    { 
      label: "Faturamento Total", 
      value: `R$ ${(totalFaturamento._sum.totalAmount || 0).toFixed(2)}`, 
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      label: "Pedidos Realizados", 
      value: ordersCount, 
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Aguardando Impressão", 
      value: pendingOrders, 
      icon: Printer,
      color: "bg-amber-50 text-amber-600"
    },
    { 
      label: "Eventos Ativos", 
      value: await prisma.event.count({ where: { active: true } }), 
      icon: Users,
      color: "bg-purple-50 text-purple-600"
    },
  ];

  return (
    <>
      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${metric.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-slate-500 font-medium text-sm">{metric.label}</p>
              <h3 className="text-2xl font-black text-brand-navy mt-1">{metric.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Gráfico Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-brand-navy">Desempenho Semanal</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-500 px-4 py-2">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-4">
            {chartEntries.map(([day, value], i) => {
              const height = (value / maxDayValue) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="flex-1 w-full flex flex-col justify-end">
                    <div 
                      className="w-full bg-slate-50 group-hover:bg-brand-teal transition-all rounded-xl relative min-h-[4px]" 
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] font-black px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-10 border border-white/10">
                        R$ {value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alertas Recentes Reais */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-brand-navy mb-6">Alertas Recentes</h3>
          <div className="space-y-6 flex-1">
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                <Package size={48} className="text-slate-200 mb-3" />
                <p className="text-sm font-bold text-slate-400">Nenhum pedido recente</p>
              </div>
            ) : (
              recentOrders.map((order) => {
                // Cores por status
                let statusColor = "bg-amber-50 text-amber-600";
                let StatusIcon = Timer;

                if (order.status === "APPROVED") {
                  statusColor = "bg-blue-50 text-blue-600";
                  StatusIcon = ShoppingBag;
                } else if (order.status === "PRINTED") {
                  statusColor = "bg-emerald-50 text-emerald-600";
                  StatusIcon = CheckCircle2;
                }

                // Descrição inteligente de itens
                const extraItems = order.items.map(i => i.item.name);
                const description = extraItems.length > 0 
                  ? `Incluiu: ${extraItems.join(", ")}`
                  : "Solicitou crachá simples.";

                return (
                  <div key={order.id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusColor}`}>
                      <StatusIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-navy leading-none mb-1">
                        {order.clientName}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
                      <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase">
                        {formatRelativeTime(order.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Link 
            href="/admin/pedidos"
            className="w-full mt-8 py-4 border-2 border-slate-50 text-slate-400 font-bold text-sm rounded-2xl hover:bg-slate-50 hover:text-brand-navy transition-all flex items-center justify-center gap-2"
          >
            Ver Todos os Alertas <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white/50 rounded-[32px] border border-slate-100 shadow-sm animate-pulse">
      <Loader2 className="w-12 h-12 text-brand-teal animate-spin mb-4" />
      <h3 className="text-lg font-black text-brand-navy">Processando Relatórios</h3>
      <p className="text-slate-400 text-sm font-medium">Buscando métricas e agregando faturamento...</p>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}

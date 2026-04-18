"use server";

import prisma from "@/lib/prisma";

export async function getDashboardData() {
  const ordersCount = await prisma.order.count();
  const totalFaturamento = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { paymentStatus: "PAID" }
  });
  
  const pendingOrders = await prisma.order.count({
    where: { status: "PENDING" }
  });

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { item: true }
      }
    }
  });

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

  const activeEventsCount = await prisma.event.count({ where: { active: true } });

  return {
    ordersCount,
    totalFaturamento: totalFaturamento._sum.totalAmount || 0,
    pendingOrders,
    recentOrders,
    chartDataRaw,
    activeEventsCount
  };
}

export async function getOrders() {
  return prisma.order.findMany({
    include: {
      event: true,
      template: true,
      items: {
        include: { item: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getClientes() {
  return prisma.order.findMany({
    select: {
      clientName: true,
      congregation: true,
      createdAt: true,
    },
    orderBy: {
      clientName: "asc",
    },
  });
}

export async function getItens() {
  return prisma.badgeItem.findMany({
    orderBy: { name: 'asc' }
  });
}

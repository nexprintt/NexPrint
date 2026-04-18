import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: Criar novo job na fila de impressão
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const job = await prisma.printJob.create({
      data: {
        orderId: data.orderId,
        copies: data.copies ?? 1,
        duplex: data.duplex ?? false,
        colorMode: data.colorMode ?? "Vivid",
        dpi: data.dpi ?? "300x600",
        imageUrl: data.imageUrl ?? null,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar print job:", error);
    return NextResponse.json(
      { error: "Erro ao criar print job" },
      { status: 500 }
    );
  }
}

// GET: Listar jobs com filtro por status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const jobs = await prisma.printJob.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Erro ao listar print jobs:", error);
    return NextResponse.json(
      { error: "Erro ao listar print jobs" },
      { status: 500 }
    );
  }
}

// PATCH: Atualizar status de um job (usado pelo Print Agent)
export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json(
        { error: "ID do job é obrigatório" },
        { status: 400 }
      );
    }

    const job = await prisma.printJob.update({
      where: { id: data.id },
      data: {
        status: data.status,
        errorCode: data.errorCode,
        errorMsg: data.errorMsg,
        retryCount: data.retryCount,
        imageUrl: data.imageUrl,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Erro ao atualizar print job:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar print job" },
      { status: 500 }
    );
  }
}

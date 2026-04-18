import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Retorna a telemetria mais recente da impressora
export async function GET() {
  try {
    let telemetry = await prisma.printerTelemetry.findFirst({
      orderBy: { lastUpdated: "desc" },
    });

    if (!telemetry) {
      // Cria registro inicial se não existir
      telemetry = await prisma.printerTelemetry.create({ data: {} });
    }

    return NextResponse.json(telemetry);
  } catch (error) {
    console.error("Erro ao buscar telemetria:", error);
    return NextResponse.json(
      { error: "Erro ao buscar telemetria" },
      { status: 500 }
    );
  }
}

// PATCH: Print Agent atualiza telemetria periodicamente
export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    // Busca ou cria registro de telemetria
    let telemetry = await prisma.printerTelemetry.findFirst({
      orderBy: { lastUpdated: "desc" },
    });

    if (telemetry) {
      telemetry = await prisma.printerTelemetry.update({
        where: { id: telemetry.id },
        data: {
          printerModel: data.printerModel ?? telemetry.printerModel,
          serialNumber: data.serialNumber ?? telemetry.serialNumber,
          firmwareVersion: data.firmwareVersion ?? telemetry.firmwareVersion,
          printerStatus: data.printerStatus ?? telemetry.printerStatus,
          connectionType: data.connectionType ?? telemetry.connectionType,
          ribbonType: data.ribbonType ?? telemetry.ribbonType,
          ribbonRemaining: data.ribbonRemaining ?? telemetry.ribbonRemaining,
          ribbonPartNumber: data.ribbonPartNumber ?? telemetry.ribbonPartNumber,
          ribbonSerialNumber:
            data.ribbonSerialNumber ?? telemetry.ribbonSerialNumber,
          totalCompleted: data.totalCompleted ?? telemetry.totalCompleted,
          totalPicked: data.totalPicked ?? telemetry.totalPicked,
          totalRejected: data.totalRejected ?? telemetry.totalRejected,
          totalLost: data.totalLost ?? telemetry.totalLost,
          currentCompleted:
            data.currentCompleted ?? telemetry.currentCompleted,
          currentPicked: data.currentPicked ?? telemetry.currentPicked,
          currentRejected: data.currentRejected ?? telemetry.currentRejected,
          cardsSinceClean: data.cardsSinceClean ?? telemetry.cardsSinceClean,
          cleaningsRun: data.cleaningsRun ?? telemetry.cleaningsRun,
          hopper1Status: data.hopper1Status ?? telemetry.hopper1Status,
          exceptionStatus: data.exceptionStatus ?? telemetry.exceptionStatus,
          colorMode: data.colorMode ?? telemetry.colorMode,
          cardsVirtualStock: data.cardsVirtualStock ?? telemetry.cardsVirtualStock,
          cardsPrintedSite: data.cardsPrintedSite ?? telemetry.cardsPrintedSite,
        },
      });
    } else {
      telemetry = await prisma.printerTelemetry.create({ data });
    }

    return NextResponse.json(telemetry);
  } catch (error) {
    console.error("Erro ao atualizar telemetria:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar telemetria" },
      { status: 500 }
    );
  }
}

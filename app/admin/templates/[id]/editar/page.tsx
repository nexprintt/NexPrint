import React from "react";
import prisma from "@/lib/prisma";
import TemplateForm from "@/components/admin/TemplateForm";
import { notFound } from "next/navigation";

interface EditarTemplatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarTemplatePage({ params }: EditarTemplatePageProps) {
  const { id } = await params;

  const template = await prisma.badgeTemplate.findUnique({
    where: { id },
    include: {
      items: true
    }
  });

  const allItems = await prisma.badgeItem.findMany({
    orderBy: { name: 'asc' }
  });

  if (!template) {
    notFound();
  }

  const config = JSON.parse(template.configJson as string) || {};
 
  const initialData = {
    id: template.id,
    name: template.name,
    bgImageUrl: template.bgImageUrl,
    orientation: (config.orientation || "landscape") as "landscape" | "portrait",
    config: config,
    basePrice: template.basePrice,
    associatedItems: template.items.map(ti => ({ id: ti.itemId, isRequired: ti.isRequired }))
  };

  return (
    <div className="min-h-screen bg-white">
      <TemplateForm 
        title="Editar Modelo" 
        isEdit 
        initialData={initialData} 
        availableItems={allItems}
      />
    </div>
  );
}

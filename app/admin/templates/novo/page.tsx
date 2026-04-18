import React from "react";
import TemplateForm from "@/components/admin/TemplateForm";
import prisma from "@/lib/prisma";

export default async function NovoTemplatePage() {
  const allItems = await prisma.badgeItem.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="min-h-screen bg-white">
      <TemplateForm 
        title="Criar Modelo" 
        availableItems={allItems}
      />
    </div>
  );
}

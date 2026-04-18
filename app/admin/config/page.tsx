import React from "react";
import { 
  Settings, 
  Printer, 
  Bell, 
  Database, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function ConfigPage() {
  const sections = [
    {
      title: "Integração Hardware",
      icon: Printer,
      items: [
        { name: "Status da Impressora", description: "Verificar conexão com Entrust Sigma DS2", status: "Online", color: "text-emerald-500" },
        { name: "Fila de Impressão", description: "Configurar limites e prioridades de lote", status: "Automático" },
      ]
    },
    {
      title: "Preferências do Sistema",
      icon: Settings,
      items: [
        { name: "Notificações WhatsApp", description: "Enviar alertas de status via API", status: "Ativado", color: "text-emerald-500" },
        { name: "Logs de Erro", description: "Monitoramento em tempo real do sistema", status: "Ativado" },
      ]
    },
    {
      title: "Banco de Dados & Segurança",
      icon: Database,
      items: [
        { name: "Backup Automático", description: "Sincronização diária do SQLite", status: "Ativado" },
        { name: "Migração Supabase", description: "Gerenciar credenciais de produção", status: "Pendente", color: "text-amber-500" },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-black text-brand-navy">Configurações</h2>
        <p className="text-slate-400 text-sm">Ajustes técnicos e parâmetros de integração do SaaS.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-50 flex items-center gap-3">
              <div className="p-2 bg-brand-navy text-white rounded-lg">
                <section.icon size={18} />
              </div>
              <h3 className="font-bold text-brand-navy text-sm uppercase tracking-widest">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-slate-50">
              {section.items.map((item, i) => (
                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50/30 transition-all cursor-pointer group">
                  <div>
                    <p className="font-black text-brand-navy mb-1">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.status && (
                      <span className={`text-xs font-bold px-3 py-1 bg-slate-100 rounded-full ${item.color || "text-slate-500"}`}>
                        {item.status}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-teal transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-8 bg-brand-navy rounded-[32px] text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-lg font-black mb-2">Licença NexPrint Pro</h4>
              <p className="text-slate-400 text-sm">Seu plano atual suporta até 10.000 impressões/mês.</p>
            </div>
            <button className="px-8 py-4 bg-brand-teal text-brand-navy font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-2">
              Upgrade de Plano <ExternalLink size={18} />
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

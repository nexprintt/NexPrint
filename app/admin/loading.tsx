import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-brand-navy">
        <Loader2 className="h-10 w-10 animate-spin text-brand-teal" />
        <p className="font-bold text-slate-500 animate-pulse uppercase tracking-widest text-xs">Acessando...</p>
      </div>
    </div>
  );
}

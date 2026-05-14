import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexPrint | Crachás Personalizados de Forma Rápida e Simples",
  description: "Peça seu crachá de forma rápida, personalizada e sem complicações. Qualidade premium com agilidade total.",
};

import { ToastProvider } from "@/components/ui/Toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistMono.variable} ${outfit.variable} h-full antialiased font-outfit`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <ToastProvider>
            <Providers>
              {children}
            </Providers>
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

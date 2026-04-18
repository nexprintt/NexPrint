/**
 * NexPrint Local Agent Scaffold
 * Este script deve rodar localmente no PC conectado à impressora Entrust Sigma DS2.
 */

import fetch from "node-fetch"; // Precisaria ser instalado no ambiente local

const API_URL = "http://localhost:3000/api/print-agent/queue";

async function pollQueue() {
  console.log("Checking for new badges to print...");
  
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.success && data.count > 0) {
      console.log(`Found ${data.count} badges to print!`);
      
      for (const order of data.orders) {
        await printBadge(order);
      }
    }
  } catch (error) {
    console.error("Connection error to NexPrint Cloud:", error.message);
  }
}

async function printBadge(order) {
  console.log(`Printing badge for: ${order.clientName}...`);

  // Lógica técnica sugerida:
  // 1. O agente baixa a imagem renderizada final (PNG)
  // 2. O agente usa um comando de SPOOL do Windows (ex: via PowerShell ou biblioteca nativa)
  // 3. Envia para a impressora Entrust Sigma DS2 (Driver Nativo)
  
  // Exemplo de Simulação de Impressão:
  await new Promise(resolve => setTimeout(resolve, 3000)); 

  // Notificar servidor que foi impresso
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId: order.id })
  });
  
  console.log(`Badge for ${order.clientName} [DONE]`);
}

// Iniciar Polling a cada 10 segundos
setInterval(pollQueue, 10000);
console.log("NexPrint Local Agent started and listening...");

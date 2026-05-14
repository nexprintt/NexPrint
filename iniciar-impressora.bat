@echo off
TITLE NexPrint Agent - Ponte de Impressao
echo ======================================================
echo           NEXPRINT - AGENTE DE IMPRESSAO
echo ======================================================
echo.

:: --- CONFIGURACAO ---
:: Substitua a URL abaixo pela URL do seu site na Vercel
set NEXPRINT_API=https://nexprint.alvanex.com.br
:: --------------------

echo Conectando ao servidor: %NEXPRINT_API%
echo.

node scripts/print-agent.mjs

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] O Agente parou inesperadamente. Verifique se o Node.js esta instalado.
    pause
)

@echo off
title Subiendo Proyecto de Valentina XV a GitHub...
cd /d "C:\Users\paxel\.gemini\antigravity\scratch\valentina-15"
echo ====================================================
echo  Subiendo Web de Valentina XV a GitHub...
echo  Repositorio: https://github.com/paxelbr177-spec/XV-VALENTINA.git
echo ====================================================
echo.
"C:\Users\paxel\AppData\Local\Programs\Git\cmd\git.exe" push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ====================================================
    echo  LISTO! Tu proyecto fue subido con exito a GitHub!
    echo ====================================================
) else (
    echo.
    echo Si te solicito credenciales, recuerda que GitHub requiere un Personal Access Token (PAT).
)
pause

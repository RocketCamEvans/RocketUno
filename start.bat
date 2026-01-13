@echo off

if not exist node_modules npm install

start http://localhost:3000

if "%1"=="dev" (npm run dev) else (npm start)

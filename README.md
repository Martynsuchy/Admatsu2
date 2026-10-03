# Admatsu s.r.o. – Official Web Application

Oficiální webové stránky společnosti **ADMATSU s.r.o.** postavené na moderním stacku **React 19**, **Tailwind CSS v4** a **Vite**.

## 🚀 Technologie
- **React 19** – Moderní komponentová architektura
- **Vite** – Ultra-rychlý build tool a bundler
- **Tailwind CSS v4** – Moderní utilitní styling
- **Motion** – Plynulé mikrointerakce a animace
- **Lucide Icons** – Vektorové SVG ikony

## 🛠️ Vývoj a spuštění

```bash
# Instalace závislostí
npm install

# Spuštění lokálního vývojového serveru
npm run dev

# Sestavení produkčního buildu
npm run build
```

## 🌐 Nasazení na Cloudflare Pages
Projekt je plně připraven pro Cloudflare Pages:
- SPA routing konfigurován přes `public/_redirects`
- Bezpečnostní a cache hlavičky přes `public/_headers`
- Konfigurace v `wrangler.toml`

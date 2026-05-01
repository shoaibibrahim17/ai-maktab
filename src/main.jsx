console.log('App initialization started...');

// Global Error Catcher
window.onerror = (msg, url, line) => {
  console.error(`Global Error: ${msg} at ${url}:${line}`);
  const overlay = document.getElementById('root');
  if (overlay) {
    overlay.innerHTML = `
      <div style="padding:40px; color:#ef4444; text-align:center; font-family:sans-serif;">
        <h1 style="font-size:1.5rem;">System Crash Detected</h1>
        <p style="opacity:0.8; font-size:0.9rem; margin-bottom:20px;">${msg}</p>
        <button onclick="window.location.reload()" style="background:white; color:black; border:none; padding:10px 20px; border-radius:8px; font-weight:bold;">Restart App</button>
      </div>`;
  }
  return false;
};

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Fatal Error: #root mount point is missing from HTML");
  } else {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </StrictMode>
    );
    console.log('React: Rendering initiated...');
    const tg = window.Telegram?.WebApp;
    if (tg) {
      console.log(`Telegram Env Detected: v${tg.version} on ${tg.platform}`);
    } else {
      console.log('Running outside native Telegram environment.');
    }
  }
} catch (err) {
  console.error("Critical Runtime Error:", err);
}

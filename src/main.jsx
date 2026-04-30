console.log('App initialization started...');

// 5-second "Failsafe" timer to detect stuck initialization
setTimeout(() => {
  const root = document.getElementById('root');
  // If the loading text is still there, something is stuck
  if (root && root.innerText.includes('INITIALIZING')) {
    root.innerHTML += `
      <div style="margin-top:20px; color:#ef4444; font-size: 0.9rem; padding: 20px; border-top: 1px solid #333;">
        System takes too long to load. <br/><br/>
        <button onclick="window.location.reload()" style="background:#22c55e; border:none; color:white; padding:10px 20px; border-radius:8px; font-weight:bold; cursor:pointer;">Retry Now</button>
      </div>`;
  }
}, 5000);

// Global Error Catcher for In-App Browser debugging
window.onerror = (msg, url, line) => {
  console.log(`Global Error: ${msg} at ${url}:${line}`);
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
    document.body.innerHTML = '<h1 style="color:red">Fatal Error: #root mount point is missing from HTML</h1>';
  } else {
    createRoot(rootElement).render(
      <StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </StrictMode>
    );
    console.log('React: App successfully mounted.');
  }
} catch (err) {
  console.error("Critical Runtime Error:", err);
  const root = document.getElementById('root');
  if (root) root.innerHTML = `<h1 style="color:red; padding:40px;">Startup Error: ${err.message}</h1>`;
}

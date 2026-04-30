console.log('App initialization started...');

// ON-SCREEN CONSOLE FOR TELEGRAM DEBUGGING
// This will show logs directly on the phone screen
const logBuffer = [];
const consoleDiv = document.createElement('div');
consoleDiv.id = 'on-screen-console';
Object.assign(consoleDiv.style, {
  position: 'fixed', bottom: '0', left: '0', width: '100%', 
  height: '150px', background: 'rgba(0,0,0,0.85)', color: '#00ff00',
  fontSize: '10px', fontFamily: 'monospace', overflowY: 'auto',
  zIndex: '10000', padding: '10px', pointerEvents: 'none',
  borderTop: '1px solid #333', display: 'none' // Hidden by default, shown on error
});
document.body.appendChild(consoleDiv);

const originalLog = console.log;
const originalError = console.error;
console.log = (...args) => {
  originalLog(...args);
  const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
  consoleDiv.innerHTML += `<div>LOG: ${msg}</div>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
};
console.error = (...args) => {
  consoleDiv.style.display = 'block'; // Show console on error
  originalError(...args);
  const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
  consoleDiv.innerHTML += `<div style="color:#ff5555">ERR: ${msg}</div>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
};

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
  }
} catch (err) {
  console.error("Critical Runtime Error:", err);
}

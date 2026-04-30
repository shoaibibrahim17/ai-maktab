console.log('App is mounting...');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  )
} catch (err) {
  console.error("App render failed:", err);
  document.getElementById('root').innerHTML = `<h1 style="color: white; text-align: center; margin-top: 20%;">Initialization Failed. Please restart the app.</h1>`;
}

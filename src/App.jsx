import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ResourceCard from './components/ResourceCard';
import VaultViewer from './components/VaultViewer';
import RapidMint from './components/RapidMint';
import rawData from './data/resourceData.json';

import { safeHaptic, safeSetHeaderColor } from './utils/tgHelpers';

const Hub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const flattened = rawData.reduce((acc, category) => {
      return [...acc, ...category.resources.map(r => ({ ...r, category: category.category }))];
    }, []);
    setResources(flattened);
  }, []);

  useEffect(() => {
    // Background Ad Loader (Universal Compatibility)
    // This ensures that even if Ad-Blockers stop the DNS, your app STILL LOADS.
    const loadAds = async () => {
      try {
        // 1. Load Monetag Smart Tag
        const monetag = document.createElement('script');
        monetag.src = 'https://alwingulla.com/88/p.js';
        monetag.async = true;
        monetag.onerror = () => console.warn("Monetag blocked by DNS/AdBlocker.");
        document.head.appendChild(monetag);

        // 2. Load LibTL SDK
        const libtl = document.createElement('script');
        libtl.src = 'https://libtl.com/sdk.js';
        libtl.setAttribute('data-zone', '10941971');
        libtl.setAttribute('data-sdk', 'show_10941971');
        libtl.onerror = () => console.warn("LibTL blocked by DNS/AdBlocker.");
        document.head.appendChild(libtl);

        // 3. Initialize In-App Interstitials if loaded
        setTimeout(() => {
          if (typeof window.show_10941971 === 'function') {
            window.show_10941971({
              type: 'inApp',
              inAppSettings: { frequency: 2, capping: 0.1, interval: 30, timeout: 5, everyPage: false }
            }).catch(e => console.log("Ad suppressed"));
          }
        }, 5000);
      } catch (err) {
        console.warn("Background ad loading failed safely.");
      }
    };

    loadAds();
  }, []);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(filteredResources.map(r => r.category))];

  return (
    <div className="min-h-screen">
      <div className="star-field" />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10 w-full" style={{ paddingTop: '2rem' }}>
        <section
          className="mb-16 animate-fade-in-up"
        >
          {/* RapidMint Dashboard Entry */}
          <div className="mb-12">
            <button 
              onClick={() => {
                safeHaptic('medium');
                navigate('/rapidmint');
              }}
              className="w-full glass p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-emerald hover:bg-[rgba(34,197,94,0.1)] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#22c55e] to-[#4ade80] flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">⚡ RapidMint Dashboard</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Mine rewards and boost your ecosystem standings.</p>
                </div>
              </div>
              <div className="launch-btn" style={{ backgroundColor: '#22c55e', borderColor: '#22c55e', color: '#1a1a1a' }}>
                Open Dashboard ↗
              </div>
            </button>
          </div>

          <div className="hub-badge mb-4">SI | AL-HIKMA — <span className="arabic-text">الحكمة</span></div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">
            The Ibrahim Library <br />
            <span className="text-gold">Maktaba (<span className="arabic-text font-bold">المكتبة الإبراهيمية</span>)</span>
          </h2>
          
          <div className="mb-8 mt-1">
            <a 
              href="https://www.linkedin.com/in/shaikh-ibrahim17/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              [ Tawasul (<span className="arabic-text">تواصل</span>) | Connect Me on LinkedIn ]
            </a>
          </div>

          <p className="text-on-surface-variant text-lg max-w-2xl border-l-2 border-emerald pl-4 py-2">
            A repository of elite AI blueprints, engineered for Ihsan (<span className="arabic-text text-gold">إحسان</span> — Excellence) and strategic growth.
          </p>
        </section>

        {categories.map((category, ci) => (
          <section
            key={category}
            className="mb-16 animate-fade-in-up"
            style={{ animationDelay: `${ci * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div style={{ width: '100%', marginBottom: '1.5rem' }}>
              <div className="category-label">{category}</div>
            </div>
            <div className="card-grid">
              {filteredResources
                .filter(r => r.category === category)
                .map((resource, index) => (
                  <ResourceCard
                    key={`${resource.slug}-${index}`}
                    title={resource.title}
                    label={resource.label}
                    description={resource.description}
                    icon={resource.icon}
                    slug={resource.slug}
                  />
                ))}
            </div>
          </section>
        ))}

        {filteredResources.length === 0 && (
          <div className="py-20 text-center glass">
            <p className="text-xl text-on-surface-variant">No wisdom found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      <footer className="p-12 text-center text-sm" style={{ color: 'rgba(249, 245, 248, 0.7)' }}>
        <p>
          © 2026 Shaikh Ibrahim | The Muhandis (<span className="arabic-text text-gold" style={{ opacity: 1 }}>المهندس</span>) of the Ibrahim Maktaba
        </p>
      </footer>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      if (typeof tg.ready === 'function') tg.ready();
      if (typeof tg.expand === 'function') tg.expand();
      safeSetHeaderColor('#1a1a1a');
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    // BackButton requires API 6.1+
    if (tg && tg.BackButton && typeof tg.isVersionAtLeast === 'function' && tg.isVersionAtLeast('6.1')) {
      if (location.pathname === '/') {
        tg.BackButton.hide();
      } else {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          navigate(-1);
        });
      }
    }
    return () => {
      if (tg?.BackButton && typeof tg.isVersionAtLeast === 'function' && tg.isVersionAtLeast('6.1')) {
        tg.BackButton.offClick();
      }
    };
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/rapidmint" element={<RapidMint />} />
      <Route path="/vault/:slug" element={<VaultViewer />} />
      {/* Catch-all to handle Telegram hash parameters or invalid routes */}
      <Route path="*" element={<Hub />} />
    </Routes>
  );
}

export default App;

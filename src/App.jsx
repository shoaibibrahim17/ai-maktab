import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ResourceCard from './components/ResourceCard';
import VaultViewer from './components/VaultViewer';
import rawData from './data/resourceData.json';
import { motion, AnimatePresence } from 'framer-motion';

const Hub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);

  // Expand Telegram WebApp on mount
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleMintBoost = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    setIsBoosting(true);
    
    // Call the Monetag ad function (placeholder logic, usually it's a global function)
    if (typeof window.show_8765432 === 'function') {
      window.show_8765432()
        .then(() => {
          setBalance(prev => prev + 100);
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert('Minting successful! +100 ⚡ added to your balance.');
          }
        })
        .catch(err => console.error("Ad failed", err))
        .finally(() => setIsBoosting(false));
    } else {
      // Fallback for testing if ad script is blocked or missing
      setTimeout(() => {
        setBalance(prev => prev + 100);
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Minting successful! +100 ⚡ added to your balance.');
        } else {
          alert('Minting successful! +100 ⚡ added to your balance.');
        }
        setIsBoosting(false);
      }, 1500);
    }
  };

  useEffect(() => {
    const flattened = rawData.reduce((acc, category) => {
      return [...acc, ...category.resources.map(r => ({ ...r, category: category.category }))];
    }, []);
    setResources(flattened);
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
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          <div className="hub-badge mb-4">RAPIDMINT — OFFICIAL DASHBOARD</div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">
            RapidMint <br />
            <span className="text-primary">Ecosystem</span>
          </h2>
          
          <div className="mb-8 mt-4 glass p-6 max-w-sm mx-auto flex flex-col items-center gap-4 border-primary">
            <h3 className="text-xl font-bold text-on-surface-variant">Your Balance</h3>
            <div className="text-5xl font-extrabold flex items-center gap-2 text-white">
              {balance} <span className="text-yellow-400">⚡</span>
            </div>
            <button 
              onClick={handleMintBoost}
              disabled={isBoosting}
              className="launch-btn w-full mt-2 text-lg py-3 flex items-center justify-center gap-2 font-bold"
              style={{ backgroundColor: '#22c55e', borderColor: '#22c55e', color: '#1a1a1a', opacity: isBoosting ? 0.7 : 1 }}
            >
              {isBoosting ? 'Minting...' : 'Boost Mint +100 ⚡'}
            </button>
          </div>

          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto border-l-2 border-primary pl-4 py-2">
            Accelerate your growth and earn rewards instantly with the high-performance RapidMint engine.
          </p>
        </motion.section>

        <AnimatePresence mode="wait">
          {categories.map((category, ci) => (
            <motion.section
              key={category}
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: ci * 0.1 } }}
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
            </motion.section>
          ))}
        </AnimatePresence>

        {filteredResources.length === 0 && (
          <div className="py-20 text-center glass">
            <p className="text-xl text-on-surface-variant">No wisdom found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      <footer className="p-12 text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        <p>
          © 2026 RapidMint Ecosystem | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/vault/:slug" element={<VaultViewer />} />
    </Routes>
  );
}

export default App;

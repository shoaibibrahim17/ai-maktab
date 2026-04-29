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
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
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

      <footer className="p-12 text-center text-sm" style={{ color: 'rgba(249, 245, 248, 0.7)' }}>
        <p>
          © 2026 Shaikh Ibrahim | The Muhandis (<span className="arabic-text text-gold" style={{ opacity: 1 }}>المهندس</span>) of the Ibrahim Maktaba
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

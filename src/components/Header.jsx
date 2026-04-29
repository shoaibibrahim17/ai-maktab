import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Header = ({ searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') inputRef.current?.blur();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header 
      className="sticky top-0 w-full p-4 px-6 md:px-12 flex flex-col gap-4"
      style={{
        zIndex: 50,
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
      }}
    >
      {/* Top Banner */}
      <div className="w-full text-center text-primary" style={{ fontStyle: 'italic', opacity: 0.8, letterSpacing: '2px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        WELCOME TO THE ECOSYSTEM
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald to-gold shadow-[0_0_12px_#d4af37]" />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
              RapidMint
            </h1>
            <p className="text-xs text-on-surface-variant font-bold tracking-widest"><span className="text-primary">Ecosystem</span> — Dashboard</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon" size={17} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search the ecosystem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search vault resources"
            dir="auto"
          />
          <div className="search-kbd-wrap">
            <kbd className="search-kbd">[ACCESS]</kbd>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

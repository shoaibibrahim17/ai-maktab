import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RapidMint = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('rapidmint_balance');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isBoosting, setIsBoosting] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [isSuperBoosting, setIsSuperBoosting] = useState(false);

  useEffect(() => {
    localStorage.setItem('rapidmint_balance', balance.toString());
  }, [balance]);

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
    
    // Call the Monetag ad
    if (typeof window.show_10941971 === 'function') {
      window.show_10941971()
        .then(() => {
          // Runs ONLY after the ad is finished
          const reward = 100 * multiplier;
          setBalance(prev => prev + reward);
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert(`Success! +${reward} RM added to your balance. ⚡`);
          }
        })
        .catch((err) => {
          // Runs if the ad fails to load or is closed early
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showConfirm("Ad not finished. Watch the full ad to get your reward!");
          }
        })
        .finally(() => setIsBoosting(false));
    } else {
      // Offline/Debug Fallback
      setTimeout(() => {
        const reward = 100 * multiplier;
        setBalance(prev => prev + reward);
        setIsBoosting(false);
      }, 2000);
    }
  };

  const handleSuperBoost = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    }
    setIsSuperBoosting(true);

    if (typeof window.show_10941971 === 'function') {
      // Reward popup for multiplier
      window.show_10941971('pop')
        .then(() => {
          setMultiplier(5);
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert("🔥 SUPER BOOST ACTIVE! All mints are now 5X for this session!");
          }
        })
        .catch(err => {
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert("Super Boost failed to load. Please try again later.");
          }
        })
        .finally(() => setIsSuperBoosting(false));
    } else {
      setMultiplier(5);
      setIsSuperBoosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center p-6">
      <div className="star-field" />
      
      <div 
        className="glass p-8 max-w-sm w-full flex flex-col items-center gap-6 border-primary relative z-10 animate-fade-in-up"
      >
        <button 
          onClick={() => {
            if (window.Telegram?.WebApp?.HapticFeedback) {
              window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
            navigate('/');
          }}
          className="back-btn absolute top-4 left-4"
          style={{ borderColor: '#22c55e', color: '#22c55e' }}
        >
          ← Back
        </button>

        <div className="hub-badge mb-2" style={{ color: '#22c55e', borderColor: '#22c55e' }}>
          RAPIDMINT SYSTEM {multiplier > 1 && `[${multiplier}X ACTIVE]`}
        </div>

        <div className="relative mt-4">
          <div 
            className={`w-32 h-32 rounded-full bg-gradient-to-tr from-[#22c55e] to-[#4ade80] shadow-[0_0_40px_#22c55e] animate-coin ${multiplier > 1 ? 'scale-110' : ''}`}
            style={{ filter: multiplier > 1 ? 'hue-rotate(45deg) brightness(1.2)' : 'none' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">⚡</div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold opacity-70">Mining Balance</h3>
          <div className="text-6xl font-extrabold flex items-center justify-center gap-2 mt-2">
            {balance} <span className="text-yellow-400">⚡</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={handleMintBoost}
            disabled={isBoosting}
            className="launch-btn w-full text-lg py-4 flex items-center justify-center gap-2 font-bold"
            style={{ 
              backgroundColor: '#22c55e', 
              borderColor: '#22c55e', 
              color: '#1a1a1a', 
              opacity: isBoosting ? 0.7 : 1,
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}
          >
            {isBoosting ? 'Processing...' : `BOOST MINT +${100 * multiplier} ⚡`}
          </button>

          <button 
            onClick={handleSuperBoost}
            disabled={isSuperBoosting || multiplier > 1}
            className="w-full py-2 rounded-xl border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 font-bold text-sm hover:bg-yellow-500/20 transition-all"
            style={{ opacity: (isSuperBoosting || multiplier > 1) ? 0.5 : 1 }}
          >
            {multiplier > 1 ? '🔥 MULTIPLIER ACTIVE' : '🚀 SUPER BOOST (5X REWARDS)'}
          </button>
        </div>

        <p className="text-sm opacity-60 text-center">
          Watch short ads to accelerate your minting speed and earn rewards instantly.
        </p>
      </div>

      <footer className="mt-12 text-center text-xs opacity-40">
        © 2026 RapidMint Ecosystem | All Rights Reserved
      </footer>
    </div>
  );
};

export default RapidMint;

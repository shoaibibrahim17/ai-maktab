import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ title, description, icon, slug, label }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLaunch = (e) => {
    e.stopPropagation();
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    navigate(`/vault/${slug}`);
  };

  const renderLabel = (text) => {
    if (!text) return null;
    const match = text.match(/(.*?)\((.*?)\)/);
    if (match) {
      return <>{match[1]}(<span className="arabic-text">{match[2]}</span>)</>;
    }
    return text;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{
        y: -20,
        transition: { type: 'spring', stiffness: 180, damping: 14, mass: 0.6 }
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } }}
      className="card-glass p-6 flex flex-col items-center text-center gap-4 group cursor-pointer"
      onClick={() => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        navigate(`/vault/${slug}`);
      }}
    >
      {/* Gold shimmer top edge */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '60%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
        borderRadius: '9999px'
      }} />

      <div
        className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(212,175,55,0.3))' }}
      >
        {icon}
      </div>

      <div className="flex-grow flex flex-col items-center">
        {label && (
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-2 opacity-80 font-mono">
            {renderLabel(label)}
          </div>
        )}
        <h3 className="text-xl font-bold leading-tight flex items-center justify-center group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-3 mt-4">
          {description}
        </p>
      </div>

      <button
        onClick={handleLaunch}
        className="launch-btn w-full mt-4"
        style={{ marginTop: 'auto' }}
      >
        Unveil Wisdom (<span className="arabic-text">اكشف الحكمة</span>) ↗
      </button>
    </motion.div>
  );
};

export default ResourceCard;

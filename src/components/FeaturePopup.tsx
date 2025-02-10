import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function FeaturePopup() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show popup when user has scrolled 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on boost page or if dismissed
  if (location.pathname === '/boost' || isDismissed) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-background border shadow-lg rounded-lg p-4 relative flex items-center">
        <Link
          to="/boost"
          className="text-sm font-medium pr-6"
        >
          🥇 Get Featured for <span className="text-green-500">$10/week</span>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsDismissed(true);
          }}
          className="absolute top-2 right-2 p-1 hover:bg-accent rounded-full"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}

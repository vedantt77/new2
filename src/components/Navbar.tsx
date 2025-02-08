import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 90,
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">Startups.ad</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/startups" className="text-foreground hover:underline">
              Startups
            </Link>
            <Link to="/boost" className="text-foreground hover:underline">
              Boost
            </Link>
            <Link
              to="https://tally.so/r/mV92zJ"
              className="px-4 py-2 text-foreground font-medium rounded-lg border border-foreground"
            >
              + Submit
            </Link>
          </div>
          <motion.button
            className="md:hidden flex items-center text-foreground focus:outline-none"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={buttonVariants}
            transition={{ duration: 0.3 }}
          >
            ☰
          </motion.button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="py-2 space-y-2">
                <Link 
                  to="/startups" 
                  className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Startups
                </Link>
                <Link 
                  to="/boost" 
                  className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Boost
                </Link>
                <Link
                  to="https://tally.so/r/mV92zJ"
                  className="block px-4 py-2 text-foreground font-medium rounded-lg border border-foreground hover:bg-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  + Submit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

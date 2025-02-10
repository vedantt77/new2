import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

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
    <div className="w-full flex justify-center pt-4 px-4 fixed top-0 z-50">
      <nav className="w-full max-w-4xl bg-background/80 backdrop-blur-md border rounded-xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">Startups.ad</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/startups" 
                className="px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80"
              >
                Startups
              </Link>
              <Link 
                to="/boost" 
                className="px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80"
              >
                Boost
              </Link>
              <Link
                to="https://tally.so/r/mV92zJ"
                className="ml-2 px-4 py-2 text-foreground font-medium rounded-lg border border-foreground transition-colors duration-200 hover:bg-accent/80"
              >
                + Submit
              </Link>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                className="flex items-center text-foreground focus:outline-none"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={buttonVariants}
                transition={{ duration: 0.3 }}
              >
                ☰
              </motion.button>
            </div>
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
                <div className="py-2 space-y-1">
                  <Link 
                    to="/startups" 
                    className="block px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Startups
                  </Link>
                  <Link 
                    to="/boost" 
                    className="block px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Boost
                  </Link>
                  <Link
                    to="https://tally.so/r/mV92zJ"
                    className="block px-4 py-2 text-foreground font-medium rounded-lg border border-foreground transition-colors duration-200 hover:bg-accent/80"
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
    </div>
  );
}

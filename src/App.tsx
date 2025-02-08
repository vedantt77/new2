import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StartupListPage } from '@/pages/StartupListPage';
import { StartupDetailPage } from '@/pages/StartupDetailPage';
import { BoostPage } from '@/pages/BoostPage';
import { LaunchPage } from '@/pages/LaunchPage';
import { PageTransition } from '@/components/PageTransition';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <LaunchPage />
              </PageTransition>
            } />
            <Route path="/startups" element={
              <PageTransition>
                <StartupListPage />
              </PageTransition>
            } />
            <Route path="/startup/:id" element={
              <PageTransition>
                <StartupDetailPage />
              </PageTransition>
            } />
            <Route path="/boost" element={
              <PageTransition>
                <BoostPage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
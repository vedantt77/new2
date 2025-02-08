import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  { text: "Traffic", color: "text-green-500" },
  { text: "Backlink", color: "text-blue-500" },
  { text: "Badge", color: "text-red-500" }
];

export function AnimatedHeader() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text4xl font-bold text-center mb-4">
      🚀Advertise startup for free and get quality {' '}
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentWordIndex].text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-block ${words[currentWordIndex].color}`}
        >
          {words[currentWordIndex].text}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
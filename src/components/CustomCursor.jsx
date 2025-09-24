'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-5), newRipple]); // keep last 5 ripples
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if ('ontouchstart' in window) return null;

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </>
  );
};

export default CustomCursor;

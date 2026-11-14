'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Global 3D Minimal Page Transition Engine
 * In Next.js App Router, template.tsx remounts on every route transition,
 * gracefully revealing each page's UI functions in slow, cinematic 3D motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotateX: 2, scale: 0.994 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.995 }}
      transition={{
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1400,
        transformStyle: 'preserve-3d',
        width: '100%',
        minHeight: '100%',
      }}
    >
      {children}
    </motion.div>
  );
}

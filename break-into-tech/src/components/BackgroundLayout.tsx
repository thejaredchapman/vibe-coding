"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const backgroundColors: Record<string, string[]> = {
  indigo: ['#1e1b4b', '#312e81'], // indigo-950, indigo-900
  emerald: ['#022c22', '#064e3b'], // emerald-950, emerald-900
  amber: ['#451a03', '#78350f'], // amber-950, amber-900
  rose: ['#4c0519', '#881337'], // rose-950, rose-900
  cyan: ['#083344', '#155e75'], // cyan-950, cyan-800
  violet: ['#2e1065', '#4c1d95'], // violet-950, violet-900
  slate: ['#0f172a', '#1e293b'], // slate-900, slate-800
};

interface BackgroundLayoutProps {
  children: ReactNode;
  colorTheme?: string;
}

export default function BackgroundLayout({ children, colorTheme = 'indigo' }: BackgroundLayoutProps) {
  const colors = backgroundColors[colorTheme] || backgroundColors.indigo;

  return (
    <motion.div
      className="min-h-screen text-white transition-colors duration-500"
      animate={{
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

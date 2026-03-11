"use client";

import React from 'react';
import { useRole } from '@/context/RoleContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function RoleSelector() {
  const { activeRole, setActiveRole, roles } = useRole();

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8 px-4">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => setActiveRole(role)}
          className={clsx(
            "relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300",
            activeRole.id === role.id
              ? "text-slate-900 scale-105 shadow-xl"
              : "text-white hover:bg-white/10"
          )}
        >
          {activeRole.id === role.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{role.title}</span>
        </button>
      ))}
    </div>
  );
}

"use client";

import React from 'react';
import { Role } from '@/context/RoleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ResourceListProps {
  role: Role;
}

export default function ResourceList({ role }: ResourceListProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold drop-shadow-sm">Free Learning Resources</h2>
        </div>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Everything here is free (or has a free tier). No excuses — just start.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={role.id + '-resources'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {role.freeResources.map((resource, index) => (
            <motion.a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all shadow-lg flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-white leading-tight flex-1">
                  {resource.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors shrink-0 mt-1 ml-2" />
              </div>

              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/50 bg-white/10 px-2 py-0.5 rounded-full mb-3 self-start">
                {resource.type}
              </span>

              <p className="text-sm text-white/70 leading-relaxed flex-1">
                {resource.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

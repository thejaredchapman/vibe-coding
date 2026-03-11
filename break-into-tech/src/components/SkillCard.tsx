"use client";

import React from 'react';
import { Role } from '@/context/RoleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Brain } from 'lucide-react';

interface SkillCardProps {
  role: Role;
}

export default function SkillCard({ role }: SkillCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {/* AI Skills */}
        <motion.div
          key={`${role.id}-ai`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain className="w-32 h-32" />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-white/20 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">AI Skills to Master</h2>
          </div>

          <ul className="space-y-5 relative z-10">
            {role.aiSkills.map((skill, index) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 mt-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] shrink-0" />
                <div>
                  <span className="text-base font-semibold text-white block">{skill.name}</span>
                  <span className="text-sm text-white/60 leading-relaxed">{skill.description}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Transferable Skills */}
        <motion.div
          key={`${role.id}-trans`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-bl from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-32 h-32" />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-white/20 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Your Superpowers</h2>
          </div>

          <ul className="space-y-5 relative z-10">
            {role.transferableSkills.map((skill, index) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 mt-2.5 bg-white/50 rounded-full shrink-0" />
                <div>
                  <span className="text-base font-semibold text-white block">{skill.name}</span>
                  <span className="text-xs text-white/40 italic">From: {skill.from}</span>
                  <span className="text-sm text-white/60 leading-relaxed block mt-0.5">{skill.description}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

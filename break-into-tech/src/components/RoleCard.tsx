"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Role } from '@/context/RoleContext';
import { DollarSign, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { backgroundColors } from '@/components/BackgroundLayout';

interface RoleCardProps {
  role: Role;
  index: number;
}

export default function RoleCard({ role, index }: RoleCardProps) {
  const colors = backgroundColors[role.colorTheme] || backgroundColors.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/${role.id}`}
        className="group block h-full rounded-2xl border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        }}
      >
        <div className="p-8 flex flex-col h-full">
          <h3 className="text-2xl font-bold text-white mb-3">{role.title}</h3>

          <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
            {role.description}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <DollarSign className="w-4 h-4 mx-auto mb-1 text-white/50" />
              <p className="text-xs text-white/50 mb-0.5">Avg. Salary</p>
              <p className="text-sm font-bold text-white">{role.averageSalary}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <TrendingUp className="w-4 h-4 mx-auto mb-1 text-white/50" />
              <p className="text-xs text-white/50 mb-0.5">Demand</p>
              <p className="text-sm font-bold text-white">{role.demandLevel}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Clock className="w-4 h-4 mx-auto mb-1 text-white/50" />
              <p className="text-xs text-white/50 mb-0.5">Timeline</p>
              <p className="text-sm font-bold text-white">{role.timeToTransition}</p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
            <span>View Roadmap</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

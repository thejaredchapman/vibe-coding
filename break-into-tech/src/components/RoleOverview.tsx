"use client";

import React from 'react';
import { Role } from '@/context/RoleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, TrendingUp, Briefcase } from 'lucide-react';

interface RoleOverviewProps {
  role: Role;
}

export default function RoleOverview({ role }: RoleOverviewProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role.id + '-overview'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >
        {/* Description */}
        <div className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-6">
          <p className="text-lg text-white/90 leading-relaxed">
            {role.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: DollarSign, label: "Salary Range", value: role.salaryRange },
            { icon: TrendingUp, label: "Demand", value: role.demandLevel },
            { icon: Clock, label: "Time to Transition", value: role.timeToTransition },
            { icon: DollarSign, label: "Avg. Salary", value: role.averageSalary },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-white/60" />
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* What You'll Actually Do */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">What You&apos;ll Actually Do Day-to-Day</h2>
          </div>
          <ul className="space-y-3">
            {role.whatYoullActuallyDo.map((task, index) => (
              <motion.li
                key={task}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="text-white/40 font-mono text-sm mt-0.5 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-white/85 leading-relaxed">{task}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

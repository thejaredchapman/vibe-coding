"use client";

import React, { useState } from 'react';
import { Role } from '@/context/RoleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface RoadmapTimelineProps {
  role: Role;
}

export default function RoadmapTimeline({ role }: RoadmapTimelineProps) {
  const [expandedPhase, setExpandedPhase] = useState<number>(0);

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? -1 : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold drop-shadow-sm">Your Defined Route</h2>
        </div>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          A step-by-step roadmap to go from where you are now to landing your first {role.title} role. Follow the phases in order.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={role.id + '-roadmap'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-white/20" />

          <div className="space-y-6">
            {role.roadmap.map((phase, index) => {
              const isExpanded = expandedPhase === index;
              const isLast = index === role.roadmap.length - 1;

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-white/80 z-10" />

                  {/* Phase card */}
                  <div
                    className={`bg-white/10 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
                      isExpanded ? 'border-white/30 bg-white/15' : 'border-white/15 hover:border-white/25'
                    }`}
                  >
                    {/* Header - always visible */}
                    <button
                      onClick={() => togglePhase(index)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                            {phase.phase}
                          </span>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                            {phase.timeframe}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                        <p className="text-white/60 text-sm mt-1">{phase.description}</p>
                      </div>
                      <div className="shrink-0 p-2 bg-white/10 rounded-lg">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-white/60" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/60" />
                        )}
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-white/10 pt-4">
                              <ul className="space-y-3">
                                {phase.steps.map((step, stepIndex) => (
                                  <motion.li
                                    key={step}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: stepIndex * 0.05 }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs font-bold text-white/70">{stepIndex + 1}</span>
                                    </div>
                                    <span className="text-white/80 leading-relaxed text-sm">{step}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {isLast && (
                              <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/10">
                                <p className="text-sm text-white/70 italic text-center">
                                  You&apos;ve reached the final phase. Stay consistent, keep building, and remember — every expert was once a beginner.
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";

import React from 'react';
import { Role } from '@/context/RoleContext';
import apprenticeships from '@/data/apprenticeships.json';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

interface ApprenticeshipListProps {
  role: Role;
}

export default function ApprenticeshipList({ role }: ApprenticeshipListProps) {
  const filtered = apprenticeships.filter((app) =>
    app.roles.includes(role.title)
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-3 text-center drop-shadow-sm">
        Apprenticeships & Programs
      </h2>
      <p className="text-white/60 text-center mb-8 max-w-2xl mx-auto">
        Real programs at real companies that hire people from non-traditional backgrounds.
        These are your best paths into top tech companies without a CS degree.
      </p>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          <p className="text-xl text-white/90 font-medium mb-2">
            No specific programs listed for {role.title} yet.
          </p>
          <p className="text-white/60">
            Check company career pages for &ldquo;Early Career&rdquo; or &ldquo;University Grad&rdquo; roles, as they often hire for this role directly.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold leading-tight">{app.programName}</h3>
                  </div>
                  <p className="text-xs text-white/50 font-medium mb-4">{app.company}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div>
                      <span className="text-xs font-semibold tracking-wider uppercase text-white/50 block mb-1">
                        Apply
                      </span>
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded inline-block">
                        {app.applicationWindow}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-wider uppercase text-white/50 block mb-1">
                        Duration
                      </span>
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {app.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/75 mb-3 leading-relaxed">
                    {app.notes}
                  </p>

                  {app.requirements && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1 font-semibold">Requirements</p>
                      <p className="text-xs text-white/65 leading-relaxed">{app.requirements}</p>
                    </div>
                  )}

                  {app.location && (
                    <div className="flex items-center gap-1 mb-4 text-white/40">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{app.location}</span>
                    </div>
                  )}
                </div>

                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors transform group-hover:translate-y-[-2px]"
                >
                  View Program
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

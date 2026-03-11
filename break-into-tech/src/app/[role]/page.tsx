"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rolesData from '@/data/roles.json';
import BackgroundLayout from '@/components/BackgroundLayout';
import RoleOverview from '@/components/RoleOverview';
import SkillCard from '@/components/SkillCard';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import ResourceList from '@/components/ResourceList';
import ApprenticeshipList from '@/components/ApprenticeshipList';
import { ArrowLeft } from 'lucide-react';

export default function RolePage() {
  const params = useParams();
  const slug = params.role as string;

  const role = rolesData.find((r) => r.id === slug);

  if (!role) {
    notFound();
  }

  return (
    <BackgroundLayout colorTheme={role.colorTheme}>
      <div className="min-h-screen flex flex-col items-center">
        {/* Back link + Header */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <header className="pb-8 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg leading-tight text-white">
            {role.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            Your complete roadmap to becoming a {role.title}. Follow the steps, build the skills, land the job.
          </p>
        </header>

        <div className="w-full max-w-6xl mx-auto pb-24 space-y-4">
          <RoleOverview role={role} />
          <SkillCard role={role} />
          <RoadmapTimeline role={role} />
          <ResourceList role={role} />
          <ApprenticeshipList role={role} />
        </div>

        <footer className="py-12 text-center text-white/40 text-sm mt-auto">
          <p>&copy; {new Date().getFullYear()} Break Into Tech. Helping you pivot with purpose.</p>
        </footer>
      </div>
    </BackgroundLayout>
  );
}

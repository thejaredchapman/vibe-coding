"use client";

import React from 'react';
import { motion } from 'framer-motion';
import rolesData from '@/data/roles.json';
import RoleCard from '@/components/RoleCard';
import { Sparkles, Target, Rocket, GraduationCap, Zap, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-white/15 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white">{question}</span>
        <div className="shrink-0 p-1">
          {open ? (
            <ChevronUp className="w-5 h-5 text-white/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/50" />
          )}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-white/70 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/50 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80 mb-8 border border-white/10">
              <Sparkles className="w-4 h-4" />
              <span>No degree required. No bootcamp needed. Just a plan.</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Break Into Tech
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-4">
              Your complete, free roadmap to a career in tech. Pick a role, follow the steps, land the job.
            </p>
            <p className="text-base text-white/50 max-w-2xl mx-auto">
              We built this for career changers, self-taught learners, and anyone who&apos;s been told they need a CS degree to work in tech. You don&apos;t.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Why Now Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Break Into Tech Now?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              The tech industry is more accessible than ever. Here&apos;s why now is the best time to make the switch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "AI Levels the Playing Field",
                description: "Tools like ChatGPT, Copilot, and Claude let you work 10x faster. A junior with AI skills can now produce work that took a senior years to master.",
              },
              {
                icon: GraduationCap,
                title: "Degrees Are Becoming Optional",
                description: "Google, Apple, IBM, and dozens of major tech companies have dropped degree requirements. They care about what you can do, not where you studied.",
              },
              {
                icon: Users,
                title: "Companies Want Career Changers",
                description: "Top companies like Google, Microsoft, and LinkedIn run apprenticeship programs specifically designed for people from non-traditional backgrounds.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  <item.icon className="w-6 h-6 text-white/80" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Three steps. No fluff. Just a clear path from where you are to where you want to be.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Target,
                title: "Pick Your Role",
                description: "Choose from 7 in-demand tech roles. Each one includes salary data, daily tasks, and an honest look at what the job is really like.",
              },
              {
                step: "02",
                icon: Rocket,
                title: "Follow the Roadmap",
                description: "Get a week-by-week learning plan with free resources, AI skills to master, and portfolio projects that actually impress employers.",
              },
              {
                step: "03",
                icon: GraduationCap,
                title: "Land the Job",
                description: "Apply to real apprenticeship programs at top companies, build your network, and nail the interviews with our prep guides.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl font-extrabold text-white/10 mb-4">{item.step}</div>
                <div className="p-3 bg-white/10 rounded-lg w-fit mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white/80" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Each role includes a complete roadmap, free resources, AI skills, and real apprenticeship programs. Click a card to get started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {rolesData.map((role, index) => (
              <RoleCard key={role.id} role={role} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes This Different</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              This isn&apos;t another generic career advice site. Here&apos;s what sets us apart.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "AI-First Approach",
                description: "Every roadmap teaches you to leverage AI tools from day one. You'll learn to work with AI, not compete against it — making you 10x more productive than traditional learners.",
              },
              {
                title: "100% Free Resources",
                description: "Every course, tool, and resource we recommend is free or has a free tier. No $15K bootcamp required. No hidden upsells. Just the best free stuff on the internet, curated for you.",
              },
              {
                title: "Real Apprenticeship Programs",
                description: "We don't just say 'apply for jobs.' We list actual programs at Google, Microsoft, LinkedIn, Airbnb, and more — with application windows, requirements, and direct links.",
              },
              {
                title: "Built for Career Changers",
                description: "Every role page shows how your existing skills transfer to tech. Former teacher? Your communication skills are gold in program management. Retail experience? You understand customers better than any CS grad.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <HelpCircle className="w-6 h-6 text-white/80" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
            </div>
          </motion.div>

          <div className="space-y-3">
            <FAQItem
              question="Do I really not need a degree?"
              answer="For the roles covered here — correct. Google, Apple, IBM, Bank of America, and many others have dropped degree requirements for entry-level tech roles. What matters is demonstrating skills through projects, certifications, and apprenticeships. A degree can help, but it's no longer a gate."
            />
            <FAQItem
              question="How long does the transition actually take?"
              answer="It depends on the role and how much time you can commit. Marketing and Program Management roles can be reached in 2-5 months of focused effort. Data Analytics takes 3-6 months. Software Engineering is typically 4-9 months. These timelines assume you're learning part-time while working."
            />
            <FAQItem
              question="What if I have zero tech experience?"
              answer="That's exactly who this is for. Every roadmap starts from scratch. We also show you how skills from your current career — communication, problem-solving, attention to detail — directly transfer to tech roles. You have more relevant experience than you think."
            />
            <FAQItem
              question="Are the resources actually free?"
              answer="Yes. Every resource we recommend is either completely free or has a free tier that covers everything you need. Some certifications cost money (like $150 for Scrum Master), but we always note that and provide free alternatives."
            />
            <FAQItem
              question="What's the deal with AI skills?"
              answer="AI tools like ChatGPT, GitHub Copilot, and Claude are changing how tech work gets done. Learning to use these tools effectively is a competitive advantage that most experienced workers haven't developed yet. As a newcomer, you can be AI-native from day one."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/30 text-sm border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} Break Into Tech. Helping you pivot with purpose.</p>
      </footer>
    </div>
  );
}

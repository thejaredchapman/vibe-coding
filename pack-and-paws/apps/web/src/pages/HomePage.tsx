import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Map, Compass, Heart, Shield, Users, Route, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Map,
    title: 'City Guides',
    description: 'Explore 200 dog-friendly cities with curated hotels, restaurants, cafes, and parks.',
    color: 'bg-forest-100 text-forest-600',
    link: '/cities',
  },
  {
    icon: Compass,
    title: 'Route Explorer',
    description: '14 scenic road trip routes designed with your four-legged co-pilot in mind.',
    color: 'bg-amber-100 text-amber-600',
    link: '/routes',
  },
  {
    icon: Route,
    title: 'Trip Planner',
    description: 'Plan a custom road trip and discover dog-friendly cities along your driving route.',
    color: 'bg-terracotta-100 text-terracotta-600',
    link: '/trip-planner',
  },
  {
    icon: BookOpen,
    title: 'Travel Tips',
    description: 'Practical guides for vet prep, car safety, airline policies, and traveling with kids + dogs.',
    color: 'bg-pink-100 text-pink-600',
    link: '/guides',
  },
  {
    icon: Shield,
    title: 'Dog-Verified',
    description: 'Every listing verified for dog policies, weight limits, and pet fees.',
    color: 'bg-sand-100 text-sand-600',
    link: '/cities',
  },
];

const stats = [
  { value: '200', label: 'Dog-Friendly Cities' },
  { value: '870', label: 'Pet Hotels' },
  { value: '1,210', label: 'Restaurants' },
  { value: '18', label: 'Scenic Routes' },
];

export default function HomePage() {
  return (
    <div>
      {/* ─── Hero Section ──────────────────────────────── */}
      <section className="relative bg-gradient-hero overflow-hidden">
        {/* Decorative paw prints */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <PawPrint
              key={i}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm font-medium mb-8"
            >
              <PawPrint className="h-4 w-4" />
              For dog-loving families & their furry co-pilots
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Every Road Trip
              <br />
              <span className="text-gradient-sunset">Deserves a</span>
              <br />
              <span className="text-amber-300">Wagging Tail</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Discover dog-friendly cities, plan scenic road trips, and find the best
              pet-welcoming spots across the country. Because the best adventures
              are shared with your pack.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cities" className="btn-accent text-lg px-8 py-4">
                <Map className="h-5 w-5" />
                Explore Cities
              </Link>
              <Link to="/routes" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Compass className="h-5 w-5" />
                Plan a Road Trip
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path
              d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z"
              className="fill-sand-50 dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* ─── Stats Banner ──────────────────────────────── */}
      <section className="bg-sand-50 dark:bg-slate-900 -mt-1">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl font-bold text-forest-700 dark:text-forest-400">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="section-title">Built for Adventurous Packs</h2>
          <p className="section-subtitle mx-auto mt-4">
            Everything you need to plan the perfect dog-friendly getaway
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={feature.link} className="block group">
                <div className="card p-8 text-center h-full">
                  <div className={`inline-flex p-4 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────── */}
      <section className="bg-gradient-to-br from-forest-800 to-forest-950 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-terracotta-400" />
              <Users className="h-6 w-6 text-amber-400" />
              <PawPrint className="h-6 w-6 text-forest-300" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Hit the Road?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Start exploring dog-friendly destinations and plan your next adventure
              with your favorite travel companion.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cities" className="btn-accent text-lg px-10 py-4">
                <PawPrint className="h-5 w-5" />
                Start Exploring
              </Link>
              <Link to="/trip-planner" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Route className="h-5 w-5" />
                Plan a Trip
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

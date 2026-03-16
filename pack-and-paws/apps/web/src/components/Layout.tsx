import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Map, Compass, Home, Menu, X, Route, BookOpen, LayoutDashboard, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUiStore } from '../stores/uiStore';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/cities', label: 'City Guides', icon: Map },
  { to: '/routes', label: 'Route Explorer', icon: Compass },
  { to: '/cross-country', label: 'Cross Country', icon: Globe },
  { to: '/trip-planner', label: 'Trip Planner', icon: Route },
  { to: '/guides', label: 'Travel Tips', icon: BookOpen },
];

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useUiStore((s) => s.theme);

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const allNavLinks = isAuthenticated
    ? [...navLinks, { to: '/dashboard', label: 'My Trips', icon: LayoutDashboard }]
    : navLinks;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-warm dark:bg-slate-900 dark:bg-none">
      {/* ─── Navbar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sand-200 dark:border-slate-700 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <PawPrint className="h-8 w-8 text-forest-600" />
              </motion.div>
              <span className="font-display text-xl font-bold">
                <span className="text-forest-700 dark:text-forest-400">Pack</span>
                <span className="text-terracotta-500"> & </span>
                <span className="text-forest-700 dark:text-forest-400">Paws</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {allNavLinks.map((link) => {
                const isActive = location.pathname === link.to ||
                  (link.to !== '/' && location.pathname.startsWith(link.to));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-forest-100 dark:bg-forest-900/50 text-forest-700 dark:text-forest-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-sand-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <ThemeToggle />
            </div>

            {/* Mobile: theme toggle + menu button */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-sand-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen
                  ? <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  : <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              {allNavLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-forest-100 dark:bg-forest-900/50 text-forest-700 dark:text-forest-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-sand-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </nav>
      </header>

      {/* ─── Main Content ──────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ────────────────────────────────────── */}
      <footer className="bg-forest-900 text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-6 w-6 text-amber-400" />
                <span className="font-display text-lg font-bold text-white">Pack & Paws</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Your trusted companion for dog-friendly travel adventures.
                Because every road trip is better with a wagging tail.
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold text-white mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cities" className="hover:text-amber-400 transition-colors">City Guides</Link></li>
                <li><Link to="/routes" className="hover:text-amber-400 transition-colors">Route Explorer</Link></li>
                <li><Link to="/cross-country" className="hover:text-amber-400 transition-colors">Cross Country</Link></li>
                <li><Link to="/trip-planner" className="hover:text-amber-400 transition-colors">Trip Planner</Link></li>
                <li><Link to="/guides" className="hover:text-amber-400 transition-colors">Travel Tips</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-white mb-4">Built for Dog-Loving Families</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Couples, families, solo travelers — and one (or more!) very spoiled pup.
                Pack & Paws helps you plan the perfect getaway for your whole pack.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
            &copy; {new Date().getFullYear()} Pack & Paws. All rights reserved. Made with love and dog treats.
          </div>
        </div>
      </footer>
    </div>
  );
}

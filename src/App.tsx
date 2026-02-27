import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Merchandise from './components/Merchandise';
import Footer from './components/Footer';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { User, LogOut, LogIn, ShieldCheck, Settings, Heart } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div 
          className="text-2xl font-display font-bold tracking-tighter cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          BrandVibe<span className="text-brand-accent">.</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest">
          {['home', 'merchandise', 'services', 'about'].map((view) => (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view);
                if (view === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
                else {
                  const el = document.getElementById(view);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`transition-colors hover:text-brand-accent ${
                currentView === view ? 'text-brand-accent' : 'text-brand-primary'
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Welcome back</span>
                <span className="text-xs font-bold text-brand-primary">{userEmail || 'Partner'}</span>
              </div>
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-primary hover:bg-brand-accent hover:text-white transition-all">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <ShieldCheck size={16} /> Dashboard
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Heart size={16} /> Wishlist
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Settings size={16} /> Settings
                  </button>
                  <div className="h-px bg-gray-100 my-2" />
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-full text-sm font-bold hover:bg-brand-accent transition-all shadow-lg"
            >
              <LogIn size={18} /> Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl font-display text-brand-primary mb-2">Partner Portal</h2>
                <p className="text-gray-500">Sign in to manage your corporate branding projects.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="partner@company.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-4">Password</label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-accent transition-all shadow-xl mt-4"
                >
                  Sign In to Dashboard
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-8">
                Don't have a partner account? <button className="text-brand-accent font-bold">Register here</button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <div id="home">
          <Hero />
        </div>

        <div id="merchandise">
          <Merchandise />
        </div>

        {/* Services Section Placeholder */}
        <section id="services" className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-display mt-4">Branding Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Visual Identity", desc: "Logo design, color theory, and typography systems." },
                { title: "Brand Strategy", desc: "Market positioning and audience persona development." },
                { title: "Digital Presence", desc: "UI/UX design and social media brand kits." }
              ].map((service, i) => (
                <div key={i} className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section Placeholder */}
        <section id="about" className="py-24 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">Who We Are</span>
                <h2 className="text-4xl md:text-6xl font-display mt-4 mb-8">Crafting legacies since 2018.</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  BrandVibe is more than just a design studio. We are a collective of creators, strategists, and makers dedicated to the art of branding.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-display text-brand-accent">500+</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Projects Done</p>
                  </div>
                  <div>
                    <p className="text-4xl font-display text-brand-accent">12</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Design Awards</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-brand-accent/10 rounded-[3rem] -rotate-3" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team" 
                  className="relative rounded-[2.5rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-4 bg-brand-accent">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-display mb-8">Ready to transform your brand?</h2>
            <p className="text-xl mb-12 opacity-90">Let's create something extraordinary together. Our team is ready to bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-brand-accent rounded-full font-bold text-lg hover:bg-brand-primary hover:text-white transition-all shadow-xl">
                Get a Free Quote
              </button>
              <a 
                href="https://wa.me/254718440322"
                className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-primary transition-all shadow-xl flex items-center justify-center gap-2"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

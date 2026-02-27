import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Target, Zap } from 'lucide-react';

const slides = [
  {
    title: "Elevate Your Brand Identity",
    subtitle: "We craft visual stories that resonate with your audience.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    accent: "Design"
  },
  {
    title: "Premium Branded Merchandise",
    subtitle: "High-quality products that carry your brand everywhere.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
    accent: "Quality"
  },
  {
    title: "Strategic Marketing Solutions",
    subtitle: "Data-driven strategies to grow your business presence.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    accent: "Growth"
  }
];

const tabs = [
  { id: 'identity', label: 'Brand Identity', icon: Sparkles, description: 'Logo design, color palettes, and typography that define your essence.' },
  { id: 'merch', label: 'Merchandise', icon: Zap, description: 'Custom apparel, accessories, and corporate gifts that stand out.' },
  { id: 'strategy', label: 'Strategy', icon: Target, description: 'Market research and positioning to give you a competitive edge.' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Animated Slider Header */}
      <div className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1 rounded-full bg-brand-accent text-white text-sm font-bold mb-6 uppercase tracking-widest"
                >
                  {slides[currentSlide].accent}
                </motion.span>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl font-display text-white mb-6"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-brand-primary rounded-full font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-lg"
                >
                  Start Your Project
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-brand-accent w-20' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Feature Tabs Section */}
      <div className="flex-1 bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-brand-primary text-white shadow-xl translate-x-2'
                        : 'hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${activeTab === tab.id ? 'bg-brand-accent' : 'bg-gray-100'}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tab.label}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="w-full md:w-2/3 min-h-[300px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12 rounded-3xl bg-gray-50 border border-gray-100 w-full"
                >
                  <h2 className="text-4xl font-display mb-6 text-brand-primary">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    {tabs.find(t => t.id === activeTab)?.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-brand-accent font-bold hover:gap-4 transition-all">
                      Learn More <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

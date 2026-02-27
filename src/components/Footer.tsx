import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Facebook, Phone, MessageSquare, Quote, MapPin, Mail } from 'lucide-react';

const quotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Your brand is what other people say about you when you're not in the room.", author: "Jeff Bezos" },
  { text: "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.", author: "Jeff Bezos" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 px-4 overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* About Us */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display text-white">BrandVibe<span className="text-brand-accent">.</span></h2>
            <p className="text-gray-400 leading-relaxed">
              We are a full-service branding agency dedicated to helping businesses find their unique voice and visual identity in a crowded marketplace. From concept to merchandise, we bring your vision to life.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, color: '#f27d26' }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-widest text-brand-accent">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-gray-400">
                <Phone className="text-brand-accent shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <p>0718440322</p>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <MessageSquare className="text-brand-accent shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <a 
                    href="https://wa.me/254718440322" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="text-brand-accent shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">Studio</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <Mail className="text-brand-accent shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p>hello@brandvibe.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quotes Section */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-widest text-brand-accent">Inspiration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quotes.slice(0, 2).map((quote, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative">
                  <Quote className="absolute top-4 right-4 text-brand-accent/20" size={40} />
                  <p className="text-gray-300 italic mb-4 relative z-10">"{quote.text}"</p>
                  <p className="text-brand-accent font-bold text-sm">— {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
          <p>© {currentYear} BrandVibe Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

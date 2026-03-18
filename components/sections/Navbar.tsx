'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[rgba(10,10,10,0.85)] border-b border-[rgba(255,255,255,0.06)] py-4' 
          : 'bg-transparent py-8'
      }`}
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <nav className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 z-50 group">
          <div className="relative w-10 h-10 overflow-hidden">
            <Image 
              src="/images/logo.jpg" 
              alt="Kamdhenu 3D Global Logo" 
              fill 
              className="object-contain mix-blend-screen brightness-125"
            />
          </div>
          <span className="font-display font-light text-2xl tracking-tight text-[#f5f0e8] group-hover:text-[#c8a96e] transition-colors">
            Kamdhenu 3D Global
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="font-body text-[0.8rem] text-[rgba(245,240,232,0.7)] hover:text-[#c8a96e] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a href="#contact">
            <button className="border border-[rgba(245,240,232,0.25)] text-[#f5f0e8] px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.1em] uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all duration-300">
              Contact Us
            </button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#f5f0e8] z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-12 z-40"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-4xl text-[#f5f0e8] hover:text-[#c8a96e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="border border-[#c8a96e] text-[#c8a96e] px-8 py-3 uppercase tracking-widest text-sm mt-4">
                    Contact Us
                  </button>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

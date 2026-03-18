'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SiteContent } from '@/lib/content';

export default function Hero({ hero }: { hero: SiteContent['hero'] }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headline = hero?.headline || "";
  const words = headline.split(" ");

  // Cubic bezier ease for all animations
  const ease = [0.16, 1, 0.3, 1] as const;

  if (!mounted) return <div className="h-screen bg-[#0a0a0a]" />;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#0a0a0a]">
      {/* PHASE 1: Background Image Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.6, scale: 1.05 }}
        transition={{ duration: 1.5, ease: ease }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={hero?.image || "/images/hero.jpg"}
          alt={hero?.image_alt || "Hero Background"}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        {/* PHASE 2: Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%)'
          }}
        />
      </motion.div>

      {/* CONTENT: Bottom-Left Aligned */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 xl:px-20 pb-12 md:pb-20 pt-32 max-w-[1400px] mx-auto w-full pointer-events-none">
        <div className="max-w-[860px] pointer-events-auto">
          {/* PHASE 2: Word-by-word reveal */}
          <h1 className="font-display font-light text-[clamp(3.2rem,8vw,8rem)] leading-[1.0] tracking-[-0.03em] text-[#f5f0e8] mb-10">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.0,
                  delay: 0.4 + i * 0.1,
                  ease: ease
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* PHASE 3: Horizontal Rule & Subheadline */}
          <div className="flex flex-col gap-8 mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: ease }}
              style={{ originX: 0 }}
              className="w-20 h-px bg-[rgba(200,169,110,0.4)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: ease }}
              className="font-body font-light text-[clamp(0.9rem,1.8vw,1.15rem)] text-[rgba(245,240,232,0.6)] max-w-2xl leading-relaxed"
            >
              {hero?.subheadline}
            </motion.p>
          </div>

          {/* PHASE 4: CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: ease }}
            >
              <button className="bg-[#c8a96e] text-[#0a0a0a] px-9 py-3.5 text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-[#e8d5a3] hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">
                Explore Products
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8, ease: ease }}
            >
              <a href="#contact">
                <button className="border border-[rgba(245,240,232,0.25)] text-[#f5f0e8] px-9 py-3.5 text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] hover:-translate-y-0.5 transition-all duration-300 min-h-[44px] w-full">
                  Contact Us
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PHASE 5: Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
      >
        <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)]">
          Scroll to explore
        </span>
        <div className="relative w-px h-10 bg-[rgba(245,240,232,0.1)] overflow-hidden">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.5, duration: 0.8, ease: ease }}
            style={{ originY: 0 }}
            className="w-full h-full bg-[#c8a96e]"
          />
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-[#f5f0e8]/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

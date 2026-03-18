'use client';
import { motion } from 'framer-motion';
import { CountUp } from '@/components/ui/CountUp';
import { SiteContent } from '@/lib/content';

export default function StatsBanner({ stats }: { stats: SiteContent['stats'] }) {
  return (
    <section className="bg-surface border-y border-border py-20 overflow-hidden">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto flex flex-wrap justify-center gap-16 lg:gap-24">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group min-w-[200px]"
          >
            <div className="font-display text-5xl lg:text-6xl text-accent mb-3 group-hover:scale-110 transition-transform">
              <CountUp target={stat.value} duration={2.5} />
            </div>

            <h4 className="font-display text-lg mb-2 tracking-widest uppercase text-muted-light">{stat.label}</h4>
            <p className="text-muted text-xs leading-relaxed max-w-[200px]">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

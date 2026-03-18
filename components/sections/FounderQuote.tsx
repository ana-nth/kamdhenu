import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiteContent } from '@/lib/content';

export default function FounderQuote({ founder }: { founder: SiteContent['founder'] }) {
  return (
    <section className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
           {/* Founder Image - 5 cols */}
           <motion.div 
             className="lg:col-span-5 relative group"
             initial={{ opacity: 0, x: -30 }} 
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }} 
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             <div className="relative aspect-[4/5] overflow-hidden border border-border shadow-2xl">
               <Image 
                 src={founder.image} 
                 alt={founder.image_alt} 
                 fill 
                 className="object-cover transition-transform duration-1000 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
             </div>
             
             {/* Decorative element behind image */}
             <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-accent/20 -z-10" />
           </motion.div>

           {/* Quote - 7 cols */}
           <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div 
                className="font-display text-8xl text-accent mb-8 leading-none opacity-20"
                initial={{ opacity: 0, scale: 0.5 }} 
                whileInView={{ opacity: 0.2, scale: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                &ldquo;
              </motion.div>

              <motion.blockquote
                className="relative z-10 font-display font-light text-[clamp(1.5rem,3.5vw,2.2rem)] text-primary leading-[1.4] tracking-[-0.01em] mb-12"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {founder.quote}
              </motion.blockquote>

              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="w-12 h-px bg-accent mb-4" />
                <p className="font-display text-3xl text-primary tracking-wide">
                   {founder.name}
                </p>
                <p className="font-body text-muted text-[0.8rem] uppercase tracking-[0.2em]">
                   {founder.title}
                </p>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
}

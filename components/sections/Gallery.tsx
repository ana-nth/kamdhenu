'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SiteContent } from '@/lib/content';

export default function Gallery({ gallery }: { gallery: SiteContent['gallery'] }) {
  const [index, setIndex] = useState(-1);
  const slides = gallery.items.map((img) => ({ src: img.src.startsWith('http') ? img.src : `/${img.src}` }));

  return (
    <section id="gallery" className="py-24 md:py-32 lg:py-40">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-16 md:mb-24 flex flex-col items-center">
           <SectionLabel>{gallery.label}</SectionLabel>
           <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 mb-6 leading-[1.1] max-w-4xl">
              {gallery.headline}
           </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border group/gallery">
          {gallery.items.map((item, i) => (
            <motion.div 
               key={item.src}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               onClick={() => setIndex(i)}
               className="relative aspect-square cursor-none overflow-hidden group/item bg-bg"
            >
              <Image 
                 src={item.src} 
                 alt={item.alt} 
                 fill 
                 className="object-cover transition-transform duration-1000 group-hover/item:scale-110 group-hover/gallery:opacity-60 hover:!opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-bg/90 to-transparent translate-y-full group-hover/item:translate-y-0 transition-transform duration-500">
                 <p className="text-[0.6rem] uppercase tracking-widest text-muted mb-2 font-medium">{item.caption}</p>
                 <p className="text-xs text-primary/70 font-display italic">Kamdhenu Collection</p>
              </div>
              
              {/* Custom Cursor Circle on Hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none scale-0 group-hover/item:scale-100 duration-500">
                 <span className="text-[0.6rem] uppercase tracking-widest text-primary font-body">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
}

'use client';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection';
import { SiteContent } from '@/lib/content';

export default function About({ about }: { about: SiteContent['about'] }) {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <AnimatedSection>
           <div className="flex flex-col gap-8">
             <SectionLabel>{about.label}</SectionLabel>
             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                {about.headline}
             </h2>
             <p className="text-muted md:text-lg max-w-xl font-body font-light leading-relaxed">
                {about.body}
             </p>
             <div className="flex flex-wrap gap-4 mt-4">
                {about.highlights.map((h, i) => (
                  <AnimatedItem key={h} delay={i * 0.1}>
                    <span className="text-[0.65rem] uppercase tracking-widest border border-border px-4 py-2 font-body font-medium bg-surface/50">{h}</span>
                  </AnimatedItem>
                ))}
             </div>
           </div>
        </AnimatedSection>

        <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[3/4]">
           <AnimatedSection className="w-full h-full relative" delay={0.2}>
              {/* Main Image */}
              <div className="w-[85%] h-[85%] relative z-10 border border-border overflow-hidden">
                 <Image 
                    src={about.image_1} 
                    alt={about.image_1_alt} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                 />
              </div>

              {/* Offset Image */}
              <div className="absolute bottom-0 right-0 w-[50%] h-[50%] z-20 border-[8px] border-bg overflow-hidden shadow-2xl">
                 <Image 
                    src={about.image_2} 
                    alt={about.image_2_alt} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                 />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-[-20px] right-[-20px] w-20 h-20 border-t border-r border-accent/30 z-0" />
              <div className="absolute bottom-[-10px] left-[-10px] w-40 h-40 bg-accent/5 blur-[80px] z-0" />
           </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

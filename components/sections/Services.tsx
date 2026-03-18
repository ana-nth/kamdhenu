'use client';
import { useRef, useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';
import { SiteContent } from '@/lib/content';

export default function Services({ services }: { services: SiteContent['services'] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const width = clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
        const index = Math.round(scrollLeft / width);
        setActive(index);
      }
    };
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 bg-surface">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel>{services.label}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 mb-6 leading-[1.1]">
            {services.headline}
          </h2>
        </AnimatedSection>

        {/* Carousel Wrapper */}
        <div className="relative group/services">
           {/* Navigation Arrows */}
           <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full hidden md:flex items-center justify-center w-16 h-16 text-primary/10 hover:text-accent transition-colors z-20"
          >
            <ChevronLeft size={64} strokeWidth={1} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full hidden md:flex items-center justify-center w-16 h-16 text-primary/10 hover:text-accent transition-colors z-20"
          >
            <ChevronRight size={64} strokeWidth={1} />
          </button>

          <div 
             ref={scrollRef}
             className="flex gap-px bg-border border border-border overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {services.items.map((service, i) => (
              <div 
                key={service.title} 
                className="min-w-full md:min-w-[50%] lg:min-w-[33.33%] bg-bg p-10 snap-start flex flex-col group hover:bg-surface transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 text-9xl font-display text-primary/[0.03] pointer-events-none group-hover:text-accent/[0.05] transition-colors">
                  {i + 1}
                </div>

                <div className={cn("w-3 h-12 mb-8 bg-accent", service.color)} />
                <h3 className="font-display text-3xl mb-6 relative z-10">{service.title}</h3>
                <p className="text-muted leading-relaxed mb-10 flex-grow font-body font-light text-sm italic">
                  &ldquo;{service.description}&rdquo;
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 text-sm text-primary/80">
                      <Check size={16} className="text-accent mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 border-t border-border">
                   <span className="text-[0.65rem] uppercase tracking-widest text-accent font-body">Expert Solution</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows */}
          <div className="flex md:hidden justify-center gap-12 mt-8">
            <button onClick={() => scroll('left')} className="p-4 text-primary/40 hover:text-accent transition-colors">
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button onClick={() => scroll('right')} className="p-4 text-primary/40 hover:text-accent transition-colors">
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {services.items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const width = scrollRef.current.clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
                   scrollRef.current.scrollTo({ left: i * width, behavior: 'smooth' });
                }
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-accent' : 'bg-border hover:bg-muted'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SiteContent } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function Testimonials({ testimonials }: { testimonials: SiteContent['testimonials'] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const parent = scrollRef.current;
      const child = parent.children[index] as HTMLElement;
      parent.scrollTo({
        left: child.offsetLeft,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const parent = e.currentTarget;
    const index = Math.round(parent.scrollLeft / parent.offsetWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 lg:py-40 bg-surface/30 relative overflow-hidden">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto flex flex-col items-center text-center mb-20">
        <AnimatedSection>
          <SectionLabel>{testimonials.label}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 leading-[1.1]">
            {testimonials.headline}
          </h2>
        </AnimatedSection>
      </div>

      <div className="relative group max-w-[1400px] mx-auto">
        {/* Navigation Arrows (Transparent Overlays) */}
        <button 
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className={cn(
            "absolute left-0 top-0 bottom-0 w-24 z-20 flex items-center justify-center text-primary/10 hover:text-accent transition-all hover:bg-gradient-to-r hover:from-black/10 hover:to-transparent",
            activeIndex === 0 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft size={64} strokeWidth={1} />
        </button>

        <button 
          onClick={() => scrollToIndex(Math.min(testimonials.items.length - 1, activeIndex + 1))}
          className={cn(
            "absolute right-0 top-0 bottom-0 w-24 z-20 flex items-center justify-center text-primary/10 hover:text-accent transition-all hover:bg-gradient-to-l hover:from-black/10 hover:to-transparent",
            activeIndex === testimonials.items.length - 1 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight size={64} strokeWidth={1} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing pb-8"
        >
          {testimonials.items.map((stat, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-full snap-center flex justify-center px-6 md:px-24"
            >
              <div className="max-w-[900px] text-center">
                 <div className="text-[12rem] md:text-[18rem] font-display text-accent/5 absolute left-1/2 -top-12 -translate-x-1/2 pointer-events-none select-none">&ldquo;</div>
                 <div className="relative pt-12 md:pt-24 pb-12">
                   <p className="text-2xl md:text-4xl lg:text-5xl font-display font-light italic leading-tight text-white mb-12">
                     {stat.quote}
                   </p>
                   <div className="w-16 h-px bg-accent/40 mx-auto mb-10" />
                   <h4 className="font-display text-3xl md:text-4xl mb-2 text-white">{stat.name}</h4>
                   <p className="text-accent text-sm md:text-base uppercase tracking-[0.3em] font-body">
                     {stat.title}
                   </p>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators (5 Dots) */}
        <div className="flex justify-center gap-4 mt-8">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 transition-all duration-700 rounded-full",
                activeIndex === i ? "w-10 bg-accent" : "w-1.5 bg-border hover:bg-accent/40"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

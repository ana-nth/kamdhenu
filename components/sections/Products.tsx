'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SiteContent } from '@/lib/content';

export default function Products({ products }: { products: SiteContent['products'] }) {
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
        const index = Math.round(scrollLeft / (clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)));
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
    <section id="products" className="py-24 md:py-32 lg:py-40">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <AnimatedSection className="mb-16 md:mb-24">
          <div className="max-w-2xl">
            <SectionLabel>{products.label}</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 mb-6 leading-[1.1]">
              {products.headline}
            </h2>
            <p className="text-muted md:text-lg font-body font-light max-w-xl">
              {products.subheadline}
            </p>
          </div>
        </AnimatedSection>

        {/* Carousel Container Wrapper with Relative Arrows */}
        <div className="relative group/carousel">
          {/* Navigation Arrows - Styled like Testimonials */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full hidden md:flex items-center justify-center w-16 h-16 text-primary/20 hover:text-accent transition-colors z-20"
          >
            <ChevronLeft size={64} strokeWidth={1} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full hidden md:flex items-center justify-center w-16 h-16 text-primary/20 hover:text-accent transition-colors z-20"
          >
            <ChevronRight size={64} strokeWidth={1} />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-px bg-border border border-border overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {products.items.map((product, i) => (
              <div 
                key={product.id} 
                className="min-w-full md:min-w-[50%] lg:min-w-[33.33%] bg-bg p-8 md:p-12 snap-start group hover:bg-surface transition-all duration-500 flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] mb-10 overflow-hidden border border-border/50">
                  <Image 
                     src={product.image} 
                     alt={product.image_alt || product.name} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                     <span className="text-muted text-[0.6rem] uppercase tracking-[0.2em] font-body mb-2 block">{product.category}</span>
                     <h3 className="font-display text-3xl md:text-4xl">{product.name}</h3>
                  </div>
                </div>
                
                <p className="text-muted text-sm md:text-base leading-relaxed mb-8 flex-grow">
                   {product.description}
                </p>
                
                <div className="pt-8 border-t border-border mt-auto">
                   <span className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/40 font-body group-hover:text-accent transition-colors">Industrial Grade Quality</span>
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
          {products.items.map((_, i) => (
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

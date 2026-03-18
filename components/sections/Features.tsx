'use client';
import { Factory, Truck, Settings, Users, LucideIcon } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection';
import { SiteContent } from '@/lib/content';

const icons: Record<string, LucideIcon> = {
  factory: Factory,
  truck: Truck,
  settings: Settings,
  users: Users,
};

export default function Features({ features }: { features: SiteContent['features'] }) {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel>{features.label}</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 mb-6 leading-[1.1]">
            {features.headline}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-px lg:bg-border lg:border lg:border-border">
          {features.items.map((feature, i) => {
            const Icon = icons[feature.icon] || Factory;
            return (
              <AnimatedItem key={feature.title} delay={i * 0.1} className="lg:bg-bg lg:p-12 group hover:lg:bg-bg/50 transition-colors">
                <div className="mb-8 p-4 bg-accent/5 w-max group-hover:bg-accent group-hover:text-bg transition-colors duration-500 border border-border">
                   <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl mb-4 leading-tight">{feature.title}</h3>
                <p className="text-muted leading-relaxed font-body font-light text-sm line-clamp-3">
                  {feature.description}
                </p>
                <div className="mt-10 flex items-center gap-3 text-accent overflow-hidden">
                   <div className="w-8 h-px bg-accent/30 group-hover:w-16 transition-all duration-500" />
                   <span className="text-[0.6rem] uppercase tracking-[0.2em] font-body opacity-0 group-hover:opacity-100 transition-opacity duration-700">Core Value</span>
                </div>
              </AnimatedItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}

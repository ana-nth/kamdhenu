import { cn } from '@/lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "flex items-center gap-3 text-accent text-[0.7rem] font-body font-medium tracking-[0.18em] uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-accent",
      className
    )}>
      {children}
    </span>
  );
}

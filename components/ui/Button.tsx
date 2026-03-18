import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className, 
  onClick,
  type = 'button'
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-body font-semibold tracking-[0.15em] uppercase transition-all duration-300 ease-expo-out min-h-[44px]";
  
  const variants = {
    primary: "bg-accent text-bg hover:bg-accent-light hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-transparent text-primary border border-border-light hover:border-accent hover:text-accent"
  };

  const styles = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

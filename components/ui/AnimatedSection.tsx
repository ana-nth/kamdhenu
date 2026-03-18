'use client';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  staggerChildren = 0.1 
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();
  
  const variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: reduced ? 0 : 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: delay
      } 
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  
  const variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: reduced ? 0 : 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay
      } 
    }
  };



  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

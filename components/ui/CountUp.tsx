'use client';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const numMatch = target.match(/[\d,]+/);
    if (!numMatch) { setDisplay(target); return; }
    
    const num = parseInt(numMatch[0].replace(/,/g, ''));
    const suffix = target.replace(/[\d,.]+/, '');
    let current = 0;
    const step = num / (duration / 16);

    const interval = setInterval(() => {
      current = Math.min(current + step, num);
      setDisplay(Math.floor(current).toLocaleString() + suffix);
      if (current >= num) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return <span ref={ref}>{display}</span>;
}

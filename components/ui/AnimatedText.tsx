'use client';
import { motion } from 'framer-motion';

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.2em] relative"
          initial={{ opacity: 0, y: 80, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.06,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

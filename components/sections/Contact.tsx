'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin, Instagram } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { SiteContent } from '@/lib/content';

export default function Contact({ contact }: { contact: SiteContent['contact'] }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 bg-bg border-t border-border">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <AnimatedSection className="lg:col-span-2">
            <SectionLabel>Contact Us</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mt-8 mb-16 leading-[1.1]">
              Contact Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="flex flex-col gap-6 p-10 bg-surface border border-border hover:border-accent transition-colors group">
                 <div className="flex items-center gap-4 text-accent">
                    <div className="p-4 border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:text-bg transition-all"><MapPin size={24} /></div>
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] font-body font-bold">Location</span>
                 </div>
                 <p className="text-muted-light text-lg leading-relaxed">{contact.details.location}</p>
                 <a href={contact.details.maps} target="_blank" rel="noopener noreferrer" className="text-accent text-xs uppercase tracking-widest mt-auto border-b border-accent/20 w-fit pb-1 hover:border-accent">View on Maps</a>
              </div>

              <div className="flex flex-col gap-6 p-10 bg-surface border border-border hover:border-accent transition-colors group">
                 <div className="flex items-center gap-4 text-accent">
                    <div className="p-4 border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:text-bg transition-all"><Phone size={24} /></div>
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] font-body font-bold">Phone</span>
                 </div>
                 <p className="text-muted-light text-lg">{contact.details.phone}</p>
                 <a href={`tel:${contact.details.phone}`} className="text-accent text-xs uppercase tracking-widest mt-auto border-b border-accent/20 w-fit pb-1 hover:border-accent">Call Now</a>
              </div>

              <div className="flex flex-col gap-6 p-10 bg-surface border border-border hover:border-accent transition-colors group">
                 <div className="flex items-center gap-4 text-accent">
                    <div className="p-4 border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:text-bg transition-all"><Mail size={24} /></div>
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] font-body font-bold">Email</span>
                 </div>
                 <p className="text-muted-light text-lg break-all">{contact.details.email}</p>
                 <a href={`mailto:${contact.details.email}`} className="text-accent text-xs uppercase tracking-widest mt-auto border-b border-accent/20 w-fit pb-1 hover:border-accent">Send Email</a>
              </div>
            </div>

            <div className="mt-20 flex justify-center gap-8">
               <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-6 bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-500 rounded-full"><Linkedin size={24} /></a>
               <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" className="p-6 bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-500 rounded-full"><Instagram size={24} /></a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

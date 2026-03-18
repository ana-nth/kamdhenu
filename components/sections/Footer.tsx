import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { SiteContent } from '@/lib/content';

export default function Footer({ footer, nav, contact }: { footer: SiteContent['footer'], nav: SiteContent['nav'], contact: SiteContent['contact'] }) {
  return (
    <footer className="bg-bg border-t border-border pt-20 pb-10">
      <div className="px-6 md:px-12 xl:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
               <Image src={nav.logo} alt={nav.logo_alt} width={150} height={50} className="h-10 w-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="text-muted text-sm max-w-xs mb-8 leading-relaxed">
               {footer.tagline}
            </p>
            <div className="flex gap-4">
              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border hover:border-accent hover:text-accent transition-all"><Linkedin size={18} /></a>
              <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border hover:border-accent hover:text-accent transition-all"><Instagram size={18} /></a>
              <a href={`mailto:${contact.details.email}`} className="p-3 bg-surface border border-border hover:border-accent hover:text-accent transition-all"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted hover:text-accent text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6 tracking-wide">Products</h4>
            <ul className="space-y-4">
              <li><Link href="#products" className="text-muted hover:text-accent text-sm transition-colors">PP Granules</Link></li>
              <li><Link href="#products" className="text-muted hover:text-accent text-sm transition-colors">HDPE Granules</Link></li>
              <li><Link href="#products" className="text-muted hover:text-accent text-sm transition-colors">LDPE Granules</Link></li>
              <li><Link href="#products" className="text-muted hover:text-accent text-sm transition-colors">Recycled Materials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6 tracking-wide">Consulting</h4>
            <ul className="space-y-4 text-muted text-sm leading-relaxed">
              <li>Plant Setup & Layout</li>
              <li>Process Optimization</li>
              <li>Machinery Sourcing</li>
              <li>Cost Reduction Strategies</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-light text-[0.7rem] uppercase tracking-widest font-body">
            {footer.copyright}
          </p>
          <div className="flex gap-10">
            <Link href="/" className="text-muted-light hover:text-accent text-[0.7rem] uppercase tracking-widest transition-colors font-body">Privacy Policy</Link>
            <Link href="/" className="text-muted-light hover:text-accent text-[0.7rem] uppercase tracking-widest transition-colors font-body">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

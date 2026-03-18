import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export type ProductItem = { id: string; category: string; name: string; description: string; image: string; image_alt: string };
export type SiteContent = {
  site: { name: string; tagline: string; description: string; url: string; favicon: string };
  nav: { logo: string; logo_alt: string; links: { label: string; href: string }[]; cta: { label: string; href: string } };
  hero: { headline: string; subheadline: string; image: string; image_alt: string; cta_primary: { label: string; href: string }; cta_secondary: { label: string; href: string } };
  stats: { value: string; label: string; description: string }[];
  about: { label: string; headline: string; body: string; highlights: string[]; image_1: string; image_1_alt: string; image_2: string; image_2_alt: string };
  products: { label: string; headline: string; subheadline: string; items: ProductItem[] };
  gallery: { label: string; headline: string; items: { src: string; alt: string; caption: string }[] };
  services: { label: string; headline: string; items: { title: string; color: string; description: string; features: string[] }[] };

  features: { label: string; headline: string; items: { icon: string; title: string; description: string }[] };
  testimonials: { label: string; headline: string; items: { quote: string; name: string; title: string; image: string }[] };
  founder: { name: string; title: string; image: string; image_alt: string; quote: string };
  contact: { label: string; headline: string; subheadline: string; details: Record<string, string>; social: Record<string, string>; form: Record<string, string> };
  footer: { tagline: string; copyright: string; links: { label: string; href: string }[] };
};



export function getContent(): SiteContent {
  const filePath = path.join(process.cwd(), 'content', 'content.yaml');
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as SiteContent;
}

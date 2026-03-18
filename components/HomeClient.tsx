'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import StatsBanner from '@/components/sections/StatsBanner';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Services from '@/components/sections/Services';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import FounderQuote from '@/components/sections/FounderQuote';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

import { SiteContent, ProductItem } from '@/lib/content';

export default function HomeClient({ initialContent }: { initialContent: SiteContent }) {
  const [mergedProducts, setMergedProducts] = useState<ProductItem[]>(initialContent.products.items);



  useEffect(() => {
    const saved = localStorage.getItem('kamdhenu_products');
    if (saved) {
      try {
        const customProducts = JSON.parse(saved);
        // Sanitize broken image paths from older saves
        const sanitizedProducts = customProducts.map((p: ProductItem) => ({
          ...p,
          image: p.image.replace(/^\/\/images\//, '/images/')
        }));
        setMergedProducts([...initialContent.products.items, ...sanitizedProducts]);
      } catch (e) {
        console.error("Failed to parse custom products", e);
      }
    }
  }, [initialContent.products.items]);

  const siteContentWithProducts = {
    ...initialContent,
    products: {
      ...initialContent.products,
      items: mergedProducts
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero hero={initialContent.hero} />
      <div className="relative z-10">
        <StatsBanner stats={initialContent.stats} />
        <About about={initialContent.about} />
        <Products products={siteContentWithProducts.products} />
        <Services services={initialContent.services} />
        <Features features={initialContent.features} />
        <Testimonials testimonials={initialContent.testimonials} />
        <FounderQuote founder={initialContent.founder} />
        <Contact contact={initialContent.contact} />
        <Footer footer={initialContent.footer} nav={initialContent.nav} contact={initialContent.contact} />
      </div>
    </main>
  );
}

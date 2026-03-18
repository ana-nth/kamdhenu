'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Lock, LogOut, Upload, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SiteContent } from '@/lib/content';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('site');
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setAuthorized(true);
      fetchContent();
    }
  }, []);

  const fetchContent = async () => {
    // We can't fetch directly from FS on client, so we might need a fetch API
    // For now, we'll use a hack or assume we have a way to get initial data.
    // Actually, HomeClient gets it from getContent(). 
    // I'll create an API to GET the content too.
    const res = await fetch('/api/get-content');
    const data = await res.json();
    setContent(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kamdhenu3d') {
      setAuthorized(true);
      localStorage.setItem('admin_auth', 'true');
      fetchContent();
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setAuthorized(false);
  };

  const handlePublish = async () => {
    if (!content) return;
    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setPublished(true);
        setTimeout(() => setPublished(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathArr: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        updateValue(pathArr, data.url);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const updateValue = (path: string[], value: any) => {
    if (!content) return;
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  const addItem = (path: string[], template: any) => {
    if (!content) return;
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
    }
    current.push(template);
    setContent(newContent);
  };

  const removeItem = (path: string[], index: number) => {
    if (!content) return;
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
    }
    current.splice(index, 1);
    setContent(newContent);
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-[#f5f0e8]">
        <form onSubmit={handleLogin} className="bg-[#1a1a1a] p-12 border border-white/5 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Lock className="text-[#c8a96e]" size={48} />
          </div>
          <h1 className="font-display text-3xl text-center mb-10">Admin Access</h1>
          <div className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Access Key"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 px-5 py-4 text-sm focus:border-[#c8a96e] outline-none transition-colors"
            />
            <button type="submit" className="w-full bg-[#c8a96e] text-[#0a0a0a] py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#e8d5a3] transition-colors">
              Verify Identity
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (!content) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#f5f0e8]">Loading Content Matrix...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] flex">
      {/* Logout Header */}
      <button 
        onClick={handleLogout}
        className="fixed top-8 right-8 z-50 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#c8a96e] transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>

      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-white/5 p-12 overflow-y-auto hidden lg:block">
        <h2 className="font-display text-2xl mb-12 text-[#c8a96e]">Admin Console</h2>
        <nav className="space-y-4">
          {Object.keys(content).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`block w-full text-left p-4 text-xs uppercase tracking-widest transition-all ${activeSection === key ? 'bg-white/5 text-[#c8a96e] border-l-2 border-[#c8a96e]' : 'text-white/40 hover:text-white'}`}
            >
              {key}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-grow p-12 lg:p-32 overflow-y-auto pb-44">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20">
             <span className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]/60 mb-4 block">Current Section</span>
             <h1 className="font-display text-5xl md:text-7xl capitalize">{activeSection}</h1>
          </header>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-16">
            {activeSection === 'site' && (
              <div className="space-y-10">
                <InputField label="Site Name" value={content.site.name} onChange={(v) => updateValue(['site', 'name'], v)} />
                <InputField label="Tagline" value={content.site.tagline} onChange={(v) => updateValue(['site', 'tagline'], v)} />
                <TextAreaField label="Description" value={content.site.description} onChange={(v) => updateValue(['site', 'description'], v)} />
                <ImageUploadField label="Favicon" value={content.site.favicon} onChange={(e) => handleImageUpload(e, ['site', 'favicon'])} />
              </div>
            )}

            {activeSection === 'nav' && (
              <div className="space-y-10">
                <ImageUploadField label="Logo" value={content.nav.logo} onChange={(e) => handleImageUpload(e, ['nav', 'logo'])} />
                <InputField label="Logo Alt" value={content.nav.logo_alt} onChange={(v) => updateValue(['nav', 'logo_alt'], v)} />
              </div>
            )}

            {activeSection === 'hero' && (
              <div className="space-y-10">
                <InputField label="Headline" value={content.hero.headline} onChange={(v) => updateValue(['hero', 'headline'], v)} />
                <TextAreaField label="Subheadline" value={content.hero.subheadline} onChange={(v) => updateValue(['hero', 'subheadline'], v)} />
                <ImageUploadField label="Background Image" value={content.hero.image} onChange={(e) => handleImageUpload(e, ['hero', 'image'])} />
              </div>
            )}

            {activeSection === 'products' && (
              <div className="space-y-16">
                <div>
                    <h3 className="text-xl mb-8 text-[#c8a96e]">Carousel Content</h3>
                    <InputField label="Label" value={content.products.label} onChange={(v) => updateValue(['products', 'label'], v)} />
                    <InputField label="Headline" value={content.products.headline} onChange={(v) => updateValue(['products', 'headline'], v)} />
                </div>
                
                <div className="space-y-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">Items ({content.products.items.length})</h3>
                        <button 
                            onClick={() => addItem(['products', 'items'], { id: Date.now().toString(), category: 'New', name: 'New Product', description: '', image: '', image_alt: '' })}
                            className="bg-[#c8a96e] text-[#0a0a0a] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-widest"
                        >
                            + Add Product
                        </button>
                    </div>
                    {content.products.items.map((item, idx) => (
                        <div key={item.id} className="p-8 border border-white/5 bg-white/2 relative">
                            <button 
                                onClick={() => removeItem(['products', 'items'], idx)}
                                className="absolute top-4 right-4 text-white/20 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Name" value={item.name} onChange={(v) => updateValue(['products', 'items', idx.toString(), 'name'], v)} />
                                <InputField label="Category" value={item.category} onChange={(v) => updateValue(['products', 'items', idx.toString(), 'category'], v)} />
                                <div className="md:col-span-2">
                                    <ImageUploadField label="Image" value={item.image} onChange={(e) => handleImageUpload(e, ['products', 'items', idx.toString(), 'image'])} />
                                </div>
                                <div className="md:col-span-2">
                                    <TextAreaField label="Description" value={item.description} onChange={(v) => updateValue(['products', 'items', idx.toString(), 'description'], v)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            )}

            {activeSection === 'testimonials' && (
              <div className="space-y-12">
                   <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">Reviews ({content.testimonials.items.length})</h3>
                        <button 
                            onClick={() => addItem(['testimonials', 'items'], { quote: '', name: 'New Client', title: 'CEO', image: '' })}
                            className="bg-[#c8a96e] text-[#0a0a0a] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-widest"
                        >
                            + Add Review
                        </button>
                    </div>
                    {content.testimonials.items.map((item, idx) => (
                        <div key={idx} className="p-8 border border-white/5 bg-white/2 relative">
                            <button 
                                onClick={() => removeItem(['testimonials', 'items'], idx)}
                                className="absolute top-4 right-4 text-white/20 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Name" value={item.name} onChange={(v) => updateValue(['testimonials', 'items', idx.toString(), 'name'], v)} />
                                <InputField label="Title/Company" value={item.title} onChange={(v) => updateValue(['testimonials', 'items', idx.toString(), 'title'], v)} />
                                <div className="md:col-span-2">
                                    <TextAreaField label="Quote" value={item.quote} onChange={(v) => updateValue(['testimonials', 'items', idx.toString(), 'quote'], v)} />
                                </div>
                            </div>
                        </div>
                    ))}
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-10">
                <h3 className="text-xl mb-4 text-[#c8a96e]">Social Links</h3>
                <InputField label="Instagram" value={content.contact.social.instagram} onChange={(v) => updateValue(['contact', 'social', 'instagram'], v)} />
                <InputField label="LinkedIn" value={content.contact.social.linkedin} onChange={(v) => updateValue(['contact', 'social', 'linkedin'], v)} />
                <InputField label="Facebook" value={content.contact.social.facebook || ''} onChange={(v) => updateValue(['contact', 'social', 'facebook'], v)} />
                
                <h3 className="text-xl mb-4 mt-12 text-[#c8a96e]">Details</h3>
                <InputField label="Email" value={content.contact.details.email} onChange={(v) => updateValue(['contact', 'details', 'email'], v)} />
                <InputField label="Phone" value={content.contact.details.phone} onChange={(v) => updateValue(['contact', 'details', 'phone'], v)} />
              </div>
            )}

            {activeSection === 'about' && (
              <div className="space-y-10">
                <InputField label="Label" value={content.about.label} onChange={(v) => updateValue(['about', 'label'], v)} />
                <InputField label="Headline" value={content.about.headline} onChange={(v) => updateValue(['about', 'headline'], v)} />
                <TextAreaField label="Body" value={content.about.body} onChange={(v) => updateValue(['about', 'body'], v)} />
                <ImageUploadField label="Image 1" value={content.about.image_1} onChange={(e) => handleImageUpload(e, ['about', 'image_1'])} />
                <ImageUploadField label="Image 2" value={content.about.image_2} onChange={(e) => handleImageUpload(e, ['about', 'image_2'])} />
              </div>
            )}

            {activeSection === 'services' && (
              <div className="space-y-12">
                   <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">Packages ({content.services.items.length})</h3>
                        <button 
                            onClick={() => addItem(['services', 'items'], { title: 'New Package', color: 'gold', description: '', features: [] })}
                            className="bg-[#c8a96e] text-[#0a0a0a] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-widest"
                        >
                            + Add Package
                        </button>
                    </div>
                    {content.services.items.map((item, idx) => (
                        <div key={idx} className="p-8 border border-white/5 bg-white/2 relative">
                            <button 
                                onClick={() => removeItem(['services', 'items'], idx)}
                                className="absolute top-4 right-4 text-white/20 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="space-y-6">
                                <InputField label="Title" value={item.title} onChange={(v) => updateValue(['services', 'items', idx.toString(), 'title'], v)} />
                                <InputField label="Description" value={item.description} onChange={(v) => updateValue(['services', 'items', idx.toString(), 'description'], v)} />
                            </div>
                        </div>
                    ))}
              </div>
            )}

            {activeSection === 'features' && (
              <div className="space-y-12">
                   <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">Core Services ({content.features.items.length})</h3>
                    </div>
                    {content.features.items.map((item, idx) => (
                        <div key={idx} className="p-8 border border-white/5 bg-white/2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Title" value={item.title} onChange={(v) => updateValue(['features', 'items', idx.toString(), 'title'], v)} />
                                <InputField label="Icon (lucide name)" value={item.icon} onChange={(v) => updateValue(['features', 'items', idx.toString(), 'icon'], v)} />
                                <div className="md:col-span-2">
                                    <TextAreaField label="Description" value={item.description} onChange={(v) => updateValue(['features', 'items', idx.toString(), 'description'], v)} />
                                </div>
                            </div>
                        </div>
                    ))}
              </div>
            )}

            {activeSection === 'founder' && (
              <div className="space-y-10">
                <InputField label="Name" value={content.founder.name} onChange={(v) => updateValue(['founder', 'name'], v)} />
                <InputField label="Title" value={content.founder.title} onChange={(v) => updateValue(['founder', 'title'], v)} />
                <ImageUploadField label="Founder Image" value={content.founder.image} onChange={(e) => handleImageUpload(e, ['founder', 'image'])} />
                <TextAreaField label="Quote" value={content.founder.quote} onChange={(v) => updateValue(['founder', 'quote'], v)} />
              </div>
            )}

            {activeSection === 'footer' && (
              <div className="space-y-10">
                <InputField label="Tagline" value={content.footer.tagline} onChange={(v) => updateValue(['footer', 'tagline'], v)} />
                <InputField label="Copyright" value={content.footer.copyright} onChange={(v) => updateValue(['footer', 'copyright'], v)} />
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Publish Control */}
      <div className="fixed bottom-12 right-12 flex items-center gap-4 z-50">
        <AnimatePresence>
            {published && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 bg-[#1a1a1a] border border-[#c8a96e]/20 px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#c8a96e]"
                >
                    <CheckCircle size={16} /> Published
                </motion.div>
            )}
        </AnimatePresence>
        
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className={`flex items-center gap-3 bg-[#c8a96e] text-[#0a0a0a] px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#e8d5a3] transition-all transform hover:-translate-y-1 shadow-2xl ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isPublishing ? 'Writing YAML...' : <><Save size={20} /> Publish Changes</>}
        </button>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0a0a0a] border border-white/5 p-4 text-sm focus:border-[#c8a96e] outline-none transition-colors"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">{label}</label>
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-[#0a0a0a] border border-white/5 p-4 text-sm focus:border-[#c8a96e] outline-none transition-colors resize-none"
      />
    </div>
  );
}

function ImageUploadField({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="w-full">
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">{label}</label>
      <div className="relative group overflow-hidden bg-[#0a0a0a] border border-white/5">
        <div className="flex items-center gap-6 p-4">
            {value ? (
                <div className="relative w-16 h-16 bg-white/5 border border-white/10 shrink-0">
                    <img src={value} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-16 h-16 bg-white/5 border border-dashed border-white/10 flex items-center justify-center shrink-0">
                    <Upload size={20} className="text-white/20" />
                </div>
            )}
            <div className="flex-grow overflow-hidden">
                <div className="relative overflow-hidden cursor-pointer inline-block">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#c8a96e] hover:text-[#e8d5a3] transition-colors border-b border-[#c8a96e]/20 pb-1">
                        Change Image (Upload)
                    </span>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={onChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

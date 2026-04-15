'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, Zap, Shield, Heart, Clock, Mail, Phone, MapPin, 
  CheckCheck, Loader2, ArrowRight, Instagram, Menu, X, ImageOff,
  Ban
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: oversized

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-200 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-zinc-400" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const BRAND = {
  name: "Zest & Sip",
  tagline: "Energy in a Bottle.",
  description: "Lekki's premier juice bar serving cold-pressed, 100% organic tropical vitality designed to fuel your Lagos hustle.",
  industry: "food",
  region: "nigeria",
  currency: "₦",
  vibe: "energetic"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1676159435282-339f93d09432",
  products: [
    "https://images.unsplash.com/photo-1514534309681-d89b52131352",
    "https://images.unsplash.com/photo-1722970312790-fa5418f9b932",
    "https://images.unsplash.com/photo-1638351501396-6cf23d77f437",
    "https://images.unsplash.com/photo-1590240568107-6f3a0cd78459"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1586143340909-03cfe56987a3",
    "https://images.unsplash.com/photo-1671118718487-dcd51e7c26c9",
    "https://images.unsplash.com/photo-1686723342906-22961ce61fa5",
    "https://images.unsplash.com/photo-1626388877564-269967fb8ba7",
    "https://images.unsplash.com/photo-1774806245428-52d852152bac",
    "https://images.unsplash.com/photo-1642821369416-e0f78d23401f"
  ]
};

export default function Website() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-secondary">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-secondary/90 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-heading text-3xl font-black tracking-tighter text-primary">
            ZEST<span className="text-accent">&</span>SIP
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'Health', 'Our Vibe', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                {item}
              </a>
            ))}
            <a href="#products" className="bg-accent text-white px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-transform">
              Order Now
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-primary">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-8">
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center gap-8 mt-12">
          {['Menu', 'Health', 'Our Vibe', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setMobileMenu(false)} className="font-heading text-4xl font-black text-white">
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Hero: HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-[12vw] md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            Energy<br/><span className="text-primary">In A Bottle.</span>
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-xl leading-relaxed font-medium">
            Lekki's premier juice bar serving cold-pressed, 100% organic tropical vitality designed to fuel your Lagos hustle.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#products" className="bg-primary text-white px-10 py-5 font-black text-lg uppercase tracking-wider hover:brightness-110 transition rounded-full shadow-2xl">
              View the Menu
            </a>
            <a href="#about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-white/20 transition rounded-full">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {[
            { number: '100%', label: 'Organic Fruits' },
            { number: '0', label: 'Added Sugars' },
            { number: '24h', label: 'Freshness Window' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6">
              <p className="text-6xl font-black text-white tracking-tighter">{s.number}</p>
              <p className="text-white/80 text-sm mt-2 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features: F-ICON-GRID */}
      <FeaturesSection />

      {/* Products: P-STAGGER */}
      <ProductsSection />

      {/* Gallery: Masonry */}
      <GallerySection />

      {/* Testimonials: T-SLIDER */}
      <TestimonialsSection />

      {/* Contact: C4 */}
      <ContactSection />

      {/* Footer: F1 */}
      <footer className="bg-zinc-950 py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-4xl font-black text-primary mb-6">ZEST & SIP</h2>
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-8">
              Handcrafted in the heart of Lekki. We bring the pure essence of the tropics straight to your doorstep. Sharp delivery, nationwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-zinc-500 font-medium">
              <li><a href="#products" className="hover:text-primary transition-colors">Juice Menu</a></li>
              <li><a href="#health" className="hover:text-primary transition-colors">Health Benefits</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Inside the Bar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Visit Us</h4>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Lekki Phase 1,<br/>Lagos, Nigeria.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Zest & Sip. All Rights Reserved.</p>
          <p className="text-zinc-600 text-sm font-mono uppercase tracking-widest">Lekki's Purest Vitality</p>
        </div>
      </footer>
    </main>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "100% Organic", description: "We source only the finest pesticide-free fruits from local sustainable farms.", icon: <Leaf size={32}/> },
    { title: "Cold-Pressed Daily", description: "Our hydraulic press keeps enzymes intact for maximum nutritional density.", icon: <Zap size={32}/> },
    { title: "Zero Added Sugars", description: "Pure, unadulterated sweetness straight from the fruit, just as nature intended.", icon: <Shield size={32}/> }
  ];

  return (
    <section id="health" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`font-heading text-6xl md:text-7xl font-black text-zinc-950 uppercase tracking-tighter transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            The Zest <span className="text-primary">Standard</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`p-10 rounded-[2.5rem] border-2 border-zinc-100 bg-white shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-heading text-3xl font-black text-zinc-900 mb-4">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-lg">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "The Lekki Sunrise", description: "You'll wake your senses with this vibrant blend of sun-ripened mango, sweet orange, and a spicy ginger kick.", price: "₦3,500", img: IMAGES.products[0] },
    { name: "Minty Green Glow", description: "Experience a refreshing detox with crisp apple, garden-fresh mint, and nutrient-dense kale.", price: "₦4,500", img: IMAGES.products[1] },
    { name: "Tropical Punch", description: "A liquid vacation featuring pineapple, watermelon, and passionfruit for ultimate hydration.", price: "₦5,200", img: IMAGES.products[2] },
    { name: "The Detox Master", description: "Our signature deep-cleanse blend with activated charcoal, lemon, and a touch of organic agave.", price: "₦8,000", img: IMAGES.products[3] }
  ];

  return (
    <section id="menu" ref={ref} className="py-28 px-6 bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="text-center">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
            Our Juice <span className="text-accent">Menu</span>
          </h2>
        </div>
        {products.map((p, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="w-full md:w-1/2 relative group">
              <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl">
                <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className={`absolute -inset-4 bg-accent/20 rounded-[3.5rem] -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
              <span className="font-mono text-accent text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
                Recommended 0{i + 1}
              </span>
              <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-6">{p.name}</h3>
              <p className="text-white/50 text-xl leading-relaxed mb-10">{p.description}</p>
              <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end items-start'}`}>
                <span className="text-5xl font-black text-primary">{p.price}</span>
                <a href="#contact" className="bg-accent text-white px-10 py-4 rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="ourvibe" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <h2 className="font-heading text-6xl font-black text-zinc-900 leading-none">TROPICAL<br/><span className="text-primary">VIBES.</span></h2>
          <p className="text-zinc-500 font-medium max-w-xs md:text-right uppercase tracking-widest text-sm">Inside our Lekki Bar — where every sip is a spark.</p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    {name: "Tunde A.", text: "Best cold-pressed juice in Lagos! The Lekki Sunrise is my daily fuel.", role: "Lekki Phase 1 Resident"},
    {name: "Chima O.", text: "You can actually taste the quality. The Minty Green Glow is incredible.", role: "Fitness Enthusiast"},
    {name: "Fatima B.", text: "Zest & Sip is the only place I trust for my weekly detox juices. Super fresh!", role: "Corporate Professional"}
  ];

  return (
    <section ref={ref} className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-heading text-6xl font-black text-zinc-950 uppercase tracking-tighter">Community <span className="text-primary">Love</span></h2>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] px-4">
          {[...items, ...items, ...items].map((t, i) => (
            <div key={i} className="w-80 md:w-[450px] shrink-0 bg-secondary border border-zinc-100 rounded-[3rem] p-10 shadow-sm">
              <div className="flex gap-1.5 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-accent" />)}
              </div>
              <p className="text-zinc-800 text-xl font-medium leading-relaxed italic mb-10">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-zinc-100 pt-8">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-lg">{t.name}</p>
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-accent">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <h2 className="font-heading text-7xl md:text-8xl font-black text-white leading-none mb-12 uppercase tracking-tighter">
            VISIT THE <br/><span className="text-zinc-950">BAR.</span>
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-accent transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-zinc-950 font-black uppercase tracking-widest text-sm mb-1">Our Location</p>
                <p className="text-white/90 text-xl font-medium">Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-accent transition-all">
                <Instagram size={24} />
              </div>
              <div>
                <p className="text-zinc-950 font-black uppercase tracking-widest text-sm mb-1">Social</p>
                <p className="text-white/90 text-xl font-medium">@zestandsip</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-full relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          {sent ? (
            <div className="bg-white p-12 rounded-[3rem] text-center shadow-2xl animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-4xl font-black text-zinc-900 mb-4">Message Sent!</h3>
              <p className="text-zinc-500 text-lg">We'll get back to you shortly. Stay fresh!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl">
              <h3 className="font-heading text-3xl font-black text-zinc-900 mb-10">Send an Inquiry</h3>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <button type="submit" disabled={loading} className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:brightness-110 transition-all flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
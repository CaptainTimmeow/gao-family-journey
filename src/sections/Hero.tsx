import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Cinematic Parallax Hero — Desktop: layered, Mobile: clean flow    */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

interface StoryCard {
  label: string;
  body: string;
  color: string;
  pos: { top: string; left: string };
  enterFrom: { x: number; y: number; rotate: number };
}

const Hero = () => {
  const { t, lang, toggleLang } = useLanguage();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  /* Refs for animated layers */
  const bgDeepRef = useRef<HTMLDivElement>(null);
  const bgMidRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const studioBadgeRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.navOurStory, href: '#about' },
    { label: lang === 'zh' ? '孩子们' : 'Kids', href: '#children' },
    { label: t.navProjects, href: '#projects' },
    { label: t.navContact, href: '#contact' },
  ];

  const storyCards: StoryCard[] = [
    {
      label: t.heroCardMilestonesLabel,
      body: t.heroCardMilestones,
      color: 'rgba(212, 187, 160, 0.22)',
      pos: { top: '12%', left: '4%' },
      enterFrom: { x: -350, y: 80, rotate: -15 },
    },
    {
      label: t.heroCardProjectsLabel,
      body: t.heroCardProjects,
      color: 'rgba(196, 168, 130, 0.22)',
      pos: { top: '8%', left: '76%' },
      enterFrom: { x: 350, y: -60, rotate: 12 },
    },
    {
      label: t.heroCardAdventuresLabel,
      body: t.heroCardAdventures,
      color: 'rgba(176, 190, 168, 0.22)',
      pos: { top: '58%', left: '3%' },
      enterFrom: { x: -300, y: -100, rotate: 10 },
    },
    {
      label: t.heroCardXiaodaiLabel,
      body: t.heroCardXiaodai,
      color: 'rgba(200, 180, 165, 0.22)',
      pos: { top: '62%', left: '78%' },
      enterFrom: { x: 320, y: 90, rotate: -10 },
    },
  ];

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduced = prefersReducedMotion();
    const mobile = isTouchDevice();
    const m = mobile ? 0.35 : 1.0;

    /* ---- ENTRANCE ANIMATION ---- */
    const entrance = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.15,
    });

    gsap.set(bgDeepRef.current, { opacity: 0, scale: 1.1 });
    gsap.set(bgMidRef.current, { opacity: 0 });
    orbRefs.current.forEach((orb, i) => {
      if (orb) gsap.set(orb, { opacity: 0, scale: 0.5, x: (i % 2 === 0 ? -100 : 100) });
    });
    gsap.set(photoRef.current, { opacity: 0, y: 80, scale: 0.85 });
    gsap.set(photoFrameRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(headlineRef.current, { opacity: 0, y: 50 });
    gsap.set(subRef.current, { opacity: 0, y: 25 });
    gsap.set(studioBadgeRef.current, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(scrollCueRef.current, { opacity: 0, y: 20 });
    gsap.set(vignetteRef.current, { opacity: 0 });
    if (mobileContentRef.current) {
      gsap.set(mobileContentRef.current.children, { opacity: 0, y: 30 });
    }
    if (cardsContainerRef.current) {
      gsap.set(cardsContainerRef.current.children, { opacity: 0, y: 60, scale: 0.9 });
    }
    if (particlesRef.current) {
      gsap.set(particlesRef.current.children, { opacity: 0, scale: 0 });
    }

    entrance
      .to(bgDeepRef.current, { opacity: 1, scale: 1, duration: 1.4 }, 0)
      .to(bgMidRef.current, { opacity: 1, duration: 1.2 }, 0.2)
      .to(orbRefs.current.filter(Boolean), {
        opacity: 1, scale: 1, x: 0, duration: 1.6,
        stagger: 0.15, ease: 'power2.out',
      }, 0.3)
      .to(photoFrameRef.current, { opacity: 1, scale: 1, duration: 1.0 }, 0.5)
      .to(photoRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0.6)
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.0 }, 0.9)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
      .to(studioBadgeRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, 1.3)
      .to(cardsContainerRef.current?.children ?? [], {
        opacity: 1, y: 0, scale: 1, duration: 0.7,
        stagger: 0.1, ease: 'back.out(1.4)',
      }, 1.2)
      .to(particlesRef.current?.children ?? [], {
        opacity: 1, scale: 1, duration: 0.8,
        stagger: 0.08, ease: 'power2.out',
      }, 1.4)
      .to(vignetteRef.current, { opacity: 1, duration: 1.0 }, 0.8)
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.8);

    /* Mobile content entrance */
    if (mobileContentRef.current) {
      gsap.to(mobileContentRef.current.children, {
        opacity: 1, y: 0, duration: 0.7,
        stagger: 0.12, ease: 'power3.out',
        delay: 0.8,
      });
    }

    /* ---- SCROLL-DRIVEN TIMELINE ---- */
    if (!reduced) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: mobile ? '+=120%' : '+=250%',
          pin: !mobile,
          scrub: mobile ? 1.8 : 0.8,
          anticipatePin: 1,
          onLeaveBack: () => {
            gsap.to([headlineRef.current, subRef.current, photoRef.current], {
              opacity: 1, y: 0, scale: 1, duration: 0.3,
            });
            if (cardsContainerRef.current) {
              gsap.set(cardsContainerRef.current.children, {
                opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.3,
              });
            }
          },
        },
      });

      if (scrollTl.scrollTrigger) triggersRef.current.push(scrollTl.scrollTrigger);

      /* Layer 0 — Deep background */
      scrollTl.fromTo(bgDeepRef.current,
        { y: 0, scale: 1 },
        { y: -30 * m, scale: 1.08, ease: 'none' }, 0);

      /* Layer 1 — Mid gradient */
      scrollTl.fromTo(bgMidRef.current,
        { y: 0, opacity: 0.6 },
        { y: -60 * m, opacity: 0.3, ease: 'none' }, 0);

      /* Layer 2 — Orbs */
      const orbSpeeds = [0.15, 0.25, 0.4, 0.2, 0.35];
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const dirX = i % 2 === 0 ? -1 : 1;
        scrollTl.fromTo(orb,
          { y: 0, x: 0, scale: 1 },
          { y: -120 * orbSpeeds[i] * m, x: 40 * dirX * orbSpeeds[i] * m, scale: 1.1 - orbSpeeds[i] * 0.2, ease: 'none' },
          0);
      });

      /* Layer 3 — Photo frame */
      scrollTl.fromTo(photoFrameRef.current,
        { y: 0, scale: 1 },
        { y: -50 * m, scale: 1.02, ease: 'none' }, 0);

      /* Layer 4 — Photo */
      scrollTl.fromTo(photoRef.current,
        { y: 0, scale: 1 },
        { y: -100 * m, scale: 1.12, ease: 'none' }, 0);

      /* Layer 5 — Studio badge */
      scrollTl.fromTo(studioBadgeRef.current,
        { y: 0, opacity: 1 },
        { y: -40 * m, opacity: 0.6, ease: 'none' }, 0);

      /* Layer 6 — Headline */
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: -180 * m, opacity: 0, scale: 0.95, ease: 'power2.in' }, 0.35);

      scrollTl.fromTo(subRef.current,
        { y: 0, opacity: 1 },
        { y: -140 * m, opacity: 0, ease: 'power2.in' }, 0.42);

      /* Layer 7 — Story cards */
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        storyCards.forEach((card, i) => {
          const delay = 0.1 + i * 0.06;
          scrollTl.fromTo(cards[i],
            { x: card.enterFrom.x * m, y: card.enterFrom.y * m + 40, rotation: card.enterFrom.rotate * m, opacity: 0.2 },
            { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power2.out' },
            delay);
        });
        scrollTl.to(cards, { opacity: 0, y: -80 * m, stagger: 0.02, ease: 'power2.in' }, 0.75);
      }

      /* Layer 8 — Particles */
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        scrollTl.fromTo(particles,
          { y: 0, opacity: 0.6 },
          { y: -200 * m, opacity: 0, stagger: 0.02, ease: 'none' }, 0);
      }

      /* Layer 9 — Vignette */
      scrollTl.fromTo(vignetteRef.current,
        { opacity: 1 },
        { opacity: 0.3, ease: 'none' }, 0.60);

      /* Scroll cue */
      scrollTl.fromTo(scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none' }, 0.05);
    }

    /* Nav entrance */
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });

    return () => {
      triggersRef.current.forEach((tr) => tr.kill());
      triggersRef.current = [];
      entrance.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.fromTo([headlineRef.current, subRef.current], { opacity: 0.6 }, { opacity: 1, duration: 0.4 });
  }, [lang]);

  return (
    <section
      id="hero-section"
      ref={sceneRef}
      className="relative w-full"
      style={{ minHeight: '100dvh' }}
    >
      {/* ====== BACKGROUND LAYERS (shared desktop + mobile) ====== */}
      <div
        ref={bgDeepRef}
        className="absolute inset-0 will-change-transform"
        style={{
          zIndex: 1,
          background: `
            radial-gradient(ellipse 140% 120% at 30% 20%, #1a1510 0%, transparent 60%),
            radial-gradient(ellipse 100% 80% at 70% 60%, #2a2018 0%, transparent 50%),
            linear-gradient(160deg, #1c1612 0%, #2a221c 40%, #1e1814 100%)
          `,
        }}
      />
      <div
        ref={bgMidRef}
        className="absolute inset-0 will-change-transform"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,168,130,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Orbs */}
      {[
        { size: 500, top: '-15%', left: '-8%', color: 'rgba(212,187,160,0.12)' },
        { size: 400, top: '55%', right: '-10%', color: 'rgba(184,160,130,0.10)' },
        { size: 300, top: '10%', right: '15%', color: 'rgba(200,180,155,0.08)' },
        { size: 350, bottom: '-5%', left: '20%', color: 'rgba(176,168,148,0.09)' },
        { size: 250, top: '35%', left: '8%', color: 'rgba(196,175,150,0.07)' },
      ].map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el; }}
          className="absolute rounded-full will-change-transform pointer-events-none hidden lg:block"
          style={{
            zIndex: 3,
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Vignette */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none will-change-transform hidden lg:block"
        style={{
          zIndex: 10,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(28,22,18,0.6) 100%)',
        }}
      />

      {/* ====== DESKTOP: Absolute layers ====== */}
      <div className="hidden lg:block">
        {/* Photo frame glow */}
        <div
          ref={photoFrameRef}
          className="absolute will-change-transform"
          style={{ zIndex: 4, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(72vw, 640px)' }}
        >
          <div className="absolute inset-0 rounded-2xl" style={{
            background: 'radial-gradient(ellipse 75% 70% at 50% 55%, rgba(196,168,130,0.2) 0%, transparent 70%)',
            transform: 'scale(1.25)', filter: 'blur(50px)',
          }} />
          <div className="absolute inset-[-2px] rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
            padding: 2,
          }}>
            <div className="w-full h-full rounded-2xl bg-transparent" />
          </div>
        </div>

        {/* Photo */}
        <div
          ref={photoRef}
          className="absolute will-change-transform"
          style={{ zIndex: 5, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(70vw, 620px)' }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img src="/images/family-hero.jpg" alt="Roy, Chica, Sean and Xiaodai" className="w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)',
            }} />
          </div>
          {/* Studio badge */}
          <div ref={studioBadgeRef} className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full flex items-center gap-2 will-change-transform"
            style={{ background: 'rgba(196, 168, 130, 0.9)', boxShadow: '0 8px 30px rgba(196,168,130,0.3), 0 2px 8px rgba(0,0,0,0.2)' }}>
            <Sparkles size={14} className="text-white/80" />
            <span className="museo-label text-white text-[10px] tracking-wider">三体科创工作室</span>
          </div>
        </div>

        {/* Typography */}
        <div className="absolute inset-x-0 flex flex-col items-center text-center px-6 pointer-events-none" style={{ zIndex: 7, top: '4%' }}>
          <nav ref={navRef} className="w-full max-w-7xl flex items-center justify-between mb-6 will-change-transform pointer-events-auto">
            <div className="museo-label text-white/60 text-sm tracking-widest">{lang === 'zh' ? '高家' : 'GAO FAMILY'}</div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-8">
                {navLinks.map((link, i) => (
                  <a key={i} href={link.href} className="museo-label text-white/50 hover:text-white transition-colors text-[11px]">{link.label}</a>
                ))}
              </div>
              <button onClick={toggleLang}
                className="flex items-center gap-2 museo-label text-white/50 hover:text-white transition-colors text-[11px] tracking-wider border border-white/15 hover:border-white/35 rounded-full px-4 py-2"
                aria-label="Toggle language">
                <Globe size={14} />{t.langToggle}
              </button>
            </div>
          </nav>
          <h1 ref={headlineRef} className="museo-headline text-white max-w-2xl will-change-transform mt-3"
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.01em', wordBreak: 'keep-all', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            {t.heroHeadline}
          </h1>
          <p ref={subRef} className="museo-body text-white/40 mt-2 max-w-md will-change-transform"
            style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', fontWeight: 400, letterSpacing: '0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
            {t.heroSubheading}
          </p>
        </div>

        {/* Story cards (desktop) */}
        <div ref={cardsContainerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 8 }}>
          {storyCards.map((card, i) => (
            <div key={i} className="absolute rounded-3xl border border-white/[0.12] p-5 will-change-transform pointer-events-auto backdrop-blur-xl"
              style={{ top: card.pos.top, left: card.pos.left, width: 200, background: card.color, animation: `float ${5 + i * 0.8}s ease-in-out infinite`, animationDelay: `${-i * 1.2}s` }}>
              <p className="museo-label text-white/45 text-[9px] tracking-wider mb-2">{card.label}</p>
              <p className="museo-body text-white/80 text-xs leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const size = 3 + Math.random() * 5;
            return (
              <div key={i} className="absolute rounded-full will-change-transform"
                style={{ width: size, height: size, top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, background: `rgba(212,187,160,${0.15 + Math.random() * 0.25})`, boxShadow: `0 0 ${size * 2}px rgba(212,187,160,${(0.15 + Math.random() * 0.25) * 0.5})` }} />
            );
          })}
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform" style={{ zIndex: 11 }}>
          <p className="museo-label text-white/35 text-[10px]">{t.heroScrollCue}</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* ====== MOBILE: Clean flow layout ====== */}
      <div ref={mobileContentRef} className="lg:hidden relative flex flex-col items-center px-5 pt-20 pb-8" style={{ zIndex: 5 }}>
        {/* Nav */}
        <nav className="w-full flex items-center justify-between mb-8">
          <div className="museo-label text-white/60 text-xs tracking-widest">{lang === 'zh' ? '高家' : 'GAO FAMILY'}</div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang}
              className="flex items-center gap-1.5 museo-label text-white/50 text-[10px] tracking-wider border border-white/15 rounded-full px-3 py-1.5">
              <Globe size={12} />{t.langToggle}
            </button>
            <button className="text-white/60 p-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Headline */}
        <h1 className="museo-headline text-white text-center text-3xl mb-2 will-change-transform" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          {t.heroHeadline}
        </h1>

        {/* Subheading */}
        <p className="museo-body text-white/40 text-center text-sm mb-6">
          {t.heroSubheading}
        </p>

        {/* Photo — prominent, full width */}
        <div className="w-full max-w-sm mb-4">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img src="/images/family-hero.jpg" alt="Roy, Chica, Sean and Xiaodai" className="w-full h-auto object-cover" />
          </div>
          {/* Studio badge */}
          <div className="flex justify-center -mt-4">
            <div className="px-4 py-1.5 rounded-full flex items-center gap-2" style={{ background: 'rgba(196, 168, 130, 0.9)' }}>
              <Sparkles size={12} className="text-white/80" />
              <span className="museo-label text-white text-[9px] tracking-wider">三体科创工作室</span>
            </div>
          </div>
        </div>

        {/* Story cards — 2x2 grid */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-2.5 mt-5">
          {storyCards.map((card, i) => (
            <div key={`m-${i}`} className="rounded-2xl border border-white/[0.10] p-3 backdrop-blur-lg" style={{ background: card.color }}>
              <p className="museo-label text-white/45 text-[9px] tracking-wider mb-1">{card.label}</p>
              <p className="museo-body text-white/75 text-[10px] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <p className="museo-label text-white/30 text-[10px]">{t.heroScrollCue}</p>
          <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1a1612]/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center">
          <button className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="museo-label text-white/70 hover:text-white transition-colors text-2xl" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

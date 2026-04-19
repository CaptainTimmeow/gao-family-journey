import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Cinematic Parallax Hero                                            */
/*  Multi-layer depth with dramatic scroll-driven motion               */
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

  /* Refs for all animated layers */
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

  /* ---------------------------------------------------------------- */
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

    // Set all initial states
    gsap.set(bgDeepRef.current, { opacity: 0, scale: 1.1 });
    gsap.set(bgMidRef.current, { opacity: 0 });
    orbRefs.current.forEach((orb, i) => {
      if (orb) gsap.set(orb, { opacity: 0, scale: 0.5, x: (i % 2 === 0 ? -100 : 100) });
    });
    gsap.set(photoRef.current, { opacity: 0, y: 80, scale: 0.85 });
    gsap.set(photoFrameRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(headlineRef.current, { opacity: 0, y: 60 });
    gsap.set(subRef.current, { opacity: 0, y: 40 });
    gsap.set(studioBadgeRef.current, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(scrollCueRef.current, { opacity: 0, y: 20 });
    gsap.set(vignetteRef.current, { opacity: 0 });
    if (cardsContainerRef.current) {
      gsap.set(cardsContainerRef.current.children, { opacity: 0, y: 60, scale: 0.9 });
    }
    if (particlesRef.current) {
      gsap.set(particlesRef.current.children, { opacity: 0, scale: 0 });
    }

    // Entrance sequence — coordinated reveal
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

    /* ---- SCROLL-DRIVEN PARALLAX TIMELINE ---- */
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
            // Reset everything when scrolling back to top
            gsap.set([headlineRef.current, subRef.current], { opacity: 1, y: 0 });
            gsap.set(photoRef.current, { opacity: 1, y: 0, scale: 1 });
            gsap.set(photoFrameRef.current, { opacity: 1, scale: 1 });
            if (cardsContainerRef.current) {
              gsap.set(cardsContainerRef.current.children, { opacity: 1, x: 0, y: 0, rotation: 0 });
            }
          },
        },
      });

      if (scrollTl.scrollTrigger) triggersRef.current.push(scrollTl.scrollTrigger);

      /* Layer 0 — Deep background: moves very slow (0.1x feel) */
      scrollTl.fromTo(bgDeepRef.current,
        { y: 0, scale: 1 },
        { y: -30 * m, scale: 1.08, ease: 'none' },
        0
      );

      /* Layer 1 — Mid gradient: slow parallax */
      scrollTl.fromTo(bgMidRef.current,
        { y: 0, opacity: 0.6 },
        { y: -60 * m, opacity: 0.3, ease: 'none' },
        0
      );

      /* Layer 2 — Orbs: each at different speed for depth */
      const orbSpeeds = [0.15, 0.25, 0.4, 0.2, 0.35];
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const dirX = i % 2 === 0 ? -1 : 1;
        scrollTl.fromTo(orb,
          { y: 0, x: 0, scale: 1 },
          {
            y: -120 * orbSpeeds[i] * m,
            x: 40 * dirX * orbSpeeds[i] * m,
            scale: 1.1 - orbSpeeds[i] * 0.2,
            ease: 'none',
          },
          0
        );
      });

      /* Layer 3 — Photo frame: medium parallax */
      scrollTl.fromTo(photoFrameRef.current,
        { y: 0, scale: 1 },
        { y: -50 * m, scale: 1.02, ease: 'none' },
        0
      );

      /* Layer 4 — Photo itself: dramatic scale + parallax */
      scrollTl.fromTo(photoRef.current,
        { y: 0, scale: 1 },
        { y: -100 * m, scale: 1.12, ease: 'none' },
        0
      );

      /* Layer 5 — Studio badge: gentle float */
      scrollTl.fromTo(studioBadgeRef.current,
        { y: 0, opacity: 1 },
        { y: -40 * m, opacity: 0.6, ease: 'none' },
        0
      );

      /* Layer 6 — Headline: dramatic upward exit */
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: -180 * m, opacity: 0, scale: 0.95, ease: 'power2.in' },
        0.35
      );

      scrollTl.fromTo(subRef.current,
        { y: 0, opacity: 1 },
        { y: -140 * m, opacity: 0, ease: 'power2.in' },
        0.42
      );

      /* Layer 7 — Story cards: dramatic fly-in from far away */
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        storyCards.forEach((card, i) => {
          const delay = 0.1 + i * 0.06;
          scrollTl.fromTo(cards[i],
            {
              x: card.enterFrom.x * m,
              y: card.enterFrom.y * m + 40,
              rotation: card.enterFrom.rotate * m,
              opacity: 0.2,
            },
            {
              x: 0, y: 0, rotation: 0, opacity: 1,
              ease: 'power2.out',
            },
            delay
          );
        });

        // Cards exit
        scrollTl.to(cards,
          { opacity: 0, y: -80 * m, stagger: 0.02, ease: 'power2.in' },
          0.75
        );
      }

      /* Layer 8 — Foreground particles: move FAST for depth contrast */
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        scrollTl.fromTo(particles,
          { y: 0, opacity: 0.6 },
          { y: -200 * m, opacity: 0, stagger: 0.02, ease: 'none' },
          0
        );
      }

      /* Layer 9 — Vignette: intensifies then clears */
      scrollTl.fromTo(vignetteRef.current,
        { opacity: 1 },
        { opacity: 0.3, ease: 'none' },
        0.60
      );

      /* Scroll cue: fades early */
      scrollTl.fromTo(scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none' },
        0.05
      );
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

  /* Language change flash */
  useEffect(() => {
    gsap.fromTo([headlineRef.current, subRef.current], { opacity: 0.6 }, { opacity: 1, duration: 0.4 });
  }, [lang]);

  return (
    <section
      id="hero-section"
      ref={sceneRef}
      className="relative w-full overflow-hidden"
      style={{ height: isTouchDevice() ? 'auto' : '100vh', minHeight: '100dvh' }}
    >
      {/* ====== LAYER 0: Deep background ====== */}
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

      {/* ====== LAYER 1: Mid gradient overlay ====== */}
      <div
        ref={bgMidRef}
        className="absolute inset-0 will-change-transform"
        style={{
          zIndex: 2,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,168,130,0.15) 0%, transparent 70%)
          `,
        }}
      />

      {/* ====== LAYER 2: Floating orbs (5, each different) ====== */}
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
          className="absolute rounded-full will-change-transform pointer-events-none"
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

      {/* ====== LAYER 3: Photo frame glow ====== */}
      <div
        ref={photoFrameRef}
        className="absolute will-change-transform"
        style={{
          zIndex: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(72vw, 640px)',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 75% 70% at 50% 55%, rgba(196,168,130,0.2) 0%, transparent 70%)`,
            transform: 'scale(1.25)',
            filter: 'blur(50px)',
          }}
        />
        {/* Inner border glow */}
        <div
          className="absolute inset-[-2px] rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
            padding: 2,
          }}
        >
          <div className="w-full h-full rounded-2xl bg-transparent" />
        </div>
      </div>

      {/* ====== LAYER 4: Family photo ====== */}
      <div
        ref={photoRef}
        className="absolute will-change-transform"
        style={{
          zIndex: 5,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(70vw, 620px)',
        }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="/images/family-hero.jpg"
            alt="Roy, Chica, Sean and Xiaodai — The Gao Family"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '4/3' }}
          />
          {/* Subtle overlay on photo for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>

        {/* Studio badge */}
        <div
          ref={studioBadgeRef}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full flex items-center gap-2 will-change-transform"
          style={{
            background: 'rgba(196, 168, 130, 0.9)',
            boxShadow: '0 8px 30px rgba(196,168,130,0.3), 0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <Sparkles size={14} className="text-white/80" />
          <span className="museo-label text-white text-[10px] tracking-wider">
            三体科创工作室
          </span>
        </div>
      </div>

      {/* ====== LAYER 6: Typography ====== */}
      <div
        className="absolute inset-x-0 flex flex-col items-center text-center px-6 pointer-events-none"
        style={{ zIndex: 7, top: '4%', paddingBottom: '46vh' }}
      >
        {/* Nav */}
        <nav
          ref={navRef}
          className="w-full max-w-7xl flex items-center justify-between mb-6 will-change-transform pointer-events-auto"
        >
          <div className="museo-label text-white/60 text-sm tracking-widest">
            {lang === 'zh' ? '高家' : 'GAO FAMILY'}
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="museo-label text-white/50 hover:text-white transition-colors text-[11px]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 museo-label text-white/50 hover:text-white transition-colors text-[11px] tracking-wider border border-white/15 hover:border-white/35 rounded-full px-4 py-2"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {t.langToggle}
            </button>
            <button
              className="lg:hidden text-white/60 hover:text-white transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="museo-headline text-white max-w-3xl will-change-transform mt-2"
          style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 3.8rem)',
            lineHeight: 1.08,
            textShadow: '0 2px 30px rgba(0,0,0,0.4), 0 8px 60px rgba(0,0,0,0.2)',
          }}
        >
          {t.heroHeadline}
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="museo-body text-white/55 mt-3 max-w-lg will-change-transform"
          style={{
            fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)',
            fontWeight: 400,
            textShadow: '0 1px 10px rgba(0,0,0,0.3)',
          }}
        >
          {t.heroSubheading}
        </p>
      </div>

      {/* ====== LAYER 7: Story cards (desktop only) ====== */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{ zIndex: 8 }}
      >
        {storyCards.map((card, i) => (
          <div
            key={i}
            className="absolute rounded-2xl border border-white/[0.12] p-5 will-change-transform pointer-events-auto backdrop-blur-xl"
            style={{
              top: card.pos.top,
              left: card.pos.left,
              width: 200,
              background: card.color,
              animation: `float ${5 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${-i * 1.2}s`,
            }}
          >
            <p className="museo-label text-white/45 text-[9px] tracking-wider mb-2">
              {card.label}
            </p>
            <p className="museo-body text-white/80 text-xs leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile cards — stacked */}
      <div
        className="lg:hidden absolute inset-x-0 px-5 flex flex-col gap-3 pointer-events-auto"
        style={{ zIndex: 8, top: '76%' }}
      >
        {storyCards.map((card, i) => (
          <div
            key={`m-${i}`}
            className="rounded-xl border border-white/[0.12] p-4 backdrop-blur-xl will-change-transform"
            style={{ background: card.color }}
          >
            <p className="museo-label text-white/45 text-[9px] tracking-wider mb-1">
              {card.label}
            </p>
            <p className="museo-body text-white/80 text-xs leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* ====== LAYER 8: Foreground floating particles ====== */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{ zIndex: 9 }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const size = 3 + Math.random() * 5;
          const top = 10 + Math.random() * 80;
          const left = 5 + Math.random() * 90;
          const opacity = 0.15 + Math.random() * 0.25;
          return (
            <div
              key={i}
              className="absolute rounded-full will-change-transform"
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: `${left}%`,
                background: `rgba(212, 187, 160, ${opacity})`,
                boxShadow: `0 0 ${size * 2}px rgba(212,187,160,${opacity * 0.5})`,
              }}
            />
          );
        })}
      </div>

      {/* ====== LAYER 9: Vignette overlay ====== */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          zIndex: 10,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(28,22,18,0.6) 100%)
          `,
        }}
      />

      {/* ====== Scroll cue ====== */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform"
        style={{ zIndex: 11 }}
      >
        <p className="museo-label text-white/35 text-[10px]">{t.heroScrollCue}</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1a1612]/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center">
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors p-2"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="museo-label text-white/70 hover:text-white transition-colors text-2xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

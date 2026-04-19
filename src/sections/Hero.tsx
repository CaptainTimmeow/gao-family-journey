import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Scrollytelling Hero — Cinematic, layered, warm family storytelling  */
/* ------------------------------------------------------------------ */

/** Check if user prefers reduced motion */
const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Check if touch device (mobile) */
const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

/** Story card definition */
interface StoryCard {
  label: string;
  body: string;
  color: string;
  posDesktop: { top: string; left: string };
  posMobile: { top: string; left: string };
  drift: { x: number; y: number; rotate: number };
}

const Hero = () => {
  const { t, lang, toggleLang } = useLanguage();

  /* Refs for animation targets */
  const sceneRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Collect ScrollTriggers for cleanup */
  const triggersRef = useRef<ScrollTrigger[]>([]);

  /* Build story cards from translations */
  const storyCards: StoryCard[] = [
    {
      label: t.heroCardMilestonesLabel,
      body: t.heroCardMilestones,
      color: 'rgba(196, 168, 130, 0.25)',
      posDesktop: { top: '18%', left: '6%' },
      posMobile: { top: '62%', left: '5%' },
      drift: { x: -120, y: 40, rotate: -6 },
    },
    {
      label: t.heroCardProjectsLabel,
      body: t.heroCardProjects,
      color: 'rgba(184, 160, 144, 0.25)',
      posDesktop: { top: '14%', left: '72%' },
      posMobile: { top: '74%', left: '45%' },
      drift: { x: 140, y: -30, rotate: 5 },
    },
    {
      label: t.heroCardAdventuresLabel,
      body: t.heroCardAdventures,
      color: 'rgba(160, 180, 160, 0.25)',
      posDesktop: { top: '62%', left: '8%' },
      posMobile: { top: '86%', left: '8%' },
      drift: { x: -100, y: -50, rotate: 4 },
    },
    {
      label: t.heroCardXiaodaiLabel,
      body: t.heroCardXiaodai,
      color: 'rgba(200, 180, 160, 0.25)',
      posDesktop: { top: '66%', left: '70%' },
      posMobile: { top: '98%', left: '40%' },
      drift: { x: 130, y: 60, rotate: -5 },
    },
  ];

  const navLinks = [
    { label: t.navOurStory, href: '#about' },
    { label: t.navProjects, href: '#projects' },
    { label: t.navContact, href: '#contact' },
  ];

  /* ---------------------------------------------------------------- */
  /*  Main animation effect                                            */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduced = prefersReducedMotion();
    const mobile = isTouchDevice();

    /* ---- ENTRANCE TIMELINE (on page load) ---- */
    const entranceTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.2,
    });

    // Set initial states
    gsap.set(washRef.current, { opacity: 0 });
    gsap.set(orbsRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.92, y: 30 });
    gsap.set(headlineRef.current, { opacity: 0, y: 60 });
    gsap.set(subRef.current, { opacity: 0, y: 30 });
    gsap.set(scrollCueRef.current, { opacity: 0 });
    gsap.set(grainRef.current, { opacity: 0 });

    if (cardsContainerRef.current) {
      gsap.set(cardsContainerRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.95,
      });
    }

    // Entrance sequence
    entranceTl
      .to(washRef.current, { opacity: 1, duration: 1.2 })
      .to(orbsRef.current, { opacity: 1, scale: 1, duration: 1.6 }, 0.1)
      .to(imageRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.4 }, 0.3)
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.2 }, 0.5)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.8)
      .to(
        cardsContainerRef.current?.children ?? [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
        },
        1.0
      )
      .to(scrollCueRef.current, { opacity: 1, duration: 0.6 }, 1.4)
      .to(grainRef.current, { opacity: 0.04, duration: 1.0 }, 0.5);

    /* ---- SCROLL-DRIVEN TIMELINE (scrub) ---- */
    if (!reduced) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: mobile ? '+=150%' : '+=300%',
          pin: !mobile, // no pin on mobile
          scrub: mobile ? 1.5 : 1.0,
          anticipatePin: 1,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.to([headlineRef.current, subRef.current, imageRef.current], {
              opacity: 1, y: 0, scale: 1, duration: 0.3,
            });
            if (cardsContainerRef.current) {
              gsap.to(cardsContainerRef.current.children, {
                opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.3,
              });
            }
          },
        },
      });

      // Store the trigger for cleanup
      if (scrollTl.scrollTrigger) {
        triggersRef.current.push(scrollTl.scrollTrigger);
      }

      const m = mobile ? 0.4 : 1.0; // dampen on mobile

      /* Phase 1: gentle drift (0% - 30%) */
      scrollTl.fromTo(
        orbsRef.current,
        { y: 0 },
        { y: -80 * m, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        imageRef.current,
        { y: 0, scale: 1 },
        { y: -40 * m, scale: 1.03, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        washRef.current,
        { backgroundPosition: '50% 50%' },
        { backgroundPosition: `50% ${45 - 10 * m}%`, ease: 'none' },
        0
      );

      /* Phase 2: story cards float in (20% - 65%) */
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        storyCards.forEach((card, i) => {
          const dx = card.drift.x * m;
          const dy = card.drift.y * m;
          const rot = card.drift.rotate * m;

          // Each card starts off-screen and settles in
          scrollTl.fromTo(
            cards[i],
            { x: dx, y: dy + 30, rotation: rot, opacity: 0.3 },
            { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power2.out' },
            0.20 + i * 0.06
          );
        });
      }

      /* Phase 3: exit / transition out (60% - 100%) */
      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -60 * m, ease: 'power2.in' },
        0.60
      );

      scrollTl.fromTo(
        subRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40 * m, ease: 'power2.in' },
        0.62
      );

      scrollTl.fromTo(
        imageRef.current,
        { opacity: 1, scale: 1.03 },
        { opacity: 0.2, scale: 1.06, y: -100 * m, ease: 'power2.in' },
        0.65
      );

      if (cardsContainerRef.current) {
        scrollTl.to(
          cardsContainerRef.current.children,
          {
            opacity: 0,
            y: -50 * m,
            stagger: 0.02,
            ease: 'power2.in',
          },
          0.68
        );
      }

      scrollTl.fromTo(
        orbsRef.current,
        { opacity: 1 },
        { opacity: 0.3, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none' },
        0.10
      );
    }

    /* Nav entrance */
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });

    return () => {
      triggersRef.current.forEach((tr) => tr.kill());
      triggersRef.current = [];
      entranceTl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === scene)
        .forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Re-run entrance animation when language changes */
  useEffect(() => {
    // Small flash to indicate content change
    gsap.fromTo(
      [headlineRef.current, subRef.current],
      { opacity: 0.7 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [lang]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <section
      id="hero-section"
      ref={sceneRef}
      className="hero-scene relative w-full"
      style={{
        height: isTouchDevice() ? 'auto' : '100vh',
        minHeight: '100vh',
      }}
    >
      {/* -------- Layer 1: Background wash -------- */}
      <div
        ref={washRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 30%, #d4bba0 0%, #c4a882 40%, #b8a090 70%, #a89888 100%)',
          zIndex: 1,
        }}
      />

      {/* -------- Layer 2: Decorative orbs -------- */}
      <div ref={orbsRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {/* Large warm orb — top right */}
        <div
          className="hero-orb"
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: 700,
            maxHeight: 700,
            top: '-10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(232,213,192,0.5) 0%, rgba(232,213,192,0) 70%)',
          }}
        />
        {/* Soft orb — bottom left */}
        <div
          className="hero-orb"
          style={{
            width: '40vw',
            height: '40vw',
            maxWidth: 600,
            maxHeight: 600,
            bottom: '-5%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(200,190,175,0.4) 0%, rgba(200,190,175,0) 70%)',
          }}
        />
        {/* Small accent orb — center left */}
        <div
          className="hero-orb"
          style={{
            width: '25vw',
            height: '25vw',
            maxWidth: 350,
            maxHeight: 350,
            top: '40%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(220,200,180,0.3) 0%, rgba(220,200,180,0) 70%)',
          }}
        />
        {/* Small accent orb — center right */}
        <div
          className="hero-orb"
          style={{
            width: '20vw',
            height: '20vw',
            maxWidth: 300,
            maxHeight: 300,
            top: '25%',
            right: '8%',
            background: 'radial-gradient(circle, rgba(210,195,175,0.35) 0%, rgba(210,195,175,0) 70%)',
          }}
        />
      </div>

      {/* -------- Layer 3: Main family visual -------- */}
      <div
        ref={imageRef}
        className="absolute will-change-transform"
        style={{
          zIndex: 3,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(45vw, 420px)',
        }}
      >
        <div className="relative">
          {/* Soft glow behind the image */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              transform: 'scale(1.3)',
              filter: 'blur(40px)',
            }}
          />
          <img
            src={heroConfig.heroImage}
            alt={heroConfig.heroImageAlt}
            className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
            style={{
              aspectRatio: '3/4',
              maxHeight: '55vh',
            }}
          />
        </div>
      </div>

      {/* -------- Layer 4: Typography -------- */}
      <div
        className="absolute inset-x-0 flex flex-col items-center text-center px-6"
        style={{ zIndex: 4, top: '8%', pointerEvents: 'none' }}
      >
        {/* Navigation — interactive, needs pointer events */}
        <nav
          ref={navRef}
          className="w-full max-w-7xl flex items-center justify-between mb-12 will-change-transform"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="museo-label text-white/70 text-sm tracking-widest">
            {lang === 'zh' ? '高家' : 'GAO FAMILY'}
          </div>

          <div className="flex items-center gap-5">
            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="museo-label text-white/60 hover:text-white transition-colors text-[11px]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 museo-label text-white/60 hover:text-white transition-colors text-[11px] tracking-wider border border-white/20 hover:border-white/40 rounded-full px-4 py-2"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {t.langToggle}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
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
          className="museo-headline text-white max-w-4xl will-change-transform"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            textShadow: '0 4px 40px rgba(0,0,0,0.15)',
          }}
        >
          {t.heroHeadline}
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="museo-body text-white/70 mt-5 max-w-lg will-change-transform"
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            fontWeight: 400,
          }}
        >
          {t.heroSubheading}
        </p>
      </div>

      {/* -------- Layer 5: Story cards -------- */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 hidden lg:block"
        style={{ zIndex: 5, pointerEvents: 'none' }}
      >
        {storyCards.map((card, i) => (
          <div
            key={i}
            className="hero-card absolute rounded-2xl border border-white/20 p-5 will-change-transform"
            style={{
              top: card.posDesktop.top,
              left: card.posDesktop.left,
              width: 220,
              background: card.color,
              backdropFilter: 'blur(20px)',
              pointerEvents: 'auto',
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${-i * 1.5}s`,
            }}
          >
            <p className="museo-label text-white/50 text-[9px] tracking-wider mb-2">
              {card.label}
            </p>
            <p className="museo-body text-white/85 text-xs leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: stacked cards below the image */}
      <div
        className="lg:hidden absolute inset-x-0 px-5 flex flex-col gap-4"
        style={{ zIndex: 5, top: '72%', pointerEvents: 'auto' }}
      >
        {storyCards.map((card, i) => (
          <div
            key={`mobile-${i}`}
            className="hero-card rounded-xl border border-white/20 p-4 will-change-transform"
            style={{
              background: card.color,
              backdropFilter: 'blur(20px)',
            }}
          >
            <p className="museo-label text-white/50 text-[9px] tracking-wider mb-1">
              {card.label}
            </p>
            <p className="museo-body text-white/85 text-xs leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* -------- Layer 6: Foreground grain -------- */}
      <div ref={grainRef} className="hero-grain" style={{ zIndex: 6 }} />

      {/* -------- Scroll cue -------- */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform"
        style={{ zIndex: 7 }}
      >
        <p className="museo-label text-white/40 text-[10px]">{t.heroScrollCue}</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* -------- Mobile menu overlay -------- */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm lg:hidden flex flex-col items-center justify-center"
        >
          <button
            className="absolute top-5 right-6 text-white/70 hover:text-white transition-colors p-2"
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
                className="museo-label text-white/80 hover:text-white transition-colors text-2xl"
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

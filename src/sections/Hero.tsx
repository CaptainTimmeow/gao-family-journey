import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t, lang, toggleLang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const statueRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  // Build nav links from translation
  const navLinks = [
    { label: t.navOurStory, href: '#about' },
    { label: t.navProjects, href: '#projects' },
    { label: t.navContact, href: '#contact' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const statue = statueRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const nav = navRef.current;
    const badge = badgeRef.current;
    const bottom = bottomRef.current;

    if (!section || !statue || !leftText || !rightText || !nav || !badge || !bottom) return;

    // Set initial states
    gsap.set([leftText, rightText], { opacity: 0, y: 60 });
    gsap.set(statue, { opacity: 0, scale: 1.08, y: 40 });
    gsap.set(nav, { opacity: 0, y: -20 });
    gsap.set(badge, { opacity: 0, y: 20 });
    gsap.set(bottom, { opacity: 0 });

    // Entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.3,
    });

    tl.to(statue, { opacity: 1, scale: 1, y: 0, duration: 1.4 })
      .to(leftText, { opacity: 1, y: 0, duration: 1 }, '-=1')
      .to(rightText, { opacity: 1, y: 0, duration: 1 }, '-=0.85')
      .to(nav, { opacity: 1, y: 0, duration: 0.7 }, '-=0.7')
      .to(badge, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .to(bottom, { opacity: 1, duration: 0.5 }, '-=0.3');

    // Scroll parallax
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(statue, { y: p * 120 });
        gsap.set(leftText, { y: p * 200, x: p * -60 });
        gsap.set(rightText, { y: p * 180, x: p * 60 });
        gsap.set(badge, { y: p * 80 });
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#8c8c91]"
    >
      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 px-6 lg:px-16 py-5 lg:py-6 flex items-center justify-between will-change-transform"
      >
        <div className="museo-label text-white/70 text-sm lg:text-base">
          {lang === 'zh' ? '高家' : 'GAO FAMILY'}
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="museo-label text-white/70 hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 museo-label text-white/60 hover:text-white transition-colors text-[11px] tracking-wider border border-white/20 hover:border-white/40 rounded-full px-4 py-2"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            {t.langToggle}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm lg:hidden flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
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

      {/* Main hero content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full px-6 lg:px-12 pt-20 lg:pt-0 pb-24 lg:pb-0">
        {/* Left text block */}
        <div
          ref={leftTextRef}
          className="flex flex-col items-center lg:items-end text-center lg:text-right flex-1 lg:pr-6 xl:pr-12 will-change-transform order-2 lg:order-1 mt-4 lg:mt-0"
        >
          <h1 className="museo-headline text-white text-[14vw] sm:text-[12vw] lg:text-[7vw] leading-[0.85]">
            {t.brandLeft}
          </h1>
          <p className="museo-body text-white/60 text-sm md:text-base max-w-[280px] lg:max-w-[240px] mt-4 lg:mt-6">
            {t.tagline}
          </p>
        </div>

        {/* Center statue */}
        <div
          ref={statueRef}
          className="relative flex-shrink-0 w-[60vw] sm:w-[50vw] lg:w-[26vw] max-w-[400px] lg:max-w-[480px] will-change-transform order-1 lg:order-2"
        >
          {/* Badge above statue */}
          <div
            ref={badgeRef}
            className="absolute -top-6 lg:-top-10 left-1/2 -translate-x-1/2 museo-label text-white/50 text-[10px] whitespace-nowrap will-change-transform"
          >
            {t.badge}
          </div>
          <img
            src={heroConfig.heroImage}
            alt={heroConfig.heroImageAlt}
            className="w-full h-auto object-cover rounded-3xl shadow-2xl"
          />
        </div>

        {/* Right text block */}
        <div
          ref={rightTextRef}
          className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 lg:pl-6 xl:pl-12 will-change-transform order-3 mt-2 lg:mt-0"
        >
          <h1 className="museo-headline text-white text-[14vw] sm:text-[12vw] lg:text-[7vw] leading-[0.85]">
            {t.brandRight}
          </h1>
          <p className="museo-label text-white/40 mt-4 lg:mt-6 text-[10px]">{t.since}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full z-20 px-8 lg:px-16 py-5 flex items-center justify-between border-t border-white/10"
      >
        <p className="museo-label text-white/30 text-[10px]">{t.scrollText}</p>
        <p className="museo-label text-white/30 text-[10px]">{t.copyrightText}</p>
      </div>
    </section>
  );
};

export default Hero;

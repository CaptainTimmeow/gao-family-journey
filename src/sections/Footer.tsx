import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const footer = footerRef.current;
    const marquee = marqueeRef.current;
    if (!footer || !marquee) return;

    // Marquee parallax speed shift
    const marqueeTrigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(marquee, {
          x: p * -100,
        });
      },
    });
    triggersRef.current.push(marqueeTrigger);

    // Footer content reveal
    const contentEls = footer.querySelectorAll<HTMLElement>('.footer-col');
    contentEls.forEach((el, i) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const quickLinks = [
    { label: t.navOurStory, href: '#about' },
    { label: t.navProjects, href: '#projects' },
    { label: t.navContact, href: '#contact' },
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-[#8c8c91] overflow-hidden">
      {/* Marquee Section */}
      <div className="py-12 lg:py-20 overflow-hidden border-t border-white/10">
        <div ref={marqueeRef} className="animate-marquee whitespace-nowrap flex will-change-transform">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="museo-headline text-white/10 text-[12vw] lg:text-[8vw] font-semibold tracking-tight mx-4 lg:mx-8 flex-shrink-0"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
            >
              {t.footerMarquee}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="px-8 lg:px-16 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="footer-col lg:col-span-2" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h3 className="museo-headline text-white text-2xl mb-4">
                {t.footerBrandName}
              </h3>
              <p className="museo-body text-white/60 text-sm max-w-sm mb-6">
                {t.footerBrandDesc}
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-col" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h4 className="museo-label text-white/50 mb-6">{t.footerQuickLinks}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      data-cursor="hover"
                      className="group museo-body text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h4 className="museo-label text-white/50 mb-6">{t.footerContact}</h4>
              <ul className="space-y-3">
                <li className="museo-body text-white/70 text-sm">
                  {t.contactLocationValue}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <p className="museo-body text-white/40 text-xs mb-4 md:mb-0">
              {currentYear} {t.footerBrandName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Visit = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);

      // Card parallax
      const parallaxTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(card, {
            y: (p - 0.5) * (i % 2 === 0 ? -25 : 25),
          });
        },
      });
      triggersRef.current.push(parallaxTrigger);

      // Icon float parallax
      const icon = card.querySelector('svg');
      if (icon) {
        const iconTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.set(icon, {
              y: (self.progress - 0.5) * -15,
            });
          },
        });
        triggersRef.current.push(iconTrigger);
      }
    });

    // Header parallax
    const headerEls = section.querySelectorAll<HTMLElement>('h2, p');
    headerEls.forEach((el, i) => {
      const headerTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(el, {
            y: (1 - self.progress) * (20 + i * 10),
          });
        },
      });
      triggersRef.current.push(headerTrigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <p className="museo-label text-white/50 mb-4">{t.contactLabel}</p>
        <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-8">
          {t.contactHeadline}
        </h2>
        <p className="museo-body text-white/60 text-lg max-w-2xl">
          {t.contactDescription}
        </p>
      </div>

      {/* Info Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Location */}
        <div className="info-card p-8 border border-white/10 hover:border-white/20 transition-colors">
          <MapPin className="w-8 h-8 text-white/50 mb-6" strokeWidth={1.5} />
          <h3 className="museo-headline text-white text-xl mb-3">{t.contactLocation}</h3>
          <p className="museo-body text-white/60 text-sm">{t.contactLocationValue}</p>
        </div>

        {/* Updates */}
        <div className="info-card p-8 border border-white/10 hover:border-white/20 transition-colors">
          <Calendar className="w-8 h-8 text-white/50 mb-6" strokeWidth={1.5} />
          <h3 className="museo-headline text-white text-xl mb-3">{t.contactUpdates}</h3>
          <p className="museo-body text-white/60 text-sm">{t.contactUpdatesValue}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <button
          data-cursor="hover"
          className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-colors"
        >
          {t.contactCta}
        </button>
      </div>
    </section>
  );
};

export default Visit;

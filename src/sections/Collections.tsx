import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { collectionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const hasContent = collectionsConfig.collections.length > 0;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stack = stackRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    if (hasContent && stack && cards.length > 0) {
      // Stacking cards animation
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const trigger = ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[i + 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });
        triggersRef.current.push(trigger);

        const dimTrigger = ScrollTrigger.create({
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, {
              scale: 1 - p * 0.05,
              filter: `brightness(${1 - p * 0.3})`,
            });
          },
        });
        triggersRef.current.push(dimTrigger);
      });

      // Text reveal inside each card
      cards.forEach((card) => {
        const textEls = card.querySelectorAll('.coll-text-el');
        textEls.forEach((el, i) => {
          gsap.set(el, { opacity: 0, y: 30 });
          const trigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            onEnter: () => {
              gsap.to(el, {
                opacity: 1, y: 0, duration: 0.7,
                delay: 0.15 + i * 0.08, ease: 'power3.out',
              });
            },
          });
          triggersRef.current.push(trigger);
        });
      });
    } else if (!hasContent) {
      // Empty state reveal
      gsap.set('.empty-state', { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: '.empty-state',
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.empty-state', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [hasContent]);

  if (!collectionsConfig.headline) return null;

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full bg-[#f0f0f0]"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto pt-32 pb-8 px-8 lg:px-16">
        <p className="reveal-header museo-label text-[#1a1a1a]/40 mb-4">
          {t.milestonesLabel}
        </p>
        <h2 className="reveal-header museo-headline text-[#1a1a1a] text-4xl md:text-5xl lg:text-7xl">
          {t.milestonesHeadline}
        </h2>
      </div>

      {hasContent ? (
        /* Stacking Cards */
        <div ref={stackRef} className="relative">
          {collectionsConfig.collections.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative w-full min-h-screen bg-[#f0f0f0] will-change-transform"
              style={{ zIndex: index + 1 }}
            >
              <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24 flex items-center min-h-screen">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full ${
                    index % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  <div
                    className={`lg:col-span-7 overflow-hidden ${
                      index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: '16/10' }}
                    />
                  </div>
                  <div
                    className={`lg:col-span-5 ${
                      index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                    }`}
                  >
                    <p className="coll-text-el museo-label text-[#1a1a1a]/30 mb-3">
                      {item.year}
                    </p>
                    <h3 className="coll-text-el museo-headline text-[#1a1a1a] text-2xl md:text-3xl lg:text-5xl mb-4">
                      {item.title}
                    </h3>
                    <p className="coll-text-el museo-body text-[#1a1a1a]/55 mb-8 max-w-md text-sm lg:text-base">
                      {item.description}
                    </p>
                    {collectionsConfig.ctaText && (
                      <button
                        data-cursor="hover"
                        className="coll-text-el inline-flex items-center gap-2 museo-label text-[#1a1a1a] border border-[#1a1a1a]/20 px-6 py-3 hover:bg-[#1a1a1a] hover:text-[#f0f0f0] transition-all duration-300"
                      >
                        {t.milestonesCta}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M1 7h12m0 0L8 2m5 5L8 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-32">
          <div className="empty-state text-center py-20 px-8 rounded-2xl bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 border-dashed">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-[#1a1a1a]/30" />
            </div>
            <h3 className="museo-headline text-[#1a1a1a] text-2xl mb-3">
              {t.milestonesEmptyTitle}
            </h3>
            <p className="museo-body text-[#1a1a1a]/50 text-sm max-w-md mx-auto leading-relaxed">
              {t.milestonesEmptyDesc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Collections;

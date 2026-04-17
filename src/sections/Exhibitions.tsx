import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { exhibitionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Exhibitions = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const hasContent = exhibitionsConfig.exhibitions.length > 0;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    if (hasContent) {
      // Card staggered reveal
      const cards = grid.querySelectorAll<HTMLElement>('.exhibit-card');
      cards.forEach((card, i) => {
        const yOffset = [0, 100, 200, 300][i] || 0;
        gsap.set(card, { opacity: 0.4, y: yOffset });

        const trigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 95%',
          end: 'top 30%',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, {
              opacity: 0.4 + p * 0.6,
              y: yOffset * (1 - p),
            });
          },
        });
        triggersRef.current.push(trigger);
      });
    } else {
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

  // If no headline and no exhibitions, show empty state
  if (!exhibitionsConfig.headline) return null;

  return (
    <section
      id="exhibitions"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <p className="reveal-header museo-label text-white/50 mb-4">
          {t.projectsLabel}
        </p>
        <h2 className="reveal-header museo-headline text-white text-4xl md:text-5xl lg:text-7xl">
          {t.projectsHeadline}
        </h2>
      </div>

      {hasContent ? (
        /* Exhibition Grid */
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {exhibitionsConfig.exhibitions.map((exhibit) => (
            <div
              key={exhibit.id}
              className="exhibit-card group relative overflow-hidden will-change-transform"
              data-cursor="hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                <p className="museo-label text-white/50 mb-2 text-[10px]">{exhibit.date}</p>
                <h3 className="museo-headline text-white text-xl md:text-2xl lg:text-3xl">
                  {exhibit.title}
                </h3>
              </div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div ref={gridRef} className="max-w-7xl mx-auto">
          <div className="empty-state text-center py-20 px-8 rounded-2xl bg-white/[0.02] border border-white/10 border-dashed">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Plus size={32} className="text-white/30" />
            </div>
            <h3 className="museo-headline text-white text-2xl mb-3">
              {t.projectsEmptyTitle}
            </h3>
            <p className="museo-body text-white/40 text-sm max-w-md mx-auto leading-relaxed">
              {t.projectsEmptyDesc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exhibitions;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.headline) return null;

  // Translated stats
  const stats = [
    { value: '3', label: t.statStudents },
    { value: '1', label: t.statDog },
    { value: 'G3-4', label: t.statSchool },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const gallery = galleryRef.current;
    const stats = statsRef.current;

    if (!section || !text || !gallery || !stats) return;

    // Text reveal with parallax
    const textElements = text.querySelectorAll('.reveal-text');
    textElements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);

      // Parallax drift on text elements
      const parallaxTrigger = ScrollTrigger.create({
        trigger: text,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const offset = (i - 1) * 30;
          gsap.set(el, { x: self.progress * offset });
        },
      });
      triggersRef.current.push(parallaxTrigger);
    });

    // Gallery column parallax
    const columns = gallery.querySelectorAll<HTMLElement>('.gallery-col');
    columns.forEach((col, colIndex) => {
      const speed = parseFloat(col.dataset.speed || '0');
      const trigger = ScrollTrigger.create({
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(col, {
            y: p * speed,
            x: (p - 0.5) * (colIndex - 1) * 20,
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Gallery images: opacity 0.4 -> 1 + slide up + parallax
    const imgWraps = gallery.querySelectorAll<HTMLElement>('.gallery-img-wrap');
    imgWraps.forEach((wrap) => {
      const offset = parseFloat(wrap.dataset.offset || '0');
      gsap.set(wrap, { opacity: 0.4, y: offset });

      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 92%',
        end: 'top 40%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(wrap, {
            opacity: 0.4 + progress * 0.6,
            y: offset * (1 - progress),
            scale: 0.95 + progress * 0.05,
          });
        },
      });
      triggersRef.current.push(trigger);

      // Inner image parallax
      const img = wrap.querySelector('img');
      if (img) {
        const imgTrigger = ScrollTrigger.create({
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.set(img, { y: (self.progress - 0.5) * 40 });
          },
        });
        triggersRef.current.push(imgTrigger);
      }
    });

    // Stats reveal
    const statItems = stats.querySelectorAll('.stat-item');
    statItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.8,
            delay: i * 0.1, ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  // Explicit column assignment: left=index0, middle=index1, right=index2
  const col1Images = aboutConfig.galleryImages.length > 0 ? [aboutConfig.galleryImages[0]] : [];
  const col2Images = aboutConfig.galleryImages.length > 1 ? [aboutConfig.galleryImages[1]] : [];
  const col3Images = aboutConfig.galleryImages.length > 2 ? [aboutConfig.galleryImages[2]] : [];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
    >
      {/* Section Header */}
      <div ref={textRef} className="max-w-6xl mx-auto pt-32 pb-20 px-8 lg:px-16">
        <p className="reveal-text museo-label text-white/50 mb-6" style={{ willChange: 'transform, opacity' }}>
          {t.aboutLabel}
        </p>
        <h2 className="reveal-text museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-8" style={{ willChange: 'transform, opacity' }}>
          {t.aboutHeadline}
        </h2>
        <p className="reveal-text museo-body text-white/60 text-lg md:text-xl max-w-2xl" style={{ willChange: 'transform, opacity' }}>
          {t.aboutDescription}
        </p>
      </div>

      {/* Gallery */}
      <div className="overflow-hidden">
        <div ref={galleryRef} className="relative max-w-7xl mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-3 gap-4 lg:gap-5">

            {/* Column 1 */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-80">
              {col1Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden will-change-transform" data-offset={i === 0 ? "60" : "120"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" style={{ aspectRatio: i === 0 ? '3/4' : '4/5' }} />
                  <p className="museo-label text-white/25 mt-3 text-[10px]">{img.label}</p>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="gallery-col space-y-4 lg:space-y-5 pt-20 lg:pt-32 will-change-transform" data-speed="100">
              {col2Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden will-change-transform" data-offset={i === 0 ? "80" : "160"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" style={{ aspectRatio: '3/4' }} />
                  <p className="museo-label text-white/25 mt-3 text-[10px]">{img.label}</p>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="gallery-col space-y-4 lg:space-y-5 will-change-transform" data-speed="-120">
              {col3Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden will-change-transform" data-offset={i === 0 ? "40" : "140"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" style={{ aspectRatio: i === 0 ? '4/5' : '3/4' }} />
                  <p className="museo-label text-white/25 mt-3 text-[10px]">{img.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24 bg-[#050505]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <p className="museo-headline text-white text-4xl md:text-5xl mb-2">{stat.value}</p>
              <p className="museo-label text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pb-32 bg-[#050505]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="reveal-text museo-body text-white/50 text-base lg:text-lg">
              {t.aboutBottomText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

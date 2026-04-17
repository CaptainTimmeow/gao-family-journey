import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import { useLanguage } from './hooks/useLanguage';

// Hooks
import useLenis from './hooks/useLenis';
import useCustomCursor from './hooks/useCustomCursor';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Exhibitions from './sections/Exhibitions';
import Collections from './sections/Collections';
import Testimonials from './sections/Testimonials';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const { t } = useLanguage();

  // Initialize smooth scroll
  useLenis();

  // Initialize custom cursor
  useCustomCursor();

  // Set document title
  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  useEffect(() => {
    // Background color transitions based on sections
    const sections = [
      { selector: '#hero-section', color: '#8c8c91' },
      { selector: '#about', color: '#050505' },
      { selector: '#exhibitions', color: '#050505' },
      { selector: '#collections', color: '#f0f0f0' },
      { selector: '#testimonials-section', color: '#8c8c91' },
      { selector: '#contact', color: '#050505' },
      { selector: '#footer-section', color: '#8c8c91' },
    ];

    sections.forEach(({ selector, color }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: color,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: color,
            duration: 0.6,
            ease: 'power2.out',
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

  return (
    <div ref={mainRef} className="relative">
      {/* Hero Section */}
      <div id="hero-section">
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Exhibitions Section */}
      <Exhibitions />

      {/* Collections Section */}
      <Collections />

      {/* Testimonials Section */}
      <div id="testimonials-section">
        <Testimonials />
      </div>

      {/* Visit Section */}
      <Visit />

      {/* Footer */}
      <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
}

export default App;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dog, Crown, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Meet Xiaodai — The family's Shetland Sheepdog                     */
/* ------------------------------------------------------------------ */

interface FunFact {
  icon: typeof Dog;
  text: string;
  textZh: string;
}

const funFacts: FunFact[] = [
  {
    icon: Crown,
    text: "Self-appointed Queen of the couch — every cushion is her throne.",
    textZh: "自封的沙发女王——每个靠垫都是她的王座。",
  },
  {
    icon: Zap,
    text: "Can hear a snack bag opening from three rooms away. Every. Single. Time.",
    textZh: "能从三个房间外听到零食袋打开的声音。每次都这样。",
  },
  {
    icon: Heart,
    text: "Official greeter — wags her entire body when the kids come home from school.",
    textZh: "官方迎宾员——孩子们放学回家时，她全身都在摇尾巴。",
  },
  {
    icon: Heart,
    text: "Beloved neighborhood mascot — every neighbor knows her name.",
    textZh: "深受喜爱的社区吉祥物——每个邻居都知道她的名字。",
  },
];

const MeetTheDog = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const text = textRef.current;
    const facts = factsRef.current;
    if (!section || !photo || !text || !facts) return;

    gsap.set(photo, { opacity: 0, x: 60, scale: 0.96 });
    gsap.set(text.children, { opacity: 0, y: 40 });
    gsap.set(facts.children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(photo, { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power3.out' });
        gsap.to(text.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
        gsap.to(facts.children, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.5 });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  const title = lang === 'zh' ? '认识小呆' : 'Meet Xiaodai';
  const subtitle = lang === 'zh'
    ? '喜乐蒂牧羊犬 · 沙发女王 · 零食侦探'
    : 'Shetland Sheepdog · Couch Queen · Snack Detective';
  const about = lang === 'zh'
    ? "小呆是我们家的喜乐蒂牧羊犬。她可能不是最大的狗，但她绝对是最有存在感的。从霸占沙发的最佳位置到用她的'可怜眼神'骗取零食，小呆知道如何在这个家里获得她想要的一切。她最爱的事就是孩子们放学回家时疯狂摇尾巴迎接。"
    : "Xiaodai is our family's Shetland Sheepdog. She may not be the biggest dog, but she definitely has the biggest personality. From claiming the best spot on the couch to using her 'sad puppy eyes' to score extra treats, Xiaodai knows how to get what she wants. Her favorite thing is greeting the kids with a full-body wag when they come home from school.";
  const factsLabel = lang === 'zh' ? '小呆档案' : 'Xiaodai Files';

  return (
    <section
      id="xiaodai"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 px-6 lg:px-16"
      style={{ background: '#0a0806' }}
    >
      {/* Warm accent top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a882]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Dog size={20} className="text-[#c4a882]" />
            <p className="museo-label text-[#c4a882]/70 text-[10px] tracking-[0.3em]">
              {lang === 'zh' ? '家庭成员 #4' : 'FAMILY MEMBER #4'}
            </p>
          </div>
          <h2 className="museo-headline text-white text-3xl sm:text-4xl lg:text-5xl mb-3">
            {title}
          </h2>
          <p className="museo-body text-white/40 text-sm">
            {subtitle}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo — on RIGHT (opposite from the kids) */}
          <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <div ref={photoRef} className="relative will-change-transform">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(196,168,130,0.15) 0%, transparent 70%)',
                  transform: 'scale(1.2)',
                  filter: 'blur(40px)',
                }}
              />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/images/xiaodai-2.jpg"
                  alt="Xiaodai the Shetland Sheepdog"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '3/4', objectPosition: 'right center' }}
                />
              </div>
              {/* Name badge */}
              <div
                className="absolute -bottom-4 left-6 px-5 py-2 rounded-full"
                style={{
                  background: '#c4a882',
                  boxShadow: '0 8px 30px rgba(196,168,130,0.3)',
                }}
              >
                <span className="museo-headline text-white text-lg">Xiaodai</span>
                <span className="museo-label text-white/60 text-[9px] ml-2">小呆</span>
              </div>
            </div>
          </div>

          {/* Text — on LEFT */}
          <div className="lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <div ref={textRef}>
              <p className="museo-label text-white/40 text-[10px] tracking-[0.3em] mb-3">
                {lang === 'zh' ? '喜乐蒂牧羊犬 · 2岁' : 'Shetland Sheepdog · Age 2'}
              </p>
              <p className="museo-body text-white/60 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
                {about}
              </p>
            </div>

            {/* Fun facts */}
            <div ref={factsRef}>
              <p className="museo-label text-white/30 text-[10px] tracking-[0.3em] mb-5">
                {factsLabel}
              </p>
              <div className="space-y-4">
                {funFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#c4a882]/10 flex items-center justify-center flex-shrink-0">
                      <fact.icon size={18} className="text-[#c4a882]" />
                    </div>
                    <p className="museo-body text-white/55 text-sm leading-relaxed pt-1">
                      {lang === 'zh' ? fact.textZh : fact.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheDog;

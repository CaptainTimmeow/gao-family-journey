import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Star, Heart, BookOpen, Compass } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Individual Child Profile Sections                                  */
/*  Photo left for boys, photo RIGHT for Chica                        */
/* ------------------------------------------------------------------ */

interface ChildData {
  name: string;
  nameZh: string;
  image: string;
  alt: string;
  age: string;
  ageZh: string;
  tagline: string;
  taglineZh: string;
  about: string;
  aboutZh: string;
  interests: string[];
  interestsZh: string[];
  color: string;
}

const childrenData: ChildData[] = [
  {
    name: 'Roy',
    nameZh: 'Roy',
    image: '/images/roy.jpg',
    alt: 'Roy Gao',
    age: 'G3-G4',
    ageZh: 'G3-G4',
    tagline: 'The eldest. Curious mind, always building something new.',
    taglineZh: '老大。好奇心强，总是在创造新东西。',
    about:
      "Roy is the first-born and natural leader of the trio. He loves robotics, coding, and taking apart gadgets to see how they work. When he's not elbows-deep in a project, you'll find him reading science books or planning the family's next big adventure.",
    aboutZh:
      'Roy是三个孩子中的老大，天生的领导者。他热爱机器人、编程，喜欢拆东西研究原理。不忙着做项目的时候，他在读科学书或计划家庭的下一次大冒险。',
    interests: ['Robotics', 'Coding', 'Science', 'Leading projects'],
    interestsZh: ['机器人', '编程', '科学', '带领项目'],
    color: '#c4a882',
  },
  {
    name: 'Chica',
    nameZh: 'Chica',
    image: '/images/chica.jpg',
    alt: 'Chica Gao',
    age: 'G3-G4',
    ageZh: 'G3-G4',
    tagline: 'The creative soul. Art, music, and stories flow through her.',
    taglineZh: '有创造力的灵魂。艺术、音乐和故事在她身上流淌。',
    about:
      "Chica brings color and melody to everything she touches. She's the family's artist-in-residence — painting, crafting, and composing songs on the piano. Her imagination turns ordinary afternoons into magical worlds.",
    aboutZh:
      'Chica给她接触的每件事都带来色彩和旋律。她是家里的驻场艺术家——画画、手工、钢琴作曲。她的想象力把普通的下午变成神奇的世界。',
    interests: ['Art', 'Music', 'Reading', 'Crafting'],
    interestsZh: ['艺术', '音乐', '阅读', '手工'],
    color: '#b8a090',
  },
  {
    name: 'Sean',
    nameZh: 'Sean',
    image: '/images/sean.jpg',
    alt: 'Sean Gao',
    age: 'G3-G4 — youngest',
    ageZh: 'G3-G4 — 最小的',
    tagline: 'The youngest. Sharp wit, big heart, endless questions.',
    taglineZh: '最小的。机智敏锐，心地善良，问题不断。',
    about:
      "Sean may be the youngest, but his curiosity knows no bounds. He loves animals (especially Xiaodai), gaming, and asking 'why' about everything. With his tablet always in hand, he's the family's tech-native explorer.",
    aboutZh:
      'Sean虽然最小，但他的好奇心无限。他热爱动物（尤其是小呆）、游戏，对一切都问"为什么"。平板不离手，他是家里的科技原生探险家。',
    interests: ['Animals', 'Gaming', 'Tablets', 'Asking why'],
    interestsZh: ['动物', '游戏', '平板', '问为什么'],
    color: '#a8b8a0',
  },
];

const ChildProfile = ({ child, index }: { child: ChildData; index: number }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const { lang } = useLanguage();

  /* Key layout decision:
   * Roy  (index 0): photo LEFT,  text right
   * Chica (index 1): photo RIGHT, text left  ← she's different
   * Sean (index 2): photo LEFT,  text right
   */
  const photoOnLeft = index !== 1; // only Chica gets photo on right

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const text = textRef.current;
    if (!section || !photo || !text) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Photo enters from its natural side
    gsap.set(photo, { opacity: 0, x: photoOnLeft ? -60 : 60, scale: 0.96 });
    gsap.set(text.children, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(photo, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
        });
        gsap.to(text.children, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        });
      },
    });
    triggersRef.current.push(trigger);

    if (!prefersReduced) {
      const parallaxTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const yOffset = (self.progress - 0.5) * -40;
          gsap.set(photo, { y: yOffset });
        },
      });
      triggersRef.current.push(parallaxTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [photoOnLeft]);

  const name = lang === 'zh' ? child.nameZh : child.name;
  const age = lang === 'zh' ? child.ageZh : child.age;
  const tagline = lang === 'zh' ? child.taglineZh : child.tagline;
  const about = lang === 'zh' ? child.aboutZh : child.about;
  const interests = lang === 'zh' ? child.interestsZh : child.interests;

  /* Photo block */
  const PhotoBlock = (
    <div ref={photoRef} className="lg:col-span-5 will-change-transform">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 60%, ${child.color} 0%, transparent 70%)`,
            transform: 'scale(1.2)',
            filter: 'blur(50px)',
          }}
        />
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={child.image}
            alt={child.alt}
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '3/4', objectPosition: 'center center' }}
          />
        </div>
        <div
          className="absolute -bottom-4 left-6 px-5 py-2 rounded-full"
          style={{
            background: child.color,
            boxShadow: `0 8px 30px ${child.color}40`,
          }}
        >
          <span className="museo-headline text-white text-lg">{name}</span>
        </div>
      </div>
    </div>
  );

  /* Text block */
  const TextBlock = (
    <div ref={textRef} className="lg:col-span-7">
      <p className="museo-label text-white/40 text-[10px] tracking-[0.3em] mb-3">{age}</p>
      <p className="museo-body text-white/60 text-lg lg:text-xl leading-relaxed mb-6">{tagline}</p>
      <p className="museo-body text-white/50 text-sm lg:text-base leading-relaxed mb-8 max-w-xl">{about}</p>
      <div className="flex flex-wrap gap-3 mb-8">
        {interests.map((interest, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs"
          >
            {i === 0 && <Star size={12} />}
            {i === 1 && <Heart size={12} />}
            {i === 2 && <BookOpen size={12} />}
            {i === 3 && <Compass size={12} />}
            {interest}
          </span>
        ))}
      </div>
      <a
        href="#hero-section"
        className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors group"
      >
        <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        <span className="museo-label text-[10px]">
          {lang === 'zh' ? '返回顶部' : 'Back to top'}
        </span>
      </a>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={`child-${child.name.toLowerCase()}`}
      className="relative w-full py-24 lg:py-32 px-6 lg:px-16"
      style={{ background: '#050505' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* For Chica: text first (left), photo second (right)
              For Roy/Sean: photo first (left), text second (right) */}
          {photoOnLeft ? (
            <>
              {PhotoBlock}
              {TextBlock}
            </>
          ) : (
            <>
              {TextBlock}
              {PhotoBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const ChildProfiles = () => {
  const { lang } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header.children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(header.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const title = lang === 'zh' ? '认识每个孩子' : 'Meet Each Child';
  const subtitle =
    lang === 'zh'
      ? 'Roy、Chica 和 Sean — 每个人都有独特的个性和热情'
      : 'Roy, Chica, and Sean — each with their own personality and passions';

  return (
    <div id="children">
      {/* Section Header */}
      <div
        ref={headerRef}
        className="w-full py-20 lg:py-28 px-6 lg:px-16 text-center"
        style={{ background: '#050505' }}
      >
        <p className="museo-label text-white/40 text-[10px] tracking-[0.3em] mb-4">
          {lang === 'zh' ? '孩子们' : 'THE KIDS'}
        </p>
        <h2 className="museo-headline text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
          {title}
        </h2>
        <p className="museo-body text-white/50 text-base lg:text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Individual Profiles */}
      {childrenData.map((child, index) => (
        <ChildProfile key={child.name} child={child} index={index} />
      ))}
    </div>
  );
};

export default ChildProfiles;

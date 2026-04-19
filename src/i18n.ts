// Bilingual configuration - English & Chinese
// 双语配置 - 英文与中文

export type Lang = 'en' | 'zh';

export interface TranslationSet {
  title: string;
  description: string;
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  scrollText: string;
  copyrightText: string;
  navOurStory: string;
  navProjects: string;
  navMilestones: string;
  navContact: string;
  aboutLabel: string;
  aboutHeadline: string;
  aboutDescription: string;
  aboutBottomText: string;
  statStudents: string;
  statDog: string;
  statSchool: string;
  galleryLearning: string;
  galleryFun: string;
  galleryReading: string;
  projectsLabel: string;
  projectsHeadline: string;
  projectsCta: string;
  projectsEmptyTitle: string;
  projectsEmptyDesc: string;
  milestonesLabel: string;
  milestonesHeadline: string;
  milestonesCta: string;
  milestonesEmptyTitle: string;
  milestonesEmptyDesc: string;
  testimonialsQuote: string;
  testimonialsAuthor: string;
  testimonialsTitle: string;
  contactLabel: string;
  contactHeadline: string;
  contactDescription: string;
  contactCta: string;
  contactLocation: string;
  contactLocationValue: string;
  contactUpdates: string;
  contactUpdatesValue: string;
  footerMarquee: string;
  footerBrandName: string;
  footerBrandDesc: string;
  footerQuickLinks: string;
  footerContact: string;
  langToggle: string;
  /* Hero scrollytelling keys */
  heroHeadline: string;
  heroSubheading: string;
  heroScrollCue: string;
  heroCardMilestones: string;
  heroCardMilestonesLabel: string;
  heroCardProjects: string;
  heroCardProjectsLabel: string;
  heroCardAdventures: string;
  heroCardAdventuresLabel: string;
  heroCardXiaodai: string;
  heroCardXiaodaiLabel: string;
}

export const translations: Record<Lang, TranslationSet> = {
  en: {
    title: 'The Gao Family Journey',
    description: 'Follow the journey of Roy, Chica, and Sean Gao - three elementary school students and their dog Xiaodai in Shenzhen, China.',
    brandLeft: 'Gao',
    brandRight: 'Family',
    tagline: 'Roy, Chica, Sean & Xiaodai',
    badge: 'Shenzhen, China',
    since: 'Est. 2018',
    scrollText: 'Scroll to explore',
    copyrightText: '© 2024 Gao Family',
    navOurStory: 'Our Story',
    navProjects: 'Projects',
    navMilestones: 'Milestones',
    navContact: 'Contact',
    aboutLabel: 'Meet the Family',
    aboutHeadline: 'Roy, Chica, Sean & Xiaodai',
    aboutDescription: "We're the Gao family! Roy, Chica, and Sean are elementary school students in Shenzhen, China, who love filmmaking, tech projects, and having fun together. Our Shetland Sheepdog Xiaodai is always by our side, bringing joy to everything we do. From learning about cameras and gimbals to striking action poses in the studio, we're documenting our real journey as we explore, create, and grow together.",
    aboutBottomText: 'This website is a work in progress. Check back soon as we share our real projects and experiences!',
    statStudents: 'Students',
    statDog: 'Dog',
    statSchool: 'Elementary',
    galleryLearning: 'Filmmaking',
    galleryFun: 'Studio Life',
    galleryReading: 'Fun Moments',
    projectsLabel: 'Our Projects',
    projectsHeadline: "What We're Working On",
    projectsCta: 'View Details',
    projectsEmptyTitle: 'Projects Coming Soon',
    projectsEmptyDesc: "We're working on exciting projects! Check back soon as we share what Roy, Chica, and Sean are building and creating.",
    milestonesLabel: 'Our Journey',
    milestonesHeadline: 'Milestones & Memories',
    milestonesCta: 'Read More',
    milestonesEmptyTitle: 'Milestones Coming Soon',
    milestonesEmptyDesc: "We're just getting started! Check back as we document the important moments in our family's learning journey.",
    testimonialsQuote: '',
    testimonialsAuthor: '',
    testimonialsTitle: '',
    contactLabel: 'Get In Touch',
    contactHeadline: "Let's Connect",
    contactDescription: "We'd love to hear from you! Whether you're a fellow family documenting your journey, an educator, or just want to say hello.",
    contactCta: 'Send Message',
    contactLocation: 'Location',
    contactLocationValue: 'Shenzhen, China',
    contactUpdates: 'Updates',
    contactUpdatesValue: 'Coming Soon',
    footerMarquee: '★ THE GAO FAMILY ★ ROY ★ CHICA ★ SEAN ★ XIAODAI ★ SHENZHEN ★',
    footerBrandName: 'Gao Family',
    footerBrandDesc: 'Documenting our journey of learning and growing together.',
    footerQuickLinks: 'Quick Links',
    footerContact: 'Contact',
    langToggle: '中文',
    heroHeadline: 'Always Creating',
    heroSubheading: 'Roy, Chica, Sean & Xiaodai — 三体科创工作室',
    heroScrollCue: 'Scroll to explore our story',
    heroCardMilestones: 'Growing up, one milestone at a time',
    heroCardMilestonesLabel: 'Milestones',
    heroCardProjects: 'Building, creating, and learning together',
    heroCardProjectsLabel: 'Projects',
    heroCardAdventures: 'Weekend trips, park days, and city explorations',
    heroCardAdventuresLabel: 'Adventures',
    heroCardXiaodai: 'Our Shetland Sheepdog and the joy she brings',
    heroCardXiaodaiLabel: 'Xiaodai Moments',
  },
  zh: {
    title: '高家成长旅程',
    description: '关注Roy、Chica和Sean高——三位在深圳的小学生以及他们的狗狗小呆的成长旅程。',
    brandLeft: '高',
    brandRight: '家',
    tagline: 'Roy, Chica, Sean & 小呆',
    badge: '中国 · 深圳',
    since: '始于 2018',
    scrollText: '向下滚动探索',
    copyrightText: '© 2024 高家',
    navOurStory: '我们的故事',
    navProjects: '项目',
    navMilestones: '里程碑',
    navContact: '联系我们',
    aboutLabel: '认识我们',
    aboutHeadline: 'Roy, Chica, Sean & 小呆',
    aboutDescription: "我们是高家！Roy、Chica和Sean是在中国深圳的小学生，热爱电影制作、科技项目和一起玩耍。我们的喜乐蒂牧羊犬小呆总是在我们身边，给一切带来欢乐。从学习相机和云台到在工作室里摆出动作姿势，我们正在记录真实的旅程，一起探索、创造和成长。",
    aboutBottomText: '网站正在建设中。请常回来看看，我们会分享真实的项目和经历！',
    statStudents: '学生',
    statDog: '狗狗',
    statSchool: '小学',
    galleryLearning: '电影制作',
    galleryFun: '工作室生活',
    galleryReading: '欢乐时刻',
    projectsLabel: '我们的项目',
    projectsHeadline: '正在做的事',
    projectsCta: '查看详情',
    projectsEmptyTitle: '项目即将推出',
    projectsEmptyDesc: '我们正在做一些令人兴奋的项目！请常回来看看Roy、Chica和Sean正在创建什么。',
    milestonesLabel: '我们的旅程',
    milestonesHeadline: '里程碑与回忆',
    milestonesCta: '了解更多',
    milestonesEmptyTitle: '里程碑即将推出',
    milestonesEmptyDesc: '我们才刚刚开始！请常回来看看我们记录的家庭学习旅程中的重要时刻。',
    testimonialsQuote: '',
    testimonialsAuthor: '',
    testimonialsTitle: '',
    contactLabel: '联系我们',
    contactHeadline: '保持联系',
    contactDescription: '我们很乐意收到您的来信！无论您是记录旅程的家庭、教育工作者，还是只想打个招呼。',
    contactCta: '发送消息',
    contactLocation: '地点',
    contactLocationValue: '中国 · 深圳',
    contactUpdates: '更新',
    contactUpdatesValue: '即将推出',
    footerMarquee: '★ 高家 ★ ROY ★ CHICA ★ SEAN ★ 小呆 ★ 深圳 ★',
    footerBrandName: '高家',
    footerBrandDesc: '记录我们一起学习和成长的旅程。',
    footerQuickLinks: '快速链接',
    footerContact: '联系方式',
    langToggle: 'English',
    heroHeadline: '无限创意',
    heroSubheading: 'Roy, Chica, Sean & 小呆 — 三体科创工作室',
    heroScrollCue: '向下滚动探索我们的故事',
    heroCardMilestones: '一步步成长，一个个里程碑',
    heroCardMilestonesLabel: '里程碑',
    heroCardProjects: '一起建造、创造和学习',
    heroCardProjectsLabel: '项目',
    heroCardAdventures: '周末旅行、公园时光和城市探索',
    heroCardAdventuresLabel: '冒险',
    heroCardXiaodai: '我们的喜乐蒂牧羊犬和她带来的欢乐',
    heroCardXiaodaiLabel: '小呆时刻',
  },
};

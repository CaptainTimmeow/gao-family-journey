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
    aboutDescription: "We're the Gao family! Roy, Chica, and Sean are elementary school students in Shenzhen, China, working on fun projects together. Our Shetland Sheepdog Xiaodai is always by our side, bringing joy to everything we do. We're documenting our learning journey as we explore new interests, work on projects, and prepare for the future — from college prep to business ideas.",
    aboutBottomText: 'This website is a work in progress. Check back soon as we share our real projects and experiences!',
    statStudents: 'Students',
    statDog: 'Dog',
    statSchool: 'Elementary',
    galleryLearning: 'Learning Together',
    galleryFun: 'Family Fun',
    galleryReading: 'Reading Time',
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
    aboutDescription: "我们是高家！Roy、Chica和Sean是在中国深圳的小学生，一起做有趣的项目。我们的喜乐蒂牧羊犬小呆总是在我们身边，给一切带来欢乐。我们正在记录我们的学习旅程，探索新兴趣、做项目、为未来做准备——从大学准备到商业想法。",
    aboutBottomText: '网站正在建设中。请常回来看看，我们会分享真实的项目和经历！',
    statStudents: '学生',
    statDog: '狗狗',
    statSchool: '小学',
    galleryLearning: '一起学习',
    galleryFun: '家庭欢乐',
    galleryReading: '阅读时光',
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
  },
};

// Site configuration
// The Gao Family Journey - A showcase of student projects and family milestones

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "The Gao Family Journey",
  description: "Follow the journey of Roy, Chica, and Sean Gao - three elementary school students and their dog Xiaodai.",
};

export const heroConfig: HeroConfig = {
  brandLeft: "Gao",
  brandRight: "Family",
  tagline: "Roy, Chica, Sean & Xiaodai",
  badge: "Our Journey",
  since: "Est. 2018",
  email: "",
  heroImage: "/images/xiaodai-1.jpg",
  heroImageAlt: "Xiaodai - The family Shetland Sheepdog",
  scrollText: "Scroll to learn more",
  copyrightText: "© 2024 Gao Family",
  navLinks: [
    { label: "Our Story", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [],
};

export const aboutConfig: AboutConfig = {
  label: "Meet the Family",
  headline: "Roy, Chica, Sean & Xiaodai",
  description: "We're the Gao family! Roy, Chica, and Sean are elementary school students working on fun projects together. Our golden retriever Xiaodai is always by our side, bringing joy to everything we do. We're documenting our learning journey as we explore new interests, work on projects, and prepare for the future.",
  bottomText: "This website is a work in progress. Check back soon as we share our real projects and experiences!",
  galleryImages: [
    { src: "/images/gallery-1.jpg", alt: "Kids studying together", label: "Learning Together" },
    { src: "/images/gallery-3.jpg", alt: "Playing with Xiaodai", label: "Family Fun" },
    { src: "/images/gallery-6.jpg", alt: "Family reading time", label: "Reading Time" },
  ],
  stats: [
    { value: "3", label: "Students" },
    { value: "1", label: "Dog" },
    { value: "Elementary", label: "School" },
  ],
};

// Projects section - will be populated with real projects as they happen
export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Our Projects",
  headline: "What We're Working On",
  ctaText: "View Details",
  exhibitions: [],
};

// Milestones section - will be populated with real achievements
export const collectionsConfig: CollectionsConfig = {
  label: "Our Journey",
  headline: "Milestones & Memories",
  ctaText: "Read More",
  collections: [],
};

// Testimonial section - empty until we have real quotes
export const testimonialsConfig: TestimonialsConfig = {
  quote: "",
  authorName: "",
  authorTitle: "",
  authorImage: "",
};

export const visitConfig: VisitConfig = {
  label: "Get In Touch",
  headline: "Let's Connect",
  description: "We'd love to hear from you! Whether you're a fellow family documenting your journey, an educator, or just want to say hello, feel free to reach out.",
  ctaText: "Send Message",
  infoCards: [
    {
      icon: "MapPin",
      title: "Location",
      content: "California, USA",
    },
    {
      icon: "Calendar",
      title: "Updates",
      content: "Coming Soon",
    },
  ],
};

export const footerConfig: FooterConfig = {
  marqueeText: "★ THE GAO FAMILY ★ ROY ★ CHICA ★ SEAN ★ XIAODAI ★",
  brandName: "Gao Family",
  brandDescription: "Documenting our journey of learning and growing together.",
  socialLinks: [],
  quickLinks: [
    { label: "Our Story", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  quickLinksTitle: "Quick Links",
  contactTitle: "Contact",
  contactItems: [
    "California, USA",
  ],
  bottomLinks: [],
};

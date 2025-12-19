// src/data/portfolioData.ts
import React from 'react'; // Needed for icons if we store them here, otherwise strings are fine.

export const projectsData = [
  // 1. EXCLUSIVE CAR FINANCE
  {
    id: 1,
    slug: "exclusive-car-finance",
    category: "Automotive",
    title: "Exclusive Car Finance – Custom Next.js Website",
    subtitle: "Advanced Finance Calculator & Lead Capture Platform",
    
    // Header & Meta
    heroImage: "/images/portfolio/heroImage.jpg",
    logoText: "Exclusive",
    logoSub: "Finance",
    website: "exclusivecarfinance.com", 
    timeline: "3 Months",
    
    // Sidebar Data
    services: ["Web Development", "UI/UX Design", "Complex Logic", "CRM Integration"],
    team: ["Project Manager", "UI/UX Designer", "Next.js Developer", "QA Engineer"],
    technologies: ["Next.js", "React", "Tailwind CSS", "Custom JS Logic", "Node.js"],
    integrations: ["CRM System", "Email API", "Lead Capture Tools"],

    // Main Content
    intro: "Exclusive Car Finance, a UK-based vehicle financing provider, needed a modern, high-performance digital platform to streamline customer acquisition and enhance trust. Code Nest delivered a highly customized, conversion-optimized platform with advanced financial tools.",
    
    challenge: "The client's existing WordPress website could not support the advanced finance calculation logic required for accurate loan projections. They faced issues with poor mobile performance, lack of real-time calculation capabilities (not achievable with WP plugins), and inefficient lead generation workflows.",
    
    solution: "Code Nest rebuilt the entire website using Next.js for speed, security, and scalability. We developed a fully custom car finance calculator using JavaScript logic tailored to the client's lending parameters. We also implemented custom workflows for quote requests and seamless CRM integration to automate lead follow-ups.",

    // User Roles Section
    userRoles: [
      { 
        title: "Car Buyer", 
        desc: "Adjusts deposit and term length to see real-time monthly payments and total payable amounts instantly." 
      },
      { 
        title: "Sales Admin", 
        desc: "Receives structured quote requests with pre-calculated financial data directly into the CRM." 
      },
      { 
        title: "Marketing Team", 
        desc: "Tracks conversion rates on optimized forms and frictionless mobile layouts." 
      }
    ],

    // Features Slider (Data from PDF Page 2)
    features: [
      {
        id: 0,
        title: "Custom Finance Calculator",
        desc: "Real-time monthly payment projections, total credit charge, and total payable amount using bespoke JavaScript logic not possible with standard plugins.",
        img: "/images/portfolio/calculator.jpg"
      },
      {
        id: 1,
        title: "Finance Application Workflow",
        desc: "Users can submit full application requests with necessary details rooted directly into the client's CRM system for immediate processing.",
        img: "/images/portfolio/workflow.jpg"
      },
      {
        id: 2,
        title: "Lead Capture Automation",
        desc: "CRM integration allows for automated email responses, data organization, and streamlined follow-up workflows to close deals faster.",
        img: "/images/portfolio/lead capture.jpg"
      },
      {
        id: 3,
        title: "High-Performance Next.js",
        desc: "Ultra-fast load speeds, modern UI animations, and secure architecture without the limitations or security vulnerabilities of WordPress.",
        img: "/images/portfolio/next.js.jpg"
      },
      {
        id: 4,
        title: "Conversion-Optimized UX",
        desc: "Clear CTAs, simplified forms, improved readability, and a trust-focused copy layout designed specifically for the UK finance industry.",
        img: "/images/portfolio/lead capture copy.jpg"
      }
    ],

    // Outcomes
    outcome: "The redesigned platform delivered measurable improvements: a significant increase in inbound leads, a faster application process reducing drop-off, higher user engagement via interactive tools, and improved performance scores improving SEO positioning."
  },

  // 2. INTUIT INTERACTIVE ALBUM
  {
    id: 2,
    slug: "intuit-interactive-album",
    category: "SaaS / AI",
    title: "Intuit Interactive Album Platform",
    subtitle: "Feature Enhancements & System Upgrade",
    
    heroImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    logoText: "Intuit",
    logoSub: "Album",
    website: "Internal Platform",
    timeline: "2 Months",

    services: ["Full Stack Dev", "AI Integration", "Security Hardening", "Database Design"],
    team: ["Lead Developer", "Backend Engineer", "Security Specialist"],
    technologies: ["Next.js", "React", "Replicate API", "OpenID Connect", "Node.js", "PostgreSQL"],
    integrations: ["Replicate (AI)", "OIDC Auth", "Internal APIs"],

    intro: "This project involved enhancing an internal interactive album platform for Intuit employees. The system allowed authenticated users to create AI-generated album covers, browse galleries, like artwork, and view global rankings.",

    challenge: "The platform suffered from issues with the 'like' system, unreliable image generation using DALL-E, and unauthorized access risks. Users experienced inaccurate ranking logic on the leaderboard and general stability issues.",

    solution: "Code Nest improved the platform's functionality and reliability. We migrated from DALL-E to Replicate for smoother image generation, implemented OpenID Connect (OIDC) for secure authentication, and rebuilt the leaderboard and like-system logic with database-level persistence.",

    userRoles: [
      { title: "Employee (Creator)", desc: "Generates unique AI album covers and competes for top spots on the global leaderboard." },
      { title: "Viewer (Guest)", desc: "Browses the gallery and likes artwork with a system that supports both logged-in and guest interactions." },
      { title: "Admin", desc: "Manages user access via OIDC and monitors system performance." }
    ],

    features: [
      {
        id: 0,
        title: "AI Generation via Replicate",
        desc: "Migration from DALL·E to Replicate API to ensure smoother, high-quality, and more reliable AI album cover generation.",
        img: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 1,
        title: "Smart Leaderboard",
        desc: "Redesigned sorting logic to accurately highlight top creators and real-time rankings, fixing previous inaccuracies.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "OIDC Authentication",
        desc: "Implementation of OpenID Connect login to restrict unauthorized access and protect routes like /customize-album and /image-published.",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Stable Like System",
        desc: "Rebuilt the like system with database persistence (tracking user_id or IP) to prevent spam and ensure accurate engagement metrics.",
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
      }
    ],

    outcome: "The project resulted in an accurate real-time leaderboard, a stable and reliable like system, stronger authentication security, and a smoother image generation flow, ultimately leading to higher employee engagement."
  },

  // 3. TEXAS YOUNG AUTISM PROJECT (TYAP)
  {
    id: 3,
    slug: "tyap-redesign",
    category: "Healthcare",
    title: "Texas Young Autism Project",
    subtitle: "Full WordPress Redesign & Custom UX",
    
    heroImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200&auto=format&fit=crop",
    logoText: "TYAP",
    logoSub: "Healthcare",
    website: "tyap.com", // Example
    timeline: "6 Weeks",

    services: ["UX/UI Design", "WordPress Dev", "Elementor Customization", "Content Strategy"],
    team: ["UX Designer", "WordPress Developer", "Content Manager"],
    technologies: ["WordPress", "Elementor", "Custom CSS", "JavaScript", "HTML5"],
    integrations: ["Consultation Forms", "Google Maps", "Analytics"],

    intro: "TYAP needed a complete digital transformation to better communicate their mission and improve how parents access critical ABA therapy information. Code Nest designed a modern, accessible, and emotionally supportive user experience.",

    challenge: "The previous site was difficult to navigate on mobile, lacked clear service structure, and failed to generate consultation inquiries. Parents seeking help for autism services found it hard to access critical information.",

    solution: "We handled the full end-to-end website creation. This included a custom WordPress theme, Elementor templates for staff and services, and a multi-step inquiry form. We focused on a warm, trustworthy brand presence tailored to families.",

    userRoles: [
      { title: "Parent", desc: "Easily finds health plans, service details, and books consultations on mobile devices." },
      { title: "Therapist", desc: "Showcases professional qualifications and success stories via the new staff directory." },
      { title: "Admin", desc: "Easily manages content, testimonials, and service updates via the optimized backend." }
    ],

    features: [
      {
        id: 0,
        title: "Service Directory & Icons",
        desc: "Custom service modules with illustrated icons for each offering, presenting services clearly with structured information architecture.",
        img: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 1,
        title: "Multi-Step Inquiry Form",
        desc: "Optimized consultation form with service selection dropdowns, reducing user effort and increasing lead quality.",
        img: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Mission-Driven Storytelling",
        desc: "About pages, staff profiles with photos, and testimonial sliders build a warm, trustworthy brand presence.",
        img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Mobile Accessibility",
        desc: "Full mobile and tablet responsiveness ensuring parents can access information easily on any device.",
        img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop"
      }
    ],

    outcome: "Higher consultation inquiries due to improved CTAs, stronger brand credibility increasing parent trust, and noticeable performance improvements reducing the bounce rate."
  },

  // 4. THE CHOICE ALLIANCE GROUP
  {
    id: 4,
    slug: "choice-alliance-group",
    category: "Finance",
    title: "The Choice Alliance Group",
    subtitle: "Full Website Rebuild & Security Hardening",
    
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    logoText: "Choice",
    logoSub: "Alliance",
    website: "choicealliance.com", // Example
    timeline: "4 Weeks (Urgent)",

    services: ["Security Audit", "WordPress Rebuild", "Backend Hardening", "Blog System"],
    team: ["Security Expert", "Full Stack Dev", "SEO Specialist"],
    technologies: ["WordPress", "PHP", "ACF", "Security Tools", "Gutenberg Blocks"],
    integrations: ["Consultation Booking", "Secure Forms", "SEO Tools"],

    intro: "The Choice Alliance Group urgently needed a full website rebuild after their previous WordPress site was hacked. Code Nest developed a secure, conversion-focused website aligned with the financial services industry.",

    challenge: "The client needed to replace a hacked, outdated site with a stable platform. Key objectives included modernizing the brand, organizing complex financial services into clear pages, and preventing future security breaches.",

    solution: "We built a new secure WordPress environment from scratch. This included custom service page layouts (Retirement, UK Pensions), a scalable blog module for insights, and strategic consultation booking CTAs.",

    userRoles: [
      { title: "Client", desc: "Navigates retirement planning services with trust and ease on a fast-loading site." },
      { title: "Advisor", desc: "Publishes articles and financial insights via the new scalable blog module." },
      { title: "System Admin", desc: "Operates within a hardened backend environment with advanced security measures." }
    ],

    features: [
      {
        id: 0,
        title: "Security Hardening",
        desc: "Backend setup, security upgrades, and environment hardening to prevent hacks and ensure long-term stability.",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 1,
        title: "Dynamic Service Pages",
        desc: "Tailored layouts for specific services like UK Pensions and Swiss Planning, each with optimized content blocks.",
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Scalable Blog Module",
        desc: "A custom blog system with categories, metadata, and featured images to drive financial education and engagement.",
        img: "https://images.unsplash.com/photo-1434626881859-a944d330d940?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Performance Optimization",
        desc: "Reduced load times and improved SEO structure leading to increased traffic and better search rankings.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
      }
    ],

    outcome: "Increased traffic due to SEO improvements, higher blog engagement, better conversions on consultation requests, and a restored, credible online presence that builds trust with clients."
  }
];
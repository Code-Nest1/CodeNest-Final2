"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { 
  motion, 
  AnimatePresence, 
  useAnimation, 
  PanInfo, 
  Variants 
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ArrowDown, 
  ArrowUpRight,
  ArrowLeft,
  Star, 
  Link as LinkIcon, 
  FileText, 
  Headphones,
  Plus,
  Minus
} from "react-feather";

/**
 * --- Design Tokens (Code Nest "Elite Glow" Edition) ---
 * Brighter. Sharper. Beautifully synchronized with your Green/White brand.
 */
const COLORS = {
  // Brand Forest: Replaces coaxBlue (Main elements like header backgrounds, active states)
  coaxBlue: "#2b945f", 
  
  // Brand Prestige: Replaces darkerBlue (For depth, icons on bright backgrounds, hero subtexts)
  darkerBlue: "#0c3740",   
  
  // Electric Mint: Replaces Lime (This is your High-Contrast "Wow" color for CTAs & Highlights)
  // This color GLOWS against your Dark Green background sections.
  lime: "#4dffa6",         
  
  // Vivid Gold: Polished accent for premium reviews (matches green tones perfectly)
  starGold: "#ffcf12",     
  
  // Crisp Snow: The absolute white base of Code Nest
  white: "#feffff",
  
  // True Deep: Use black for headlines to ensure ultra-sharp readability
  textDark: "#000000",     
  
  // Mineral Grey: A cleaner grey for paragraphs that doesn't look "dirty"
  textGray: "#5c6660",     
  
  // Glass Tint: Light semi-transparent text for overlapping elements
  textLight: "rgba(254, 255, 255, 0.9)",
  
  // Crystal Canvas: Replaces bgSection. 
  // It is brighter than previous mints, keeping the site looking "Airy."
  bgSection: "#f8fffc",    
  
  // Fresh Border: Very light and subtle to keep sections distinct but clean
  borderColor: "#ebf2ee",  
};

// --- DATA: SHOPIFY CONTEXT ---
const SHOPIFY_STANDARDS = [
  { id: "LIQUID", title: "Liquid & Theme Standards", desc: "Optimized Liquid architecture ensuring strict separation of data and display logic for 2.0 theme compatibility." },
  { id: "API", title: "Shopify Storefront API", desc: "Advanced usage of the Storefront API to build headless experiences and custom mobile apps tied to your store." },
  { id: "SEC", title: "PCI & Data Security", desc: "Compliance with PCI DSS standards and secure handling of customer data through vetted app integrations." },
  { id: "CWV", title: "Core Web Vitals (Speed)", desc: "Performance optimization targeting Largest Contentful Paint (LCP) and First Input Delay (FID) on mobile devices." }
];

const BENEFITS_DATA = [
  {
    title: "High-Converting Store Speed",
    desc: "We eliminate 'App bloat' by coding custom functionalities directly into the theme. By prioritizing critical assets and minimizing JavaScript execution, we achieve superior mobile scores that drive lower bounce rates and higher sales."
  },
  {
    title: "SaaS Reliability + Custom Power",
    desc: "Leverage Shopify's banking-grade security and 99.99% uptime while we engineer custom checkout flows, unique product configurators, and bespoke functionality that standard themes simply cannot handle."
  },
  {
    title: "Shopify Online Store 2.0",
    desc: "We build modular, section-everywhere themes. This gives your merchant team full control to drag-and-drop sections and create diverse landing pages without needing a developer for every marketing campaign."
  },
  {
    title: "Headless & Hydrogen Ready",
    desc: "Pushing boundaries? We build Headless commerce solutions using React and Hydrogen. This uncouples your frontend from the backend, allowing for sub-second page transitions and complete design freedom."
  },
  {
    title: "Clean Technical Architecture",
    desc: "Spaghetti code from dozens of apps slows down stores. We audit and refactor your setup, replacing slow apps with lightweight custom code. This minimizes monthly fees and reduces technical conflict points."
  },
  {
    title: "Seamless Global Expansion",
    desc: "Scale easily with Shopify Markets. We architect your store to handle multi-currency, multi-language, and international domains (i18n), ensuring a localized buying experience for customers everywhere."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Shopify Plus Experts", desc: "We specialize in high-volume implementations, utilizing Plus-exclusive features like checkout extensibility, B2B logic, and sophisticated scripts to increase AOV." },
  { num: "/ 02", title: "Conversion-Led Design", desc: "We don't just code; we design for sales. Every UX decision is backed by e-commerce data to minimize friction from the homepage landing to the final 'Thank You' page." },
  { num: "/ 03", title: "Advanced App Development", desc: "When the App Store falls short, we build custom private apps. We automate your backend logistics, inventory syncing, and ERP integrations securely." },
  { num: "/ 04", title: "Performance-First Metrics", desc: "Speed is revenue. Our CI/CD pipelines automatically test for speed regressions, ensuring your store remains fast even after new feature deployments or high-traffic holiday sales." },
  { num: "/ 05", title: "Enterprise Grade Migration", desc: "Moving from Magento or Woo? We handle complex data migrations including products, customers, and order history with zero downtime and strict URL redirects (SEO safety)." },
  { num: "/ 06", title: "Growth Partnership", desc: "An online store is never 'finished'. We act as your ongoing technical partner, providing CRO audits, feature roadmaps, and 24/7 support during Black Friday/Cyber Monday." }
];

// Reusing same feedback structure, updated service tags for Context
type FeedbackItem = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  imgSrc: string;
  logoSrc?: string;
  hasVideo?: boolean;
  ctaText?: string;
  serviceTag?: string;
};

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Bohdan Zabawskyj",
    role: "Co-founder and CPO at Fortay.ai",
    company: "Fortay.ai",
    quote: "Codenest revamped our e-commerce presence completely. The custom Shopify 2.0 theme they built increased our conversion rate by 30% in the first month. Essential partners.",
    imgSrc: "/assets/feedback/bohdan.jpg",
    serviceTag: "Shopify Plus Development",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Dan Brooks",
    role: "President, Krytter",
    company: "Krytter",
    quote: "Our previous store was sluggish due to app overload. They migrated us to a cleaner architecture and handled our complex inventory logic. Traffic value skyrocketed.",
    imgSrc: "/assets/feedback/dan.jpg",
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "Store Optimization & SEO",
    ctaText: "View Case Study",
  },
  {
    id: 3,
    name: "Michael Smith",
    role: "Product Owner",
    company: "TechFlow",
    quote: "We needed a headless solution to integrate with our mobile app. The Code Nest team leveraged Shopify's API perfectly to create a seamless omni-channel experience.",
    imgSrc: "/assets/feedback/michael.jpg",
    serviceTag: "Headless Commerce",
    ctaText: "See the Store",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Store Assessment",
    desc: "We analyze your current theme architecture, installed apps, and conversion funnels. We identify high-cost low-value apps and point out UX friction points killing your sales."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Code & Liquid Analysis",
    desc: "We dive deep into your Liquid files and JavaScript assets. We look for unoptimized loops, blocking scripts from third parties, and legacy code that hurts your Core Web Vitals."
  },
  {
    icon: <FileText size={28} />,
    title: "Actionable Reporting",
    desc: "You receive a prioritized roadmap. It classifies issues by 'Impact on Revenue' vs 'Effort'. We provide clear instructions: which apps to remove, which images to compress, and what code to refactor."
  },
  {
    icon: <Headphones size={28} />,
    title: "Implementation & CRO",
    desc: "Beyond fixing bugs, we help implement the changes. Whether it's upgrading to OS 2.0 or tweaking the cart drawer, we ensure the improvements lead to measurable growth."
  }
];

const FAQ_DATA = [
    {
        question: "How long does a migration to Shopify typically take?",
        answer: "For most brands moving from WooCommerce or Magento, a full data and design migration takes 8 to 14 weeks. This includes product data transfer, SEO redirect mapping, custom theme setup, and payment gateway integration."
    },
    {
        question: "Do you work with existing themes or build from scratch?",
        answer: "We do both. For startups, we can customize premium themes to keep costs low. For scaling brands and enterprise (Shopify Plus), we engineer bespoke custom themes from scratch to ensure maximum performance and brand uniqueness."
    },
    {
        question: "Can you help improve my store's page speed?",
        answer: "Absolutely. Speed optimization is our core service. We minimize HTTP requests, defer non-critical JS, optimize Liquid rendering, and compress assets to get your mobile store loading in under 2 seconds."
    },
    {
        question: "Do you support Headless Shopify development?",
        answer: "Yes. For brands needing complete frontend freedom, we build Headless stacks using Hydrogen, Next.js, or Gatsby, connecting to Shopify's backend via the Storefront API for the ultimate flexible experience."
    },
    {
        question: "What maintenance does a Shopify store need?",
        answer: "While Shopify hosts the server, your store needs 'app hygiene', theme updates, and ongoing CRO (Conversion Rate Optimization). We provide monthly retainers to handle feature drops, API updates, and speed checks."
    }
];

// --- Animations & Config ---
const TRANSITION_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];
const contentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.98, zIndex: 2,
  }),
  center: {
    zIndex: 2, x: 0, opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
  exit: (direction: number) => ({
    zIndex: 1, x: direction < 0 ? 80 : -80, opacity: 0, scale: 0.98,
    transition: { duration: 0.5, ease: TRANSITION_EASE },
  }),
};
const orbOneVariants: Variants = {
  animate: {
    y: [0, -50, 0], x: [0, 30, 0], scale: [1, 1.1, 1],
    transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
  },
};
const orbTwoVariants: Variants = {
  animate: {
    y: [0, 60, 0], x: [0, -40, 0], scale: [1, 1.2, 1],
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
  },
};

interface WPPost {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    _embedded?: {
      'wp:featuredmedia'?: Array<{ source_url: string }>;
      'wp:term'?: Array<Array<{ name: string }>>; 
    };
}

// --- COMPONENT START ---
export default function ShopifyEcommerce() {
  const navigate = useNavigate();

  const [openStandard, setOpenStandard] = useState<string | null>("LIQUID");
  
  const [[page, direction], setPage] = useState([0, 0]);
  const cardControls = useAnimation();
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [blogPosts, setBlogPosts] = useState<WPPost[]>([]);
  const blogSliderRef = useRef<HTMLDivElement>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const feedbackIndex = ((page % FEEDBACKS.length) + FEEDBACKS.length) % FEEDBACKS.length;
  const currentFeedback = FEEDBACKS[feedbackIndex];

  useEffect(() => {
    FEEDBACKS.forEach((item) => {
      const img = new Image(); img.src = item.imgSrc;
      if (item.logoSrc) { const logo = new Image(); logo.src = item.logoSrc; }
    });

    // Kept the blog fetch as-is (assuming general tech/ecommerce blogs are here)
    const fetchBlogs = async () => {
        try {
            const res = await fetch('https://blogs.codenest.us.com/wp-json/wp/v2/posts?_embed&per_page=6');
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setBlogPosts(data);
        } catch (error) {
            console.error("Error loading blogs:", error);
        } finally {
            setLoadingBlogs(false);
        }
    };
    fetchBlogs();
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    cardControls.start({
      scale: [0.98, 1], y: [6, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [page, cardControls]);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -80) { paginate(1); } 
    else if (swipe > 100 || offset.x > 80) { paginate(-1); }
  };

  const toggleFaq = (index: number) => {
      setOpenFaqIndex(prev => prev === index ? null : index);
  }

  const scrollBlogSlider = (direction: 'left' | 'right') => {
    if (blogSliderRef.current) {
        const scrollAmount = 450;
        if (direction === 'left') {
            blogSliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            blogSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <PageWrapper>
      {/* --- 1. HERO SECTION --- */}
      <HeroSection>
        <HeroInner>
          <HeroContent>
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Shopify E-commerce</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Shopify <br /> development service</motion.h1>
            <ButtonGroup>
              <MainBtn>Get an Estimate</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Build high-converting, scalable, and custom-branded stores using Shopify Plus and Headless frameworks.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Clutch</span><div className="stars">★★★★★ <span className="val">4.9 / 5</span></div></RatingItem>
              <RatingItem><span className="brand">GoodFirms</span><div className="stars">★★★★★ <span className="val">5 / 5</span></div></RatingItem>
              <RatingItem><span className="brand">( Shopify Partners )</span><div className="stars">★★★★★ <span className="val">10 / 10</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          {/* Changed Graphic Colors slightly conceptually, but keeping structure */}
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Shopify Audit & Optimize</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Get a complete <br /> e-commerce store <br /> analysis to <br /> unlock growth</motion.h2>
          <RightContentBlock>
            <p>Our audit scans your store for app bloat, unoptimized Liquid code, and UX friction. We provide clear technical fixes to boost your conversion rate and Average Order Value.</p>
            <BlueButtonGroup><BlueTextBtn>Audit my store performance now</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Development standards <br /> applied by our <br /> Shopify experts</h2>
            <AccordionList>
                {SHOPIFY_STANDARDS.map((item) => (
                    <AccordionItem key={item.id} isOpen={openStandard === item.id}>
                        <div className="header" onClick={() => setOpenStandard(openStandard === item.id ? null : item.id)}>
                            <div className="btn-box">{openStandard === item.id ? '-' : '+'}</div>
                            <h3>{item.title}</h3>
                        </div>
                        <AnimatePresence>
                            {openStandard === item.id && (
                                <motion.div className="content-body" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                                    <p>{item.desc}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </AccordionItem>
                ))}
            </AccordionList>
        </StandardsInner>
      </StandardsContainer>

      {/* --- 4. WHAT TO EXPECT --- */}
      <GridSection>
        <SectionHeader white>What to expect</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Codebase Purity", desc: "Clean, modular Liquid code with zero reliance on unnecessary 3rd party apps." },
            { id: "02.", title: "Mobile Velocity", desc: "Focus on sub-second interactions for mobile shoppers to prevent bounce." },
            { id: "03.", title: "Secure Checkout", desc: "Customized Plus checkout experiences ensuring safety and branding consistency." },
            { id: "04.", title: "Admin Simplicity", desc: "Store setup designed for easy inventory and content management by your team." },
            { id: "05.", title: "Sections Everywhere", desc: "Utilizing Shopify 2.0 standards for drag-and-drop flexibility across all pages." },
            { id: "06.", title: "Scalable Architecture", desc: "Infrastructure ready to handle traffic spikes like Black Friday with ease." }
          ].map((item, i) => (
            <DogEarCard key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="card-num">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </DogEarCard>
          ))}
        </CardsGrid>
      </GridSection>

      {/* --- 5. BENEFITS GRID --- */}
      <BenefitsContainer>
        <div className="title-wrapper">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Why choose our custom <br /> Shopify solutions?
          </motion.h2>
        </div>

        <BenefitsGridWrapper>
          {BENEFITS_DATA.map((benefit, index) => (
            <BenefitCell key={index} index={index} isLeft={index % 2 === 0}>
              <div className="icon-row">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill={COLORS.coaxBlue}/>
                 </svg>
              </div>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </BenefitCell>
          ))}
        </BenefitsGridWrapper>
      </BenefitsContainer>

      {/* --- 6. WHY CHOOSE CODE NEST --- */}
      <BlueCardSection>
        <motion.h2
            className="centered-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
          Why choose Code Nest for your <br /> E-commerce Growth?
        </motion.h2>
        <ChooseCardsGrid>
          {WHY_CHOOSE_CN_DATA.map((card, i) => (
              <WhyChooseCard key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                  <div className="card-index">{card.num}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.desc}</p>
              </WhyChooseCard>
          ))}
        </ChooseCardsGrid>
      </BlueCardSection>

      {/* --- 7. SELF ASSESSMENT BANNER --- */}
      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.8" />
                <path d="M-40 200 C40 200, 100 140, 100 0" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.6" />
                <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" fill="transparent" />
              </svg>
            </DecoCircles>

            <BannerText>Want to check your store health?</BannerText>
            
            <DownloadBtn>
              Download E-commerce CRO checklist
              <ArrowDown size={18} style={{ marginLeft: "auto", color: '#000' }} /> 
            </DownloadBtn>

            <DecoStar>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </DecoStar>
          </BannerContent>
        </BannerWrapper>
      </PageSevenContainer>

      {/* --- 8. CLIENT FEEDBACK --- */}
      <Section8>
        <BackgroundWrapper>
          <GridOverlay />
          <OrbOne variants={orbOneVariants} animate="animate" />
          <OrbTwo variants={orbTwoVariants} animate="animate" />
        </BackgroundWrapper>

        <Container8>
          <HeaderWrapper>
            <SubHeader>CodeNest Philosophy</SubHeader>
            <HeaderTitle>What our merchants say</HeaderTitle>
            <HeaderDesc>
              Partnering with brands to drive sales through superior technology and design.
            </HeaderDesc>
          </HeaderWrapper>

          <SliderWrapper>
            <StackLayerOne />
            <StackLayerTwo />

            <CardWindow>
              <CardFrame animate={cardControls}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <InnerGrid
                    key={page}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.05}
                    onDragEnd={handleDragEnd}
                  >
                    <ImageSide>
                      {currentFeedback.logoSrc && (
                        <LogoOverlay src={currentFeedback.logoSrc} alt="logo" />
                      )}
                      <ProfileImg
                        src={currentFeedback.imgSrc}
                        alt={currentFeedback.name}
                        draggable="false"
                      />
                    </ImageSide>

                    <ContentSide>
                      <ServiceTag>{currentFeedback.serviceTag}</ServiceTag>
                      <QuoteIcon>“</QuoteIcon>
                      <QuoteText>{currentFeedback.quote}</QuoteText>

                      <AuthorBlock>
                        <AuthorName>{currentFeedback.name}</AuthorName>
                        <AuthorRole>{currentFeedback.role}</AuthorRole>
                        <AuthorCompany>{currentFeedback.company}</AuthorCompany>
                      </AuthorBlock>

                      {currentFeedback.ctaText && (
                        <CtaButton>
                          {currentFeedback.ctaText}
                          <ArrowRight size={14} style={{ marginLeft: 6 }} />
                        </CtaButton>
                      )}
                    </ContentSide>
                  </InnerGrid>
                </AnimatePresence>
              </CardFrame>
            </CardWindow>

            <Controls>
              <NavBtn onClick={() => paginate(-1)}>
                <ChevronLeft size={20} />
              </NavBtn>
              <NavBtn onClick={() => paginate(1)}>
                <ChevronRight size={20} />
              </NavBtn>
            </Controls>
          </SliderWrapper>
        </Container8>
      </Section8>

      {/* --- 9. HOW AUDIT WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How our optimization process works
           </motion.h2>

           <ProcessGrid>
              {AUDIT_STEPS.map((step, idx) => (
                <ProcessCard 
                  key={idx} 
                  idx={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <IconBox>{step.icon}</IconBox>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </ProcessCard>
              ))}
           </ProcessGrid>
        </AuditContainer>
      </AuditProcessSection>

      {/* --- 10. PROMO BANNER & FAQ --- */}
      <PageTenSection>
        <PageTenInner>
            <CTABanner10>
                 <BannerContent10>
                    <DecoCircles>
                         <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                            <path d="M-20 180 C50 180, 80 120, 80 60" stroke={COLORS.lime} strokeWidth="3" opacity="0.8" />
                            <path d="M-40 200 C40 200, 100 140, 100 0" stroke={COLORS.lime} strokeWidth="3" opacity="0.6" />
                            <circle cx="80" cy="180" r="60" stroke={COLORS.lime} strokeWidth="2" opacity="0.5" />
                         </svg>
                    </DecoCircles>
                    <BannerTitle10>
                        Don't lose customers <br /> get expert help
                    </BannerTitle10>
                    <ConsultBtn>
                        Book a Shopify consultation 
                        <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> 
                    </ConsultBtn>
                    <DecoStar>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                             <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </DecoStar>
                 </BannerContent10>
            </CTABanner10>

            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft>
                        <h2>Common questions <br /> about our Shopify services</h2>
                    </FAQLeft>
                    <FAQRight>
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem 
                                key={index} 
                                isOpen={openFaqIndex === index}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="q-header">
                                    <h3>{item.question}</h3>
                                    <div className="icon-box">
                                        {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {openFaqIndex === index && (
                                        <motion.div 
                                            className="a-body"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <p>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </FAQItem>
                        ))}
                    </FAQRight>
                </FAQContent>
            </FAQSectionWrapper>
        </PageTenInner>
      </PageTenSection>

      {/* --- 11. BLOG SLIDER --- */}
      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper>
                <BlogTitle>
                  E-commerce Insights<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Check our blog <ArrowUpRight size={32} />
                  </BlogLink>
                </BlogTitle>
             </BlogHeaderWrapper>

             {loadingBlogs ? (
               <div style={{ textAlign: "center", padding: "40px", color: COLORS.textGray }}>
                   Loading Articles...
               </div>
             ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                               || 'https://via.placeholder.com/600x400?text=No+Image';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights';
                           
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img">
                                   <img src={featuredImg} alt={post.title.rendered} />
                                </div>
                                <div className="card-content">
                                   <span className="tag">{category}</span>
                                   <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                   <span className="date">{formatDate(post.date)}</span>
                                </div>
                              </BlogCard>
                           );
                       })}
                    </BlogCardsContainer>

                    <SliderControls>
                       <SliderButton onClick={() => scrollBlogSlider('left')}><ArrowLeft size={20}/></SliderButton>
                       <SliderButton onClick={() => scrollBlogSlider('right')}><ArrowRight size={20}/></SliderButton>
                    </SliderControls>
                 </BlogSliderOuter>
             )}
          </BlogContainer>
      </BlogSection>
    </PageWrapper>
  );
};

// ==========================================
// STYLES (Identical to WordPressSolutions)
// ==========================================
const PageWrapper = styled.div`
  background: white; 
  overflow-x: hidden;
`;

/* Hero */
const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; 
  color: white; 
  padding: 100px 10%; 
  margin-top: -80px; 
  min-height: 85vh; 
  display: flex; 
  align-items: center;

    @media (max-width: 600px) {
       font-size: 42px;
       letter-spacing: -1.5px;
`;
const HeroInner = styled.div`
  max-width: 1440px; 
  margin: 0 auto; 
  width: 100%; 
  display: grid; 
  grid-template-columns: 1.1fr 0.9fr; 
  gap: 50px;
   h1 { 
    color: #ffffff;
    font-size: clamp(50px, 6.5vw, 92px); 
    line-height: 1.05; 
    letter-spacing: -2px; 

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;
const HeroContent = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
  h1 { 
    font-size: clamp(50px, 6.5vw, 92px); 
    line-height: 1.05; 
    letter-spacing: -2px; 
    /* Mobile tweaks */
    @media (max-width: 600px) {
       font-size: 42px;
       letter-spacing: -1.5px;
    }
  }
`;
const Breadcrumbs = styled.div`
  font-size: 13px; 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  .star { color: ${COLORS.starGold}; } 
  a { color: white; text-decoration: none; opacity: 0.7; }
  flex-wrap: wrap; 
`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: white; margin-left: 8px; font-weight: 300; } } @media (max-width: 400px) { .brand { font-size: 18px; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

/* Intro */
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column; @media (max-width: 768px) { padding: 60px 24px; }`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div`
  display: grid; 
  grid-template-columns: 1.6fr 1fr; 
  gap: 100px; 
  align-items: flex-end; 
  .audit-heading { 
    font-size: clamp(40px, 4.4vw, 70px); 
    line-height: 1.05; 
    letter-spacing: -2px; 
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: flex-start;
  }
`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content; @media (max-width: 480px) { width: 100%; }`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer; @media (max-width: 480px) { width: 100%; text-align: left; }`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`;

/* Standards */
const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`
  max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; 
  .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } 
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }
  @media (max-width: 600px) { .section-title { font-size: 32px; letter-spacing: -1px; } }
`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; flex-shrink: 0; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; } @media (max-width: 600px) { .header { gap: 15px; h3 { font-size: 18px; } } .content-body p { padding-left: 39px; } }`;

/* Cards Section */
const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue}; @media (max-width: 768px) { padding: 80px 24px; }`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500; @media (max-width: 768px) { font-size: 32px; margin-bottom: 40px; }`;
const CardsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; 
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } 
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`;
const DogEarCard = styled(motion.div)`
  background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); 
  .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } 
  h3 { font-size: 24px; color: ${COLORS.textDark}; margin-bottom: 15px; } 
  p { font-size: 16px; line-height: 1.5; color: rgba(0,0,0,0.75); }
  @media (max-width: 600px) { min-height: auto; padding: 30px 24px 60px; }
`;

/* Benefits */
const BenefitsContainer = styled.section`
  padding: 140px 0; background-color: white; display: flex; flex-direction: column; 
  .title-wrapper { 
    padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; 
    h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } 
  }
  @media (max-width: 768px) { 
    padding: 80px 0; 
    .title-wrapper { padding: 0 24px; margin-bottom: 40px; text-align: left; }
  }
`;
const BenefitsGridWrapper = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; 
  border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  /* Laptop bottom row correction */
  &:nth-last-child(1), &:nth-last-child(2) { border-bottom: none; }
  
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } 
  p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; }

  @media (max-width: 900px) {
    /* Stack logic on mobile */
    padding: 50px 24px;
    border-right: none !important;
    border-bottom: 1px solid #eee !important;
    &:last-child { border-bottom: none !important; }
    /* Correct border reset from laptop logic */
    &:nth-last-child(2) { border-bottom: 1px solid #eee; }
  }
`;

/* Why Choose */
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; } @media (max-width: 768px) { padding: 80px 24px; .centered-header { text-align: left; align-self: flex-start; margin-bottom: 50px; } }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; } @media (max-width: 600px) { min-height: auto; padding: 30px 24px 60px; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%); }`;
const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M100 240 Q 100 80, 260 80 V 240 H 100 Z" fill="#2d60ff" />
    <rect x="220" y="240" width="80" height="200" fill={COLORS.lime} />
    <circle cx="160" cy="380" r="70" fill="#00d2ff" /><circle cx="380" cy="150" r="40" stroke={COLORS.lime} strokeWidth="15" />
  </motion.svg>
);

/* Page 7 */
const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif; @media (max-width: 600px) { padding: 40px 16px; }`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25); @media (max-width: 850px) { clip-path: none; border-radius: 12px; padding: 30px; }`;
const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 24px; padding: 40px 20px; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px; @media (max-width: 850px) { font-size: 28px; }`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000000; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s, background-color 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); min-width: 280px; &:hover { transform: translateY(-2px); background-color: #d9f99d; } @media (max-width: 600px) { width: 100%; min-width: auto; justify-content: space-between; }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; pointer-events: none; opacity: 0.9; z-index: 1; @media (max-width: 850px) { top: 20px; right: 20px; transform: scale(0.6); }`;

/* Page 8 (Feedback) */
const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; font-family: 'Inter', sans-serif; position: relative; @media (max-width: 850px) { padding: 80px 0 120px; }`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07; z-index: 2;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px); z-index: 1;`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px); z-index: 1;`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px; @media (max-width: 600px) { text-align: left; }`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; margin-bottom: 24px; line-height: 1.1; @media (max-width: 768px) { font-size: 32px; }`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; z-index: 0; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; border-radius: 4px;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); border-radius: 4px; overflow: hidden; @media (max-width: 850px) { clip-path: none; border-radius: 12px; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; will-change: transform, opacity; background-color: #ffffff; &:active { cursor: grabbing; } @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; height: auto; display: flex; flex-direction: column; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%; @media (max-width: 850px) { height: 280px; flex-shrink: 0; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; pointer-events: none;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; height: auto; object-fit: contain; z-index: 2; background: #fff; padding: 8px; border-radius: 4px; pointer-events: none; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start; @media (max-width: 850px) { padding: 30px 24px; }`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; text-transform: uppercase; color: #28a665; margin-bottom: 20px; letter-spacing: 0.5px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif; margin-bottom: 16px; opacity: 0.8;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; font-weight: 400; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start; transition: all 0.3s; box-shadow: 0 4px 15px rgba(11, 54, 61, 0.2); &:hover { background: #28a665; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(40, 166, 101, 0.3); }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20; @media (max-width: 850px) { bottom: -80px; }`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.05); &:hover { border-color: #28a665; background-color: #28a665; color: #ffffff; transform: scale(1.1); box-shadow: 0 6px 16px rgba(40, 166, 101, 0.4); }`;

/* Page 9 (Audit) */
const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD; font-family: 'Inter', sans-serif; @media (max-width: 800px) { padding: 80px 0 100px; }`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; .audit-title { font-size: clamp(38px, 4.5vw, 62px); font-weight: 400; text-align: center; color: #1a1b1e; letter-spacing: -1.5px; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; border-bottom: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; @media (max-width: 800px) { border-right: none; border-bottom: 1px solid ${COLORS.borderColor}; &:last-child { border-bottom: none; } padding: 40px 24px; } h3 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 500; margin-bottom: 24px; letter-spacing: -0.5px; } p { font-size: 16px; line-height: 1.6; color: ${COLORS.textGray}; font-weight: 400; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

/* Page 10 */
const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff; font-family: 'Inter', sans-serif; @media (max-width: 900px) { padding: 60px 0 100px; }`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px; @media (max-width: 900px) { gap: 60px; }`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; gap: 30px; text-align: center; @media (min-width: 850px) { flex-direction: row; text-align: left; justify-content: space-between; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px); max-width: 550px;`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); transform: translateY(-50%); pointer-events: none; z-index: 0;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: flex-start; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; letter-spacing: -1.5px; color: #1a1b1e; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; transition: color 0.3s; margin: 0; line-height: 1.5; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; flex-shrink: 0; width: 24px; height: 24px; border: 1px solid ${props => props.isOpen ? COLORS.coaxBlue : '#e0e0e0'}; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s; } } .a-body { overflow: hidden; p { margin-top: 24px; margin-bottom: 8px; font-size: 15px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 90%; } } &:hover .icon-box { border-color: ${COLORS.coaxBlue}; color: ${COLORS.coaxBlue}; }`;

/* Page 11 (Blog) */
const BlogSection = styled.div`
  background-color: #f2f9f5;
  padding: 100px 0 120px;
  border-top: 1px solid #e1eadd;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  @media (max-width: 768px) { padding: 60px 0 80px; }
`;
const BlogContainer = styled.div`
  max-width: 1280px; 
  margin: 0 auto; 
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) { padding: 0 24px; }
`;
const BlogHeaderWrapper = styled.div` 
  margin-bottom: 60px; 
  text-align: center;
  width: 100%;
`;
const BlogTitle = styled.h2` 
  font-size: 48px; 
  font-weight: 600; 
  line-height: 1.1; 
  color: #1a1a1a; 
  margin: 0; 
  letter-spacing: -1px; 
  display: flex; 
  flex-direction: column;
  gap: 12px;
  @media (max-width: 768px) { font-size: 32px; } 
`;
const BlogLink = styled.span`
  color: ${COLORS.coaxBlue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: gap 0.2s ease;
  cursor: pointer;
  outline: none;
  &:hover { gap: 16px; }
  svg { transform: translateY(2px); }
`;
const BlogSliderOuter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
const BlogCardsContainer = styled.div`
  display: flex; 
  gap: 30px; 
  overflow-x: auto; 
  scroll-behavior: smooth; 
  width: 100%; 
  padding: 20px 20px 40px; 
  -ms-overflow-style: none; scrollbar-width: none; 
  &::-webkit-scrollbar { display: none; }
`;
const BlogCard = styled.div` 
  min-width: 450px; 
  background: white; 
  display: flex; 
  height: 260px; 
  border-radius: 16px; 
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
  border: 1px solid transparent;
  transition: all 0.3s ease; 
  cursor: pointer; 
  flex-shrink: 0;

  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px rgba(40, 166, 101, 0.15); 
    border-color: ${COLORS.lime};
  } 

  .card-img { 
     width: 40%; 
     background: #f1f1f1; 
     overflow: hidden;
     position: relative;
     
     img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  } 
  
  &:hover .card-img img { transform: scale(1.05); }

  .card-content { 
      width: 60%; 
      padding: 30px; 
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: flex-start; 
  } 
  
  .tag { 
    background: #e6f7ee; 
    color: #28a665; 
    font-size: 11px; 
    font-weight: 700; 
    text-transform: uppercase; 
    letter-spacing: 0.5px;
    padding: 6px 12px; 
    border-radius: 6px; 
    margin-bottom: 16px; 
  } 
  
  h3 { 
      font-size: 20px; 
      font-weight: 700; 
      color: #111; 
      margin: 0 0 16px 0; 
      line-height: 1.4; 
      transition: color 0.2s;
  } 
  
  &:hover h3 { color: #28a665; }

  .date { font-size: 13px; color: #999; margin-top: auto; } 

  /* Mobile Stack */
  @media (max-width: 600px) { 
    min-width: 85vw;
    flex-direction: column; 
    height: auto; 
    
    .card-img { width: 100%; height: 200px; } 
    .card-content { width: 100%; padding: 24px; } 
  } 
`;
const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` 
  width: 56px; height: 56px; border-radius: 50%;
  border: 1px solid #e1eadd; background: white; color: #111; 
  display: flex; align-items: center; justify-content: center; 
  cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  &:hover { background: #28a665; border-color: #28a665; color: white; transform: scale(1.1); box-shadow: 0 8px 20px rgba(40, 166, 101, 0.3); } 
`;
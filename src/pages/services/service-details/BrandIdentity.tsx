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
 * BRAND IDENTITY & LOGO DESIGN - SERVICE DETAIL PAGE
 * Path: /services/brand-identity-logo
 * Complexity: Standardized Agency Template (1050+ Line Preservation)
 */

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

// --- DATA ---
// Replacing WP_STANDARDS with Branding Core Standards
const WP_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Brand Geometric Ratios", 
    desc: "We utilize mathematical golden ratio principles and precise grid systems to ensure every logo mark maintains perfect visual balance and scalability." 
  },
  { 
    id: "BLOCK", 
    title: "Typography & Hierarchies", 
    desc: "Modern typography engineering following legibility standards for high-resolution screens and traditional print media applications." 
  },
  { 
    id: "SECURITY", 
    title: "Visual Integrity Audits", 
    desc: "Protocol-driven contrast and accessibility checks to ensure brand identity assets remain WCAG compliant and visible across all platforms." 
  },
  { 
    id: "CWV", 
    title: "Vector Fidelity Standards", 
    desc: "Every design deliverable is engineered for speed, providing SVG assets that remain lightweight while supporting infinitely scalable complexity." 
  }
];

// Replacing WP_BENEFITS with Branding Benefits
const BENEFITS_DATA = [
  {
    title: "Strategic visual differentiation",
    desc: "A custom brand identity cuts through market saturation. By analyzing competitive visual landscapes, we engineer a unique aesthetic that ensures instant brand recognition and psychological dominance in your niche."
  },
  {
    title: "Unified ecosystem architecture",
    desc: "Brands fail through fragmentation. Our system-first approach provides design tokens and cohesive stylesheets that align your digital presence, physical marketing, and social media footprints into a single source of truth."
  },
  {
    title: "Scalable brand equity",
    desc: "We build intuitive design systems specifically for your growth. This means your creative team can generate thousands of new assets using established master guides, without ever diluting the brand's original integrity."
  },
  {
    title: "Conversion-optimized visuals",
    desc: "Our designs aren't just art; they are tools for persuasion. Whether it's the psychological impact of color choice or the directionality of an icon, every element is designed to lead the user toward a specific brand action."
  },
  {
    title: "Reduced design debt",
    desc: "Ad-hoc design kills brands over time. We provide clean, standards-compliant design guides that are easy for internal teams to adopt. This cuts long-term agency costs and allows rapid pivots without a total rebrand."
  },
  {
    title: "Global cultural relevance",
    desc: "Scaling globally requires semiotic precision. We architect brand systems for cross-cultural compatibility, ensuring that symbolism, color palettes, and messaging resonate with diverse markets without causing friction."
  }
];

// Replacing WHY_CHOOSE_CN with Branding context
const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Deep Identity Research", 
    desc: "Our designers don't just sketch; we research. We dive into the semiotics of your industry to build symbols that communicate complex value propositions instantly." 
  },
  { 
    num: "/ 02", 
    title: "Native-Centric UX Design", 
    desc: "When we engineer a brand, we prioritize how it lives on mobile and web platforms. Our 'digital-first' methodology ensures that your brand thrives on 1-inch screens as well as 10-foot billboards." 
  },
  { 
    num: "/ 03", 
    title: "High-End Asset Tooling", 
    desc: "Our deliverables include dynamic design kits (Figma, SVG, EPS). We deploy modern file distribution pipelines that allow your team to access assets across time zones effortlessly." 
  },
  { 
    num: "/ 04", 
    title: "Visual Hierarchy Metrics", 
    desc: "We deliver sub-second brand comprehension. Our visual audits pinpoint 'eye-path' friction, providing a clear roadmap for creating landing pages and collateral that convert through better aesthetics." 
  },
  { 
    num: "/ 05", 
    title: "Proven Market Authority", 
    desc: "VC-backed startups and established Fortune 500 companies trust Code Nest Creative. They require partners who understand the direct link between visual prestige and higher investor valuation." 
  },
  { 
    num: "/ 06", 
    title: "Continuous Brand Evolution", 
    desc: "Identity isn't static. After delivery, Code Nest remains your creative partner, providing seasonal campaigns, sub-brand extensions, and regular audits to keep your visual language ahead of trends." 
  }
];

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

// Data pivot for Feedbacks
const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Aleksey Shevchenko",
    role: "Marketing Director at ZenSpace",
    company: "ZenSpace",
    quote: "Code Nest's approach to brand identity was more than just logo design; they built an entire visual operating system for our startup. We saw an immediate uptick in social engagement and partnership inquiries.",
    imgSrc: "https://via.placeholder.com/300x400?text=Aleksey", // Preserving structure
    serviceTag: "Brand Identity & Strategy",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Elena Ross",
    role: "Founder, Bloom Creative",
    company: "Bloom Creative",
    quote: "They turned our complex business values into a simple, iconic visual mark. Our identity is now recognized globally, and our conversion rate on marketing ads increased by 40% within the first quarter.",
    imgSrc: "https://via.placeholder.com/300x400?text=Elena",
    logoSrc: "https://via.placeholder.com/150x50?text=Logo",
    serviceTag: "Logo Engineering",
    ctaText: "View the Lookbook",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Managing Director",
    company: "Stellar Asset Group",
    quote: "Finding a design partner who understands financial trust and digital scalability is rare. Code Nest delivered a brand toolkit that we use daily for every pitch and client presentation.",
    imgSrc: "https://via.placeholder.com/300x400?text=Marcus",
    serviceTag: "Full Brand Systems",
    ctaText: "See the Guide",
  },
];

// Audit context for Branding
const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Identity landscape audit",
    desc: "We begin the process by mapping your current brand assets against modern aesthetic and performance standards. We identify visual inconsistencies, outdated iconography, and font redundancy to ensure your brand stands apart."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Core Semiotic Discovery",
    desc: "The heavy lifting. We explore colors, shapes, and cultural symbols that align with your brand's voice. We test these marks against competitor aesthetics to ensure maximum distinction and memorability."
  },
  {
    icon: <FileText size={28} />,
    title: "Asset Matrix Delivery",
    desc: "Final Brand Identity services conclude with an expansive report and asset cloud. From hi-res logo files to complete 'Brand Books' and social media kits, everything is categorized for instant team adoption—no more searching for 'LogoFinal_V2'."
  },
  {
    icon: <Headphones size={28} />,
    title: "Governance Partnership",
    desc: "Post-rebrand, we offer brand governance. We act as your external creative director, ensuring every piece of content—from slide decks to UI—follows the brand architecture as your organization evolves."
  }
];

// FAQ pivot
const FAQ_DATA = [
    {
        question: "What does a custom Brand Identity Audit cover?",
        answer: "It's not just a logo critique. We analyze color accessibility (WCAG), typography licensing, asset weight for web speed, and social media legibility. We show exactly where your visual presence is failing to project the prestige your service warrants."
    },
    {
        question: "How does Code Nest design differently from solo designers?",
        answer: "We treat design like software engineering. Our marks are built on rigorous geometric grids for responsive use. We don't just 'vibe'; we research market psychology and delivery technical assets ready for dev deployment, print production, or VR."
    },
    {
        question: "How long is a typical identity and logo project?",
        answer: "A comprehensive brand engineering sprint typically takes 4 to 8 weeks. This involves research, three rounds of exploration, feedback refinement, and the full generation of all identity guides and digital asset packages."
    },
    {
        question: "Will I own full rights to the logo and identity system?",
        answer: "Yes. Upon project completion and payment, you receive absolute transfer of all intellectual property. We provide you with high-level source files, ensuring you have complete autonomy over your visual future 24/7."
    },
    {
        question: "Can you refresh an existing brand without losing heritage?",
        answer: "Absolutely. We specialize in 'Brand Modernization' audits. We retain the recognizable 'DNA' of your legacy brand while upgrading the tech stack (fonts/vectors) and visual balance for a modern, digital-first marketplace."
    }
];

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

// COMPONENT EXPORT NAME UPDATED: BrandIdentity
export default function BrandIdentity() {
  const navigate = useNavigate();

  const [openStandard, setOpenStandard] = useState<string | null>("WPCS");
  
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
            {/* UPDATED BREADCRUMBS AND TITLE */}
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Brand Identity</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Brand Identity & <br /> Logo design service</motion.h1>
            <ButtonGroup>
              <MainBtn>Design My Brand</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Command respect and project visual prestige with engineering-led logo designs and comprehensive brand architectures.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Clutch</span><div className="stars">★★★★★ <span className="val">5 / 5</span></div></RatingItem>
              <RatingItem><span className="brand">Dribbble</span><div className="stars">★★★★★ <span className="val">Top Tier</span></div></RatingItem>
              <RatingItem><span className="brand">( NPS Score )</span><div className="stars">★★★★★ <span className="val">9.9 / 10</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Brand Intelligence Service</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Get a complete <br /> market-readiness <br /> brand identity audit <br /> for maximum impact</motion.h2>
          <RightContentBlock>
            <p>Our audit evaluates your existing assets against current industry aesthetics and visual trends. We identify cognitive friction in your identity and provide the blueprint to fix it.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze my current brand now</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Visual standards <br /> covered by our Identity <br /> engineers</h2>
            <AccordionList>
                {WP_STANDARDS.map((item) => (
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
        <SectionHeader white>Deliverable pipeline</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Logo Resilience", desc: "Crafting marks that maintain structural clarity from 16px to 100ft installations." },
            { id: "02.", title: "Color Psychology", desc: "Scientific color mapping based on consumer emotion and industry sector dominance." },
            { id: "03.", title: "Typography Stack", desc: "Selection of distinct, high-performance font pairs for cross-device readability." },
            { id: "04.", title: "Style Governance", desc: "Strict master documentation ensuring brand misuse is eliminated across teams." },
            { id: "05.", title: "Semiotic Purity", desc: "Clean icon sets that communicate your USP without needing a text explanation." },
            { id: "06.", title: "Market Evolution", desc: "Systems designed to allow your brand to age gracefully as your market matures." }
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
            Why choose our engineered <br /> Creative Identity solutions?
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
          Why choose Code Nest for your <br /> Brand's Visual future?
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

      {/* --- 7. SELF ASSESSMENT BANNER (PAGE 7) --- */}
      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.8" />
                <path d="M-40 200 C40 200, 100 140, 100 0" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.6" />
                <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" fill="transparent" />
              </svg>
            </DecoCircles>

            <BannerText>Want a free brand health check?</BannerText>
            
            <DownloadBtn>
              Download brand visual checklist
              <ArrowDown size={18} style={{ marginLeft: "auto", color: '#000' }} /> 
            </DownloadBtn>

            <DecoStar>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                 <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </DecoStar>
          </BannerContent>
        </BannerWrapper>
      </PageSevenContainer>

      {/* --- 8. CLIENT FEEDBACK (PAGE 8) --- */}
      <Section8>
        <BackgroundWrapper>
          <GridOverlay />
          <OrbOne variants={orbOneVariants} animate="animate" />
          <OrbTwo variants={orbTwoVariants} animate="animate" />
        </BackgroundWrapper>

        <Container8>
          <HeaderWrapper>
            <SubHeader>Visual Philosophy</SubHeader>
            <HeaderTitle>What partners say about our design logic</HeaderTitle>
            <HeaderDesc>
              Brand is perception. Our clients depend on our visual engineering to shape how 
              thousands of customers see their business every single hour.
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

      {/* --- 9. HOW BRAND AUDIT WORKS (PAGE 9) --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How our design sprint works
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

      {/* --- 10. PROMO BANNER & FAQ (PAGE 10) --- */}
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
                        Stand apart today — get <br /> a brand refresh 
                    </BannerTitle10>
                    <ConsultBtn>
                        Start Creative Session 
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
                        <h2>Strategic brand <br /> inquiries & logic</h2>
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

      {/* --- 11. BLOG SLIDER (PAGE 11) --- */}
      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper>
                <BlogTitle>
                  Explore brand case studies<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Our creative thoughts <ArrowUpRight size={32} />
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
                               || 'https://via.placeholder.com/600x400?text=Branding+Case';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Identity';
                           
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
// STYLES (EXACT 1:1 REPRODUCTION)
// ==========================================

const PageWrapper = styled.div`
  background: white; 
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; 
  color: white; 
  padding: 100px 10%; 
  margin-top: -80px; 
  min-height: 85vh; 
  display: flex; 
  align-items: center;
    @media (max-width: 600px) { font-size: 42px; letter-spacing: -1.5px; }
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
  }
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
    @media (max-width: 600px) { font-size: 42px; letter-spacing: -1.5px; }
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

const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`
  max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; 
  .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } 
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }
`;

const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; flex-shrink: 0; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; }`;

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
`;

const BenefitsContainer = styled.section`
  padding: 140px 0; background-color: white; display: flex; flex-direction: column; 
  .title-wrapper { 
    padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; 
    h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } 
  }
`;

const BenefitsGridWrapper = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; 
  border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  &:nth-last-child(1), &:nth-last-child(2) { border-bottom: none; }
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } 
  p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; }
`;

const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; }`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    {/* Identity themed geometric paths */}
    <path d="M50 50 L 200 50 L 200 200 Z" fill={COLORS.lime} />
    <path d="M300 300 Q 400 300, 400 450" stroke={COLORS.white} strokeWidth="15" fill="none" />
    <circle cx="250" cy="250" r="80" stroke={COLORS.lime} strokeWidth="10" fill="transparent" />
  </motion.svg>
);

const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif;`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;`;

const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000000; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; min-width: 280px; &:hover { background-color: #d9f99d; }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; opacity: 0.9; z-index: 1; @media (max-width: 850px) { top: 20px; right: 20px; transform: scale(0.6); }`;

const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; position: relative;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07; z-index: 2;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; margin-bottom: 24px; line-height: 1.1;`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;

const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;

const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); border-radius: 4px; overflow: hidden; @media (max-width: 850px) { clip-path: none; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; background-color: #ffffff; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; object-position: top center; pointer-events: none;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; height: auto; object-fit: contain; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start;`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; text-transform: uppercase; color: #28a665; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif; margin-bottom: 16px;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start;`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; border-radius: 50%; &:hover { border-color: #28a665; background-color: #28a665; color: #ffffff; transform: scale(1.1); }`;

const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; .audit-title { font-size: clamp(38px, 4.5vw, 62px); font-weight: 400; text-align: center; color: #1a1b1e; letter-spacing: -1.5px; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; border-bottom: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; h3 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 500; margin-bottom: 24px; } p { font-size: 16px; line-height: 1.6; color: ${COLORS.textGray}; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff; @media (max-width: 900px) { padding: 60px 0 100px; }`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; gap: 30px; @media (min-width: 850px) { justify-content: space-between; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px); max-width: 550px;`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;

const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); pointer-events: none;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; letter-spacing: -1.5px; color: #1a1b1e; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; transition: color 0.3s; margin: 0; line-height: 1.5; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; flex-shrink: 0; width: 24px; height: 24px; border: 1px solid ${props => props.isOpen ? COLORS.coaxBlue : '#e0e0e0'}; display: flex; align-items: center; justify-content: center; border-radius: 4px; } } .a-body { overflow: hidden; p { margin-top: 24px; font-size: 15px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 90%; } }`;

const BlogSection = styled.div`
  background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd; overflow: hidden;
`;
const BlogContainer = styled.div`
  max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center;
`;
const BlogHeaderWrapper = styled.div` margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2` 
  font-size: 48px; font-weight: 600; line-height: 1.1; color: #1a1a1a; margin: 0; display: flex; flex-direction: column; gap: 12px;
`;
const BlogLink = styled.span`
  color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; justify-content: center; gap: 12px; transition: gap 0.2s ease; cursor: pointer;
`;
const BlogSliderOuter = styled.div` display: flex; flex-direction: column; align-items: center; width: 100%; `;
const BlogCardsContainer = styled.div`
  display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; scrollbar-width: none; 
  &::-webkit-scrollbar { display: none; }
`;
const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; flex-shrink: 0;
  &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } 
  .card-img { width: 40%; background: #f1f1f1; img { width: 100%; height: 100%; object-fit: cover; } } 
  .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; } 
  .tag { background: #e6f7ee; color: #28a665; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; } 
  h3 { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 16px 0; line-height: 1.4; } 
  .date { font-size: 13px; color: #999; margin-top: auto; } 
  @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } .card-content { width: 100%; } } 
`;
const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` 
  width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: white; color: #111; 
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  &:hover { background: #28a665; border-color: #28a665; color: white; transform: scale(1.1); } 
`;

// End of BrandIdentity.tsx
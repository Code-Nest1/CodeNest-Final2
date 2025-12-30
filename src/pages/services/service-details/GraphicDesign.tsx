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
 * GRAPHIC DESIGN - SERVICE DETAIL PAGE
 * Path: /services/graphic-design
 * Logic: Exact duplicate of Master Service Template (TypeScript/React)
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
// Pivoted for Graphic Design Engineering Standards
const WP_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Gestalt Principles Application", 
    desc: "We apply the laws of proximity, similarity, and continuity to every design to ensure natural eye-tracking and immediate information processing." 
  },
  { 
    id: "BLOCK", 
    title: "Grayscale Integrity Testing", 
    desc: "Every design is first tested in grayscale to ensure that visual hierarchy and contrast function purely on layout strength, not just color theory." 
  },
  { 
    id: "SECURITY", 
    title: "Universal Scale Protocol", 
    desc: "Strict adherence to vector-first workflows that allow for infinite scalability without loss of raster fidelity for print or large-scale digital." 
  },
  { 
    id: "CWV", 
    title: "Accessibility (WCAG) Color Logic", 
    desc: "We verify every visual asset against AA/AAA accessibility standards for color contrast, ensuring inclusivity for all audience demographics." 
  }
];

// Pivoted for Graphic Design Benefits
const BENEFITS_DATA = [
  {
    title: "Visual narrative alignment",
    desc: "Design is your loudest form of silent communication. Our engineered layouts ensure your complex messaging is condensed into striking visuals that resonate instantly with your specific audience segments."
  },
  {
    title: "Optimized digital performance",
    desc: "Traditional graphic agencies deliver heavy files. Code Nest delivers optimized assets. We design for speed, ensuring our high-resolution graphics don't bloat your web page performance or lead to higher bounce rates."
  },
  {
    title: "Consistent collateral ecosystem",
    desc: "We build templates, not just one-offs. By establishing a rigid graphic system, your brand collateral—from PDFs to digital ads—will maintain the exact same quality and personality, regardless of the designer in charge."
  },
  {
    title: "Psychology-backed engagement",
    desc: "Our design choices are informed by data, not just aesthetics. We utilize heat-mapping studies to determine where to place graphic anchors that lead a customer toward your primary Call-to-Action (CTA)."
  },
  {
    title: "Cost-efficient asset production",
    desc: "Poor graphic engineering creates technical debt in your design library. We provide modular asset kits that can be reconfigured easily, drastically reducing the cost of creating future marketing materials and campaigns."
  },
  {
    title: "Cross-platform visual stability",
    desc: "We account for display variations. Whether your customer views your graphics on a high-retina iPad, an AMOLED smartphone, or a glossy printed brochure, the colors and legibility remain chemically precise."
  }
];

// Pivoted for Why Choose Code Nest Design
const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Strategic Design Workflows", 
    desc: "Our team operates like engineers. We use data and market insights to build visual solutions that aren't just pretty, but functional for achieving your KPIs." 
  },
  { 
    num: "/ 02", 
    title: "Modular Layout Libraries", 
    desc: "We don't just deliver graphics; we deliver systems. Our approach involves building reusable component libraries for your graphics team to ensure long-term design efficiency." 
  },
  { 
    num: "/ 03", 
    title: "Full Tech Stack Fluency", 
    desc: "Our designers work in Figma, Illustrator, and Motion. We export clean assets that developers love, ensuring your final website or app looks exactly like the high-end mockup." 
  },
  { 
    num: "/ 04", 
    title: "Retention-Focused Visuals", 
    desc: "High-quality graphic design reduces churn. We build 'scroll-stopping' graphics for social media and web pages that capture attention within the critical first 3 seconds." 
  },
  { 
    num: "/ 05", 
    title: "Trusted Portfolio Depth", 
    desc: "From complex B2B diagrams to high-fashion retail ads, we have designed across a massive spectrum of industries. We know how to adapt tone and style to fit any corporate vertical." 
  },
  { 
    num: "/ 06", 
    title: "Continuous Creative Feedback", 
    desc: "Design is a conversation. We operate on agile sprints with transparent feedback loops, ensuring that you are involved in every major visual pivot from moodboard to final delivery." 
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

// Data pivot for Graphic Design Feedbacks
const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Thomas Greyscale",
    role: "Head of Marketing at VisionLink",
    company: "VisionLink",
    quote: "The graphic output from Code Nest is exceptional. They didn't just design flyers; they revamped our entire digital communication strategy with a set of modular visual components.",
    imgSrc: "https://via.placeholder.com/300x400?text=Thomas",
    serviceTag: "Digital Graphic Systems",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Samantha Wright",
    role: "COO, Flow State Apps",
    company: "Flow State Apps",
    quote: "The speed at which their team produced high-fidelity graphics for our app store presence was impressive. The assets were perfectly sized, retina-ready, and significantly improved our conversion.",
    imgSrc: "https://via.placeholder.com/300x400?text=Samantha",
    logoSrc: "https://via.placeholder.com/150x50?text=FlowState",
    serviceTag: "Visual App Assets",
    ctaText: "See Assets",
  },
  {
    id: 3,
    name: "Jeremy Thorne",
    role: "Art Director",
    company: "Core Media",
    quote: "Finding an agency that understands vector math and typographic rhythm as well as Code Nest is a relief. They've become our primary creative extension for every major campaign.",
    imgSrc: "https://via.placeholder.com/300x400?text=Jeremy",
    serviceTag: "Complex Ad Campaigns",
    ctaText: "Explore the Art",
  },
];

// Audit context for Graphic Design
const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Visual Asset Inventory",
    desc: "We kick off with a thorough inventory of your current graphic footprint. We evaluate file types, resolutions, and styling inconsistencies across all touchpoints—social, web, and physical print."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Aesthetic Coherence Test",
    desc: "Here we look for brand drift. We analyze how well your graphics speak the same language. If your social ads look like a different brand than your sales deck, we pinpoint the precise deviation points."
  },
  {
    icon: <FileText size={28} />,
    title: "Technical Delivery Audit",
    desc: "Your Code Nest audit results in a Technical Readiness report. We flag non-vector logos, improper font pairings, and color spaces that don't translate across digital displays correctly."
  },
  {
    icon: <Headphones size={28} />,
    title: "Creative Roadmapping",
    desc: "Post-audit, we provide a structured roadmap to rebuild your graphic ecosystem. From priority UI asset updates to creating a brand new set of iconography, we give you the steps to win visually."
  }
];

// FAQ pivot for Graphic Design
const FAQ_DATA = [
    {
        question: "Do you provide original source files?",
        answer: "Always. We provide full access to Adobe Creative Cloud source files (PSD, AI, INDD) or Figma files, ensuring you have total ownership and the ability to make small adjustments internally if necessary."
    },
    {
        question: "How do you handle visual revisions?",
        answer: "We utilize a tiered revision protocol. Our projects include 3-round standard revision cycles based on the initial moodboard alignment. This keeps the timeline moving and the quality at peak levels."
    },
    {
        question: "What is the difference between design and graphic engineering?",
        answer: "Typical design focuses on looks. Graphic engineering focuses on longevity, performance, and cross-platform logic. Our files are organized with proper layers, named styles, and optimized exports for sub-second web loads."
    },
    {
        question: "Can you design for both print and digital simultaneously?",
        answer: "Yes. Our masters are set up with global color swatches that account for CMYK (Print) and RGB/Hex (Digital) variations, ensuring that your corporate red looks exactly the same in hand as it does on screen."
    },
    {
        question: "How long is a typical campaign graphic sprint?",
        answer: "Sprints can range from 2 to 4 weeks depending on the volume of assets. We utilize Kanban tracking so you can see exactly which graphic is in the 'sketch,' 'revision,' or 'exported' stage at all times."
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

// COMPONENT EXPORT: GraphicDesign
export default function GraphicDesign() {
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
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Graphic Design</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Graphic & Visual <br /> design service</motion.h1>
            <ButtonGroup>
              <MainBtn>Get Creative Work</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>From stunning ad creatives to complex infographics, we build visuals that communicate and convert with precision engineering.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Behance</span><div className="stars">★★★★★ <span className="val">Featured Work</span></div></RatingItem>
              <RatingItem><span className="brand">Dribbble</span><div className="stars">★★★★★ <span className="val">Top Creative</span></div></RatingItem>
              <RatingItem><span className="brand">( NPS Score )</span><div className="stars">★★★★★ <span className="val">9.8 / 10</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Creative Health Service</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Get a complete <br /> professional visual <br /> graphic audit to <br /> maximize attention</motion.h2>
          <RightContentBlock>
            <p>Our audit maps your entire visual language. We find the aesthetic gaps and performance bottlenecks in your current design library and offer fixed deliverables to upgrade your look.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze my graphic assets now</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Design standards <br /> covered by our Creative <br /> specialists</h2>
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
        <SectionHeader white>Service outputs</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Typographic Flow", desc: "Setting the correct font-pairing rhythm for maximum user attention span." },
            { id: "02.", title: "Grid Consistency", desc: "Hard-coding layout rules that make every slide or page feel cohesive." },
            { id: "03.", title: "Retina Asset Lab", desc: "Providing multi-resolution files for perfectly crisp display on any pixel density." },
            { id: "04.", title: "Commercial Art", desc: "Strategic illustration and design intended to generate ROI in campaigns." },
            { id: "05.", title: "Graphic Motion", desc: "Integrated design logic that accounts for how elements will animate in dev." },
            { id: "06.", title: "Vector Permanence", desc: "Infinite scaling capability for everything from biz cards to office signage." }
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
            Why choose our engineered <br /> Graphic Design solutions?
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
          Why choose Code Nest for your <br /> Global Design production?
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
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.8" />
                <path d="M-40 200 C40 200, 100 140, 100 0" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.6" />
                <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" fill="transparent" />
              </svg>
            </DecoCircles>

            <BannerText>Evaluate your visual coherence now?</BannerText>
            
            <DownloadBtn>
              Download the 20-Point Design Checklist
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
            <SubHeader>Visual Prowess</SubHeader>
            <HeaderTitle>What partners say about Code Nest</HeaderTitle>
            <HeaderDesc>
              Engineering-first design is what separates successful brands from 
              temporary startups. We help you project authority through high-end pixels.
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

      {/* --- 9. HOW DESIGN SPRINT WORKS (PAGE 9) --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How our design logic flows
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
                        Design for ROI — start <br /> project today
                    </BannerTitle10>
                    <ConsultBtn>
                        Start Your Project 
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
                        <h2>In-depth creative <br /> Q&A and delivery logic</h2>
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
                  Deep dive into visual culture<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Our visual insights <ArrowUpRight size={32} />
                  </BlogLink>
                </BlogTitle>
             </BlogHeaderWrapper>

             {loadingBlogs ? (
               <div style={{ textAlign: "center", padding: "40px", color: COLORS.textGray }}>
                   Loading Design Posts...
               </div>
             ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                               || 'https://via.placeholder.com/600x400?text=Design+Insights';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Creativity';
                           
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
// STYLES (REPRODUCTION)
// ==========================================

const PageWrapper = styled.div`
  background: white; 
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;
`;

const HeroInner = styled.div`
  max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px;
  h1 { color: #ffffff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; }
`;

const HeroContent = styled.div`
  display: flex; flex-direction: column; gap: 30px; 
  h1 { font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; @media (max-width: 600px) { font-size: 42px; } }
`;

const Breadcrumbs = styled.div`
  font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; text-decoration: none; opacity: 0.7; }
`;

const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; } .stars { color: ${COLORS.starGold}; .val { color: white; margin-left: 8px; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column;`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;

const LayoutGrid = styled.div`
  display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; 
  .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; align-items: flex-start; }
`;

const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;

const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`
  max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; 
  .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } 
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }
`;

const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; flex-shrink: 0; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; }`;

const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue}; @media (max-width: 768px) { padding: 80px 24px; }`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500; @media (max-width: 768px) { font-size: 32px; }`;

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
  .title-wrapper { padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; 
    h2 { font-size: clamp(40px, 4.5vw, 68px); color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; } }
`;

const BenefitsGridWrapper = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  &:nth-last-child(1), &:nth-last-child(2) { border-bottom: none; }
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } 
  p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; }
`;

const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); color: white; text-align: center; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; margin-bottom: 25px; } .card-text { font-size: 15.5px; line-height: 1.6; }`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    {/* Geometric Composition representing Graphic Logic */}
    <rect x="100" y="100" width="300" height="300" stroke={COLORS.lime} strokeWidth="1" fill="none" />
    <circle cx="250" cy="250" r="100" stroke={COLORS.lime} strokeWidth="20" fill="transparent" />
    <line x1="100" y1="100" x2="400" y2="400" stroke={COLORS.lime} strokeWidth="2" />
    <line x1="400" y1="100" x2="100" y2="400" stroke={COLORS.lime} strokeWidth="2" />
  </motion.svg>
);

const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif;`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;`;

const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 40px; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; padding: 18px 28px; border-radius: 2px; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; min-width: 280px; &:hover { background-color: #d9f99d; }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; z-index: 1; @media (max-width: 850px) { top: 20px; right: 20px; transform: scale(0.6); }`;

const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; position: relative;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; color: #09323b; margin-bottom: 24px;`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;

const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;

const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { clip-path: none; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; background-color: #ffffff; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; object-position: top center; pointer-events: none;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; margin-bottom: 16px;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; margin-left: 6px; &:before { content: "|"; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-weight: 600; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start;`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; border-radius: 50%; &:hover { background-color: #28a665; color: #ffffff; transform: scale(1.1); }`;

const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; h3 { color: ${COLORS.coaxBlue}; font-size: 26px; margin-bottom: 24px; } p { font-size: 16px; color: ${COLORS.textGray}; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff;`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`@media (min-width: 850px) { justify-content: space-between; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px);`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;

const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); pointer-events: none;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); letter-spacing: -1.5px; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; width: 24px; height: 24px; border: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; border-radius: 4px; } } .a-body { overflow: hidden; p { margin-top: 24px; font-size: 15px; color: ${COLORS.textGray}; } }`;

const BlogSection = styled.div`background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd; overflow: hidden;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center;`;
const BlogHeaderWrapper = styled.div` margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2` font-size: 48px; font-weight: 600; line-height: 1.1; display: flex; flex-direction: column; gap: 12px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer;`;
const BlogSliderOuter = styled.div` display: flex; flex-direction: column; align-items: center; width: 100%; `;
const BlogCardsContainer = styled.div` display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer; flex-shrink: 0;
  &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } 
  .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } 
  .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; } 
  .tag { background: #e6f7ee; color: #28a665; font-size: 11px; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; } 
  h3 { font-size: 20px; margin: 0 0 16px 0; } 
  .date { font-size: 13px; color: #999; margin-top: auto; } 
  @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } } 
`;
const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` 
  width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: white; 
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  &:hover { background: #28a665; color: white; transform: scale(1.1); } 
`;
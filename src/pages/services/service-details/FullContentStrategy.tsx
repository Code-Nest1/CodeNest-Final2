"use client";

/**
 * FILE: FullContentStrategy.tsx
 * PATH: /services/full-content-strategy
 * MISSION: Generate high-authority content ecosystems that drive conversions.
 * CODE: Standard Agency High-Fidelity Logic (Logic-and-Layout Match)
 * VERSION: 1.1 (Resolved TS Missing Name Errors)
 */

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
  Minus,
  Edit,
  PenTool,
  Share2,
  TrendingUp,
  Award
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

/**
 * ============================================================================
 * ELITE CONTENT DATA
 * ============================================================================
 */

const CONTENT_STANDARDS = [
  { 
    id: "WPCS", 
    title: "The Cognitive Influence Model", 
    desc: "We utilize psychological profiling to map every piece of content to the subconscious triggers of your specific buyer persona, ensuring deep engagement." 
  },
  { 
    id: "BLOCK", 
    title: "Semantic Content Frameworks", 
    desc: "Move beyond keywords. We engineer semantic networks of content that signal top-tier topical authority to modern search engine algorithms and LLMs." 
  },
  { 
    id: "SECURITY", 
    title: "Omnichannel Data Protection", 
    desc: "Brand integrity is non-negotiable. Every word follows a rigorous multi-layer editorial review to maintain consistent brand safety and factual accuracy." 
  },
  { 
    id: "CWV", 
    title: "E-E-A-T Performance Scoring", 
    desc: "We quantify Content Vitals through Experience, Expertise, Authoritativeness, and Trustworthiness metrics, treating every article as an investable asset." 
  }
];

const BENEFITS_DATA = [
  {
    title: "Exponential organic traffic growth",
    desc: "Stop competing on high-volume keywords. Our authority-first approach captures zero-volume, high-intent searches that build a moat around your brand, resulting in a sustainable compounding traffic ecosystem that rivals paid acquisition."
  },
  {
    title: "Psychological brand alignment",
    desc: "Strategy without resonance is noise. We architect your narrative to bypass rational defenses and appeal to human emotion, fostering intense brand loyalty. This turns casual visitors into vocal advocates through superior storytelling."
  },
  {
    title: "High-Performance Conversion Funnels",
    desc: "Every asset is engineered for a purpose. Whether it is a deep-dive technical whitepaper or a high-velocity social clip, we design specific transition paths that nudge the reader toward the next stage of the decision-making cycle."
  },
  {
    title: "Data-driven velocity reports",
    desc: "Marketing shouldn't be guesswork. Our strategists deploy sophisticated tracking to measure the ‘Velocity of Content’—analyzing exactly how quickly an asset moves a lead from discovery to a closed-won opportunity."
  },
  {
    title: "Drastic reduction in CAC",
    desc: "Paid ads get more expensive every month. Premium content strategy allows you to build a permanent inventory of assets that capture leads for free. This decreases your Customer Acquisition Cost over time as the library expands."
  },
  {
    title: "Unified global market presence",
    desc: "For global brands, scaling tone and intent across regions is a massive hurdle. Our modular strategy allows for seamless localization and cultural adaptation while keeping the core 'Code Nest' standard of elite content."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Precision Semantic Architecture", 
    desc: "We don't just write blogs; we build knowledge graphs. We identify high-value information gaps in your niche and dominate them with the most comprehensive assets available on the market today." 
  },
  { 
    num: "/ 02", 
    title: "Journalistic Research Methods", 
    desc: "Our strategists conduct primary source research, expert interviews, and proprietary data analysis. We provide information that simply cannot be replicated by AI-reliant or budget agencies." 
  },
  { 
    num: "/ 03", 
    title: "Behavioral Mapping Integration", 
    desc: "By aligning with UX design tokens, our content is mapped to specific click-patterns. We understand where the eye moves and place key tactical triggers precisely where the reader's attention peaks." 
  },
  { 
    num: "/ 04", 
    title: "Obsessive Performance Audits", 
    desc: "If a page isn't hitting ROI benchmarks, we rewrite it. We treat your content inventory as a portfolio of financial investments, pruning the underperformers and doubling down on what drives revenue." 
  },
  { 
    num: "/ 05", 
    title: "Multi-Channel Synchronization", 
    desc: "Your strategy lives everywhere. We ensure your whitepapers, TikToks, and Email Automation campaigns all sing the same melody, preventing the disjointed messaging that usually kills high-end brands." 
  },
  { 
    num: "/ 06", 
    title: "Concierge Strategy Collaboration", 
    desc: "Code Nest acts as your Fractional CMO. We don't just send files; we participate in your growth meetings, pivoting strategies in real-time to align with shifting market demands and emerging industry trends." 
  }
];

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Alistar Thorne",
    role: "Global Marketing Director, Vanguard Systems",
    company: "Vanguard Systems",
    quote: "Code Nest's content strategy completely restructured how we approach our enterprise funnels. We saw a 340% increase in whitepaper downloads and a significant shift in buyer perception within 3 months.",
    imgSrc: "/assets/feedback/alistar.jpg",
    serviceTag: "Signature Content Strategy",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Jessica Wu",
    role: "CEO, Luxen Digital",
    company: "Luxen Digital",
    quote: "Working with them was the best ROI of our marketing budget. They found keyword opportunities our previous SEO agency completely missed and translated them into copy that converts instantly.",
    imgSrc: "/assets/feedback/jessica.jpg",
    logoSrc: "/assets/feedback/luxen-logo.png",
    serviceTag: "Semantic SEO & Growth",
    ctaText: "Explore ROI Results",
  },
  {
    id: 3,
    name: "David Ross",
    role: "Founder, Zenith SaaS",
    company: "Zenith SaaS",
    quote: "I needed high-end authority content for our B2B SaaS rollout. Codenest provided a 12-month roadmap that was executed perfectly. The thought leadership pieces have positioned me as a key influencer in DevOps.",
    imgSrc: "/assets/feedback/david.jpg",
    serviceTag: "Elite Narrative Architecture",
    ctaText: "View Strategic Roadmap",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Edit size={28} />,
    title: "Ecosystem Deep-Dive",
    desc: "We start with a surgical examination of your current assets. We audit your existing narrative, tone of voice, and semantic performance to identify exactly where your content is bleeding authority and missing lead opportunities."
  },
  {
    icon: <Share2 size={28} />,
    title: "Authority Gap Analysis",
    desc: "We analyze your competition’s most successful assets and find the strategic weaknesses they’ve ignored. We then architect a content bridge to steal that market share and position you as the only credible choice."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Velocity-Ready Blueprint",
    desc: "This stage results in a tactical multi-channel content roadmap. It includes a specific calendar, high-intent content briefs, distribution channels, and conversion touchpoints optimized for a high-LTV audience."
  },
  {
    icon: <Award size={28} />,
    title: "Post-Deployment Tuning",
    desc: "Deployment is only the beginning. Our premium partnership includes a quarterly calibration phase where we review conversion data, heatmaps, and search ranking shifts to ensure your strategy remains unbeatable."
  }
];

const FAQ_DATA = [
    {
        question: "How long does it take to see tangible ROI from a content strategy?",
        answer: "Premium strategy focuses on both quick-win conversion optimization and long-term authority. Most clients see a noticeable lift in 'conversion velocity' within the first 60 days, with the compounding traffic benefits typically accelerating significantly after 6 months."
    },
    {
        question: "Is this strategy applicable for both B2B and B2C sectors?",
        answer: "Yes. Our strategies are rooted in human behavioral psychology. While the delivery channels and tone of voice change between sectors, the core 'authority triggers' we implement are effective across any market requiring high trust for high-ticket transactions."
    },
    {
        question: "Do you provide the content production, or just the strategy?",
        answer: "While we specialize in high-level architectural strategy, Code Nest also houses an elite editorial team of technical copywriters. We offer a full-service experience—moving from strategy to high-end execution without losing strategic intent."
    },
    {
        question: "What exactly is 'Semantic Content' and why does it matter?",
        answer: "Modern algorithms understand 'topics,' not just keywords. A semantic strategy creates a network of interconnected information that proves your brand understands the entire subject matter. This leads to higher trust rankings from search engines and better comprehension from customers."
    },
    {
        question: "How do you handle multi-language or global strategy?",
        answer: "We employ cultural linguists who assist in our localization mapping. This ensures that the strategic nuance and psychological impact of the content aren't lost in translation when entering new geographic markets."
    }
];

/**
 * ============================================================================
 * ANIMATION CONFIGURATIONS
 * ============================================================================
 */

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

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

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

/**
 * ============================================================================
 * COMPONENT: FullContentStrategy
 * ============================================================================
 */

export default function FullContentStrategy() {
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
      {/* --- 1. HERO --- */}
      <HeroSection>
        <HeroInner>
          <HeroContent>
            <Breadcrumbs>
              <span className="star">✦</span>
              <Link to="/">Home</Link> / 
              <Link to="/services">Services</Link> / 
              <strong>Full content strategy</strong>
            </Breadcrumbs>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
            >
              Elite Content <br /> Strategy Engine
            </motion.h1>
            <ButtonGroup>
              <MainBtn>Dominate My Market</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>
              Build authority and compounding traffic with a unified 360-degree narrative roadmap that 
              aligns with psychology, SEO, and enterprise conversion goals.
            </HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Growth</span><div className="stars">★★★★★ <span className="val">ROI Lab</span></div></RatingItem>
              <RatingItem><span className="brand">Narrative</span><div className="stars">★★★★★ <span className="val">Top Tier</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Market Dominance Module</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">
            Measure the velocity <br /> of your content's <br /> strategic impact
          </motion.h2>
          <RightContentBlock>
            <p>Our audit identifies specific information gaps your competitors are missing. We provide a full blueprint to secure that cognitive real estate, ensuring your brand is the definitive choice for premium customers.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Analyze My Authority Profile</BlueTextBtn>
              <BlueIconBtn>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </BlueIconBtn>
            </BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">The Strategic standards <br /> defining high-impact <br /> narrative builds</h2>
            <AccordionList>
                {CONTENT_STANDARDS.map((item) => (
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

      {/* --- 4. GRID SECTION --- */}
      <GridSection>
        <SectionHeader white>Strategy Benchmarks</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "E-E-A-T Signaling", desc: "Establishing deep niche authority markers into every layer of your content portfolio." },
            { id: "02.", title: "Lead Velocity", desc: "Accelerating lead transitions by answering complex buyer questions pre-sale." },
            { id: "03.", title: "Omnichannel Logic", desc: "Deploying consistent narrative patterns across high-intent search and socials." },
            { id: "04.", title: "Asset Longevity", desc: "Crafting evergreen pillars that deliver inbound value for 5+ years without decay." },
            { id: "05.", title: "Semantic Moat", desc: "Protecting rankings via topical saturation that competitors find impossible to flip." },
            { id: "06.", title: "conversion Map", desc: "Tracking micro-conversion events to refine strategy in real-time for max revenue." }
          ].map((item, i) => (
            <DogEarCard key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="card-num">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </DogEarCard>
          ))}
        </CardsGrid>
      </GridSection>

      {/* --- 5. BENEFITS --- */}
      <BenefitsContainer>
        <div className="title-wrapper">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Scaling through high-fidelity <br /> strategic storytelling
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

      {/* --- 6. WHY CODE NEST --- */}
      <BlueCardSection>
        <motion.h2 className="centered-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          The code nest advantage in <br /> authority architecture
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

      {/* --- 7. CHECKLIST --- */}
      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" opacity="0.8" />
                <path d="M-40 200 C40 200, 100 140, 100 0" stroke="#bef264" strokeWidth="3" opacity="0.6" />
                <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" />
              </svg>
            </DecoCircles>
            <BannerText>Verify your Topical Integrity Profile</BannerText>
            <DownloadBtn>
              Download Content Quality Checklist
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

      {/* --- 8. FEEDBACK --- */}
      <Section8>
        <BackgroundWrapper>
          <GridOverlay />
          <OrbOne variants={orbOneVariants} animate="animate" />
          <OrbTwo variants={orbTwoVariants} animate="animate" />
        </BackgroundWrapper>
        <Container8>
          <HeaderWrapper>
            <SubHeader>Partnerships</SubHeader>
            <HeaderTitle>Case Studies in Authority</HeaderTitle>
            <HeaderDesc>
                The strategies we deploy aren't just opinions; they are based on market results 
                that redefine customer engagement levels.
            </HeaderDesc>
          </HeaderWrapper>
          <SliderWrapper>
            <StackLayerOne />
            <StackLayerTwo />
            <CardWindow>
              <CardFrame animate={cardControls}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <InnerGrid key={page} custom={direction} variants={contentVariants} initial="enter" animate="center" exit="exit" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.05} onDragEnd={handleDragEnd}>
                    <ImageSide>
                      {currentFeedback.logoSrc && ( <LogoOverlay src={currentFeedback.logoSrc} alt="logo" /> )}
                      <ProfileImg src={currentFeedback.imgSrc} alt={currentFeedback.name} draggable="false" />
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
              <NavBtn onClick={() => paginate(-1)}><ChevronLeft size={20} /></NavBtn>
              <NavBtn onClick={() => paginate(1)}><ChevronRight size={20} /></NavBtn>
            </Controls>
          </SliderWrapper>
        </Container8>
      </Section8>

      {/* --- 9. HOW IT WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 className="audit-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Strategy Phasing Architecture
           </motion.h2>
           <ProcessGrid>
              {AUDIT_STEPS.map((step, idx) => (
                <ProcessCard key={idx} idx={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <IconBox>{step.icon}</IconBox>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </ProcessCard>
              ))}
           </ProcessGrid>
        </AuditContainer>
      </AuditProcessSection>

      {/* --- 10. FAQ --- */}
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
                    <BannerTitle10>Stop guessing—Execute a proven growth plan</BannerTitle10>
                    <ConsultBtn> Book My Strategic Deep-Dive <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> </ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft> <h2>Content Strategy <br /> Intelligence</h2> </FAQLeft>
                    <FAQRight>
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} isOpen={openFaqIndex === index} onClick={() => toggleFaq(index)}>
                                <div className="q-header">
                                    <h3>{item.question}</h3>
                                    <div className="icon-box"> {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />} </div>
                                </div>
                                <AnimatePresence>
                                    {openFaqIndex === index && (
                                        <motion.div className="a-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
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

      {/* --- 11. BLOG --- */}
      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper>
                <BlogTitle>Insights.<br /><BlogLink onClick={() => navigate('/blog')}>Recent Assets <ArrowUpRight size={32} /></BlogLink></BlogTitle>
             </BlogHeaderWrapper>
             {loadingBlogs ? ( <div style={{ textAlign: "center", color: COLORS.textGray }}>Analyzing Archives...</div> ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600';
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img"><img src={featuredImg} alt="blog" /></div>
                                <div className="card-content">
                                   <span className="tag">Strategic Insight</span>
                                   <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                   <span className="date">{formatDate(post.date)}</span>
                                </div>
                              </BlogCard>
                           );
                       })}
                    </BlogCardsContainer>
                 </BlogSliderOuter>
             )}
          </BlogContainer>
      </BlogSection>
    </PageWrapper>
  );
};

// ==========================================
// STYLED COMPONENTS (A-Z FIX)
// ==========================================

const PageWrapper = styled.div`background: white; overflow-x: hidden;`;
const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center; position: relative;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; h1 { color: #fff; font-size: clamp(50px, 6vw, 92px); line-height: 1.1; font-weight: 700; letter-spacing: -2.5px; } @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; opacity: 0.7; text-decoration: none; } strong { color: #fff; font-weight: 700; }`;
const ButtonGroup = styled.div`display: flex; height: 62px;`;
const MainBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; line-height: 1.6; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 700; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; .val { color: #fff; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection};`;
const BadgeWrapper = styled.div`background: white; padding: 10px 18px; color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 700; border-radius: 4px; display: inline-flex; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 50px; .dot { width: 6px; height: 6px; border-radius: 50%; background: ${COLORS.coaxBlue}; margin-right: 10px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: center; .audit-heading { font-size: clamp(38px, 4.2vw, 70px); line-height: 1.1; letter-spacing: -2px; } @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; color: ${COLORS.textGray}; line-height: 1.6; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: #fff; border: none; padding: 0 30px; font-weight: 600; font-size: 14px; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;
const StandardsContainer = styled.section`padding: 140px 10%; background: white;`;
const StandardsInner = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 100px; .section-title { font-size: clamp(34px, 4vw, 68px); line-height: 1.1; font-weight: 600; } @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`
    border-top: 1px solid ${COLORS.borderColor}; padding: 35px 0;
    .header { display: flex; align-items: center; gap: 30px; cursor: pointer; h3 { font-size: 21px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } }
    .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : '#ddd'}; color: ${COLORS.coaxBlue}; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .content-body p { padding: 20px 0 0 54px; color: ${COLORS.textGray}; font-size: 16px; line-height: 1.6; }
`;
const GridSection = styled.section`padding: 120px 10%; background: ${COLORS.coaxBlue}; color: white;`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; font-weight: 600; margin-bottom: 60px; color: white;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; padding: 45px; min-height: 320px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-num { font-weight: 800; font-size: 13px; display: block; margin-bottom: 30px; color: ${COLORS.coaxBlue}; }
    h3 { font-size: 24px; margin-bottom: 20px; }
    p { font-size: 16px; opacity: 0.8; line-height: 1.5; }
`;
const BenefitsContainer = styled.section`padding: 140px 0; background: #fff; .title-wrapper { text-align: center; margin-bottom: 80px; padding: 0 10%; h2 { font-size: 60px; font-weight: 700; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1.5px solid #f1f3f7; border-bottom: 1.5px solid #f1f3f7; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
    padding: 80px 10%; border-right: ${props => props.isLeft ? "1.5px solid #f1f3f7" : "none"}; border-bottom: 1.5px solid #f1f3f7;
    h4 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 700; margin-bottom: 25px; }
    p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }
`;
const BlueCardSection = styled.section`padding: 150px 10%; background: ${COLORS.coaxBlue}; text-align: center; .centered-header { color: #fff; font-size: 55px; font-weight: 700; margin-bottom: 90px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; text-align: left; padding: 45px; min-height: 400px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-index { font-weight: 800; margin-bottom: 35px; opacity: 0.5; } h3 { font-size: 26px; font-weight: 700; margin-bottom: 25px; }
`;
const AbstractGraphicSVG = () => ( <svg width="450" height="450" viewBox="0 0 500 500"><circle cx="250" cy="250" r="180" stroke={COLORS.lime} strokeWidth="2" fill="none" opacity="0.4" /><rect x="200" y="100" width="100" height="300" fill={COLORS.lime} opacity="0.6" /><circle cx="250" cy="250" r="50" fill="white" /></svg> );

// PAGE 7-11 MISSING COMPONENTS 
const PageSevenContainer = styled.div`width: 100%; padding: 100px 5%;`;
const BannerWrapper = styled.div`background: linear-gradient(135deg, ${COLORS.coaxBlue} 0%, ${COLORS.darkerBlue} 100%); padding: 80px 40px; border-radius: 4px; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; justify-content: space-between; align-items: center; color: #fff; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 40px; }`;
const BannerText = styled.h2`font-size: 42px; font-weight: 700; max-width: 500px; line-height: 1.1;`;
const DownloadBtn = styled.button`background: ${COLORS.lime}; padding: 22px 35px; font-weight: 700; font-size: 15px; border: none; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 20px; transition: 0.3s;`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; pointer-events: none; opacity: 0.4;`;
const DecoStar = styled.div`position: absolute; right: 40px; top: 20px; pointer-events: none;`;
const Section8 = styled.section`padding: 130px 0 160px; position: relative; background: #f9fbff; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; z-index: 0;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.coaxBlue} 1px, transparent 1px); background-size: 45px 45px; opacity: 0.05;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(26,65,230,0.15) 0%, transparent 70%); border-radius: 50%; filter: blur(100px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%); border-radius: 50%; filter: blur(100px);`;
const Container8 = styled.div`max-width: 1150px; margin: 0 auto; position: relative; z-index: 5; padding: 0 24px;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 70px; h2 { font-size: 52px; font-weight: 700; }`;
const SubHeader = styled.h4`color: ${COLORS.coaxBlue}; text-transform: uppercase; font-size: 13px; font-weight: 800; letter-spacing: 2px; margin-bottom: 20px;`;
const HeaderTitle = styled.h2`font-size: 52px; font-weight: 700; color: ${COLORS.textDark};`;
const HeaderDesc = styled.p`font-size: 18px; color: ${COLORS.textGray}; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; height: 500px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(26,65,230,0.15); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; inset: 22px -22px -22px 22px; background: ${COLORS.coaxBlue}; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; height: 100%; width: 100%; z-index: 10;`;
const CardFrame = styled(motion.div)`background: #fff; height: 100%; box-shadow: 0 40px 100px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden; clip-path: polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%); @media (max-width: 850px) { height: auto; padding-bottom: 60px; clip-path: none; }`;
const InnerGrid = styled(motion.div)`display: grid; grid-template-columns: 45% 55%; height: 100%; cursor: grab; will-change: transform; @media (max-width: 850px) { grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; bottom: 30px; right: 30px; width: 100px; padding: 10px; background: #fff;`;
const ContentSide = styled.div`padding: 60px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-weight: 800; font-size: 11px; text-transform: uppercase; color: ${COLORS.coaxBlue}; letter-spacing: 2px; margin-bottom: 25px; border-left: 3px solid ${COLORS.lime}; padding-left: 12px;`;
const QuoteIcon = styled.div`font-size: 80px; color: ${COLORS.coaxBlue}; font-family: serif; opacity: 0.6; line-height: 1;`;
const QuoteText = styled.p`font-size: 21px; font-weight: 500; font-style: italic; color: ${COLORS.textDark}; line-height: 1.5; margin-bottom: 30px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 19px; font-weight: 700; color: ${COLORS.textDark};`;
const AuthorRole = styled.div`font-size: 14px; color: ${COLORS.textGray}; margin-top: 5px;`;
const AuthorCompany = styled.span`color: ${COLORS.coaxBlue}; font-weight: 800; margin-left: 6px; &:before { content: "|"; margin: 0 8px; color: #ddd; }`;

// FIXED missing CtaButton component
const CtaButton = styled.button`
  margin-top: 25px; padding: 12px 24px; font-size: 14px; font-weight: 600; 
  background: ${COLORS.coaxBlue}; color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px; width: fit-content; border-radius: 4px;
`;

const Controls = styled.div`display: flex; gap: 15px; position: absolute; bottom: -80px; width: 100%; justify-content: center; z-index: 50;`;
const NavBtn = styled.button`width: 50px; height: 50px; border-radius: 50%; background: #fff; border: 1.5px solid #f1f3f7; cursor: pointer; display: flex; align-items: center; justify-content: center;`;
const AuditProcessSection = styled.section`padding: 140px 0; background: #fff;`;
const AuditContainer = styled.div`max-width: 1100px; margin: 0 auto; .audit-title { font-size: 60px; font-weight: 700; text-align: center; margin-bottom: 90px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid ${COLORS.borderColor}; border-radius: 4px; overflow: hidden; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 80px 60px; border-right: ${props => props.idx % 2 === 0 ? "1.5px solid "+COLORS.borderColor : "none"}; border-bottom: ${props => props.idx < 2 ? "1.5px solid "+COLORS.borderColor : "none"}; h3 { font-size: 28px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 30px;`;
const PageTenSection = styled.section`padding: 100px 0 160px; background: white;`;
const PageTenInner = styled.div`max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 130px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`max-width: 1000px; text-align: left;`;
const BannerTitle10 = styled(BannerText)`font-size: 45px;`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`display: flex; gap: 80px; @media (max-width: 900px) { flex-direction: column; }`;

// FIXED missing FAQContent component
const FAQContent = styled.div`
  display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 60px; position: relative; width: 100%;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;

const FAQLeft = styled.div`h2 { font-size: 50px; font-weight: 700; }`;
const FAQRight = styled.div`width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1.5px solid #f1f3f7; padding: 30px 0; cursor: pointer; .q-header { display: flex; justify-content: space-between; align-items: center; h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: #bbb; border: 1.5px solid #f1f3f7; padding: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: center; } } .a-body p { margin-top: 25px; font-size: 17px; color: ${COLORS.textGray}; line-height: 1.7; }`;
const BackgroundCurve = styled.div`position: absolute; left: -100px; top: -50px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(26,65,230,0.04) 0%, transparent 70%); pointer-events: none;`;
const BlogSection = styled.section`background: #f7faff; padding: 130px 0 160px; border-top: 1.5px solid #f1f3f7;`;
const BlogContainer = styled.div`max-width: 1320px; margin: 0 auto; padding: 0 40px;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 70px;`;
const BlogTitle = styled.h2`font-size: 60px; font-weight: 700; letter-spacing: -3px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; cursor: pointer; display: flex; align-items: center; gap: 15px; margin-top: 10px; font-weight: 600; font-size: 32px; &:hover { opacity: 0.7; }`;
const BlogSliderOuter = styled.div`display: flex; overflow: hidden;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; padding: 10px 5px 30px; overflow-x: auto; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
    min-width: 480px; background: white; border-radius: 4px; display: flex; overflow: hidden; height: 260px; transition: 0.3s; cursor: pointer; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1.5px solid #f1f3f7;
    &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; }
    .card-img { width: 42%; height: 100%; img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; } }
    &:hover img { transform: scale(1.08); }
    .card-content { padding: 40px; width: 58%; display: flex; flex-direction: column; h3 { font-size: 21px; margin: 15px 0; } .tag { color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 800; text-transform: uppercase; } .date { font-size: 14px; color: #a1abc1; margin-top: auto; } }
`;
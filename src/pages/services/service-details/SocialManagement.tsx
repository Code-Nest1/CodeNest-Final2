"use client";

/**
 * FILE: SocialManagement.tsx
 * PATH: /services/social-media-management
 * MISSION: Architect dominant organic social footprints that cultivate high-LTV communities.
 * CODE: Standard Agency High-Fidelity Logic (Logic-and-Layout Match)
 * VERSION: 1.0 (Elite Authority Build)
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
  Share2,
  Users,
  Video,
  Monitor,
  Heart,
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

/**
 * ============================================================================
 * DATA SOURCE: ELITE SOCIAL MEDIA MANAGEMENT CONTENT
 * ============================================================================
 */

const SOCIAL_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Algorithm Sensitivity Protocols", 
    desc: "We track 24-hour shifting signals on LinkedIn, TikTok, and Meta, adapting delivery logic to match the current prioritize-metrics of the platform algorithms." 
  },
  { 
    id: "BLOCK", 
    title: "Viral Narrative Hooks", 
    desc: "Every post is engineered with high-impact visual and cognitive hooks designed to maximize watch-time and stop the 'infinite scroll' habit within 1.2 seconds." 
  },
  { 
    id: "SECURITY", 
    title: "Community Guard Standards", 
    desc: "We manage brand reputation through real-time sentiment analysis and high-velocity engagement response, turning detractors into advocates through radical transparency." 
  },
  { 
    id: "CWV", 
    title: "Multi-Format Saturation Logic", 
    desc: "We utilize modular production workflows to ensure a single narrative seed blooms into Short-form video, long-form insights, and conversational polls seamlessly." 
  }
];

const BENEFITS_DATA = [
  {
    title: "Dominant Cultural Share-of-Voice",
    desc: "Move from a passive participant to a cultural authority. Our strategies ensure your brand is not just seen, but talked about—fostering organic earned media that is impossible to buy via traditional ads."
  },
  {
    title: "Unrivaled Organic Reach Multipliers",
    desc: "While reach is declining for most, we utilize niche community networking and 'share-ready' psychology to ensure your content is naturally distributed by the platform users themselves."
  },
  {
    title: "Bypassing Ad-Burnout Resilience",
    desc: "Customers are tuning out paid media. Social Management builds an 'owned audience' of loyalists who consume your message by choice, insulating your brand from the volatility of rising CPA costs."
  },
  {
    title: "Real-time Product Feedback Loops",
    desc: "Use your social channels as a 24/7 focus group. We architect community interactions that provide immediate data on your market's needs, objections, and evolving preferences for future product builds."
  },
  {
    title: "Creator-Tier Visual Excellence",
    desc: "Static corporate graphics are dead. We provide high-end, lifestyle-focused creator aesthetics that build trust and aspiration, aligning your brand with the aesthetic standards of top-level industry leaders."
  },
  {
    title: "Sustainable Long-Term ROI moats",
    desc: "Ads stop working the moment you stop paying. A well-managed social community builds an asset that lives on your balance sheet, delivering compounding value through lower customer acquisition and higher retention."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Anthropology-Based Strategy", 
    desc: "We study human behavior, not just data points. Our social strategists identify the subcultures where your audience lives and craft a localized dialect for your brand that builds instant familiarity." 
  },
  { 
    num: "/ 02", 
    title: "Short-Form Mastery Architecture", 
    desc: "Code Nest is built for the Reels/TikTok era. We design visual narratives specifically for high-frequency consumption, ensuring your brand story remains cohesive even in 15-second intervals." 
  },
  { 
    num: "/ 03", 
    title: "Cross-Pollination Logic", 
    desc: "We sync your Social, Search, and Email strategies. Our systems ensure that the traffic sparked by a viral post is correctly funneled into your backend lifecycle automations without leakage." 
  },
  { 
    num: "/ 04", 
    title: "Performance Attribution Guard", 
    desc: "Stop the vanity metric cycle. We track real-world results—linking social engagement directly to checkout events and lead-gen activities via custom UTM mapping and platform pixel tuning." 
  },
  { 
    num: "/ 05", 
    title: "White-Glove Community Management", 
    desc: "Our response team understands your brand voice deeply. We engage with high-profile industry voices to expand your network, ensuring your brand remains a focal point in major niche conversations." 
  },
  { 
    num: "/ 06", 
    title: "Hyper-Reactive Content Tuning", 
    desc: "When news breaks, we move. Our team pivots content calendars in hours, not weeks, allowing your brand to remain relevant during fast-moving cultural moments and industry shifts." 
  }
];

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Elena Petrov",
    role: "Founding Partner, Chroma Media",
    company: "Chroma Media",
    quote: "Code Nest's social architecture took us from zero presence to industry leadership in 6 months. Our LinkedIn impressions alone grew by 800%, driving premium leads we never thought possible through organic.",
    imgSrc: "/assets/feedback/elena.jpg",
    serviceTag: "Signature Community Management",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Soren Nielsen",
    role: "CEO, Lux eCommerce",
    company: "Lux eCommerce",
    quote: "Their focus on algorithm hooks is scientific. We've seen a consistent 15% CTR on our Instagram Stories since moving to their management protocol. It's the most reliable ROI we have.",
    imgSrc: "/assets/feedback/soren.jpg",
    logoSrc: "/assets/feedback/lux-logo.png",
    serviceTag: "Short-Form Distribution",
    ctaText: "Analyze Impact Data",
  },
  {
    id: 3,
    name: "Liam O'Connell",
    role: "Director of Digital, Solar SaaS",
    company: "Solar SaaS",
    quote: "Finding an agency that understands technical B2B social is rare. Code Nest speaks our language and manages our complex narratives across Twitter and LinkedIn with zero friction.",
    imgSrc: "/assets/feedback/liam.jpg",
    serviceTag: "Corporate Brand Narrative",
    ctaText: "Review Account Growth",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Users size={28} />,
    title: "Persona Presence Audit",
    desc: "We start by analyzing where your target demographic actually spends their active attention hours. We don't believe in 'posting everywhere'—we identify the specific platforms where you can win decisively."
  },
  {
    icon: <Monitor size={28} />,
    title: "Visual Language Audit",
    desc: "We evaluate your current visual narrative against the aesthetic benchmarks of modern platform winners. We pinpoint the 'stiffness' or disconnect that causes high-bounce rates and narrative drift."
  },
  {
    icon: <Share2 size={28} />,
    title: "Engagement Loop Assessment",
    desc: "Here we examine your existing community health. We audit your response times, tone of voice, and interactive elements to see if your channel is a broadcast or a true engagement ecosystem."
  },
  {
    icon: <Heart size={28} />,
    title: "Dominance Roadmap Delivery",
    desc: "Your Social audit ends with a specific platform-first roadmap. We provide the post-ratios, creative styles, and engagement KPIs required to establish and defend your market authority."
  }
];

const FAQ_DATA = [
    {
        question: "How long until we see 'Viral' results?",
        answer: "We focus on sustainable growth over 'lightning in a bottle.' While our hooks are engineered for viral velocity, the most powerful ROI comes from a compounding, engaged following which usually sees exponential lift by month 3 and 4."
    },
    {
        question: "Do you use AI for community management and posting?",
        answer: "We utilize AI for high-velocity sentiment data and keyword analysis, but every word of copy and community response is handcrafted by our social strategists to ensure high-end emotional nuance and brand safety."
    },
    {
        question: "Should we be on TikTok or just stick to LinkedIn/Meta?",
        answer: "Every brand strategy is custom. If you are B2B Enterprise, we may suggest a LinkedIn-heavy dominance plan; however, even the largest B2B brands now find success on short-form video through technical authority content."
    },
    {
        question: "What is your process for content approval?",
        answer: "We provide a centralized workspace where you can see the content 2 weeks in advance. Our modular dashboard allows for 1-click feedback and rapid iterative changes to ensure nothing goes live without total alignment."
    },
    {
        question: "Does your social management include paid ad management?",
        answer: "This service is specifically focused on organic footprint and community growth. However, we ensure all our social creative is 'Dark-Post Ready,' meaning you can easily put ad spend behind our top-performing organic assets."
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
 * COMPONENT: SocialManagement
 * ============================================================================
 */

export default function SocialManagement() {
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

  // DATA FETCHING & SLIDER INIT
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

  /**
   * ============================================================================
   * RENDERING INTERFACE
   * ============================================================================
   */

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
              <strong>Social media management</strong>
            </Breadcrumbs>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
            >
              Strategic Organic <br /> Footprint Service
            </motion.h1>
            <ButtonGroup>
              <MainBtn>Optimize My Profile</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>
              Dominate algorithm timelines and cultivate intense brand loyalty through creator-caliber 
              narratives and tactical social distribution systems.
            </HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Meta</span><div className="stars">★★★★★ <span className="val">Media Expert</span></div></RatingItem>
              <RatingItem><span className="brand">LinkedIn</span><div className="stars">★★★★★ <span className="val">Certified Partner</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> 360 Organic Mastery</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">
            Measure the real <br /> cultural gravity of <br /> your brand narrative
          </motion.h2>
          <RightContentBlock>
            <p>Our deep-tech Social Audit evaluates your cross-channel visual frequency and audience sentiment health. We expose the 'ghost engagement' gaps preventing you from building a true organic revenue funnel.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Unlock Content Gravity Audit</BlueTextBtn>
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
            <h2 className="section-title">Algorithmic standards <br /> covered by our core <br /> social architects</h2>
            <AccordionList>
                {SOCIAL_STANDARDS.map((item) => (
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

      {/* --- 4. WHAT TO EXPECT GRID --- */}
      <GridSection>
        <SectionHeader white>Service Level Anchors</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Algorithm Priming", desc: "Setting technical posting windows and asset specs that match native delivery logic." },
            { id: "02.", title: "Interactive UX", desc: "Design-led content formats that encourage polls, swipe-overs, and conversational events." },
            { id: "03.", title: "Sentiment Hygiene", desc: "Constant moderation ensuring community sentiment stays aligned with brand values." },
            { id: "04.", title: "Retention Cycles", desc: "Content strategies designed to pull existing followers back into your active daily narrative." },
            { id: "05.", title: "Short-Form Velocity", desc: "Fast-turnaround video assets optimized for high Reels and TikTok distribution scores." },
            { id: "06.", title: "Multi-Source Feed", desc: "Cohesion between high-res static visuals and raw-vlog style personality assets." }
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
          <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            Scale through social-first <br /> narrative distribution
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
          Why choose Code Nest to <br /> amplify your presence?
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

      {/* --- 7. ASSESSMENT BANNER --- */}
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
            <BannerText>Assess your community reach efficiency</BannerText>
            <DownloadBtn>
              Download Social Visibility Blueprint
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
            <SubHeader>Organic Loyalty</SubHeader>
            <HeaderTitle>What brands achieve with Codenest</HeaderTitle>
            <HeaderDesc>
                Social management is the modern standard for defensive market positioning. 
                Our clients dominate cultural moments while protecting brand safety.
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
              Organic Narrative Sequencing
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

      {/* --- 10. FAQ & PROMO --- */}
      <PageTenSection>
        <PageTenInner>
            <CTABanner10>
                 <BannerContent10>
                    <DecoCircles>
                         <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                            <path d="M-20 180 C50 180, 80 120, 80 60" stroke={COLORS.lime} strokeWidth="3" opacity="0.8" />
                            <circle cx="80" cy="180" r="60" stroke={COLORS.lime} strokeWidth="2" opacity="0.5" />
                         </svg>
                    </DecoCircles>
                    <BannerTitle10>Start building an owned <br /> community moat today</BannerTitle10>
                    <ConsultBtn> Schedule Your Narrative Deep-Dive <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> </ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft> <h2>Platform Mastery <br /> and Growth Q&A</h2> </FAQLeft>
                    <FAQRight>
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} isOpen={openFaqIndex === index} onClick={() => toggleFaq(index)}>
                                <div className="q-header">
                                    <h3>{item.question}</h3>
                                    <div className="icon-box"> {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />} </div>
                                </div>
                                <AnimatePresence>
                                    {openFaqIndex === index && (
                                        <motion.div className="a-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
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
                <BlogTitle>Cultural Edge.<br /><BlogLink onClick={() => navigate('/blog')}>The Social Lab <ArrowUpRight size={32} /></BlogLink></BlogTitle>
             </BlogHeaderWrapper>
             {loadingBlogs ? ( <div style={{ textAlign: "center", color: COLORS.textGray }}>Processing Social Intelligence...</div> ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600';
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img"><img src={featuredImg} alt="blog" /></div>
                                <div className="card-content">
                                   <span className="tag">Algorithm Insight</span>
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
// STYLED COMPONENTS (ELITE ARCHITECTURE)
// ==========================================

const PageWrapper = styled.div`background: #fff; overflow-x: hidden; font-family: 'Inter', sans-serif;`;
const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center; position: relative;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; h1 { color: #fff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; opacity: 0.7; text-decoration: none; } strong { font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }`;
const ButtonGroup = styled.div`display: flex; height: 62px;`;
const MainBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer; transition: 0.2s; &:hover { opacity: 0.9; }`;
const IconBtn = styled.div`background: #fff; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; line-height: 1.6; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 700; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; .val { color: #fff; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;
const AbstractGraphicSVG = () => (
    <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
        <motion.circle cx="250" cy="250" r="180" stroke={COLORS.lime} strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1 }} fill="none" />
        <path d="M150 250 L250 150 L350 250 L250 350 Z" fill={COLORS.lime} opacity="0.4" />
        <motion.path d="M150 250 L350 250" stroke="#fff" strokeWidth="15" strokeLinecap="round" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} />
    </motion.svg>
);
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection};`;
const BadgeWrapper = styled.div`background: #fff; padding: 10px 18px; color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 700; border-radius: 4px; display: inline-flex; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 50px; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; margin-right: 10px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; } @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; color: ${COLORS.textGray}; line-height: 1.7; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: #fff; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer; &:hover { background: ${COLORS.darkerBlue}; }`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;
const StandardsContainer = styled.section`padding: 140px 10%; background: #fff;`;
const StandardsInner = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`
    border-top: 1px solid ${COLORS.borderColor}; padding: 35px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; }
    .header { display: flex; align-items: center; gap: 30px; cursor: pointer; h3 { font-size: 21px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; font-weight: 600; } .btn-box { width: 26px; height: 26px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : '#ddd'}; color: ${COLORS.coaxBlue}; font-weight: 800; display: flex; align-items: center; justify-content: center; } }
    .content-body p { padding: 25px 0 0 56px; font-size: 16px; color: ${COLORS.textGray}; line-height: 1.75; }
`;
const GridSection = styled.section`padding: 120px 10%; background: ${COLORS.coaxBlue}; color: white;`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; font-weight: 500; margin-bottom: 60px; color: #fff; letter-spacing: -1.5px;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`
    background: ${COLORS.lime}; padding: 45px; min-height: 300px; color: ${COLORS.textDark}; position: relative;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-num { font-size: 12px; font-weight: 800; color: ${COLORS.coaxBlue}; margin-bottom: 30px; display: block; }
    h3 { font-size: 25px; margin-bottom: 20px; font-weight: 700; letter-spacing: -0.5px; } p { font-size: 16.5px; line-height: 1.6; opacity: 0.9; }
`;
const BenefitsContainer = styled.section`padding: 140px 0; background: #fff; .title-wrapper { text-align: center; margin-bottom: 90px; h2 { font-size: clamp(38px, 4.5vw, 68px); font-weight: 600; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1.5px solid #f1f3f7; border-bottom: 1.5px solid #f1f3f7; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
    padding: 90px 12%; border-right: ${props => props.isLeft ? "1.5px solid #f1f3f7" : "none"}; border-bottom: 1.5px solid #f1f3f7; 
    h4 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 700; margin-bottom: 28px; } p { font-size: 17px; line-height: 1.7; color: ${COLORS.textGray}; }
    @media (max-width: 900px) { border-right: none; }
`;
const BlueCardSection = styled.section`padding: 150px 10%; background: ${COLORS.coaxBlue}; text-align: center; .centered-header { color: #fff; font-size: clamp(34px, 4vw, 60px); font-weight: 600; margin-bottom: 90px; line-height: 1.1; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 700px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; text-align: left; padding: 45px; min-height: 400px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-index { font-weight: 800; font-size: 11px; margin-bottom: 35px; opacity: 0.6; } h3 { font-size: 26px; margin-bottom: 25px; font-weight: 700; line-height: 1.1; } .card-text { font-size: 16px; line-height: 1.6; }
`;
const PageSevenContainer = styled.div`padding: 80px 10%; width: 100%;`;
const BannerWrapper = styled.div`background: linear-gradient(110deg, #1d4ed8 0%, #091db1 100%); padding: 80px 40px; border-radius: 4px; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 5; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 40px; }`;
const BannerText = styled.h2`color: #fff; font-size: clamp(28px, 4vw, 40px); font-weight: 700; max-width: 480px; letter-spacing: -1.5px;`;
const DownloadBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 22px 35px; font-weight: 700; border-radius: 4px; display: flex; align-items: center; gap: 20px; cursor: pointer; transition: 0.3s;`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; pointer-events: none; opacity: 0.3;`;
const Section8 = styled.section`padding: 130px 0; background: #f8faff; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.coaxBlue} 1.2px, transparent 1.2px); background-size: 50px 50px; opacity: 0.05;`;
const OrbOne = styled(motion.div)`position: absolute; top: -15%; left: -10%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(26,65,230,0.1) 0%, transparent 70%); border-radius: 50%; filter: blur(100px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -20%; right: -15%; width: 900px; height: 900px; background: radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%); border-radius: 50%; filter: blur(100px);`;
const Container8 = styled.div`max-width: 1150px; margin: 0 auto; position: relative; z-index: 5; padding: 0 24px;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 70px;`;
const SubHeader = styled.h4`color: ${COLORS.coaxBlue}; text-transform: uppercase; font-size: 13px; font-weight: 800; letter-spacing: 2px; margin-bottom: 20px;`;
const HeaderTitle = styled.h2`font-size: clamp(32px, 4.5vw, 52px); font-weight: 700; color: ${COLORS.textDark}; letter-spacing: -2px;`;
const HeaderDesc = styled.p`font-size: 18px; line-height: 1.6; color: ${COLORS.textGray};`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 1000px; margin: 0 auto; height: 500px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(26,65,230,0.12); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const StackLayerTwo = styled.div`position: absolute; inset: 22px -22px -22px 22px; background: ${COLORS.coaxBlue}; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const CardWindow = styled.div`position: relative; z-index: 10; height: 100%;`;
const CardFrame = styled(motion.div)`background: #fff; height: 100%; box-shadow: 0 30px 70px rgba(0,0,0,0.08); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 92.5% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { height: auto; padding-bottom: 50px; clip-path: none; }`;
const InnerGrid = styled(motion.div)`display: grid; grid-template-columns: 44% 56%; height: 100%; will-change: transform; @media (max-width: 850px) { grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; height: 100%;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; bottom: 30px; right: 30px; width: 100px; background: #fff; padding: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);`;
const ContentSide = styled.div`padding: 60px; display: flex; flex-direction: column; @media (max-width: 600px) { padding: 40px 24px; }`;
const ServiceTag = styled.div`font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${COLORS.coaxBlue}; letter-spacing: 2px; margin-bottom: 25px; border-left: 3px solid ${COLORS.lime}; padding-left: 12px;`;
const QuoteIcon = styled.div`font-size: 80px; color: ${COLORS.coaxBlue}; font-family: serif; opacity: 0.6; line-height: 1;`;
const QuoteText = styled.p`font-size: clamp(17px, 2.2vw, 21px); font-weight: 500; font-style: italic; color: ${COLORS.textDark}; margin-bottom: 30px; line-height: 1.5;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 19px; font-weight: 700; color: ${COLORS.textDark};`;
const AuthorRole = styled.div`font-size: 14px; color: ${COLORS.textGray}; margin-top: 5px;`;
const AuthorCompany = styled.span`color: ${COLORS.coaxBlue}; font-weight: 800; margin-left: 6px; &:before { content: "|"; margin: 0 8px; color: #ddd; }`;

// FIXED component missing from original logic
const CtaButton = styled.button`
    margin-top: 25px; display: inline-flex; align-items: center; background: ${COLORS.coaxBlue}; 
    color: #fff; border: none; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px;
    cursor: pointer; gap: 10px; &:hover { background: ${COLORS.darkerBlue}; }
`;

const Controls = styled.div`display: flex; gap: 15px; position: absolute; bottom: -85px; width: 100%; justify-content: center; z-index: 50;`;
const NavBtn = styled.button`width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;`;
const AuditProcessSection = styled.section`padding: 140px 0; background: #fff;`;
const AuditContainer = styled.div`max-width: 1100px; margin: 0 auto; .audit-title { font-size: clamp(36px, 4.5vw, 60px); font-weight: 700; text-align: center; margin-bottom: 90px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid ${COLORS.borderColor}; border-radius: 4px; overflow: hidden; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`
    padding: 80px 60px; border-right: ${props => props.idx % 2 === 0 ? "1.5px solid " + COLORS.borderColor : "none"}; 
    border-bottom: ${props => props.idx < 2 ? "1.5px solid " + COLORS.borderColor : "none"}; 
    h3 { font-size: 26px; font-weight: 700; margin-bottom: 25px; } 
    p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }
    @media (max-width: 900px) { border-right: none; }
`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 30px;`;
const PageTenSection = styled.section`padding: 100px 0 160px; background: white;`;
const PageTenInner = styled.div`max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 130px; padding: 0 24px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`max-width: 1000px; text-align: left; @media (max-width: 850px) { text-align: center; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4.5vw, 45px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`display: relative; width: 100%; position: relative;`;
const FAQContent = styled.div`display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4.5vw, 50px); font-weight: 700; line-height: 1.1; letter-spacing: -2px; }`;
const FAQRight = styled.div`width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`
    border-top: 1.5px solid #f1f3f7; padding: 32px 0; cursor: pointer; &:last-child { border-bottom: 1.5px solid #f1f3f7; }
    .q-header { display: flex; justify-content: space-between; h3 { font-size: 19px; font-weight: 600; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: #bbb; border: 1.5px solid #f1f3f7; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; } }
    .a-body p { margin-top: 25px; color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }
`;
const BackgroundCurve = styled.div`position: absolute; left: -100px; top: 0; width: 600px; height: 600px; background: radial-gradient(circle, rgba(26,65,230,0.03) 0%, transparent 70%); z-index: 0; pointer-events: none;`;
const BlogSection = styled.section`padding: 130px 0 160px; background: #f7faff; border-top: 1.5px solid #edf2f8;`;
const BlogContainer = styled.div`max-width: 1320px; margin: 0 auto; padding: 0 40px;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 70px;`;
const BlogTitle = styled.h2`font-size: clamp(34px, 5vw, 60px); font-weight: 700; letter-spacing: -3px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; cursor: pointer; display: flex; align-items: center; gap: 15px; font-size: clamp(24px, 3.5vw, 32px); font-weight: 700; &:hover { opacity: 0.8; }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; padding: 20px 0; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
    min-width: 480px; background: #fff; height: 260px; display: flex; border-radius: 4px; overflow: hidden; border: 1.5px solid #f1f3f7; transition: 0.3s; cursor: pointer;
    &:hover { transform: translateY(-10px); border-color: ${COLORS.lime}; box-shadow: 0 20px 40px rgba(0,0,0,0.05); } 
    .card-img { width: 42%; height: 100%; img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; } } &:hover img { transform: scale(1.08); }
    .card-content { padding: 40px; width: 58%; display: flex; flex-direction: column; h3 { font-size: 20px; font-weight: 700; margin: 15px 0; } .tag { color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 800; text-transform: uppercase; } .date { margin-top: auto; font-size: 14px; color: #a1abc2; } }
    @media (max-width: 700px) { min-width: 85vw; flex-direction: column; height: auto; .card-img, .card-content { width: 100%; } .card-img { height: 200px; } }
`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 58px; height: 58px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; &:hover { background: ${COLORS.coaxBlue}; color: #fff; }`;
const DecoStar = styled.div`position: absolute; right: 50px; bottom: 30px;`;

// --- END OF FILE ---
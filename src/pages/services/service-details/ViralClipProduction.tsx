"use client";

/**
 * FILE: ViralClipProduction.tsx
 * PATH: /services/viral-clip-production
 * MISSION: Engineer high-retention short-form video assets designed for organic viral distribution.
 * CODE: Standard Agency High-Fidelity Logic (Logic-and-Layout Match)
 * VERSION: 1.0 (Final Signature Elite Build)
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
  Video,
  Camera,
  Layers,
  Monitor,
  Volume2,
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
 * DATA SOURCE: ELITE VIRAL CLIP PRODUCTION CONTENT
 * ============================================================================
 */

const PRODUCTION_STANDARDS = [
  { 
    id: "WPCS", 
    title: "The Sub-3 Second Hook Architecture", 
    desc: "We engineer visual and verbal opening sequences that trigger an immediate dopamine response, stopping the scroll habit and forcing the algorithm to acknowledge user intent." 
  },
  { 
    id: "BLOCK", 
    title: "Dynamic Kinetic Typography", 
    desc: "Our captioning logic utilizes custom motion-tracking and psychological font pacing to enhance readability, allowing viewers to consume your content perfectly—even on mute." 
  },
  { 
    id: "SECURITY", 
    title: "Visual Brand-Continuity LUTs", 
    desc: "Every clip is color-graded with proprietary Code Nest signature looks. This creates immediate brand recognition within the explorer feeds of TikTok, Reels, and Shorts." 
  },
  { 
    id: "CWV", 
    title: "Retention Loop Logic", 
    desc: "We edit for 'infinite loops,' using sound-matching and seamless visual transitions that trick the platform's 'Average Watch Time' metric, catapulting assets into broader viral circles." 
  }
];

const BENEFITS_DATA = [
  {
    title: "Drastic engagement lift velocity",
    desc: "Short-form video is currently the only medium delivering a 50x-100x return on organic reach. Our production cycles ensure you are consistently appearing in new 'Recommended' feeds without ad-spend dependency."
  },
  {
    title: "Cognitive Authority positioning",
    desc: "People buy from people. Viral clips humanize your technical offerings, placing a face and a voice behind your narrative that establishes faster trust and positions you as a leading subject matter influencer."
  },
  {
    title: "High-Frequency multi-channel scaling",
    desc: "We don't believe in single-use assets. One strategic filming session provides a 30-day arsenal of high-performing clips that populate LinkedIn, TikTok, Instagram, and YouTube Shorts simultaneously."
  },
  {
    title: "Direct Conversion micro-tunnels",
    desc: "Every clip has a mission. We design 'Comment Hooks' and 'Visual Directives' that move a viral viewer from a passive observer to an active subscriber or high-intent lead in your CRM."
  },
  {
    title: "Platform-specific algorithmic sync",
    desc: "What works on Reels often fails on TikTok. Our editors adjust pacing, music trends, and metadata per platform, ensuring your assets are natively compliant with each network's unique discovery logic."
  },
  {
    title: "Minimized Content production fatigue",
    desc: "Stop spending hours trying to edit your own content. We act as your fractional creative director and post-production lab, taking raw footage and returning polished, viral-ready master-assets in under 48 hours."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Scientific Hook Mapping", 
    desc: "We don't 'guess' what works. We utilize real-time performance data from top creators to identify specific visual triggers that guarantee high engagement scores across your specific industry niche." 
  },
  { 
    num: "/ 02", 
    title: "Luxury Creator Aesthetics", 
    desc: "Corporate videos are too stiff for social. We utilize creator-first editing styles—fast cuts, zoom-jump transitions, and dynamic sound design—that match the high-end quality of global viral stars." 
  },
  { 
    num: "/ 03", 
    title: "End-to-End Visual Narrative", 
    desc: "We bridge the gap between technical SaaS engineering and lifestyle marketing. We make complex concepts visually engaging and easy to consume for C-suite decision-makers scrolling LinkedIn." 
  },
  { 
    num: "/ 04", 
    title: "Psychologically Tuned Audio", 
    desc: "We layer in frequency-enhanced background tracks and subtle foley work to increase viewer immersion. High-quality audio is the single most important factor in video retention scores." 
  },
  { 
    num: "/ 05", 
    title: "Infinite Content Repurposing", 
    desc: "We are efficiency-first. We specialize in 'Core Extract' editing—finding the 60 seconds of pure gold within your long-form webinars, podcasts, or zoom meetings and amplifying it." 
  },
  { 
    num: "/ 06", 
    title: "Transparent Creative ROI", 
    desc: "You won't wonder if a video 'worked.' We provide monthly data reviews showing watch-time distribution, earned organic media value (EMV), and specific follower growth attributable to each series." 
  }
];

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Alex Thorne",
    role: "CEO, NexaStream",
    company: "NexaStream",
    quote: "The clips Code Nest produces for my personal brand are unbelievable. My LinkedIn followers doubled in three months, and we are closing 30% more enterprise deals because of my increased authority.",
    imgSrc: "/assets/feedback/alex.jpg",
    serviceTag: "Short-Form Production",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Clara Valez",
    role: "Founding Partner, Glow Ventures",
    company: "Glow Ventures",
    quote: "Finding an agency that understands VC and tech culture is hard. They turn our dense technical content into TikTok clips that actually reach the 25-34 demographic with zero cringe factor.",
    imgSrc: "/assets/feedback/clara.jpg",
    logoSrc: "/assets/feedback/glow-logo.png",
    serviceTag: "Viral Content Strategy",
    ctaText: "Watch the Clips",
  },
  {
    id: 3,
    name: "Marco Rossi",
    role: "Founder, Alpha Athletics",
    company: "Alpha Athletics",
    quote: "Our ROAS on paid social improved because our organic clips warmed the audience so well. Code Nest is the most important creative partner we have. They understand visual hook velocity perfectly.",
    imgSrc: "/assets/feedback/marco.jpg",
    serviceTag: "Cross-Channel Video",
    ctaText: "See Performance Stats",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Camera size={28} />,
    title: "Visual Footprint Diagnosis",
    desc: "We audit your current raw-content capability. We look at your filming setup, lighting basics, and camera presence to provide immediate actionable fixes that increase your production floor quality."
  },
  {
    icon: <Layers size={28} />,
    title: "Content Extract Strategy",
    desc: "We comb through your historical long-form videos (Podcasts, Meetings, Webinars). We identify the 'Narrative Gems' that can be engineered into 30-60 second standalone assets for immediate distribution."
  },
  {
    icon: <Video size={28} />,
    title: "Algorithmic Hook Design",
    desc: "Here we craft 10-15 high-performing hooks specific to your niche. These are 'scroll-stoppers' designed to align with current trending conversational seeds while maintaining professional integrity."
  },
  {
    icon: <Monitor size={28} />,
    title: "Master Production Roadmap",
    desc: "The final deliverable is a batch-filming calendar and editing protocol. You spend 2 hours filming a month; we spend 40 hours editing, and your brand dominates social timelines every single day."
  }
];

const FAQ_DATA = [
    {
        question: "Do I need expensive camera gear to get viral results?",
        answer: "No. Modern smartphone sensors are incredible. Viral results depend 80% on editing pacing, hook selection, and lighting. We provide the protocol to look high-end using only what is in your pocket."
    },
    {
        question: "How long is your standard turnaround for a batch of clips?",
        answer: "From receiving raw footage to providing a set of edited viral masters, we typically have a 48 to 72-hour turnaround time, allowing your brand to stay hyper-reactive to trending topics."
    },
    {
        question: "What is the recommended posting frequency?",
        answer: "For maximum algorithmic lift, we recommend a minimum of 1 short-form video per day across all channels. Our 'Scaling Batch' model is designed to deliver 25-30 clips per month to cover this schedule easily."
    },
    {
        question: "Do you also manage the actual posting and metadata?",
        answer: "Yes, our 'concierge' level package includes account management where we handle the scheduling, caption optimization, and engagement for your Shorts, TikToks, and Reels accounts."
    },
    {
        question: "Can we use these clips for Paid Ads as well?",
        answer: "Absolutely. Our organic clips are perfect for 'Whitelisting' or running as Spark Ads/Reels ads, as they already have a proven engagement history from the organic testing phase."
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
 * COMPONENT: ViralClipProduction
 * ============================================================================
 */

export default function ViralClipProduction() {
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

  // BLOG & SLIDER INIT
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
              <strong>Viral Clip Production</strong>
            </Breadcrumbs>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
            >
              Short-Form Social <br /> Retention Service
            </motion.h1>
            <ButtonGroup>
              <MainBtn>Fix My Distribution</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>
              We transform your brand insights into high-velocity, scroll-stopping video assets 
              that thrive on algorithmic discovery and human psychology.
            </HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Watch Time</span><div className="stars">★★★★★ <span className="val">Top Tier Rank</span></div></RatingItem>
              <RatingItem><span className="brand">Production</span><div className="stars">★★★★★ <span className="val">Creator Caliber</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Social Velocity Analysis</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">
            Engineer your brand's <br /> visibility through <br /> relentless short-form
          </motion.h2>
          <RightContentBlock>
            <p>Our video audit reveals why your current assets are getting skipped. We pinpoint the exact timestamp of narrative decay and provide the 'Structural Fix' to double your average view duration in weeks, not years.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Unlock Content Velocity Audit</BlueTextBtn>
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
            <h2 className="section-title">Video engineering <br /> standards provided by <br /> Code Nest labs</h2>
            <AccordionList>
                {PRODUCTION_STANDARDS.map((item) => (
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
        <SectionHeader white>Performance Delivery Assets</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "The Scroll Guard", desc: "Psychological visual anchors that catch the human eye during the 0.5s decision window." },
            { id: "02.", title: "Algorithm Priming", desc: "Hard-coding engagement loops to signal TikTok and Meta's native distribution engines." },
            { id: "03.", title: "Identity LUTs", desc: "Custom color-theory presets that define your brand voice aesthetically across platforms." },
            { id: "04.", title: "Batching Velocity", desc: "Turning 1 hour of camera time into a month of daily automated organic presence." },
            { id: "05.", title: "Technical Hooks", desc: "Translating complex B2B jargon into high-engagement human storytelling patterns." },
            { id: "06.", title: "conversion Labels", desc: "Placing visual directives at 'Engagement Peaks' to push traffic toward lead forms." }
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
            Maximum attention capture <br /> for modern brands
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
          Why choose Code Nest for your <br /> content distribution lab?
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
            <BannerText>Evaluate your short-form ROI capability</BannerText>
            <DownloadBtn>
              Download Visual Impact Checklist
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
            <SubHeader>Visual Influence</SubHeader>
            <HeaderTitle>Short-form performance proofs</HeaderTitle>
            <HeaderDesc>
                Watch time is the only true digital currency. We partner with firms 
                ready to trade technical jargon for widespread industry recognition.
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
              Viral Lifecycle Blueprint
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
                    <BannerTitle10>Capture Attention — Build Brand Equity</BannerTitle10>
                    <ConsultBtn> Schedule Your Clip Discovery <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> </ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft> <h2>Retention Intelligence <br /> & Distribution Insights</h2> </FAQLeft>
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

      {/* --- 11. BLOG --- */}
      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper>
                <BlogTitle>Production Edge.<br /><BlogLink onClick={() => navigate('/blog')}>Visual Archive <ArrowUpRight size={32} /></BlogLink></BlogTitle>
             </BlogHeaderWrapper>
             {loadingBlogs ? ( <div style={{ textAlign: "center", color: COLORS.textGray }}>Decoding Engagement Signals...</div> ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600';
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img"><img src={featuredImg} alt="blog" /></div>
                                <div className="card-content">
                                   <span className="tag">Viral Insights</span>
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
// ALL STYLED COMPONENTS (ZERO-MISSING POLICY)
// ==========================================

const PageWrapper = styled.div`background: #fff; overflow-x: hidden; font-family: 'Inter', sans-serif;`;
const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: #fff; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center; position: relative;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; h1 { color: #fff; font-size: clamp(50px, 6vw, 92px); line-height: 1.1; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: #fff; opacity: 0.7; text-decoration: none; } strong { color: #fff; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }`;
const ButtonGroup = styled.div`display: flex; height: 62px;`;
const MainBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer; &:hover { opacity: 0.9; }`;
const IconBtn = styled.div`background: #fff; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; line-height: 1.6; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 700; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; .val { color: #fff; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;
const AbstractGraphicSVG = () => (
    <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
        <rect x="220" y="50" width="60" height="400" fill={COLORS.lime} opacity="0.4" rx="30" />
        <rect x="50" y="220" width="400" height="60" fill={COLORS.lime} opacity="0.4" rx="30" />
        <motion.circle cx="250" cy="250" r="100" fill="#fff" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }} />
    </motion.svg>
);
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection};`;
const BadgeWrapper = styled.div`background: #fff; padding: 10px 18px; color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 700; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 50px; display: inline-flex; align-items: center; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; margin-right: 10px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; .audit-heading { font-size: clamp(38px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2.5px; } @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; color: ${COLORS.textGray}; line-height: 1.7; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: #fff; border: none; padding: 0 30px; font-size: 14px; font-weight: 700; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;
const StandardsContainer = styled.section`padding: 140px 10%; background: #fff;`;
const StandardsInner = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: 60px; font-weight: 600; line-height: 1.1; } @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`
    border-top: 1px solid ${COLORS.borderColor}; padding: 35px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; }
    .header { display: flex; align-items: center; gap: 30px; cursor: pointer; h3 { font-size: 21px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .btn-box { width: 26px; height: 26px; border: 1.5px solid #ddd; color: ${COLORS.coaxBlue}; font-weight: 800; display: flex; align-items: center; justify-content: center; } }
    .content-body p { padding: 25px 0 0 56px; font-size: 16px; color: ${COLORS.textGray}; line-height: 1.7; }
`;
const GridSection = styled.section`padding: 120px 10%; background: ${COLORS.coaxBlue}; color: white;`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; font-weight: 700; margin-bottom: 60px; color: white;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; padding: 45px; min-height: 300px; position: relative;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-num { font-size: 11px; font-weight: 800; color: ${COLORS.coaxBlue}; display: block; margin-bottom: 30px; }
    h3 { font-size: 25px; font-weight: 700; margin-bottom: 20px; line-height: 1.1; } p { font-size: 16px; line-height: 1.5; }
`;
const BenefitsContainer = styled.section`padding: 140px 0; background: #fff; .title-wrapper { text-align: center; margin-bottom: 80px; h2 { font-size: 64px; font-weight: 700; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1.5px solid #f1f3f7; border-bottom: 1.5px solid #f1f3f7; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
    padding: 90px 12%; border-right: ${props => props.isLeft ? "1.5px solid #f1f3f7" : "none"}; border-bottom: 1.5px solid #f1f3f7; 
    h4 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }
    @media (max-width: 900px) { border-right: none; }
`;
const BlueCardSection = styled.section`padding: 150px 10%; background: ${COLORS.coaxBlue}; text-align: center; .centered-header { color: #fff; font-size: 58px; font-weight: 700; margin-bottom: 90px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; padding: 45px; text-align: left;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-index { font-weight: 800; margin-bottom: 35px; opacity: 0.6; } h3 { font-size: 26px; font-weight: 700; line-height: 1.1; margin-bottom: 25px; } .card-text { font-size: 16px; }
`;
const PageSevenContainer = styled.div`padding: 80px 10%;`;
const BannerWrapper = styled.div`background: linear-gradient(110deg, #1d4ed8 0%, #091db1 100%); padding: 80px 40px; border-radius: 4px; overflow: hidden; position: relative;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 5; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 40px; }`;
const BannerText = styled.h2`color: #fff; font-size: 42px; font-weight: 700; letter-spacing: -2px; line-height: 1.1;`;
const DownloadBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 22px 35px; border-radius: 4px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 20px; transition: 0.3s;`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; pointer-events: none; opacity: 0.3;`;
const Section8 = styled.section`padding: 130px 0; background: #f8faff; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; z-index: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.coaxBlue} 1.2px, transparent 1.2px); background-size: 50px 50px; opacity: 0.05;`;
const OrbOne = styled(motion.div)`position: absolute; top: -15%; left: -10%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(26,65,230,0.1) 0%, transparent 75%); border-radius: 50%; filter: blur(80px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -20%; right: -15%; width: 850px; height: 850px; background: radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 75%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1150px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 5;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 750px; margin: 0 auto 70px;`;
const SubHeader = styled.h4`color: ${COLORS.coaxBlue}; text-transform: uppercase; font-size: 13px; font-weight: 800; letter-spacing: 2px; margin-bottom: 20px;`;
const HeaderTitle = styled.h2`font-size: 52px; font-weight: 700; letter-spacing: -2px; color: ${COLORS.textDark};`;
const HeaderDesc = styled.p`font-size: 19px; line-height: 1.6; color: ${COLORS.textGray};`;
const SliderWrapper = styled.div`position: relative; width: 100%; height: 500px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(26,65,230,0.12); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const StackLayerTwo = styled.div`position: absolute; inset: 22px -22px -22px 22px; background: ${COLORS.coaxBlue}; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const CardWindow = styled.div`position: relative; height: 100%; width: 100%; z-index: 10;`;
const CardFrame = styled(motion.div)`background: #fff; height: 100%; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%); overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.08); @media (max-width: 850px) { height: auto; clip-path: none; padding-bottom: 50px; }`;
const InnerGrid = styled(motion.div)`display: grid; grid-template-columns: 44% 56%; height: 100%; @media (max-width: 850px) { grid-template-columns: 1fr; }`;
const ImageSide = styled.div`height: 100%; background: #eee; position: relative;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; bottom: 30px; right: 30px; width: 110px; padding: 10px; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1);`;
const ContentSide = styled.div`padding: 60px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 11px; font-weight: 800; color: ${COLORS.coaxBlue}; text-transform: uppercase; margin-bottom: 25px; border-left: 3px solid ${COLORS.lime}; padding-left: 12px;`;
const QuoteIcon = styled.div`font-size: 80px; font-family: serif; color: ${COLORS.coaxBlue}; opacity: 0.6; line-height: 1;`;
const QuoteText = styled.p`font-size: 21px; font-style: italic; color: ${COLORS.textDark}; margin-bottom: 30px; line-height: 1.5; font-weight: 500;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 19px; font-weight: 700;`;
const AuthorRole = styled.div`font-size: 14px; color: ${COLORS.textGray}; margin-top: 5px;`;
const AuthorCompany = styled.span`color: ${COLORS.coaxBlue}; font-weight: 800; margin-left: 6px; &:before { content: "|"; color: #ddd; margin: 0 8px; }`;

// Missing defined Styled Component for CtaButton
const CtaButton = styled.button`
    margin-top: 25px; border: none; padding: 14px 28px; background: ${COLORS.coaxBlue}; color: #fff;
    border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 600;
`;

const Controls = styled.div`display: flex; gap: 15px; position: absolute; bottom: -85px; width: 100%; justify-content: center; z-index: 50;`;
const NavBtn = styled.button`width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;`;
const AuditProcessSection = styled.section`padding: 140px 0; background: #fff;`;
const AuditContainer = styled.div`max-width: 1100px; margin: 0 auto; .audit-title { font-size: 60px; font-weight: 700; text-align: center; margin-bottom: 100px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid ${COLORS.borderColor}; border-radius: 4px; overflow: hidden; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`
    padding: 80px 60px; border-right: ${props => (props.idx % 2 === 0 ? "1.5px solid "+COLORS.borderColor : "none")}; 
    border-bottom: ${props => (props.idx < 2 ? "1.5px solid "+COLORS.borderColor : "none")}; 
    h3 { font-size: 26px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }
    @media (max-width: 900px) { border-right: none; }
`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 30px;`;
const PageTenSection = styled.section`padding: 100px 0 160px; background: #fff;`;
const PageTenInner = styled.div`max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 130px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`max-width: 1000px; text-align: left; @media (max-width: 850px) { text-align: center; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 45px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`display: relative; position: relative;`;

// Missing defined Styled Component for FAQContent
const FAQContent = styled.div`
    display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const FAQLeft = styled.div`h2 { font-size: 52px; font-weight: 700; line-height: 1.1; }`;
const FAQRight = styled.div`width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1.5px solid #f1f3f7; padding: 30px 0; cursor: pointer; .q-header { display: flex; justify-content: space-between; align-items: center; h3 { font-size: 20px; font-weight: 600; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: #ccc; border: 1.5px solid #eee; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; } } .a-body p { margin-top: 25px; font-size: 16.5px; line-height: 1.75; color: ${COLORS.textGray}; }`;
const BackgroundCurve = styled.div`position: absolute; left: -100px; top: 0; width: 600px; height: 600px; background: radial-gradient(circle, rgba(26,65,230,0.03) 0%, transparent 70%); pointer-events: none;`;
const BlogSection = styled.section`padding: 130px 0; background: #f7faff; border-top: 1.5px solid #edf2f7;`;
const BlogContainer = styled.div`max-width: 1320px; margin: 0 auto; padding: 0 40px;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 70px; h2 { font-size: 60px; font-weight: 700; letter-spacing: -2px; }`;
const BlogTitle = styled.h2`font-size: 60px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; cursor: pointer; display: inline-flex; align-items: center; gap: 15px; font-size: 32px; &:hover { opacity: 0.8; }`;
const BlogSliderOuter = styled.div`overflow: hidden;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; padding: 20px 0; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
    min-width: 480px; display: flex; background: #fff; height: 260px; border-radius: 4px; border: 1.5px solid #f1f3f7; transition: 0.3s; cursor: pointer;
    &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } .card-img { width: 42%; img { width: 100%; height: 100%; object-fit: cover; } }
    .card-content { width: 58%; padding: 40px; display: flex; flex-direction: column; h3 { font-size: 20px; font-weight: 700; margin: 15px 0; } .tag { color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 800; text-transform: uppercase; } .date { margin-top: auto; font-size: 14px; color: #a1abc3; } }
`;
const SliderControls = styled.div`display: flex; gap: 15px; margin-top: 20px;`;
const SliderButton = styled.button`width: 58px; height: 58px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; &:hover { background: ${COLORS.coaxBlue}; color: #fff; }`;
const DecoStar = styled.div`position: absolute; right: 50px; bottom: 30px; opacity: 0.6;`;

// --- END OF SERVICE-DETAILS ARCHIVE ---
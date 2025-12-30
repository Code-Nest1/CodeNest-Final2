"use client";

/**
 * FILE: PPCManagement.tsx
 * PATH: /services/ppc-campaign-management
 * MISSION: Architect high-intent paid acquisition funnels with precision ROI engineering.
 * CODE: Standard Agency High-Fidelity Logic (Logic-and-Layout Match)
 * VERSION: 1.0 (Elite Performance Build)
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
  Target,
  Activity,
  BarChart,
  Shield,
  Search,
  Zap,
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
 * DATA SOURCE: ELITE PPC MANAGEMENT CONTENT
 * ============================================================================
 */

const PPC_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Algorithmic Yield Optimization", 
    desc: "We leverage proprietary bidding logic that interfaces with platform machine learning to ensure every dollar is allocated to the segments with the highest probability of conversion." 
  },
  { 
    id: "BLOCK", 
    title: "Full-Stack Attribution Guard", 
    desc: "Modern privacy shifts require a server-side tracking approach. We implement CAPI and GTM Server-Side protocols to maintain accurate conversion data in a cookieless environment." 
  },
  { 
    id: "SECURITY", 
    title: "Brand-Safety Exclusion Lists", 
    desc: "Your ads will never appear alongside harmful or irrelevant content. We manage rigorous keyword and placement exclusion lists to protect your institutional reputation 24/7." 
  },
  { 
    id: "CWV", 
    title: "The Quality Score Coefficient", 
    desc: "Our engineers synchronize your landing pages with ad copy. By maximizing the 'Relevance Index,' we drastically reduce your Cost Per Click (CPC) and improve ad positioning for less spend." 
  }
];

const BENEFITS_DATA = [
  {
    title: "Rapid revenue scaling velocity",
    desc: "Unlike organic methods, PPC is an on-demand growth valve. We design 'Scaling Pipelines' that allow your brand to capture immediate market share by out-bidding and out-thinking competitors for high-intent traffic."
  },
  {
    title: "Precision audience laser-mapping",
    desc: "We go beyond basic demographics. We map interest clusters, behavioral past-purchase data, and psychographic intent to ensure your ads are only presented to customers ready to perform high-value actions."
  },
  {
    title: "Compounding ROAS efficiency",
    desc: "We don't believe in 'setting and forgetting.' Through granular negative keyword mining and audience pruning, we cut budget waste within the first 30 days, reallocating those funds to high-ROI growth loops."
  },
  {
    title: "Omnichannel remarketing ecosystems",
    desc: "Most conversions happen after the 5th touchpoint. We architect intelligent cross-platform sequences that nudge prospects back into your funnel, ensuring no high-intent visitor is ever permanently lost."
  },
  {
    title: "Deep competitive data-mining",
    desc: "We don't work in a vacuum. We monitor competitor spend, creative variants, and bidding wars in real-time, allowing our team to pivot your strategy instantly when we identify a market weakness we can exploit."
  },
  {
    title: "Predictive spend forecasting",
    desc: "Marketing shouldn't be a gamble. We utilize historical performance data and market trends to provide specific 'Yield Maps,' telling you exactly what revenue to expect based on your chosen budget levels."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Technical Search Engineers", 
    desc: "We are more than marketers—we are data analysts. We solve the technical backend tracking issues that typical agencies miss, ensuring that your data flows 1:1 between your CRM and Google Ads." 
  },
  { 
    num: "/ 02", 
    title: "Aggressive Creative A/B Cycles", 
    desc: "Copy that worked last week might fail tomorrow. We run high-velocity creative stress tests across imagery and headlines, ensuring we always serve the narrative variant that drives the lowest CAC." 
  },
  { 
    num: "/ 03", 
    title: "Semantic Bidding Models", 
    desc: "Our specialists focus on 'Topic Integrity.' We bid on conversational intent rather than just words, capturing buyers in the discovery phase and leading them directly to a custom-designed solution page." 
  },
  { 
    num: "/ 04", 
    title: "Zero-Fatality Campaign Monitoring", 
    desc: "Account suspensions can kill a brand's quarter. Our team provides compliance-grade monitoring of your account health, ensuring all policy guidelines are met before they become business-stalling problems." 
  },
  { 
    num: "/ 05", 
    title: "Transparent Outcome Reporting", 
    desc: "We hide nothing. You get a live 24/7 dashboard showing exactly where your money went, how many leads were generated, and what your exact Return on Ad Spend (ROAS) is at any second." 
  },
  { 
    num: "/ 06", 
    title: "Integrated Funnel Engineering", 
    desc: "An ad is only as good as the page it lands on. We provide conversion-centered optimization (CRO) for your landing pages, ensuring the traffic we buy actually pays for itself at the highest rate." 
  }
];

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "James Henderson",
    role: "CEO at Orion SaaS",
    company: "Orion",
    quote: "Our Google Ads campaign was bleeding budget with 0.8% CTR. Code Nest took over and within 90 days we were hitting a 4:1 ROAS on our highest-value enterprise software terms. They transformed our spend.",
    imgSrc: "/assets/feedback/james-h.jpg",
    serviceTag: "Performance Ads Strategy",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Marcus Verner",
    role: "Founder, Peak Apparel",
    company: "Peak Apparel",
    quote: "Scaling our Meta Ads spent to $100k/month seemed impossible without killing margins. Codenest engineered a lookalike structure that stabilized our customer acquisition costs beautifully.",
    imgSrc: "/assets/feedback/marcus.jpg",
    logoSrc: "/assets/feedback/peak-logo.png",
    serviceTag: "Cross-Platform Growth",
    ctaText: "View Scaling Data",
  },
  {
    id: 3,
    name: "Sarah Lindgren",
    role: "Marketing Director, HealthTech Lab",
    company: "HealthTech Lab",
    quote: "Precision targeting for healthcare professionals is notoriously difficult. Their LinkedIn strategy delivered lead volume 3x higher than our previous organic approach in just the first quarter.",
    imgSrc: "/assets/feedback/sarah-l.jpg",
    serviceTag: "B2B Lead Generation",
    ctaText: "See the Strategy",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Search size={28} />,
    title: "Tracking & Signal Audit",
    desc: "We perform a forensic investigation into your GTM container and pixel tracking. If your data isn't clean, your campaigns will never scale. We fix broken tags first to ensure the machine has the right information."
  },
  {
    icon: <Target size={28} />,
    title: "Structure Stress-Test",
    desc: "We analyze your account architecture against 'Standard of Excellence' benchmarks. We identify keyword overlaps, bidding cannibalization, and negative list gaps that are silently draining your budget daily."
  },
  {
    icon: <Zap size={28} />,
    title: "Creative-Gap Analysis",
    desc: "Here we examine your CTR and conversion history. We find the specific assets that resonate and pinpoint why others fail, developing a specific visual 'Hooks' library for the execution phase."
  },
  {
    icon: <Shield size={28} />,
    title: "Scale Potential Blueprint",
    desc: "The audit results in a prioritized 'Market Capture Roadmap.' We show you exactly how much spend the market can absorb at your current profit margin before you hit the point of diminishing returns."
  }
];

const FAQ_DATA = [
    {
        question: "How much ad spend do we need to start seeing results?",
        answer: "While we can optimize for any budget, we typically suggest a minimum 'learning budget' of $3,000–$5,000 per month for established brands to allow the platform algorithms enough data points to reach statistical significance quickly."
    },
    {
        question: "Do you charge a flat fee or a percentage of ad spend?",
        answer: "We utilize a performance-incentivized hybrid model. A baseline management fee ensures focused architectural quality, while a minor success-based commission ensures our goals are perfectly aligned with your scaling revenue."
    },
    {
        question: "What platforms do you manage besides Google Ads?",
        answer: "Code Nest provides full-cycle management for Meta (Instagram/Facebook), LinkedIn, YouTube, and Amazon Ads. Our goal is to meet your customers at whichever stage of the 'Awareness Loop' they currently reside."
    },
    {
        question: "How long is your standard commitment?",
        answer: "Ad performance takes time to calibrate through machine learning. We typically look for an initial 90-day window to complete the technical audit, baseline stabilization, and initial scale-testing phase for maximum long-term results."
    },
    {
        question: "Will we own the ad accounts if we stop working together?",
        answer: "Always. Transparency is a Code Nest core value. You retain full ownership and administrative access to all your platforms, pixels, and data—forever. We are here to partner with you, not gatekeep your assets."
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
 * COMPONENT: PPCManagement
 * ============================================================================
 */

export default function PPCManagement() {
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

  // BLOG & FEEDBACK INIT
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
              <strong>PPC Campaign Management</strong>
            </Breadcrumbs>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
            >
              Precision High-Yield <br /> Paid Growth service
            </motion.h1>
            <ButtonGroup>
              <MainBtn>Optimize My Ad Spend</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>
              We design aggressive, performance-engineered paid ecosystems that bypass click-waste 
              and target immediate conversion results with measurable 4x to 10x ROAS.
            </HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Google Ads</span><div className="stars">★★★★★ <span className="val">Premier Partner</span></div></RatingItem>
              <RatingItem><span className="brand">Meta Marketing</span><div className="stars">★★★★★ <span className="val">Direct Level</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> ROAS Recovery Service</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">
            Measure the specific <br /> dollar efficiency <br /> of every paid click
          </motion.h2>
          <RightContentBlock>
            <p>Our audit identifies exactly where your ad spend is leaking. We provide the structural engineering required to stop 'Bot Bloat' and poor algorithmic placement, ensuring you buy the market, not just clicks.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Unlock Spend Analysis Audit</BlueTextBtn>
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
            <h2 className="section-title">Performance benchmarks <br /> established by our lead <br /> growth engineers</h2>
            <AccordionList>
                {PPC_STANDARDS.map((item) => (
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
        <SectionHeader white>Account Dominance Metrics</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Low CPC Scaling", desc: "Developing 'Authority Ads' that platforms naturally prioritize for cheaper inventory." },
            { id: "02.", title: "Negative Integrity", desc: "24/7 scanning for budget-bleeding keywords that don't match your buyers' intent." },
            { id: "03.", title: "conversion Focus", desc: "Setting the 'Final Pixel' markers so the machine knows exactly what a win looks like." },
            { id: "04.", title: "Dynamic Remarketing", desc: "Closing the loop for users who didn't convert on the first visit with smarter creative." },
            { id: "05.", title: "Structural Logic", desc: "Designing campaign hierarchies that prevent overlap and internal account bidding wars." },
            { id: "06.", title: "Revenue Velocity", desc: "Calculating 'Dollar Lead-to-Sale' speed to adjust scaling aggressively each week." }
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
          <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            Maximum Yield for your <br /> scaling ad infrastructure
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
          Why choose Code Nest to <br /> manage your growth spend?
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

      {/* --- 7. CHECKLIST BANNER --- */}
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
            <BannerText>Assess your dollar attribution health</BannerText>
            <DownloadBtn>
              Download PPC Scaling Checklist
              <ArrowDown size={18} style={{ marginLeft: "auto", color: '#000' }} /> 
            </DownloadBtn>
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
            <SubHeader>Growth Culture</SubHeader>
            <HeaderTitle>Paid performance milestones</HeaderTitle>
            <HeaderDesc>
                Successful scaling requires moving beyond "Buying Traffic." We partner 
                with firms who need defensive data-integrity and offensive market expansion.
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
              Our Ad Account Stress-Test
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
                    <BannerTitle10>Stop the budget bleed — Start scaling today</BannerTitle10>
                    <ConsultBtn> Book a Free Spend Optimization <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> </ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft> <h2>PPC Strategy & Yield <br /> Questions answered</h2> </FAQLeft>
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
                <BlogTitle>Ad Science.<br /><BlogLink onClick={() => navigate('/blog')}>The Yield Journal <ArrowUpRight size={32} /></BlogLink></BlogTitle>
             </BlogHeaderWrapper>
             {loadingBlogs ? ( <div style={{ textAlign: "center", color: COLORS.textGray }}>Mining Search Insights...</div> ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600';
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img"><img src={featuredImg} alt="blog" /></div>
                                <div className="card-content">
                                   <span className="tag">Paid Performance</span>
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
// STYLED COMPONENTS (TOTAL FIDELITY BUILD)
// ==========================================

const PageWrapper = styled.div`background: #fff; overflow-x: hidden; font-family: 'Inter', sans-serif;`;
const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: #fff; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center; position: relative;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; h1 { color: #fff; font-size: clamp(48px, 6vw, 92px); line-height: 1.1; font-weight: 700; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; opacity: 0.7; text-decoration: none; } strong { color: #fff; }`;
const ButtonGroup = styled.div`display: flex; height: 62px;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: #000; padding: 0 45px; border-radius: 4px 0 0 4px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; &:hover { opacity: 0.9; }`;
const IconBtn = styled.div`background: #fff; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight}; line-height: 1.6;`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 700; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: #fff; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;
const AbstractGraphicSVG = () => (
    <svg viewBox="0 0 500 500" width="100%" height="100%">
        <motion.path d="M50 450 L200 300 L300 350 L450 150" fill="none" stroke={COLORS.lime} strokeWidth="15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
        <motion.circle cx="450" cy="150" r="30" fill="#fff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
    </svg>
);
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection};`;
const BadgeWrapper = styled.div`background: #fff; padding: 10px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 50px; display: inline-flex; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); .dot { width: 6px; height: 6px; border-radius: 50%; background: ${COLORS.coaxBlue}; margin-right: 10px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: center; .audit-heading { font-size: clamp(38px, 4.4vw, 70px); font-weight: 600; line-height: 1.1; } @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; color: ${COLORS.textGray}; line-height: 1.6; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: #fff; padding: 0 30px; font-size: 14px; font-weight: 700; border: none; cursor: pointer; &:hover { background: ${COLORS.darkerBlue}; }`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;
const StandardsContainer = styled.section`padding: 140px 10%; background: #fff;`;
const StandardsInner = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 100px; .section-title { font-size: clamp(34px, 4vw, 68px); line-height: 1.1; } @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`
    border-top: 1px solid ${COLORS.borderColor}; padding: 35px 0;
    .header { display: flex; align-items: center; gap: 30px; cursor: pointer; h3 { font-size: 21px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; transition: color 0.3s; } .btn-box { width: 26px; height: 26px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : "#ddd"}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: ${COLORS.coaxBlue}; } }
    .content-body p { padding: 25px 0 0 56px; color: ${COLORS.textGray}; font-size: 16px; line-height: 1.7; }
`;
const GridSection = styled.section`padding: 120px 10%; background: ${COLORS.coaxBlue}; color: #fff;`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; font-weight: 700; margin-bottom: 60px; color: #fff;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`
    background: ${COLORS.lime}; padding: 45px; min-height: 320px; color: ${COLORS.textDark}; position: relative;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-num { font-weight: 800; font-size: 13px; display: block; margin-bottom: 30px; color: ${COLORS.coaxBlue}; }
    h3 { font-size: 24px; font-weight: 700; margin-bottom: 20px; } p { opacity: 0.9; font-size: 16px; line-height: 1.6; }
`;
const BenefitsContainer = styled.section`padding: 140px 0; .title-wrapper { text-align: center; margin-bottom: 80px; h2 { font-size: 64px; font-weight: 700; line-height: 1.1; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1.5px solid #f1f3f7; border-bottom: 1.5px solid #f1f3f7; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`padding: 90px 12%; border-right: ${props => props.isLeft ? "1.5px solid #f1f3f7" : "none"}; border-bottom: 1.5px solid #f1f3f7; h4 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; }`;
const BlueCardSection = styled.section`padding: 150px 10%; background: ${COLORS.coaxBlue}; text-align: center; .centered-header { color: #fff; font-size: clamp(34px, 4vw, 58px); font-weight: 700; line-height: 1.1; margin-bottom: 90px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background: ${COLORS.lime}; color: ${COLORS.textDark}; padding: 45px; text-align: left; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-weight: 800; margin-bottom: 35px; opacity: 0.5; } h3 { font-size: 24px; font-weight: 700; margin-bottom: 20px; }`;
const PageSevenContainer = styled.div`padding: 100px 5%;`;
const BannerWrapper = styled.div`background: linear-gradient(135deg, ${COLORS.coaxBlue} 0%, ${COLORS.darkerBlue} 100%); padding: 80px 40px; border-radius: 4px; overflow: hidden; position: relative;`;
const BannerContent = styled.div`display: flex; justify-content: space-between; align-items: center; color: #fff; z-index: 5; position: relative; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 40px; }`;
const BannerText = styled.h2`font-size: 42px; font-weight: 700; max-width: 550px; line-height: 1.1;`;
const DownloadBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 22px 35px; border-radius: 4px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 20px; transition: 0.3s;`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; opacity: 0.3;`;
const Section8 = styled.section`padding: 130px 0; background: #f8faff; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.coaxBlue} 1px, transparent 1px); background-size: 50px 50px; opacity: 0.05;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(26,65,230,0.1) 0%, transparent 70%); border-radius: 50%; filter: blur(80px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -10%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%); border-radius: 50%; filter: blur(100px);`;
const Container8 = styled.div`max-width: 1150px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 5;`;
const HeaderWrapper = styled.div`text-align: center; margin-bottom: 70px;`;
const SubHeader = styled.h4`color: ${COLORS.coaxBlue}; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; font-weight: 800; margin-bottom: 20px;`;
const HeaderTitle = styled.h2`font-size: 52px; font-weight: 700; color: ${COLORS.textDark};`;
const HeaderDesc = styled.p`font-size: 18px; color: ${COLORS.textGray}; line-height: 1.6; max-width: 800px; margin: 0 auto;`;
const SliderWrapper = styled.div`position: relative; width: 100%; height: 520px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(26,65,230,0.1); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const StackLayerTwo = styled.div`position: absolute; inset: 22px -22px -22px 22px; background: ${COLORS.coaxBlue}; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const CardWindow = styled.div`position: relative; z-index: 10; height: 100%;`;
const CardFrame = styled(motion.div)`background: #fff; height: 100%; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%); overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.05); @media (max-width: 850px) { height: auto; padding-bottom: 60px; clip-path: none; }`;
const InnerGrid = styled(motion.div)`display: grid; grid-template-columns: 44% 56%; height: 100%; @media (max-width: 850px) { grid-template-columns: 1fr; }`;
const ImageSide = styled.div`background: #f1f1f1; height: 100%;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; bottom: 30px; right: 30px; width: 110px; padding: 10px; background: #fff;`;
const ContentSide = styled.div`padding: 60px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 11px; color: ${COLORS.coaxBlue}; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; border-left: 3px solid ${COLORS.lime}; padding-left: 12px;`;
const QuoteIcon = styled.div`font-size: 80px; font-family: serif; color: ${COLORS.coaxBlue}; opacity: 0.5; line-height: 1;`;
const QuoteText = styled.p`font-size: 21px; font-weight: 500; font-style: italic; color: ${COLORS.textDark}; margin-bottom: 30px; line-height: 1.5;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 19px; font-weight: 700; color: ${COLORS.textDark};`;
const AuthorRole = styled.div`font-size: 14px; color: ${COLORS.textGray}; margin-top: 4px;`;
const AuthorCompany = styled.span`color: ${COLORS.coaxBlue}; font-weight: 800; margin-left: 6px; &:before { content: "|"; color: #ddd; margin-right: 10px; }`;
const CtaButton = styled.button`margin-top: 25px; padding: 14px 28px; background: ${COLORS.coaxBlue}; color: #fff; font-weight: 700; font-size: 14px; border: none; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 8px;`;
const Controls = styled.div`display: flex; gap: 15px; position: absolute; bottom: -80px; width: 100%; justify-content: center; z-index: 50;`;
const NavBtn = styled.button`width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;`;
const AuditProcessSection = styled.section`padding: 140px 0; background: #fff;`;
const AuditContainer = styled.div`max-width: 1100px; margin: 0 auto; .audit-title { font-size: 58px; font-weight: 700; text-align: center; margin-bottom: 90px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid ${COLORS.borderColor}; border-radius: 4px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 80px 60px; border-right: ${props => props.idx % 2 === 0 ? "1.5px solid #e1e5f0" : "none"}; border-bottom: ${props => props.idx < 2 ? "1.5px solid #e1e5f0" : "none"}; h3 { font-size: 28px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; } @media (max-width: 900px) { border-right: none; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 30px;`;
const PageTenSection = styled.section`padding: 100px 0 180px;`;
const PageTenInner = styled.div`max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 140px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`max-width: 1000px;`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4.5vw, 44px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 100px; position: relative; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 60px; }`;
const FAQContent = styled.div`display: contents;`;
const FAQLeft = styled.div`h2 { font-size: 50px; font-weight: 700; line-height: 1.1; letter-spacing: -2px; }`;
const FAQRight = styled.div`width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1.5px solid #f1f3f7; padding: 32px 0; cursor: pointer; .q-header { display: flex; justify-content: space-between; align-items: center; h3 { font-size: 19px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; font-weight: 600; } .icon-box { color: #bbb; border: 1.5px solid #f1f3f7; border-radius: 4px; padding: 4px; } } .a-body p { margin-top: 25px; color: ${COLORS.textGray}; font-size: 16.5px; line-height: 1.7; }`;
const BackgroundCurve = styled.div`position: absolute; left: -100px; top: 0; width: 600px; height: 600px; background: radial-gradient(circle, rgba(26,65,230,0.03) 0%, transparent 70%); pointer-events: none;`;
const BlogSection = styled.section`padding: 130px 0 160px; background: #f8fbff; border-top: 1.5px solid #edf1f8;`;
const BlogContainer = styled.div`max-width: 1320px; margin: 0 auto; padding: 0 40px;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 70px;`;
const BlogTitle = styled.h2`font-size: 56px; font-weight: 700; letter-spacing: -2px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; cursor: pointer; display: flex; align-items: center; gap: 15px; font-size: 32px; font-weight: 700;`;
const BlogSliderOuter = styled.div`overflow: hidden;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; padding: 20px 0; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
    min-width: 480px; background: #fff; height: 260px; display: flex; border-radius: 4px; overflow: hidden; border: 1.5px solid #f1f3f7; transition: 0.3s; cursor: pointer;
    &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } .card-img { width: 42%; img { width: 100%; height: 100%; object-fit: cover; } }
    .card-content { width: 58%; padding: 40px; display: flex; flex-direction: column; h3 { font-size: 20px; font-weight: 700; margin: 15px 0; } .tag { color: ${COLORS.coaxBlue}; font-weight: 800; font-size: 11px; text-transform: uppercase; } .date { margin-top: auto; color: #a1abc2; font-size: 14px; } }
    @media (max-width: 700px) { min-width: 85vw; flex-direction: column; height: auto; .card-img, .card-content { width: 100%; } .card-img { height: 200px; } }
`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 55px; height: 55px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;`;

// --- END OF PPC PERFORMANCE COMPONENT ---
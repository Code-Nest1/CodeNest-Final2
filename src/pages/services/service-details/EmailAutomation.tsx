"use client";

/**
 * FILE: EmailAutomation.tsx
 * PATH: /services/email-marketing-automation
 * MISSION: Architect high-conversion CRM ecosystems and automated revenue loops.
 * CODE: Standard Agency High-Fidelity Logic (Logic-and-Layout Match)
 * VERSION: 1.0 (Premium Signature Build)
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
  Mail,
  Zap,
  Target,
  BarChart2,
  Lock,
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
 * DATA SOURCE: ELITE EMAIL AUTOMATION CONTENT
 * ============================================================================
 */

const EMAIL_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Zero-Party Data Integration", 
    desc: "We move beyond basic demographic data, architecting systems that capture customer preferences directly, fueling highly relevant 1-to-1 personalization logic." 
  },
  { 
    id: "BLOCK", 
    title: "Hardened Deliverability Protocols", 
    desc: "We implement advanced SPF, DKIM, and DMARC authentication paired with rigorous warming sequences to ensure your messages hit the primary inbox, every time." 
  },
  { 
    id: "SECURITY", 
    title: "CASL & GDPR Compliance Logic", 
    desc: "Every automation we build follows strict global privacy standards. We manage consent hierarchies that protect your brand’s legal standing and reputation." 
  },
  { 
    id: "CWV", 
    title: "Liquid Code Architecture", 
    desc: "Our emails aren't static. We utilize dynamic scripting like Liquid and API-fed blocks to create contextually aware content that adapts to user behavior in real-time." 
  }
];

const BENEFITS_DATA = [
  {
    title: "24/7 Revenue generation engine",
    desc: "Automated lifecycles—including abandoned checkouts, browse abandonment, and sunsetting flows—turn your store into a silent salesperson that recovers lost revenue while your team focuses on growth-level operations."
  },
  {
    title: "Predictive customer segmentation",
    desc: "We don't just 'send emails.' We build predictive segments based on Recency, Frequency, and Monetary (RFM) data, identifying your VIPs before they even realize they are loyal advocates for your brand."
  },
  {
    title: "Maximized Customer Lifetime Value",
    desc: "Acquisition is expensive; retention is profitable. Our sophisticated re-engagement and cross-sell automations ensure your customers return for their second, third, and tenth purchases, driving long-term ROAS upward."
  },
  {
    title: "Precision behavioral orchestration",
    desc: "Your emails should reflect your users' clicks. We synchronize your email platform with your website behavior, triggering highly specific messaging sequences based on the exact products or services a user views."
  },
  {
    title: "Omnichannel brand consistency",
    desc: "Email doesn't live in a silo. We unify your SMS, Push, and Email messaging into a singular flow architecture, ensuring the customer receives a coherent brand narrative across every mobile and desktop touchpoint."
  },
  {
    title: "Automated A/B optimization",
    desc: "Growth shouldn't guess. Our system builds continuous testing into your flows, automatically promoting winning creative and subject line variations to maximize open rates and revenue-per-recipient (RPR)."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Platform-Agnostic Engineering", 
    desc: "Whether you use Klaviyo, Salesforce Marketing Cloud, or ActiveCampaign, we optimize the technical foundation. We fix broken API calls and ensure data flows seamlessly from your backend to your inbox." 
  },
  { 
    num: "/ 02", 
    title: "High-Touch Data Sanitization", 
    desc: "A messy database is a liability. We clean your historical data, purging inactive bots and irrelevant entries to protect your domain authority and lower your monthly software costs." 
  },
  { 
    num: "/ 03", 
    title: "Conversion-Centric Copy & UX", 
    desc: "We merge high-end visual design with psychology-driven copy. Every call to action is placed after establishing value, significantly increasing your click-through-rate over generic industry standards." 
  },
  { 
    num: "/ 04", 
    title: "Transparent Attribution Models", 
    desc: "Stop wondering what made you money. We implement robust tracking so you can see exactly which specific email flow contributed to your bottom line, utilizing Last-Click and multi-touch models." 
  },
  { 
    num: "/ 05", 
    title: "Rapid Execution Pipelines", 
    desc: "While other agencies spend months 'onboarding,' we deploy profit-generating core flows within the first 14 days. We prioritize high-impact automations first to deliver immediate cash-flow relief." 
  },
  { 
    num: "/ 06", 
    title: "Scalable Content Modules", 
    desc: "We build modular templates that your internal team can actually use. You won't need a developer every time you want to send a newsletter—our 'nestable' blocks make campaign management frictionless." 
  }
];

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Marcus Aurelius",
    role: "Marketing Director at Elara Global",
    company: "Elara Global",
    quote: "The CRM audit Code Nest performed saved our deliverability. Our open rates went from 18% to 44% in 60 days. They aren't just sending emails; they are engineering revenue streams.",
    imgSrc: "/assets/feedback/marcus.jpg",
    serviceTag: "CRM & Email Orchestration",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "CEO, FinTech Flow",
    company: "FinTech Flow",
    quote: "The abandoned cart automation they built paid for itself in less than a week. The data-driven approach to segmentation has fundamentally changed our retention metrics for the better.",
    imgSrc: "/assets/feedback/sarah.jpg",
    logoSrc: "/assets/feedback/finflow-logo.png",
    serviceTag: "Marketing Automation ROI",
    ctaText: "See Revenue Lift",
  },
  {
    id: 3,
    name: "James Thompson",
    role: "VP Growth, Zenith Commerce",
    company: "Zenith Commerce",
    quote: "We needed someone who understood the deep-tech side of Klaviyo API integrations. Code Nest delivered a custom dashboard and flow logic that simply works perfectly at scale.",
    imgSrc: "/assets/feedback/james.jpg",
    serviceTag: "API & Retention Systems",
    ctaText: "View Case Study",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Lock size={28} />,
    title: "Deliverability Diagnosis",
    desc: "We start by auditing your sender reputation. We check IP health, blacklists, and authentication layers (SPF/DKIM/DMARC) to ensure your brand's digital infrastructure is recognized as a trusted source."
  },
  {
    icon: <Mail size={28} />,
    title: "Lifecycle Logic Audit",
    desc: "We analyze every existing automation in your ecosystem. We identify dead-ends, contradictory logic, and 'message fatigue' triggers that cause users to unsubscribe, then rebuild the path for maximum impact."
  },
  {
    icon: <Target size={28} />,
    title: "Segmentation Assessment",
    desc: "Our strategists examine your data buckets. We find untapped groups of high-value buyers and create dynamic cohorts that can be targeted with surgical precision during peak sales periods."
  },
  {
    icon: <BarChart2 size={28} />,
    title: "Yield & Optimization Roadmap",
    desc: "We deliver a priority matrix of flow updates. We tell you which 20% of changes will drive 80% of your new revenue, allowing for a phased implementation that pays for itself as we progress."
  }
];

const FAQ_DATA = [
    {
        question: "Will you manage our monthly email campaigns or just the setup?",
        answer: "We offer both. While our 'Elite Core' is focused on the permanent high-ROI automated infrastructure, we also provide retained creative services to manage your weekly high-intent promotional campaigns."
    },
    {
        question: "How long until we see an increase in email-attributed revenue?",
        answer: "Deliverability improvements are often seen within 14-30 days. Flow optimizations generally start producing incremental revenue immediately upon launch, with full cycle ROI maturity at the 90-day mark."
    },
    {
        question: "We use a proprietary CRM—can you still help us?",
        answer: "Yes. Our engineering background allows us to work directly with custom APIs and niche SMTP providers. We aren't limited to 'off-the-shelf' tools; we can architect automation within your existing codebase."
    },
    {
        question: "Is Email still effective compared to Social Media or Paid Ads?",
        answer: "Email remains the highest ROI channel in digital marketing, often delivering $36-40 for every $1 spent. It is an owned asset; unlike social media, you aren't at the mercy of platform algorithm shifts."
    },
    {
        question: "How do you ensure we don't end up in the spam folder?",
        answer: "By enforcing 'Best Practice' engagement metrics. We implement strict engagement tagging that automatically removes bots and unengaged users, keeping your domain health high and your deliverability consistent."
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
 * COMPONENT: EmailAutomation
 * ============================================================================
 */

export default function EmailAutomation() {
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

  /**
   * ============================================================================
   * RENDERING SECTION: MAIN INTERFACE
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
              <strong>Email automation</strong>
            </Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              CRM & Lifecycle <br /> Automation service
            </motion.h1>
            <ButtonGroup>
              <MainBtn>Fix My Lifecycle</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>
              We design and deploy autonomous revenue engines that cultivate deep customer loyalty 
              and predictable recurring revenue at scale.
            </HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">ActiveCampaign</span><div className="stars">★★★★★ <span className="val">Certified Partner</span></div></RatingItem>
              <RatingItem><span className="brand">Klaviyo</span><div className="stars">★★★★★ <span className="val">Elite Platinum</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Revenue & Deliverability Audit</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">
            Audit your email <br /> infrastructure to ensure <br /> zero wasted clicks
          </motion.h2>
          <RightContentBlock>
            <p>Our deep-tech CRM audit analyzes your domain reputation and lifecycle logic. We pinpoint the broken automations and data silos preventing your brand from achieving 30-40% of its revenue from the inbox alone.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Unlock Revenue-at-Risk Audit</BlueTextBtn>
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
            <h2 className="section-title">Automated architecture <br /> benchmarks practiced by <br /> Code Nest experts</h2>
            <AccordionList>
                {EMAIL_STANDARDS.map((item) => (
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

      {/* --- 4. EXPECTATION GRID --- */}
      <GridSection>
        <SectionHeader white>Signature performance indicators</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Reputation Guard", desc: "Constant monitoring of your domain DNS records to stop the 'spam-box death spiral'." },
            { id: "02.", title: "Dynamic Recovery", desc: "Multi-touch cart and browse abandonment flows designed for complex product sets." },
            { id: "03.", title: "RFM Segmentation", desc: "Clustering customers based on purchasing recency and financial total impact." },
            { id: "04.", title: "Sunset Architecture", desc: "Automatic list hygiene that identifies inactive users and stops domain decay." },
            { id: "05.", title: "API Lead Enrichment", desc: "Pulling 3rd-party data to personalize email greetings based on live external events." },
            { id: "06.", title: "A/B Velocity Testing", desc: "High-cadence experimentation to determine optimal CTA placement and tone." }
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
            Engineered systems for <br /> massive recurring lift
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
        <motion.h2 className="centered-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Why choose Code Nest to <br /> automate your marketing?
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

      {/* --- 7. ASSESSMENT --- */}
      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" opacity="0.8" />
                <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" />
              </svg>
            </DecoCircles>
            <BannerText>Assess your CRM efficiency gap</BannerText>
            <DownloadBtn>
              Download Email Marketing Health Matrix
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
            <SubHeader>CRM Excellence</SubHeader>
            <HeaderTitle>How automation transforms growth</HeaderTitle>
            <HeaderDesc>
                In an era of rising acquisition costs, our CRM partnerships prove that retention 
                is the strongest lever for sustainable agency growth.
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
              Our Automation Logic Sequence
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
                            <circle cx="80" cy="180" r="60" stroke={COLORS.lime} strokeWidth="2" opacity="0.5" />
                         </svg>
                    </DecoCircles>
                    <BannerTitle10>Start maximizing customer value today</BannerTitle10>
                    <ConsultBtn> Schedule Your Lifecycle Audit <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /> </ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft> <h2>Automated CRM <br /> Questions & Insights</h2> </FAQLeft>
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
                <BlogTitle>Intelligence.<br /><BlogLink onClick={() => navigate('/blog')}>Automation Blog <ArrowUpRight size={32} /></BlogLink></BlogTitle>
             </BlogHeaderWrapper>
             {loadingBlogs ? ( <div style={{ textAlign: "center", color: COLORS.textGray }}>Consulting Intelligence Data...</div> ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600';
                           return (
                              <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="card-img"><img src={featuredImg} alt="blog" /></div>
                                <div className="card-content">
                                   <span className="tag">Email Excellence</span>
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
        <path d="M50 250 Q 250 50, 450 250 Q 250 450, 50 250" fill="none" stroke={COLORS.lime} strokeWidth="15" opacity="0.4" />
        <rect x="225" y="100" width="50" height="300" fill={COLORS.lime} rx="25" />
        <circle cx="250" cy="250" r="50" fill="#fff" />
    </motion.svg>
);
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection};`;
const BadgeWrapper = styled.div`background: #fff; padding: 10px 18px; color: ${COLORS.coaxBlue}; font-size: 11px; font-weight: 700; text-transform: uppercase; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 50px; display: inline-flex; align-items: center; .dot { width: 6px; height: 6px; border-radius: 50%; background: ${COLORS.coaxBlue}; margin-right: 10px; }`;
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
const BenefitsContainer = styled.section`padding: 140px 0; background: #fff; .title-wrapper { text-align: center; margin-bottom: 90px; h2 { font-size: 64px; font-weight: 600; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1.5px solid #f1f3f7; border-bottom: 1.5px solid #f1f3f7; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
    padding: 90px 12%; border-right: ${props => props.isLeft ? "1.5px solid #f1f3f7" : "none"}; border-bottom: 1.5px solid #f1f3f7; 
    h4 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 700; margin-bottom: 28px; } p { font-size: 17px; line-height: 1.7; color: ${COLORS.textGray}; }
`;
const BlueCardSection = styled.section`padding: 150px 10%; background: ${COLORS.coaxBlue}; text-align: center; .centered-header { color: #fff; font-size: clamp(36px, 4vw, 62px); font-weight: 600; margin-bottom: 90px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 700px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`
    background: ${COLORS.lime}; color: ${COLORS.textDark}; text-align: left; padding: 45px; min-height: 400px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
    .card-index { font-weight: 800; font-size: 11px; margin-bottom: 35px; opacity: 0.6; } h3 { font-size: 26px; margin-bottom: 25px; font-weight: 700; line-height: 1.1; } .card-text { font-size: 16px; line-height: 1.6; }
`;
const PageSevenContainer = styled.div`padding: 80px 10%; width: 100%;`;
const BannerWrapper = styled.div`background: linear-gradient(110deg, #1d4ed8 0%, #091db1 100%); padding: 80px 40px; border-radius: 4px; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 5; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 40px; }`;
const BannerText = styled.h2`color: #fff; font-size: 40px; font-weight: 700; max-width: 480px; letter-spacing: -1.5px;`;
const DownloadBtn = styled.button`background: ${COLORS.lime}; border: none; padding: 22px 35px; font-weight: 700; border-radius: 4px; display: flex; align-items: center; gap: 20px; cursor: pointer; &:hover { background: #e5ff80; }`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; opacity: 0.4; pointer-events: none;`;
const Section8 = styled.section`padding: 130px 0; background: #f8faff; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.coaxBlue} 1.2px, transparent 1.2px); background-size: 50px 50px; opacity: 0.05;`;
const OrbOne = styled(motion.div)`position: absolute; top: -15%; left: -10%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(26,65,230,0.1) 0%, transparent 70%); border-radius: 50%; filter: blur(80px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -20%; right: -15%; width: 900px; height: 900px; background: radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1150px; margin: 0 auto; position: relative; z-index: 5; padding: 0 24px;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 70px;`;
const SubHeader = styled.h4`color: ${COLORS.coaxBlue}; text-transform: uppercase; font-size: 13px; font-weight: 800; letter-spacing: 2px; margin-bottom: 20px;`;
const HeaderTitle = styled.h2`font-size: 52px; font-weight: 700; color: ${COLORS.textDark}; letter-spacing: -2px;`;
const HeaderDesc = styled.p`font-size: 18px; line-height: 1.6; color: ${COLORS.textGray};`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 1000px; margin: 0 auto; height: 500px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(26,65,230,0.12); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; inset: 22px -22px -22px 22px; background: ${COLORS.coaxBlue}; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; z-index: 10; height: 100%;`;
const CardFrame = styled(motion.div)`background: #fff; height: 100%; box-shadow: 0 30px 70px rgba(0,0,0,0.08); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 88%, 92.5% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { height: auto; padding-bottom: 40px; clip-path: none; }`;
const InnerGrid = styled(motion.div)`display: grid; grid-template-columns: 44% 56%; height: 100%; will-change: transform; @media (max-width: 850px) { grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; background: #eee;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; bottom: 30px; right: 30px; width: 110px; padding: 10px; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1);`;
const ContentSide = styled.div`padding: 60px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${COLORS.coaxBlue}; letter-spacing: 2px; margin-bottom: 25px; border-left: 3px solid ${COLORS.lime}; padding-left: 12px;`;
const QuoteIcon = styled.div`font-size: 80px; color: ${COLORS.coaxBlue}; font-family: serif; opacity: 0.6; line-height: 1;`;
const QuoteText = styled.p`font-size: 21px; font-weight: 500; font-style: italic; color: ${COLORS.textDark}; margin-bottom: 30px; line-height: 1.5;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 19px; font-weight: 700; color: ${COLORS.textDark};`;
const AuthorRole = styled.div`font-size: 14px; color: ${COLORS.textGray}; margin-top: 5px;`;
const AuthorCompany = styled.span`color: ${COLORS.coaxBlue}; font-weight: 800; margin-left: 6px; &:before { content: "|"; margin-left: 8px; color: #ddd; }`;
const CtaButton = styled.button`margin-top: 25px; padding: 14px 28px; background: ${COLORS.coaxBlue}; color: #fff; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; border-radius: 4px; gap: 10px;`;
const Controls = styled.div`display: flex; gap: 15px; position: absolute; bottom: -80px; width: 100%; justify-content: center; z-index: 50;`;
const NavBtn = styled.button`width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid #eee; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;`;
const AuditProcessSection = styled.section`padding: 140px 0; background: #fff;`;
const AuditContainer = styled.div`max-width: 1100px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: 60px; font-weight: 700; text-align: center; margin-bottom: 90px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid ${COLORS.borderColor}; border-radius: 4px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 80px 60px; border-right: ${props => props.idx % 2 === 0 ? "1.5px solid "+COLORS.borderColor : "none"}; border-bottom: ${props => props.idx < 2 ? "1.5px solid "+COLORS.borderColor : "none"}; h3 { font-size: 28px; font-weight: 700; margin-bottom: 25px; } p { color: ${COLORS.textGray}; font-size: 17px; line-height: 1.7; } @media (max-width: 900px) { border-right: none; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 30px;`;
const PageTenSection = styled.section`padding: 100px 0 180px; background: #fff;`;
const PageTenInner = styled.div`max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 140px; padding: 0 24px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`max-width: 1000px; text-align: left;`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4.5vw, 44px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; position: relative; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQContent = styled.div`display: contents;`;
const FAQLeft = styled.div`h2 { font-size: 52px; font-weight: 700; line-height: 1.1; letter-spacing: -2px; }`;
const FAQRight = styled.div`width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1.5px solid #f1f3f7; padding: 32px 0; cursor: pointer; &:last-child { border-bottom: 1.5px solid #f1f3f7; } .q-header { display: flex; justify-content: space-between; h3 { font-size: 19px; font-weight: 600; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: #bbb; width: 28px; height: 28px; border: 1.5px solid #f1f3f7; border-radius: 4px; display: flex; align-items: center; justify-content: center; } } .a-body p { margin-top: 25px; color: ${COLORS.textGray}; font-size: 16.5px; line-height: 1.75; }`;
const BackgroundCurve = styled.div`position: absolute; left: -150px; top: 0; width: 500px; height: 500px; background: radial-gradient(circle, rgba(26,65,230,0.03) 0%, transparent 70%); z-index: 0; pointer-events: none;`;
const BlogSection = styled.section`padding: 130px 0 160px; background: #f7faff; border-top: 1.5px solid #edf2f8;`;
const BlogContainer = styled.div`max-width: 1320px; margin: 0 auto; padding: 0 40px;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 70px;`;
const BlogTitle = styled.h2`font-size: 60px; font-weight: 700; letter-spacing: -3px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; font-size: 32px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 15px; &:hover { opacity: 0.8; }`;
const BlogSliderOuter = styled.div`overflow: hidden;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; padding: 20px 0; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
    min-width: 480px; background: #fff; height: 260px; display: flex; border-radius: 4px; overflow: hidden; border: 1.5px solid #f1f3f7; transition: 0.3s; cursor: pointer;
    &:hover { transform: translateY(-10px); border-color: ${COLORS.lime}; } .card-img { width: 42%; img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; } } &:hover img { transform: scale(1.1); }
    .card-content { width: 58%; padding: 40px; display: flex; flex-direction: column; h3 { font-size: 20px; margin: 15px 0; line-height: 1.4; } .tag { color: ${COLORS.coaxBlue}; font-weight: 800; font-size: 11px; text-transform: uppercase; } .date { margin-top: auto; color: #a1abc2; font-size: 14px; } }
`;
const DecoStar = styled.div`position: absolute; right: 40px; bottom: 20px;`;

// --- END OF COMPONENT ---
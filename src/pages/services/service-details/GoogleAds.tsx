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

// --- DATA: GOOGLE ADS SPECIFIC ---
const PPC_STANDARDS = [
  { id: "QUALITY", title: "Quality Score (QS) Mastery", desc: "We optimize your ad relevancy, CTR, and landing page experience to achieve high Quality Scores, significantly reducing your actual Cost-Per-Click (CPC)." },
  { id: "BIDDING", title: "Smart Bidding Algorithms", desc: "Utilizing Target ROAS (Return on Ad Spend) and Maximize Conversions bidding models to ensure Google's AI works specifically for your bottom line." },
  { id: "STRUCTURE", title: "Hagakure & STAG Models", desc: "We implement advanced account architectures like Hagakure (for large data) or Single Topic Ad Groups (STAG) for precise messaging control." },
  { id: "RETARGET", title: "Dynamic Remarketing Loops", desc: "Setting up sophisticated audience tagging to re-engage past visitors with personalized offers based on the specific products or pages they viewed." }
];

const BENEFITS_DATA = [
  {
    title: "Instant Market Dominance",
    desc: "Unlike organic strategies, Google Ads places your brand at the very top of Page 1 within hours of campaign activation."
  },
  {
    title: "Absolute Budget Precision",
    desc: "Control exactly how much you spend down to the cent. No surprises—we optimize for the lowest possible acquisition cost."
  },
  {
    title: "Granular Intent Targeting",
    desc: "Capture users at the exact moment of 'need'. We target based on search intent, location, device, and historical behavior."
  },
  {
    title: "Scalability on Demand",
    desc: "When a campaign performs, we scale the budget logically to capture more market share, providing a predictable revenue growth lever."
  },
  {
    title: "Highly Measurable ROI",
    desc: "Full transparency. We track every click through to a phone call, form fill, or purchase, so you know exactly where your money goes."
  },
  {
    title: "Search & YouTube Synergy",
    desc: "We align your text search ads with YouTube video targeting to create a powerful cross-platform brand awareness funnel."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Certified Partners", desc: "Our team consists of Google-certified experts who stay updated on every change in the Google Ads ecosystem." },
  { num: "/ 02", title: "Tech-Forward Management", desc: "We utilize scripts and custom API automations to manage bids 24/7, catching opportunities that human-only agencies miss." },
  { num: "/ 03", title: "Landing Page Sync", desc: "Since we are also web developers, we build custom, high-converting landing pages designed specifically for your ad copy." },
  { num: "/ 04", title: "Zero Black-Box Logic", desc: "You own the account. You have full access to our strategy and reporting. We operate with complete financial transparency." },
  { num: "/ 05", title: "Omni-Channel Lead Flow", desc: "We don't just stop at Search. We manage Display, Performance Max (PMax), and Local Service Ads to capture all traffic sources." },
  { num: "/ 06", title: "Daily Account Hygiene", desc: "Continuous negative keyword mining and A/B ad testing ensures your budget isn't leaked to low-value search queries." }
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

const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Robert Vance",
    role: "Head of Marketing",
    company: "LuxAuto",
    quote: "Code Nest halved our Cost Per Lead while increasing our call volume. Their focus on the bottom line rather than just clicks saved our marketing budget.",
    imgSrc: "/assets/feedback/bohdan.jpg", 
    serviceTag: "PPC Management",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Alisa Vinn",
    role: "CEO",
    company: "HomeSource",
    quote: "We spent years guessing on Google Ads. Code Nest implemented a structured Hagakure model that scaled our lead flow across three different regions.",
    imgSrc: "/assets/feedback/dan.jpg",
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "Search Advertising",
    ctaText: "View ROAS Chart",
  },
  {
    id: 3,
    name: "Terry Chen",
    role: "Founder",
    company: "SaaS Builder",
    quote: "Their YouTube and Retargeting strategies converted visitors we previously thought were lost. Our lead-to-sale ratio improved significantly.",
    imgSrc: "/assets/feedback/michael.jpg",
    serviceTag: "Cross-Channel Ads",
    ctaText: "See the Funnel",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Waste Identification",
    desc: "A deep dive into your historical data to find 'Negative Keyword' leakage where you are spending money on irrelevant searches."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Tracking Protocol",
    desc: "Hardcoding GTM tags and GA4 conversion events to ensure 100% data accuracy between the ad click and your CRM system."
  },
  {
    icon: <FileText size={28} />,
    title: "Copy Experimentation",
    desc: "Writing multi-variant headlines and descriptions that leverage high-CTR hooks to boost conversion probability."
  },
  {
    icon: <Headphones size={28} />,
    title: "Campaign Expansion",
    desc: "Once a winning core is found, we expand into Performance Max and Remarketing to protect your brand and dominate the auction."
  }
];

const FAQ_DATA = [
    {
        question: "How much ad spend do I need to start?",
        answer: "There is no minimum, but for a campaign to generate enough data for optimization, we typically recommend a starting monthly budget between $2,000–$5,000."
    },
    {
        question: "How do you charge for management?",
        answer: "We typically work on a flat monthly fee or a small percentage of spend, depending on the account's complexity. We do not mark up ad costs."
    },
    {
        question: "How long before my ads are profitable?",
        answer: "Ads go live immediately. However, it takes 30-60 days for Google's machine learning to 'learn' your audience and for us to prune wasteful keywords."
    },
    {
        question: "Can I target people who visited my competitor's site?",
        answer: "Yes, through 'Custom Segments' in the Display network, we can target users who have recently searched for your competitors' brands."
    },
    {
        question: "Do you help with my landing pages?",
        answer: "Absolutely. Landing page quality is 30% of your Quality Score. We will audit your pages and suggest higher-converting alternatives."
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

export default function GoogleAds() {
  const navigate = useNavigate();

  const [openStandard, setOpenStandard] = useState<string | null>("QUALITY");
  
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
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Google Ads & PPC</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Paid Search <br /> (PPC) Performance</motion.h1>
            <ButtonGroup>
              <MainBtn>Optimize My Spend</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Stop bleeding ad budget. Scale your Return on Ad Spend (ROAS) with our elite, certified Google Ads management team.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Partner</span><div className="stars">★★★★★ <span className="val">Certified</span></div></RatingItem>
              <RatingItem><span className="brand">Results</span><div className="stars">★★★★★ <span className="val">ROAS Experts</span></div></RatingItem>
              <RatingItem><span className="brand">( Leads )</span><div className="stars">★★★★★ <span className="val">2x Velocity</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Account Strategy Audit</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Scale your profit <br /> without increasing <br /> your ad budget</motion.h2>
          <RightContentBlock>
            <p>Spending more isn't always the answer. Our conversion-first audit looks for ways to lower your acquisition costs through technical bidding precision and highly relevant creative alignment.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze My Account</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Google Partner <br /> Ad-Tech Standards</h2>
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

      {/* --- 4. WHAT TO EXPECT --- */}
      <GridSection>
        <SectionHeader white>Performance Benefits</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Lower CPC", desc: "Driving down click costs by perfecting ad relevancy and quality scores." },
            { id: "02.", title: "Auction Dominance", desc: "Ensuring you own the conversation for the most valuable industry keywords." },
            { id: "03.", title: "Call Tracking", desc: "Know exactly which ad produced which lead via deep analytics tagging." },
            { id: "04.", title: "Lead Velocity", desc: "Using automated bid logic to capture high-intent users at the right time." },
            { id: "05.", title: "Bot Exclusion", desc: "Stopping budget bleed from robotic clicks and low-value placements." },
            { id: "06.", title: "ROAS Clarity", desc: "Live dashboards that show exactly where your money is making more money." }
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
            Why Choose Paid Search <br /> For Growth?
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
          Why choose Code Nest for <br /> Google Ads campaigns?
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

            <BannerText>Assess your CPC leakage?</BannerText>
            
            <DownloadBtn>
              Download PPC optimization sheet
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

      {/* --- 8. CLIENT FEEDBACK --- */}
      <Section8>
        <BackgroundWrapper>
          <GridOverlay />
          <OrbOne variants={orbOneVariants} animate="animate" />
          <OrbTwo variants={orbTwoVariants} animate="animate" />
        </BackgroundWrapper>

        <Container8>
          <HeaderWrapper>
            <SubHeader>CodeNest Reviews</SubHeader>
            <HeaderTitle>Lead Velocity Stories</HeaderTitle>
            <HeaderDesc>
              See how we used the Google Ads auction to accelerate our partners’ revenues.
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

      {/* --- 9. HOW PROCESS WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Consulting Process
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

      {/* --- 10. BANNER & FAQ --- */}
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
                        Start Scaling Your ROAS
                    </BannerTitle10>
                    <ConsultBtn>
                        Free Discovery Call 
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
                        <h2>Strategy <br /> Q&A</h2>
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
                  Paid Ads Tech Blog<br />
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
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'PPC';
                           
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
// STYLES
// ==========================================
const PageWrapper = styled.div`background: white; overflow-x: hidden;`;

const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;
`;
const HeroInner = styled.div`
  max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px;
  h1 { color: #ffffff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; }
`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px; @media (max-width: 600px) { h1 { font-size: 42px; letter-spacing: -1.5px; } }`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; text-decoration: none; opacity: 0.7; } flex-wrap: wrap;`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: white; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column; @media (max-width: 768px) { padding: 60px 24px; }`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; align-items: flex-start; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content; @media (max-width: 480px) { width: 100%; }`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`;

const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; flex-shrink: 0; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; }`;

const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue}; @media (max-width: 768px) { padding: 80px 24px; }`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } h3 { font-size: 24px; color: ${COLORS.textDark}; margin-bottom: 15px; } p { font-size: 16px; line-height: 1.5; color: rgba(0,0,0,0.75); }`;

const BenefitsContainer = styled.section`padding: 140px 0; background-color: white; display: flex; flex-direction: column; .title-wrapper { padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%; @media (max-width: 900px) { grid-template-columns: 1fr; }`;

// Fixed property 'index' type here
const BenefitCell = styled.div<{ isLeft: boolean; index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  &:nth-last-child(1), &:nth-last-child(2) { border-bottom: none; }
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; }
  @media (max-width: 900px) { border-right: none !important; }
`;

const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; }`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M50 400 L450 400" stroke={COLORS.lime} strokeWidth="15" />
    <circle cx="100" cy="300" r="40" fill={COLORS.lime} />
    <circle cx="250" cy="150" r="40" fill={COLORS.lime} />
    <circle cx="400" cy="220" r="40" fill={COLORS.lime} />
    <path d="M100 300 L250 150 L400 220" stroke="white" strokeWidth="8" fill="none" />
  </motion.svg>
);

const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif;`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px;`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000000; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; min-width: 280px;`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; pointer-events: none; opacity: 0.9; z-index: 1;`;

const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; font-family: 'Inter', sans-serif; position: relative;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; line-height: 1.1;`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(40, 166, 101, 0.2); z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; inset: 20px -20px -20px 20px; background: #28a665; z-index: 0; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); border-radius: 4px; overflow: hidden;`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; @media (max-width: 850px) { position: relative; display: flex; flex-direction: column; }`;
const ImageSide = styled.div`background-color: #f0f0f0; width: 100%; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-weight: 600; cursor: pointer; border-radius: 4px; transition: 0.3s; &:hover { background: #28a665; }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; width: 100%;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #fff; border-radius: 50%; cursor: pointer; transition: 0.2s; &:hover { background-color: #28a665; color: #fff; }`;

const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; h3 { color: ${COLORS.coaxBlue}; font-size: 26px; margin-bottom: 24px; } p { font-size: 16px; color: ${COLORS.textGray}; } @media (max-width: 800px) { border-right: none; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff;`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; text-align: center;`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); pointer-events: none;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; .q-header { display: flex; align-items: center; justify-content: space-between; h3 { font-size: 17px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; } } .a-body { overflow: hidden; p { margin-top: 24px; color: ${COLORS.textGray}; } }`;

const BlogSection = styled.div`background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; line-height: 1.1;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.2s; &:hover { gap: 16px; }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; align-items: center; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`min-width: 450px; background: #fff; height: 260px; border-radius: 16px; display: flex; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer; transition: 0.3s; &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; } .tag { color: #28a665; font-size: 11px; font-weight: 700; margin-bottom: 12px; } .date { font-size: 12px; color: #999; } @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } .card-content { width: 100%; } }`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: #fff; cursor: pointer; transition: 0.3s; &:hover { background: #28a665; color: #fff; }`;
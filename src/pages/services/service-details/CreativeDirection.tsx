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
 * CREATIVE DIRECTION & VISION - SERVICE DETAIL PAGE
 * Path: /services/creative-direction
 * Complexity: Master Template Adherence (1050+ Line Goal)
 * Strategy: Strategic Fractional Creative Leadership Data
 */

// --- Design Tokens (Coax Precise) ---
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
// Pivoted for Creative Direction Engineering Standards
const WP_STANDARDS = [
  { 
    id: "WPCS", 
    title: "Unified Brand DNA Protocol", 
    desc: "We establish a rigid framework of visual and tonal constants that act as a single source of truth for all external agencies, designers, and stakeholders." 
  },
  { 
    id: "BLOCK", 
    title: "Market Perception Sprints", 
    desc: "Utilizing iterative discovery cycles to ensure that brand creative evolves alongside shifting consumer behaviors while maintaining core historic identity." 
  },
  { 
    id: "SECURITY", 
    title: "Visual Asset Governance", 
    desc: "Strategic gatekeeping protocols that protect brand integrity from fragmentation across fragmented digital channels and international markets." 
  },
  { 
    id: "CWV", 
    title: "Performance Aesthetic ROI", 
    desc: "Creative decision-making is optimized for commercial outcomes, ensuring that artistic direction directly supports conversion, retention, and brand prestige." 
  }
];

// Pivoted for Creative Direction Benefits
const BENEFITS_DATA = [
  {
    title: "Strategic visual coherence",
    desc: "Fractured creative kills brand trust. Our Creative Direction ensures every piece of output—from your high-fidelity UI to your internal company culture docs—feels like part of the same intentional vision."
  },
  {
    title: "Elimination of design waste",
    desc: "Most agencies churn assets that don't fit the vision. We act as your creative north star, vetting all work against a rigid long-term strategy that drastically reduces the 'do-over' cost of failed campaigns."
  },
  {
    title: "Future-proof visual innovation",
    desc: "We look 18 months ahead. By monitoring technological and artistic shifts (AI, Web3, Immersive Spatial Audio), we prepare your brand's visual identity for the tech of tomorrow, not the trends of today."
  },
  {
    title: "High-tier vendor management",
    desc: "Managing multiple creatives can be a friction point. We speak the language of developers and artists, translating high-level business goals into precise creative briefs that remove cross-departmental ambiguity."
  },
  {
    title: "Enhanced intellectual capital",
    desc: "Brand value is directly tied to visual storytelling. We engineer a legacy-worthy narrative for your brand, turning a generic service into an iconic institution through masterfully handled aesthetic prestige."
  },
  {
    title: "Consistent creative governance",
    desc: "Internal teams often dilute a brand's edge. Our governance model provides ongoing critiques and mentorship, upskilling your staff to produce output that meets the high standards we've engineered for your brand."
  }
];

// Pivoted for Why Choose Code Nest Creative Direction
const WHY_CHOOSE_CN_DATA = [
  { 
    num: "/ 01", 
    title: "Executive Artistic Strategy", 
    desc: "We don't just 'make stuff look good'. We align your creative presence with your series funding goals, IPO readiness, or global expansion targets for true artistic ROI." 
  },
  { 
    num: "/ 02", 
    title: "Fractional Creative Leadership", 
    desc: "Gain the benefit of an elite Art Director without the $300k/yr salary commitment. We provide senior vision on a recurring, high-output fractional basis for maximum flexibility." 
  },
  { 
    num: "/ 03", 
    title: "Code-Aware Design Philosophy", 
    desc: "Because we are an engineering first agency, our direction accounts for dev feasibility. We won't propose vision that can't be coded—we only engineer beautiful, buildable futures." 
  },
  { 
    num: "/ 04", 
    title: "Data-Obsessed Art Lab", 
    desc: "We bridge the gap between creative expression and performance analytics. Our direction is constantly validated by user-feedback loops, eye-tracking heatmaps, and A/B campaign metrics." 
  },
  { 
    num: "/ 05", 
    title: "Enterprise Ecosystem Range", 
    desc: "Whether you need to overhaul your FinTech brand's voice or define the visual soul of a global gaming franchise, our team has directed at the highest levels of competitive commerce." 
  },
  { 
    num: "/ 06", 
    title: "Continuity of Partnership", 
    desc: "Success is a marathon. Code Nest provides year-over-year creative stewardship, ensuring your brand story doesn't reboot every time you change marketing managers—preserving long-term equity." 
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

// Data pivot for Creative Direction Feedbacks
const FEEDBACKS: FeedbackItem[] = [
  {
    id: 1,
    name: "Dr. Alexander Sterling",
    role: "CEO at NeuroPace Systems",
    company: "NeuroPace",
    quote: "We had multiple vendors working on separate parts of our launch. Code Nest's creative direction was the glue that bound our complex vision together. For the first time, our tech actually looks like its value.",
    imgSrc: "https://via.placeholder.com/300x400?text=Alexander",
    serviceTag: "Strategic Brand Oversight",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Monica Vasquez",
    role: "Marketing Director, Aura",
    company: "Aura Luxury",
    quote: "Code Nest's Fractional CD service saved us from an aesthetic crisis. They provided the high-level leadership we needed to coordinate our video, web, and physical print teams into a single, high-converting flow.",
    imgSrc: "https://via.placeholder.com/300x400?text=Monica",
    logoSrc: "https://via.placeholder.com/150x50?text=Aura",
    serviceTag: "Creative Leadership",
    ctaText: "See the Transformation",
  },
  {
    id: 3,
    name: "Leonid Volkov",
    role: "Head of Product",
    company: "Volta Crypto",
    quote: "Transitioning a brand from early startup to enterprise authority is hard. Code Nest engineered a vision for our future that maintained our core disruptive energy while gaining market institutional trust.",
    imgSrc: "https://via.placeholder.com/300x400?text=Leonid",
    serviceTag: "Visionary Scaling",
    ctaText: "Check the Case Study",
  },
];

// Audit context for Creative Direction
const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Visual Legacy Assessment",
    desc: "We evaluate every existing creative artifact in your ecosystem. We pinpoint the 'visionary drifts'—areas where your creative team has moved away from the core brand mission and lost the consumer's emotional thread."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Cognitive Resonance Test",
    desc: "In this phase, we analyze how well your brand creative 'sounds and looks' compared to high-end global competitors. We test for visual authority, trust triggers, and tonal prestige."
  },
  {
    icon: <FileText size={28} />,
    title: "Master Design Language (MDL)",
    desc: "Our audit ends in the delivery of a Master Design Language report. We define the colors, hierarchies, and rules of engagement that your business will use for the next decade to ensure visual dominance."
  },
  {
    icon: <Headphones size={28} />,
    title: "Creative Steering",
    desc: "Beyond the audit, we act as the 'Director on Call'. We offer monthly creative steerage sessions to review new works-in-progress, ensuring the standards defined in the audit are actually engineered into final work."
  }
];

// FAQ pivot for Creative Direction
const FAQ_DATA = [
    {
        question: "What exactly is 'Fractional' Creative Direction?",
        answer: "It is a high-level creative advisory role where you get access to an expert CD on a retainer or per-sprint basis. This allows you to scale up artistic vision without the risk and overhead of a permanent C-suite hire."
    },
    {
        question: "How is this different from a Branding project?",
        answer: "A branding project creates a logo. Creative Direction manages the life and application of that logo. We ensure that every subsequent website update, ad campaign, and product feature reflects the intended brand narrative perfectly."
    },
    {
        question: "Can you manage my existing external vendors?",
        answer: "Yes. In fact, many clients bring us on to supervise their existing freelance pools. We review their deliverables, provide technical artistic critiques, and ensure their output is consistent with the primary vision."
    },
    {
        question: "Does Creative Direction cover verbal identity?",
        answer: "Absolutely. Visuals only tell half the story. Our Creative Direction services include verbal audits for tone of voice, slogans, and messaging architectures to ensure that how you 'talk' matches how you 'look'."
    },
    {
        question: "Who is the ideal client for Creative Direction?",
        answer: "Any growth-stage brand (Series A to Series C) that is feeling the effects of 'brand sprawl'—where different departments are creating inconsistent visuals and they need an elite, central vision to regain control."
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

// COMPONENT: CreativeDirection
export default function CreativeDirection() {
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
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Creative Direction</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Strategic Creative <br /> Direction service</motion.h1>
            <ButtonGroup>
              <MainBtn>Align My Vision</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Control the soul of your brand through senior creative leadership. We transform aesthetic sprawl into a high-prestige visionary narrative.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">AD Age</span><div className="stars">★★★★★ <span className="val">Top Partner</span></div></RatingItem>
              <RatingItem><span className="brand">Effie</span><div className="stars">★★★★★ <span className="val">Gold Standard</span></div></RatingItem>
              <RatingItem><span className="brand">( Equity Multiplier )</span><div className="stars">★★★★★ <span className="val">Premium Grade</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Strategic Oversight Service</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Get a complete <br /> creative intelligence <br /> visionary audit to <br /> unlock new prestige</motion.h2>
          <RightContentBlock>
            <p>Disconnected design is an invisible business cost. Our audit evaluates your visual, verbal, and cultural coherence to deliver a blueprint for unified leadership.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze my global creative vision now</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Leadership standards <br /> covered by our Creative <br /> directors</h2>
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
        <SectionHeader white>Service pillar results</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Master Storyboarding", desc: "Setting the narrative sequence for entire brand ecosystems from launch to infinity." },
            { id: "02.", title: "Vendor Guardianship", desc: "Strict vetting and direction for external photographers, animators, and designers." },
            { id: "03.", title: "Global Art Style", desc: "Engineering one specific, unbreakable 'look' that applies to all media globally." },
            { id: "04.", title: "Verbal Governance", desc: "Aligning copy tone-of-voice to the visual sophistication of your digital assets." },
            { id: "05.", title: "Stakeholder Alignment", desc: "Translating abstract art decisions into clear business KPIs for CEOs and Investors." },
            { id: "06.", title: "Visual Lifecycle Ops", desc: "Preparing your brand creative for technical scale, translation, and immersive AR/VR." }
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
            Why choose our engineered <br /> Creative Direction solutions?
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
          Why choose Code Nest for your <br /> Multi-Departmental vision?
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

            <BannerText>Assess your visual trust score today?</BannerText>
            
            <DownloadBtn>
              Download Creative Governance Checklist
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
            <SubHeader>C-Suite Visionary</SubHeader>
            <HeaderTitle>What partners say about the Vision</HeaderTitle>
            <HeaderDesc>
              Consistency isn't just a design choice—it's an economic MOAT. Our direction 
              protects your market value from artistic degradation.
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

      {/* --- 9. HOW DIRECTION SPRINT WORKS (PAGE 9) --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How our direction logic flows
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
                        Consolidate vision — hire <br /> fractional CD today
                    </BannerTitle10>
                    <ConsultBtn>
                        Start Directorship Sprint 
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
                        <h2>Artistic stewardship <br /> and governance logic</h2>
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
                  Explore creative governance<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Our Leadership Blog <ArrowUpRight size={32} />
                  </BlogLink>
                </BlogTitle>
             </BlogHeaderWrapper>

             {loadingBlogs ? (
               <div style={{ textAlign: "center", padding: "40px", color: COLORS.textGray }}>
                   Loading Leadership Strategy...
               </div>
             ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                               || 'https://via.placeholder.com/600x400?text=Executive+Vision';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Governance';
                           
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
// STYLES (EXACT REPRODUCTION)
// ==========================================
const PageWrapper = styled.div` background: white; overflow-x: hidden; `;

const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;
`;
const HeroInner = styled.div`
  max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px;
  h1 { color: #ffffff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;
const HeroContent = styled.div` display: flex; flex-direction: column; gap: 30px; `;
const Breadcrumbs = styled.div` font-size: 13px; display: flex; align-items: center; gap: 10px; a { color: white; opacity: 0.7; text-decoration: none; } `;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; } .stars { color: ${COLORS.starGold}; }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column;`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div` display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; } `;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`;

const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div` max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: clamp(36px, 4vw, 68px); letter-spacing: -2.5px; } @media (max-width: 1024px) { grid-template-columns: 1fr; } `;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; } h3 { font-size: 20px; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; max-width: 480px; }`;

const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue}; @media (max-width: 768px) { padding: 80px 24px; }`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500;`;
const CardsGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; } `;
const DogEarCard = styled(motion.div)`
  background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); 
  .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } 
  h3 { font-size: 24px; color: ${COLORS.textDark}; } 
  p { font-size: 16px; line-height: 1.5; color: rgba(0,0,0,0.75); }
`;

const BenefitsContainer = styled.section`
  padding: 140px 0; background-color: white; 
  .title-wrapper { padding: 0 10%; margin-bottom: 80px; text-align: center; h2 { font-size: clamp(40px, 4.5vw, 68px); letter-spacing: -2px; } }
`;
const BenefitsGridWrapper = styled.div` display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; @media (max-width: 900px) { grid-template-columns: 1fr; } `;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } 
  p { font-size: 16px; color: ${COLORS.textGray}; }
`;

const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); color: white; text-align: center; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; } .card-text { font-size: 15.5px; }`;
const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    {/* Composition representing Eye Path and Strategic Vision */}
    <circle cx="250" cy="250" r="120" stroke={COLORS.lime} strokeWidth="2" fill="none" />
    <line x1="100" y1="250" x2="400" y2="250" stroke={COLORS.lime} strokeWidth="4" />
    <circle cx="250" cy="250" r="10" fill={COLORS.white} />
  </motion.svg>
);

const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px;`;
const BannerWrapper = styled.div`width: 100%; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 40px; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; letter-spacing: -1px;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000; padding: 18px 28px; border-radius: 2px; font-weight: 600; cursor: pointer; border: none; display: flex; align-items: center; gap: 16px;`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; z-index: 1; @media (max-width: 850px) { transform: scale(0.6); }`;

const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; width: 100%; height: 100%; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; font-weight: 700;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; line-height: 1.1;`;
const HeaderDesc = styled.p`font-size: 18px; color: #555;`;

const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;

const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { clip-path: none; height: auto; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; background-color: #ffffff; cursor: grab; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; height: 100%; width: 100%;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; text-transform: uppercase;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665;`;
const QuoteText = styled.p`font-size: 20px; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center;`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; border-radius: 50%; cursor: pointer; &:hover { background-color: #28a665; color: #fff; }`;

const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; h3 { color: ${COLORS.coaxBlue}; font-size: 26px; } p { font-size: 16px; color: ${COLORS.textGray}; }`;
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
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); color: #1a1b1e; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; .q-header { display: flex; align-items: center; justify-content: space-between; h3 { font-size: 17px; } .icon-box { border: 1px solid #e0e0e0; padding: 2px; } } .a-body { overflow: hidden; p { margin-top: 24px; font-size: 15px; color: ${COLORS.textGray}; } }`;

const BlogSection = styled.div` background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd; overflow: hidden; `;
const BlogContainer = styled.div` max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center; `;
const BlogHeaderWrapper = styled.div` margin-bottom: 60px; text-align: center; width: 100%; `;
const BlogTitle = styled.h2` font-size: 48px; color: #1a1a1a; margin: 0; line-height: 1.1; display: flex; flex-direction: column; `;
const BlogLink = styled.span` color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; `;
const BlogSliderOuter = styled.div` display: flex; flex-direction: column; align-items: center; width: 100%; `;
const BlogCardsContainer = styled.div` display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; scrollbar-width: none; &::-webkit-scrollbar { display: none; } `;
const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer; flex-shrink: 0;
  &:hover { transform: translateY(-8px); } 
  .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } 
  .card-content { width: 60%; padding: 30px; } 
  .tag { background: #e6f7ee; color: #28a665; font-size: 11px; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; display: inline-block; } 
  h3 { font-size: 20px; font-weight: 700; color: #111; } 
  .date { font-size: 13px; color: #999; margin-top: auto; } 
  @media (max-width: 600px) { min-width: 85vw; flex-direction: column; .card-img { width: 100%; height: 200px; } } 
`;
const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: white; cursor: pointer; `;
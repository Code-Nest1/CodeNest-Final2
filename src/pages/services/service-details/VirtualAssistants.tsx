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

// --- DATA ---
const STANDARDS = [
  { id: "SLA", title: "Guaranteed Response Times", desc: "Rigorous SLA standards ensuring that all critical administrative tasks and communications are acknowledged and processed within your chosen priority window." },
  { id: "ISO", title: "Information Security Protocols", desc: "Adherence to high-tier data privacy standards (including GDPR and HIPAA alignment) ensuring your internal credentials and sensitive data remain protected." },
  { id: "PMO", title: "Agile Task Management", desc: "Our assistants operate using modern project management methodologies—Scrum or Kanban—integrated directly into your existing ClickUp, Jira, or Trello boards." },
  { id: "VOCAL", title: "Native-Level Proficiency", desc: "A rigorous vetting process ensuring every virtual partner possesses near-native English fluency and professional corporate etiquette for client-facing tasks." }
];

const BENEFITS_DATA = [
  {
    title: "Reclaim high-value focus",
    desc: "By delegating repetitive administrative logic, calendar management, and research to our virtual pod, you free up 15-20 hours a week to focus strictly on revenue-generating strategy and business growth."
  },
  {
    title: "Operational cost efficiency",
    desc: "Eliminate the overhead of full-time localized employees. Our managed assistance model provides elite executive support at 40-60% of the cost of an in-house hire, including all equipment and benefits overhead."
  },
  {
    title: "Elastic scaling on-demand",
    desc: "Your business isn't static. Our virtual assistance solutions are designed to scale instantly—from 10 hours a month to a dedicated 24/7 multi-person pod—matching the current pulse and demands of your startup or firm."
  },
  {
    title: "Multi-timezone coverage",
    desc: "Dominate global markets with assistance that never sleeps. We strategically place your dedicated assistant in your specific time zone or offer 'Follow-the-Sun' support to ensure tasks move forward while you rest."
  },
  {
    title: "Tool-agnostic integration",
    desc: "Our assistants arrive already trained in the modern tech stack. Whether your team relies on Slack, Notion, Salesforce, or complex custom CRMs, our specialists integrate seamlessly into your established digital ecosystem."
  },
  {
    title: "Reduced management friction",
    desc: "Every Code Nest assistant is overseen by an Internal Success Manager. This means we handle the QA, training, and performance reviews, giving you the output of a top-tier professional with zero management headache."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Elite 1% Talent Vetting", desc: "We receive thousands of applications but only hire the top 1%. Our vetting includes complex logic testing, cultural alignment checks, and deep-dive technical proficiency assessments." },
  { num: "/ 02", title: "Dedicated Success Manager", desc: "You aren't just getting an assistant; you're getting a management layer. Your Account Manager ensures your workflows are optimized and handles any required task re-balancing." },
  { num: "/ 03", title: "Executive-Level Thinking", desc: "Our assistants don't just 'take orders'. They are trained in proactive problem-solving, looking for bottlenecks in your scheduling and suggesting workflow improvements autonomously." },
  { num: "/ 04", title: "Bulletproof Data Privacy", desc: "We utilize encrypted password managers and enterprise-grade VPNs. We take a 'Least Privilege' access approach to your sensitive accounts, ensuring maximum security and transparency." },
  { num: "/ 05", title: "Context-Aware Partnership", desc: "We take the time to learn your brand's unique voice and operational quirks. This leads to a higher-fidelity partnership where your assistant acts as a true extension of your own professional brand." },
  { num: "/ 06", title: "Continuous Skill Evolution", desc: "The digital world moves fast. We provide ongoing training for our staff in AI tools, modern marketing tech, and financial reporting, ensuring your assistant stays at the cutting edge." }
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
    name: "James McAvoy",
    role: "Founding Partner, Zenith Ventures",
    company: "Zenith Ventures",
    quote: "The virtual support from Code Nest has been instrumental in our series A fundraising. My assistant manages my inbox, handles complex research briefs, and ensures my calendar is a weapon of productivity.",
    imgSrc: "/assets/feedback/person10.jpg",
    serviceTag: "Executive Virtual Support",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Catherine Zheng",
    role: "CEO, Lucid eCommerce",
    company: "Lucid",
    quote: "Scaling our customer operations across 5 countries was a nightmare until we found Code Nest. Their virtual pods integrated into our Zendesk and Slack instantly, bringing professional stability to our chaos.",
    imgSrc: "/assets/feedback/person11.jpg",
    logoSrc: "/assets/feedback/logo3.png",
    serviceTag: "Operations & Management",
    ctaText: "See Scaling Strategy",
  },
  {
    id: 3,
    name: "Robert Ford",
    role: "COO, Nexus Manufacturing",
    company: "Nexus",
    quote: "Reliability is the biggest factor for us. Our Code Nest assistants have maintained a 100% attendance rate and consistently high output. It’s the most cost-effective executive decision we've made this year.",
    imgSrc: "/assets/feedback/person12.jpg",
    serviceTag: "Admin Managed Services",
    ctaText: "Review Efficiency Gains",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Workflow Mapping",
    desc: "We analyze your current daily activities to identify 'Low Leverage' tasks that are eating your time. We then build a customized delegation roadmap designed to offload 80% of your administrative burden."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Strategic Pairing",
    desc: "We match you with a dedicated assistant based on your personality, tool stack, and industry specific requirements. This isn't just a hire; it's a partner paired through data and experience."
  },
  {
    icon: <FileText size={28} />,
    title: "Rapid Integration",
    desc: "During our onboarding sprint, we help set up secure access portals and communication channels. We implement 'SOPs' (Standard Operating Procedures) for all your recurring tasks to ensure consistent output."
  },
  {
    icon: <Headphones size={28} />,
    title: "Optimized Scaling",
    desc: "Our support doesn't stop at hire. Monthly optimization meetings between you and our Success Manager ensure that as your company grows, your assistance infrastructure expands to meet the new scale."
  }
];

const FAQ_DATA = [
    {
        question: "How do I ensure the security of my passwords and accounts?",
        answer: "We utilize industry-standard password managers (like LastPass or 1Password) so your assistant can log in without ever seeing the raw password. Additionally, all our assistants sign ironclad NDAs and operate through monitored secure environments."
    },
    {
        question: "Can I choose which time zone my assistant works in?",
        answer: "Yes. We offer assistants that work strictly in your local hours (EST, GMT, PST, etc.) or specialized schedules designed to give you 24-hour business movement if your operations are international."
    },
    {
        question: "What kind of tasks can I delegate?",
        answer: "Almost anything that happens in a browser: Email management, travel booking, social media scheduling, CRM data entry, invoicing, research, and technical project management are our most common core services."
    },
    {
        question: "Do I have to sign a long-term contract?",
        answer: "No. We believe in earning your partnership every month. We offer flexible month-to-month service agreements with no hidden exit fees, allowing you to scale up or down as your revenue changes."
    },
    {
        question: "What happens if my assigned assistant is sick or on leave?",
        answer: "Your Internal Success Manager is always familiar with your SOPs. If your primary assistant is away, we provide a pre-trained 'backfill' to ensure your operations don't miss a single beat."
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

export default function VirtualAssistance() {
  const navigate = useNavigate();

  const [openStandard, setOpenStandard] = useState<string | null>("SLA");
  
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
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Virtual assistance</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Managed <br /> virtual assistance</motion.h1>
            <ButtonGroup>
              <MainBtn>Schedule a Mapping Call</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Stop managing micro-tasks. Scale your output with a vetted, engineering-standard virtual partnership.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Elite Vetting</span><div className="stars">★★★★★ <span className="val">Top 1%</span></div></RatingItem>
              <RatingItem><span className="brand">Global Pods</span><div className="stars">★★★★★ <span className="val">24/7 Coverage</span></div></RatingItem>
              <RatingItem><span className="brand">( Productivity )</span><div className="stars">★★★★★ <span className="val">4.8x Efficiency</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Leverage & Productivity Audit</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Business speed is <br /> hindered by admin <br /> friction—we eliminate <br /> it permanently</motion.h2>
          <RightContentBlock>
            <p>We analyze your internal operational workflows to find every 'zero-ROI' activity. We then map these into a repeatable virtual partnership, allowing you to act with extreme agility.</p>
            <BlueButtonGroup><BlueTextBtn>Map my internal efficiency roadmap</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Operational standards <br /> baked into every <br /> Code Nest assistant</h2>
            <AccordionList>
                {STANDARDS.map((item) => (
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
            { id: "01.", title: "Proactive Inbox Flow", desc: "Prioritized inbox filtering and response drafts based on your unique criteria." },
            { id: "02.", title: "Calendar Mastery", desc: "Complex timezone management and strategic block-out times for deep work." },
            { id: "03.", title: "Lead Generation Sync", desc: "Coordinating prospect outreach and LinkedIn management with direct CRM entry." },
            { id: "04.", title: "Invoicing & AP", desc: "Managing client billing, vendor payments, and expense tracking with total accuracy." },
            { id: "05.", title: "Research Intelligence", desc: "High-quality market, vendor, or product research delivered in structured briefs." },
            { id: "06.", title: "Operational Continuity", desc: "Documentation of every process (SOPs) so your knowledge is institutionalized." }
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
            Why choose our executive <br /> assistance frameworks?
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
          Why choose Code Nest for your <br /> Virtual Support Partner?
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

            <BannerText>Ready to audit your delegation score?</BannerText>
            
            <DownloadBtn>
              Download the 30-day time-recovery worksheet
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
            <SubHeader>Peak Leverage</SubHeader>
            <HeaderTitle>How executives win with our partnership</HeaderTitle>
            <HeaderDesc>
              Engineering-minded delegation isn't about clearing emails—it's about 
              building a professional infrastructure that makes failure impossible.
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

      {/* --- 9. HOW TASK MAPPING WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How we launch support
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
                        Buy back your time — <br /> hire your assistant today
                    </BannerTitle10>
                    <ConsultBtn>
                        Request my Task Audit Call 
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
                        <h2>Managed operations <br /> questions and answers</h2>
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
                  Leadership & Leverage<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Efficiency Insights <ArrowUpRight size={32} />
                  </BlogLink>
                </BlogTitle>
             </BlogHeaderWrapper>

             {loadingBlogs ? (
               <div style={{ textAlign: "center", padding: "40px", color: COLORS.textGray }}>
                   Loading Resources...
               </div>
             ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                               || 'https://via.placeholder.com/600x400?text=No+Image';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Productivity';
                           
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
const PageWrapper = styled.div`
  background: white; 
  overflow-x: hidden;
`;

/* Hero Styles */
const HeroSection = styled.section`
  background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;
  @media (max-width: 600px) { padding-top: 140px; }
`;
const HeroInner = styled.div`
  max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px;
  h1 { color: #ffffff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; }
`;
const HeroContent = styled.div`
  display: flex; flex-direction: column; gap: 30px; 
  @media (max-width: 600px) { h1 { font-size: 42px; letter-spacing: -1.5px; } }
`;
const Breadcrumbs = styled.div`
  font-size: 13px; display: flex; align-items: center; gap: 10px; 
  .star { color: ${COLORS.starGold}; } a { color: white; text-decoration: none; opacity: 0.7; }
`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: white; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

/* Section 2 Intro */
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column; @media (max-width: 768px) { padding: 60px 24px; }`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div`
  display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; 
  .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; }
  @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; align-items: flex-start; }
`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`;

/* Section 3 Standards */
const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`
  max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; 
  .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; } 
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }
`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; }`;

/* Section 4 Grid Section */
const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue};`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500; @media (max-width: 768px) { font-size: 32px; }`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`
  background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); 
  .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } h3 { font-size: 24px; margin-bottom: 15px; } p { font-size: 16px; color: rgba(0,0,0,0.75); }
`;

/* Section 5 Benefits */
const BenefitsContainer = styled.section`
  padding: 140px 0; background-color: white; 
  .title-wrapper { padding: 0 10%; margin-bottom: 80px; text-align: center; h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; letter-spacing: -2px; } }
`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  h4 { font-size: 24px; color: ${COLORS.coaxBlue}; font-weight: 600; } p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; }
  @media (max-width: 900px) { border-right: none; }
`;

/* Section 6 Blue Grid */
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { opacity: 0.6; margin-bottom: 40px; } .card-title { font-size: 24px; margin-bottom: 25px; } .card-text { font-size: 15.5px; line-height: 1.6; }`;

/* Section 7 & Banner Components */
const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px;`;
const BannerWrapper = styled.div`width: 100%; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; max-width: 450px;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; padding: 18px 28px; border-radius: 2px; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s;`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; opacity: 0.9;`;

/* Section 8 Feedback */
const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; position: relative; @media (max-width: 850px) { padding: 80px 0 120px; }`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; color: #09323b; margin-bottom: 24px; @media (max-width: 768px) { font-size: 32px; }`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;

const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { clip-path: none; border-radius: 12px; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; background-color: #ffffff; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; display: flex; flex-direction: column; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; height: auto; z-index: 2; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start; @media (max-width: 850px) { padding: 30px 24px; }`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; text-transform: uppercase; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; margin-bottom: 16px; font-family: serif;`;
const QuoteText = styled.p`font-size: 20px; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px;`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start; transition: all 0.3s;`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; position: absolute; bottom: -70px; left: 0; right: 0;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 50%; &:hover { background-color: #28a665; color: #ffffff; transform: scale(1.1); }`;

/* Section 9 Support Logic */
const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD; @media (max-width: 800px) { padding: 80px 0 100px; }`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; letter-spacing: -1.5px; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; @media (max-width: 800px) { border-right: none; border-bottom: 1px solid ${COLORS.borderColor}; padding: 40px 24px; } h3 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 500; margin-bottom: 24px; } p { font-size: 16px; color: ${COLORS.textGray}; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

/* Section 10 FAQ Wrap */
const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff;`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px; @media (max-width: 900px) { gap: 60px; }`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`@media (min-width: 850px) { flex-direction: row; text-align: left; justify-content: space-between; }`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); z-index: 0;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: #1a1b1e; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; border: 1px solid ${props => props.isOpen ? COLORS.coaxBlue : '#e0e0e0'}; border-radius: 4px; } } .a-body p { margin-top: 24px; font-size: 15px; color: ${COLORS.textGray}; }`;

/* Section 11 Blog Section */
const BlogSection = styled.div`background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd; overflow: hidden;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center; @media (max-width: 768px) { padding: 0 24px; }`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; color: #1a1a1a; display: flex; flex-direction: column; gap: 12px; @media (max-width: 768px) { font-size: 32px; }`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;`;
const BlogSliderOuter = styled.div`width: 100%; display: flex; flex-direction: column; align-items: center;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`
  min-width: 450px; background: white; height: 260px; border-radius: 16px; overflow: hidden; display: flex; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer;
  &:hover { transform: translateY(-8px); border: 1px solid ${COLORS.lime}; } .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } .card-content { width: 60%; padding: 30px; } .tag { background: #e6f7ee; color: #28a665; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; } h3 { font-size: 20px; font-weight: 700; margin-top: 16px; }
  @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } }
`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 56px; height: 56px; border-radius: 50%; background: white; border: 1px solid #e1eadd; display: flex; align-items: center; justify-content: center; cursor: pointer;`;

const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px); max-width: 550px;`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M100 240 Q 100 80, 260 80 V 240 H 100 Z" fill="#2d60ff" />
    <rect x="220" y="240" width="80" height="200" fill={COLORS.lime} />
    <circle cx="160" cy="380" r="70" fill="#00d2ff" /><circle cx="380" cy="150" r="40" stroke={COLORS.lime} strokeWidth="15" />
  </motion.svg>
);
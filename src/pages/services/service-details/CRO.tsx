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

// --- DATA: CRO SPECIFIC ---
const CRO_STANDARDS = [
  { id: "TEST", title: "Scientific A/B Testing", desc: "We don't guess; we experiment. By testing variations of headlines, CTA placements, and layouts, we identify the exact version that generates the highest ROI." },
  { id: "HEAT", title: "Heatmap & Session Analysis", desc: "Visualizing exactly where users click, scroll, and drop off. We identify 'friction points' in your UI that are preventing users from completing a purchase." },
  { id: "FRICTION", title: "Form & Checkout Polish", desc: "Streamlining complex workflows. We reduce form fields and checkout steps to minimize cognitive load, ensuring the path to 'Buy' is frictionless." },
  { id: "PSYCH", title: "Psychological Triggering", desc: "Implementing principles of social proof, scarcity, and urgency correctly to guide user behavior without sacrificing brand integrity." }
];

const BENEFITS_DATA = [
  {
    title: "Maximised Ad Spend (ROAS)",
    desc: "If your ads bring traffic but the site doesn't convert, you're wasting money. CRO ensures your existing traffic yields more profit."
  },
  {
    title: "Lower Customer Acquisition Cost",
    desc: "By doubling your conversion rate, you effectively cut your acquisition cost in half. This allows you to scale more aggressively than competitors."
  },
  {
    title: "Enhanced User Retention",
    desc: "A frictionless experience makes users happy. Happy users stay longer, spend more, and return more frequently, increasing Lifetime Value (LTV)."
  },
  {
    title: "Data-Driven Decisions",
    desc: "Stop letting 'the highest paid person in the room' decide on design. We base every UI change on statistical evidence from your actual users."
  },
  {
    title: "Mobile Commerce Edge",
    desc: "With most traffic coming from mobile, we optimize for thumb-reach and small-screen interactions to capture the growing mobile-first market."
  },
  {
    title: "Sustainable Competitive Gain",
    desc: "Competitors can copy your ads, but they can't copy your data-refined user journey. CRO creates a proprietary conversion engine for your brand."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Full-Stack CRO Team", desc: "Our team consists of data analysts, UI designers, and front-end developers who can implement complex experiments immediately." },
  { num: "/ 02", title: "Proprietary Tech Stack", desc: "We utilize advanced tracking tools to monitor 'Rage Clicks' and 'Dead Clicks' that basic analytics miss." },
  { num: "/ 03", title: "Conversion Psychologists", desc: "Our strategy is based on behavioral economics. We understand the 'Why' behind user action, not just the 'What'." },
  { num: "/ 04", title: "Iterative Roadmap", desc: "CRO is a marathon. we run continuous cycles of 'Audit > Hypothesize > Test > Deploy', ensuring growth never plateaus." },
  { num: "/ 05", title: "Rapid implementation", desc: "Since we are also developers, we don't just provide 'ideas'. We build the variations ourselves using optimized code that won't slow your site." },
  { num: "/ 06", title: "Full Funnel Visibility", desc: "We don't just optimize a button; we optimize the entire funnel from initial click to final confirmation page." }
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
    name: "Linda Garret",
    role: "E-commerce Director",
    company: "SoleNation",
    quote: "Code Nest's A/B tests resulted in a 34% uplift in our checkout completions. The ROI was visible within the first two weeks of experimentation.",
    imgSrc: "/assets/feedback/michael.jpg", 
    serviceTag: "Conversion Strategy",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Mark Sanderson",
    role: "VP Growth",
    company: "SaaS Rocket",
    quote: "The behavioral audit revealed we were losing 40% of leads at our pricing table. The redesigned table paid for itself within days of launch.",
    imgSrc: "/assets/feedback/dan.jpg",
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "A/B Testing",
    ctaText: "View Case Study",
  },
  {
    id: 3,
    name: "Sarah Ohara",
    role: "Product Owner",
    company: "LeadGenie",
    quote: "Expert-level analysis of user intent. Their ability to remove friction from our signup flow tripled our daily active users.",
    imgSrc: "/assets/feedback/michael.jpg",
    serviceTag: "UX Optimization",
    ctaText: "See Success",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Behavioral Audit",
    desc: "Mapping your current funnel to identify the 'leakiest' points where potential revenue is being lost daily."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Experiment Roadmap",
    desc: "Designing a backlog of prioritized tests based on 'Potential ROI vs. Complexity'—ensuring quick wins early on."
  },
  {
    icon: <FileText size={28} />,
    title: "Split Testing (A/B/n)",
    desc: "Running high-fidelity tests with statistically significant samples to determine the winner based on hard revenue data."
  },
  {
    icon: <Headphones size={28} />,
    title: "Iterative Refinement",
    desc: "Hardcoding the winning version while using the data gathered to inform the next phase of psychological experimentation."
  }
];

const FAQ_DATA = [
    {
        question: "How much traffic do I need for CRO to work?",
        answer: "Statistical significance is key. Usually, we recommend at least 1,000 conversions (purchases or leads) per month to run high-confidence A/B tests."
    },
    {
        question: "Does A/B testing slow down my website?",
        answer: "If implemented poorly, yes. But Code Nest uses anti-flicker technology and server-side experiments to ensure speed remains elite."
    },
    {
        question: "Can't I just copy my competitors?",
        answer: "No. Their audience is different. CRO depends on your unique brand voice and traffic source."
    },
    {
        question: "When will I see the first results?",
        answer: "Data collection starts day one. Depending on traffic, we can usually call a winner for our first experiment within 14–21 days."
    },
    {
        question: "Is CRO only for E-commerce sites?",
        answer: "No. Any business that uses its website to generate leads, SaaS signups, or downloads can benefit from CRO."
    }
];

const TRANSITION_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];
const contentVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.98, zIndex: 2 }),
  center: { zIndex: 2, x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: TRANSITION_EASE } },
  exit: (direction: number) => ({ zIndex: 1, x: direction < 0 ? 80 : -80, opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: TRANSITION_EASE } }),
};
const orbOneVariants: Variants = { animate: { y: [0, -50, 0], x: [0, 30, 0], scale: [1, 1.1, 1], transition: { duration: 15, repeat: Infinity, ease: "easeInOut" } } };
const orbTwoVariants: Variants = { animate: { y: [0, 60, 0], x: [0, -40, 0], scale: [1, 1.2, 1], transition: { duration: 18, repeat: Infinity, ease: "easeInOut" } } };

interface WPPost {
    id: number; slug: string; date: string; title: { rendered: string };
    _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }>; 'wp:term'?: Array<Array<{ name: string }>>; };
}

export default function CRO() {
  const navigate = useNavigate();
  const [openStandard, setOpenStandard] = useState<string | null>("TEST");
  const [[page, direction], setPage] = useState([0, 0]);
  const cardControls = useAnimation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [blogPosts, setBlogPosts] = useState<WPPost[]>([]);
  const blogSliderRef = useRef<HTMLDivElement>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const feedbackIndex = ((page % FEEDBACKS.length) + FEEDBACKS.length) % FEEDBACKS.length;
  const currentFeedback = FEEDBACKS[feedbackIndex];

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const res = await fetch('https://blogs.codenest.us.com/wp-json/wp/v2/posts?_embed&per_page=6');
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setBlogPosts(data);
        } catch (error) { console.error("Error loading blogs:", error); } finally { setLoadingBlogs(false); }
    };
    fetchBlogs();
  }, []);

  const paginate = useCallback((newDirection: number) => { setPage((prev) => [prev[0] + newDirection, newDirection]); }, []);

  useEffect(() => {
    cardControls.start({ scale: [0.98, 1], y: [6, 0], transition: { duration: 0.5, ease: "easeOut" } });
  }, [page, cardControls]);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -80) paginate(1);
    else if (swipe > 100 || offset.x > 80) paginate(-1);
  };

  const scrollBlogSlider = (dir: 'left' | 'right') => {
    if (blogSliderRef.current) {
        const scrollAmount = 450;
        blogSliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <PageWrapper>
      {/* 1. HERO */}
      <HeroSection>
        <HeroInner>
          <HeroContent>
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>CRO</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Revenue Max <br /> (CRO) Strategy</motion.h1>
            <ButtonGroup>
              <MainBtn>Optimize My Site</MainBtn>
              <IconBtn><ArrowUpRight size={20}/></IconBtn>
            </ButtonGroup>
            <HeroPara>Stop burning budget on bounce rates. Scale your revenue by turning more clicks into customers through elite psychological optimization.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Analytics</span><div className="stars">★★★★★ <span className="val">ROI Mastery</span></div></RatingItem>
              <RatingItem><span className="brand">Experiments</span><div className="stars">★★★★★ <span className="val">Scientific Growth</span></div></RatingItem>
              <RatingItem><span className="brand">( Speed )</span><div className="stars">★★★★★ <span className="val">2x Profits</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* 2. INTRO */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Conversion Audit Pipeline</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Turn your current <br /> traffic into a revenue <br /> generating machine</motion.h2>
          <RightContentBlock>
            <p>Spending more on ads isn't the only way to grow. Our CRO audit identifies why your users are leaving and provides the experimental framework needed to double your site’s output.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze my Funnel</BlueTextBtn><BlueIconBtn><ArrowRight size={18} color={COLORS.lime}/></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* 3. STANDARDS */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Data-Backed Growth <br /> Conversion standards</h2>
            <AccordionList>
                {CRO_STANDARDS.map((item) => (
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

      {/* 4. EXPECTATIONS */}
      <GridSection>
        <SectionHeader white>What to expect</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Low Friction", desc: "Removing 'click obstacles' that frustrate your users and prevent sales." },
            { id: "02.", title: "Evidence-Led UX", desc: "User interfaces designed based on eye-tracking data and behavior analysis." },
            { id: "03.", title: "Scaled ROAS", desc: "Your advertising budget works harder as your landing pages convert better." },
            { id: "04.", title: "Lead Velocity", desc: "Shortened form submissions and easier paths to the checkout confirm page." },
            { id: "05.", title: "ROI Confidence", desc: "Know exactly which change resulted in which revenue boost via data reporting." },
            { id: "06.", title: "Adaptive Psych", desc: "Messaging that hits the right 'mental trigger' at each point in the journey." }
          ].map((item, i) => (
            <DogEarCard key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="card-num">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </DogEarCard>
          ))}
        </CardsGrid>
      </GridSection>

      {/* 5. BENEFITS */}
      <BenefitsContainer>
        <div className="title-wrapper">
          <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>Why choose Optimization <br /> over more spending?</motion.h2>
        </div>
        <BenefitsGridWrapper>
          {BENEFITS_DATA.map((benefit, index) => (
            <BenefitCell key={index} index={index} isLeft={index % 2 === 0}>
              <div className="icon-row">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill={COLORS.coaxBlue}/></svg>
              </div>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </BenefitCell>
          ))}
        </BenefitsGridWrapper>
      </BenefitsContainer>

      {/* 6. WHY CHOOSE */}
      <BlueCardSection>
        <motion.h2 className="centered-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Why choose Code Nest for your <br /> Conversion Growth?</motion.h2>
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

      {/* 7. BANNER */}
      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none"><path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" fill="none" opacity="0.8" /><circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" /></svg>
            </DecoCircles>
            <BannerText>Are you leaking Profit?</BannerText>
            <DownloadBtn>Download Conversion audit guide<ArrowDown size={18} style={{ marginLeft: "auto", color: '#000' }} /></DownloadBtn>
            <DecoStar><svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></DecoStar>
          </BannerContent>
        </BannerWrapper>
      </PageSevenContainer>

      {/* 8. FEEDBACK */}
      <Section8>
        <BackgroundWrapper><GridOverlay /><OrbOne variants={orbOneVariants} animate="animate" /><OrbTwo variants={orbTwoVariants} animate="animate" /></BackgroundWrapper>
        <Container8>
          <HeaderWrapper>
            <SubHeader>Result Reviews</SubHeader>
            <HeaderTitle>Optimized For Profit</HeaderTitle>
            <HeaderDesc>See how we fixed leaky funnels for our global partners.</HeaderDesc>
          </HeaderWrapper>
          <SliderWrapper>
            <StackLayerOne /><StackLayerTwo />
            <CardWindow>
              <CardFrame animate={cardControls}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <InnerGrid key={page} custom={direction} variants={contentVariants} initial="enter" animate="center" exit="exit" drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
                    <ImageSide><LogoOverlay src={currentFeedback.logoSrc} /><ProfileImg src={currentFeedback.imgSrc} /></ImageSide>
                    <ContentSide>
                      <ServiceTag>{currentFeedback.serviceTag}</ServiceTag>
                      <QuoteIcon>“</QuoteIcon>
                      <QuoteText>{currentFeedback.quote}</QuoteText>
                      <AuthorBlock>
                        <AuthorName>{currentFeedback.name}</AuthorName>
                        <AuthorRole>{currentFeedback.role} <AuthorCompany>| {currentFeedback.company}</AuthorCompany></AuthorRole>
                      </AuthorBlock>
                      {currentFeedback.ctaText && <CtaButton>{currentFeedback.ctaText} <ArrowRight size={14} /></CtaButton>}
                    </ContentSide>
                  </InnerGrid>
                </AnimatePresence>
              </CardFrame>
            </CardWindow>
            <Controls><NavBtn onClick={() => paginate(-1)}><ChevronLeft/></NavBtn><NavBtn onClick={() => paginate(1)}><ChevronRight/></NavBtn></Controls>
          </SliderWrapper>
        </Container8>
      </Section8>

      {/* 9. PROCESS */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 className="audit-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}>Scientific Audit Flow</motion.h2>
           <ProcessGrid>
              {AUDIT_STEPS.map((step, idx) => (
                <ProcessCard key={idx} idx={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <IconBox>{step.icon}</IconBox>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </ProcessCard>
              ))}
           </ProcessGrid>
        </AuditContainer>
      </AuditProcessSection>

      {/* 10. FAQ */}
      <PageTenSection>
        <PageTenInner>
            <CTABanner10>
                 <BannerContent10>
                    <DecoCircles><svg width="250" height="200" viewBox="0 0 250 200" fill="none"><path d="M-20 180 C50 180, 80 120, 80 60" stroke={COLORS.lime} strokeWidth="3" opacity="0.8" /></svg></DecoCircles>
                    <BannerTitle10>Ready to convert better?</BannerTitle10>
                    <ConsultBtn>Start Optimization Trial <ArrowDown size={18} style={{ transform: 'rotate(-45deg)' }} /></ConsultBtn>
                 </BannerContent10>
            </CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft><h2>Common questions <br /> about CRO</h2></FAQLeft>
                    <FAQRight>
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}>
                                <div className="q-header">
                                    <h3>{item.question}</h3>
                                    <div className="icon-box">{openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}</div>
                                </div>
                                <AnimatePresence>
                                    {openFaqIndex === index && <motion.div className="a-body" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}><p>{item.answer}</p></motion.div>}
                                </AnimatePresence>
                            </FAQItem>
                        ))}
                    </FAQRight>
                </FAQContent>
            </FAQSectionWrapper>
        </PageTenInner>
      </PageTenSection>

      {/* 11. BLOG */}
      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper><BlogTitle>Conversion Insights <br /> <BlogLink onClick={() => navigate('/blog')}>Check our blog <ArrowUpRight size={32} /></BlogLink></BlogTitle></BlogHeaderWrapper>
             {!loadingBlogs && (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => (
                        <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                            <div className="card-img"><img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''} alt="" /></div>
                            <div className="card-content"><span className="tag">Growth</span><h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} /><span className="date">{formatDate(post.date)}</span></div>
                        </BlogCard>
                       ))}
                    </BlogCardsContainer>
                    <SliderControls><SliderButton onClick={() => scrollBlogSlider('left')}><ArrowLeft/></SliderButton><SliderButton onClick={() => scrollBlogSlider('right')}><ArrowRight/></SliderButton></SliderControls>
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
const PageWrapper = styled.div`background: white; overflow-x: hidden; font-family: 'Inter', sans-serif;`;
const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; h1 { font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; color: #ffffff; } @media (max-width: 960px) { grid-template-columns: 1fr; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; text-decoration: none; opacity: 0.7; }`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; display: flex; align-items: center; justify-content: center; color: black;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: white; margin-left: 8px; font-weight: 300; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; @media (max-width: 768px) { padding: 60px 24px; }`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; align-items: flex-start; }`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content;`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer;`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center;`;
const StandardsContainer = styled.section`padding: 140px 10%; background: white;`;
const StandardsInner = styled.div`max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; }`;
const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue};`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`background: ${COLORS.lime}; padding: 40px; min-height: 280px; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } h3 { font-size: 24px; color: ${COLORS.textDark}; margin-bottom: 15px; } p { font-size: 16px; color: rgba(0,0,0,0.75); }`;
const BenefitsContainer = styled.section`padding: 140px 0; .title-wrapper { padding: 0 10%; margin-bottom: 80px; h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; text-align: center; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
// FIX: Added 'index' prop type
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`padding: 80px 10%; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee; h4 { font-size: 24px; color: ${COLORS.coaxBlue}; font-weight: 600; } p { font-size: 16px; color: ${COLORS.textGray}; line-height: 1.7; }`;
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); color: white; text-align: center; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 40px; opacity: 0.6; } h3 { font-size: 24px; margin-bottom: 25px; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; }`;
const PageSevenContainer = styled.div`padding: 80px 24px; max-width: 1440px; margin: 0 auto;`;
const BannerWrapper = styled.div`width: 100%; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;`;
const BannerContent = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 40px; width: 100%; max-width: 800px; padding: 60px 20px; color: white; z-index: 5; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`font-size: 38px; font-weight: 500;`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; padding: 18px 28px; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px;`;
const DecoCircles = styled.div`position: absolute; left: 0; top: 0; z-index: 0;`;
const DecoStar = styled.div`position: absolute; right: 80px; top: 40px; z-index: 1;`;
const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; position: relative; overflow: hidden;`;
const BackgroundWrapper = styled.div`position: absolute; inset: 0; z-index: 0; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, transparent 70%); filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, transparent 70%); filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; margin-bottom: 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; line-height: 1.1;`;
const HeaderDesc = styled.p`font-size: 18px; color: #555;`;
const SliderWrapper = styled.div`position: relative; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(40, 166, 101, 0.2); clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); z-index: 1;`;
const StackLayerTwo = styled.div`position: absolute; inset: 20px -20px -20px 20px; background: #28a665; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); z-index: 0;`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background: white; width: 100%; height: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); overflow: hidden;`;
const InnerGrid = styled(motion.div)`position: absolute; inset: 0; display: grid; grid-template-columns: 42% 58%; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; }`;
const ImageSide = styled.div`background: #f0f0f0; width: 100%; position: relative; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); z-index: 2;`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column;`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212;`;
const AuthorRole = styled.div`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`color: #28a665; font-weight: 600;`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: white; padding: 12px 24px; border: none; font-weight: 600; cursor: pointer; border-radius: 4px; transition: 0.3s; &:hover { background: #28a665; }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; position: absolute; bottom: -70px; width: 100%;`;
const NavBtn = styled.button`width: 48px; height: 48px; border-radius: 50%; border: 1px solid #eee; background: white; cursor: pointer; &:hover { background: #28a665; color: white; }`;
const AuditProcessSection = styled.section`padding: 140px 0; background-color: #F8FAFD;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; }`;
// FIX: Added idx type
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; h3 { color: ${COLORS.coaxBlue}; font-size: 26px; margin-bottom: 24px; } p { color: ${COLORS.textGray}; font-size: 16px; line-height: 1.6; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;
const PageTenSection = styled.section`padding: 100px 0 160px;`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; text-align: center;`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, transparent 60%); pointer-events: none;`;
const FAQContent = styled.div`display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; position: relative; z-index: 1; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; .q-header { display: flex; align-items: center; justify-content: space-between; h3 { font-size: 17px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; } } .a-body { overflow: hidden; p { margin-top: 24px; color: ${COLORS.textGray}; } }`;
const BlogSection = styled.div`background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; line-height: 1.1;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; &:hover { gap: 16px; }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; align-items: center; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px 20px 40px; &::-webkit-scrollbar { display: none; } scrollbar-width: none;`;
const BlogCard = styled.div`min-width: 450px; background: white; height: 260px; border-radius: 16px; display: flex; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer; transition: 0.3s; &:hover { transform: translateY(-8px); } .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; .tag { color: #28a665; font-size: 11px; font-weight: 700; margin-bottom: 12px; } .date { font-size: 12px; color: #999; } }`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 56px; height: 56px; border-radius: 50%; border: 1px solid #eee; background: white; cursor: pointer; &:hover { background: #28a665; color: white; }`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M50 400 Q 250 50, 450 400" fill="none" stroke={COLORS.lime} strokeWidth="20" strokeLinecap="round" />
    <circle cx="250" cy="225" r="70" fill="#2d60ff" />
    <rect x="225" y="400" width="50" height="80" fill={COLORS.lime} />
  </motion.svg>
);
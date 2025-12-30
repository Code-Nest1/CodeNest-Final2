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

// --- DATA: SOCIAL MEDIA SPECIFIC ---
const SOCIAL_STANDARDS = [
  { id: "ALGO", title: "Algorithm-First Creation", desc: "We design content specific to platform-native behaviors (Reels, Threads, Carousels) that triggers the reach multipliers on Instagram, LinkedIn, and TikTok." },
  { id: "COMMUNITY", title: "Active Community Governance", desc: "Social is a two-way conversation. We manage sentiment and high-speed community engagement to build brand loyalty that feels human and responsive." },
  { id: "VIRAL", title: "Viral Mechanics & Hooking", desc: "Utilizing deep psychology to capture the first 2 seconds of the scroll. Our hooks are data-tested to increase 'dwell time' and engagement depth." },
  { id: "ANALYTIC", title: "Engagement Depth Tracking", desc: "We go beyond 'likes'. We track 'Shares' and 'Saves'—the true metrics of brand resonance—to continuously pivot our content toward your buyer's interest." }
];

const BENEFITS_DATA = [
  {
    title: "Instant Brand Recognition",
    desc: "Maintaining a consistent aesthetic and voice across all platforms ensures that when a buyer is ready, your brand is the first they recognize."
  },
  {
    title: "Organic Community Advocacy",
    desc: "By turning followers into fans, your community becomes your strongest sales force, sharing your content and validating your brand's trust factor."
  },
  {
    title: "Market Perception Influence",
    desc: "We position your brand as the 'Go-To' expert in your niche by distributing educational and thought-leadership assets consistently."
  },
  {
    title: "Omni-Platform Lead Gen",
    desc: "From LinkedIn B2B lead forms to Instagram DM funnels, we turn your social presence into a secondary, high-velocity conversion pipeline."
  },
  {
    title: "Shortened Buying Journey",
    desc: "Consumers buy from people they trust. Social allows you to build that trust daily through transparent storytelling and educational content loops."
  },
  {
    title: "Viral Loop Opportunities",
    desc: "Strategically shared content has the potential to reach millions at zero additional cost. We build the architecture for that scale."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Platform Native Experts", desc: "We don't cross-post generic content. We understand the nuances of LinkedIn versus TikTok and tailor every creative to fit the native vibe." },
  { num: "/ 02", title: "Performance-First Content", desc: "Our creative team works directly with our data analysts. Every image and video is produced based on ENGAGEMENT metrics from the week before." },
  { num: "/ 03", title: "Trend Pulse Detection", desc: "The social landscape moves in minutes. We detect rising trends early and pivot your creative assets to ride the momentum before it saturates." },
  { num: "/ 04", title: "Zero Filler Governance", desc: "We don't post just to 'stay active'. Every post must have a goal: Educate, Entertain, or Convert. Zero fluff, 100% impact." },
  { num: "/ 05", title: "Direct Lead Syncing", desc: "We bridge the gap between social and sales. Leads generated on social are automatically synced to your CRM for immediate follow-up." },
  { num: "/ 06", title: "Psychological Triggering", desc: "Using advanced visual cues and linguistic hooks to ensure your brand stops the 'Doom Scroll' and gets the click." }
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
    name: "Samantha Reed",
    role: "CEO",
    company: "FitStream App",
    quote: "Code Nest's TikTok strategy exploded our user base in just two months. Their focus on authentic hooks increased our retention rates by 30%.",
    imgSrc: "/assets/feedback/michael.jpg", 
    serviceTag: "Viral Growth",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Arthur Pen",
    role: "Marketing Lead",
    company: "Zon-Industrial",
    quote: "We thought LinkedIn wouldn't work for heavy machinery. Code Nest proved us wrong. Our DMs are now full of qualified procurement officers.",
    imgSrc: "/assets/feedback/dan.jpg",
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "Social Sales Funnels",
    ctaText: "View Engagement",
  },
  {
    id: 3,
    name: "Elena Petrov",
    role: "Brand Director",
    company: "LuxInterior",
    quote: "The visual consistency across our social accounts has tripled our brand mentions. The team handles everything from creative to management flawlessly.",
    imgSrc: "/assets/feedback/bohdan.jpg",
    serviceTag: "Content Consistency",
    ctaText: "See the Brand",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Channel Audit",
    desc: "Analyzing your current social footprint and identifying the specific channels where your highest-LTV (Lifetime Value) customers hang out."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Creative Concepting",
    desc: "Developing a 'North Star' brand identity for social, including hooks, visual guidelines, and an engagement style guide."
  },
  {
    icon: <FileText size={28} />,
    title: "Asset Production",
    desc: "Building a pipeline of high-impact video and graphic content that stops the scroll and initiates community action."
  },
  {
    icon: <Headphones size={28} />,
    title: "Distribution & Pulse",
    desc: "Launching your campaigns and managing daily interactions, while scaling high-performing posts through organic and paid boosters."
  }
];

const FAQ_DATA = [
    {
        question: "Which platform is best for my brand?",
        answer: "It depends on where your audience is. We perform an audit to determine if your buyers are using LinkedIn for professional growth, Instagram for aesthetics, or TikTok for discovery."
    },
    {
        question: "How often should my business be posting?",
        answer: "Consistency is more vital than frequency. We focus on a high-impact 'Content Velocity' of 3-5 quality assets per week that trigger platform algorithms correctly."
    },
    {
        question: "How do you measure Social ROI?",
        answer: "We look beyond likes. We measure reach depth, link clicks, direct messages (DM leads), and revenue assisted by social interactions via UTM tracking."
    },
    {
        question: "Can social media actually work for B2B?",
        answer: "Absolutely. 80% of B2B leads come from social. We use thought leadership and authority hubs on LinkedIn to build relationships directly with decision makers."
    },
    {
        question: "Do you handle the actual replies and DMs?",
        answer: "Yes. Our Community Management protocol includes rapid response to comments and initial vetting of lead inquiries in your direct messages."
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

export default function SocialMediaCampaigns() {
  const navigate = useNavigate();
  const [openStandard, setOpenStandard] = useState<string | null>("ALGO");
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
        } catch (error) { console.error("Error loading blogs:", error); } 
        finally { setLoadingBlogs(false); }
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

  const scrollBlogSlider = (direction: 'left' | 'right') => {
    if (blogSliderRef.current) {
        const scrollAmount = 450;
        if (direction === 'left') { blogSliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); } 
        else { blogSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' }); }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroInner>
          <HeroContent>
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Social Media Campaigns</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Platform Specific <br /> Growth Strategy</motion.h1>
            <ButtonGroup>
              <MainBtn>Build my Social Machine</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Stop talking into the void. Build an authority community and trigger viral growth loops through platform-native campaigns.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Pulse</span><div className="stars">★★★★★ <span className="val">Trend Aware</span></div></RatingItem>
              <RatingItem><span className="brand">Meta</span><div className="stars">★★★★★ <span className="val">Blue Tick Trust</span></div></RatingItem>
              <RatingItem><span className="brand">( Leads )</span><div className="stars">★★★★★ <span className="val">4x Flow</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Community Trust Audit</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Influence the scroll <br /> and turn observers <br /> into buyers</motion.h2>
          <RightContentBlock>
            <p>Static posts are dead. We analyze your brand’s current sentiment and identifying the specific creative pillars needed to initiate a genuine connection between you and your audience on a daily basis.</p>
            <BlueButtonGroup><BlueTextBtn>Analyze My Influence</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Algorithmic Reach <br /> Growth standards</h2>
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

      <GridSection>
        <SectionHeader white>What to expect</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Native Content", desc: "Every video and graphic designed specifically to blend perfectly into the user's feed." },
            { id: "02.", title: "Daily Engagement", desc: "We manage the comments, building community trust while you sleep." },
            { id: "03.", title: "Trend Catching", desc: "Pivoting your messaging to capitalize on viral moments before they pass." },
            { id: "04.", title: "Multi-Platform Flow", desc: "A unified story across LinkedIn, Instagram, TikTok, and YouTube." },
            { id: "05.", title: "High Conversion", desc: "Linking your creative to trackable lead forms and secondary DM funnels." },
            { id: "06.", title: "Live ROI reporting", desc: "Deep metrics on Reach, Saves, Shares, and actual revenue assisted by social." }
          ].map((item, i) => (
            <DogEarCard key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <span className="card-num">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </DogEarCard>
          ))}
        </CardsGrid>
      </GridSection>

      <BenefitsContainer>
        <div className="title-wrapper">
          <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>Why build an active <br /> Social Presence?</motion.h2>
        </div>
        <BenefitsGridWrapper>
          {BENEFITS_DATA.map((benefit, index) => (
            <BenefitCell key={index} isLeft={index % 2 === 0}>
              <div className="icon-row">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill={COLORS.coaxBlue}/></svg>
              </div>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </BenefitCell>
          ))}
        </BenefitsGridWrapper>
      </BenefitsContainer>

      <BlueCardSection>
        <motion.h2 className="centered-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>Why choose Code Nest for <br /> your social machines?</motion.h2>
        <ChooseCardsGrid>
          {WHY_CHOOSE_CN_DATA.map((card, i) => (
              <WhyChooseCard key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1 }}>
                  <div className="card-index">{card.num}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.desc}</p>
              </WhyChooseCard>
          ))}
        </ChooseCardsGrid>
      </BlueCardSection>

      <PageSevenContainer>
        <BannerWrapper>
          <BannerContent>
            <DecoCircles><svg width="250" height="200" viewBox="0 0 250 200" fill="none"><path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" opacity="0.8" /><circle cx="80" cy="180" r="60" stroke="#bef264" opacity="0.5" /></svg></DecoCircles>
            <BannerText>Assess your Reach Potential?</BannerText>
            <DownloadBtn>Download viral growth checklist<ArrowDown size={18} style={{ marginLeft: "auto", color: '#000' }} /></DownloadBtn>
            <DecoStar><svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></DecoStar>
          </BannerContent>
        </BannerWrapper>
      </PageSevenContainer>

      <Section8>
        <BackgroundWrapper><GridOverlay /><OrbOne animate={{y: [0,-50,0], x: [0,30,0]}} transition={{duration:15,repeat:Infinity}} /><OrbTwo animate={{y:[0,60,0],x:[0,-40,0]}} transition={{duration:18,repeat:Infinity}}/></BackgroundWrapper>
        <Container8>
          <HeaderWrapper>
            <SubHeader>Social Success</SubHeader>
            <HeaderTitle>Result from Connections</HeaderTitle>
            <HeaderDesc>Explore how we shifted market perceptions through high-engagement digital creative.</HeaderDesc>
          </HeaderWrapper>
          <SliderWrapper>
            <StackLayerOne /><StackLayerTwo />
            <CardWindow>
              <CardFrame animate={cardControls}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <InnerGrid key={page} variants={contentVariants} initial="enter" animate="center" exit="exit" drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
                    <ImageSide><ProfileImg src={currentFeedback.imgSrc} draggable="false" />{currentFeedback.logoSrc && <LogoOverlay src={currentFeedback.logoSrc} />}</ImageSide>
                    <ContentSide>
                      <ServiceTag>{currentFeedback.serviceTag}</ServiceTag>
                      <QuoteIcon>“</QuoteIcon>
                      <QuoteText>{currentFeedback.quote}</QuoteText>
                      <AuthorBlock>
                        <AuthorName>{currentFeedback.name}</AuthorName>
                        <AuthorRole>{currentFeedback.role}</AuthorRole>
                        <AuthorCompany>{currentFeedback.company}</AuthorCompany>
                      </AuthorBlock>
                      {currentFeedback.ctaText && <CtaButton>{currentFeedback.ctaText}<ArrowRight size={14} style={{ marginLeft: 6 }} /></CtaButton>}
                    </ContentSide>
                  </InnerGrid>
                </AnimatePresence>
              </CardFrame>
            </CardWindow>
            <Controls><NavBtn onClick={() => paginate(-1)}><ChevronLeft size={20} /></NavBtn><NavBtn onClick={() => paginate(1)}><ChevronRight size={20} /></NavBtn></Controls>
          </SliderWrapper>
        </Container8>
      </Section8>

      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 className="audit-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>Creative Lifecycle</motion.h2>
           <ProcessGrid>
              {AUDIT_STEPS.map((step, idx) => (
                <ProcessCard key={idx} idx={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}>
                  <IconBox>{step.icon}</IconBox>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </ProcessCard>
              ))}
           </ProcessGrid>
        </AuditContainer>
      </AuditProcessSection>

      <PageTenSection>
        <PageTenInner>
            <CTABanner10><BannerContent10><BannerTitle10>Start Viral Momentum?</BannerTitle10><ConsultBtn>Free Growth Strategy <ArrowDown size={18} style={{ color: '#000', transform: 'rotate(-45deg)' }} /></ConsultBtn></BannerContent10></CTABanner10>
            <FAQSectionWrapper>
                <BackgroundCurve />
                <FAQContent>
                    <FAQLeft><h2>Growth Hub <br /> Q&A</h2></FAQLeft>
                    <FAQRight>
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}>
                                <div className="q-header"><h3>{item.question}</h3><div className="icon-box">{openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}</div></div>
                                <AnimatePresence>{openFaqIndex === index && <motion.div className="a-body" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}><p>{item.answer}</p></motion.div>}</AnimatePresence>
                            </FAQItem>
                        ))}
                    </FAQRight>
                </FAQContent>
            </FAQSectionWrapper>
        </PageTenInner>
      </PageTenSection>

      <BlogSection>
          <BlogContainer>
             <BlogHeaderWrapper><BlogTitle>Trend Analysis Blog<br /><BlogLink onClick={() => navigate('/blog')}>Check our blog <ArrowUpRight size={32} /></BlogLink></BlogTitle></BlogHeaderWrapper>
             {loadingBlogs ? <div style={{textAlign: "center"}}>Loading...</div> : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>{blogPosts.map(post => (
                        <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                            <div className="card-img"><img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/placeholder.jpg'} alt="" /></div>
                            <div className="card-content"><span className="tag">Viral Strategy</span><h3>{post.title.rendered}</h3><span className="date">{formatDate(post.date)}</span></div>
                        </BlogCard>
                    ))}</BlogCardsContainer>
                    <SliderControls><SliderButton onClick={() => scrollBlogSlider('left')}><ArrowLeft size={20}/></SliderButton><SliderButton onClick={() => scrollBlogSlider('right')}><ArrowRight size={20}/></SliderButton></SliderControls>
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

/* SVG Logic Mapping nodes/networks for Social */
const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <circle cx="250" cy="250" r="100" fill="#2d60ff" />
    <motion.circle cx="250" cy="250" r="150" fill="none" stroke={COLORS.lime} strokeWidth="2" strokeDasharray="10 20" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
    <circle cx="400" cy="100" r="40" fill={COLORS.lime} />
    <circle cx="100" cy="150" r="25" fill="#00d2ff" />
    <circle cx="150" cy="400" r="45" fill={COLORS.lime} />
    <path d="M250 150 L400 100 M250 350 L150 400 M150 250 L100 150" stroke="#fff" strokeWidth="2" opacity="0.3" />
  </motion.svg>
);

/* 
* THE REST OF THE STYLED COMPONENTS (Approx 600 lines) 
* ARE IDENTICAL TO THE PREVIOUS SEO/ADS/CRO FILES 
* FOR SYSTEM-WIDE CONSISTENCY.
*/

const HeroSection = styled.section`background: ${COLORS.coaxBlue}; color: white; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center; @media (max-width: 600px) { font-size: 42px; letter-spacing: -1.5px; }`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; h1 { color: #ffffff; font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; } @media (max-width: 960px) { grid-template-columns: 1fr; gap: 40px; }`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: white; text-decoration: none; opacity: 0.7; }`;
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
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500; @media (max-width: 768px) { font-size: 32px; margin-bottom: 40px; }`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const DogEarCard = styled(motion.div)`background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } h3 { font-size: 24px; color: ${COLORS.textDark}; margin-bottom: 15px; } p { font-size: 16px; line-height: 1.5; color: rgba(0,0,0,0.75); }`;
const BenefitsContainer = styled.section`padding: 140px 0; background-color: white; display: flex; flex-direction: column; .title-wrapper { padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } } @media (max-width: 768px) { padding: 80px 0; .title-wrapper { padding: 0 24px; text-align: left; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const BenefitCell = styled.div<{ isLeft: boolean }>`padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee; h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; } @media (max-width: 900px) { border-right: none !important; border-bottom: 1px solid #eee !important; padding: 50px 24px; }`;
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; }`;
const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; @media (max-width: 600px) { padding: 40px 16px; }`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;`;
const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px; @media (max-width: 850px) { font-size: 28px; }`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000000; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: 0.2s; min-width: 280px; &:hover { transform: translateY(-2px); }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; opacity: 0.9; z-index: 1; @media (max-width: 850px) { transform: scale(0.6); }`;
const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; position: relative;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); filter: blur(60px);`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); filter: blur(80px);`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; line-height: 1.1; @media (max-width: 768px) { font-size: 32px; }`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; inset: 10px -10px -10px 10px; background: rgba(40, 166, 101, 0.2); z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; inset: 20px -20px -20px 20px; background: #28a665; z-index: 0; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); overflow: hidden; @media (max-width: 850px) { clip-path: none; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; inset: 0; display: grid; grid-template-columns: 42% 58%; background-color: #ffffff; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; @media (max-width: 850px) { height: 280px; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start; @media (max-width: 850px) { padding: 30px 24px; }`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; color: #28a665; text-transform: uppercase; margin-bottom: 20px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif; margin-bottom: 16px; opacity: 0.8;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-size: 14px; border-radius: 4px; cursor: pointer; display: inline-flex; transition: 0.3s; &:hover { background: #28a665; transform: translateY(-2px); }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; width: 100%; z-index: 20;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: 0.2s; border-radius: 50%; &:hover { background-color: #28a665; color: #ffffff; transform: scale(1.1); }`;
const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD; @media (max-width: 800px) { padding: 80px 0 100px; }`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; .audit-title { font-size: clamp(38px, 4.5vw, 62px); text-align: center; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; @media (max-width: 800px) { border-right: none; border-bottom: 1px solid ${COLORS.borderColor}; padding: 40px 24px; } h3 { color: ${COLORS.coaxBlue}; font-size: 26px; margin-bottom: 24px; } p { font-size: 16px; color: ${COLORS.textGray}; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;
const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff; @media (max-width: 900px) { padding: 60px 0 100px; }`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px; @media (max-width: 900px) { gap: 60px; }`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; gap: 30px; @media (min-width: 850px) { text-align: left; justify-content: space-between; flex-direction: row; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px);`;
const ConsultBtn = styled(DownloadBtn)``;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); transform: translateY(-50%); pointer-events: none; z-index: 0;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: #1a1b1e; }`;
const FAQRight = styled.div`display: flex; flex-direction: column;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; } } .a-body { overflow: hidden; p { margin-top: 24px; font-size: 15px; color: ${COLORS.textGray}; } }`;
const BlogSection = styled.div`background-color: #f2f9f5; padding: 100px 0 120px; border-top: 1px solid #e1eadd; font-family: 'Inter', sans-serif; overflow: hidden;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center;`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; line-height: 1.1; color: #1a1a1a; letter-spacing: -1px; display: flex; flex-direction: column; gap: 12px;`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; outline: none; transition: 0.2s; &:hover { gap: 16px; }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; align-items: center; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; width: 100%; padding: 20px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`min-width: 450px; background: white; height: 260px; border-radius: 16px; display: flex; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: 0.3s; cursor: pointer; flex-shrink: 0; &:hover { transform: translateY(-8px); border-color: ${COLORS.lime}; } .card-img { width: 40%; img { width: 100%; height: 100%; object-fit: cover; } } .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; } .tag { color: #28a665; background: #e6f7ee; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; } h3 { font-size: 20px; color: #111; line-height: 1.4; } .date { font-size: 13px; color: #999; margin-top: auto; } @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { height: 200px; width: 100%; } .card-content { width: 100%; } }`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: white; cursor: pointer; transition: 0.3s; &:hover { background: #28a665; color: white; transform: scale(1.1); }`;
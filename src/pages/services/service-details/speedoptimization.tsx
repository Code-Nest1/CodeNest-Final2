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
  { id: "LCP", title: "LCP < 2.5s Standard", desc: "Optimizing the Largest Contentful Paint to ensure the main content of your page renders almost instantly for the user." },
  { id: "CLS", title: "Zero Layout Shift (CLS)", desc: "Eliminating annoying visual jumps by strictly defining aspect ratios and prioritizing font-loading sequences." },
  { id: "FID", title: "First Input Delay Optimization", desc: "Minimizing main-thread blocking time so your interactive elements (buttons, inputs) respond in under 100ms." },
  { id: "TBT", title: "Total Blocking Time Reduction", desc: "Reducing heavy JavaScript execution cycles to free up browser resources for a smoother scrolling experience." }
];

const BENEFITS_DATA = [
  {
    title: "Enhanced SEO rankings",
    desc: "Since the Core Web Vitals update, speed is a direct ranking factor. A fast site doesn't just improve UX; it tells Google your site is technically superior, giving you a competitive edge in SERPs."
  },
  {
    title: "Drastically lower bounce rates",
    desc: "Seconds matter. Most users leave if a site takes longer than 3 seconds to load. We aim for sub-second responses, keeping users engaged and preventing lead leakage in your funnel."
  },
  {
    title: "Increased conversion efficiency",
    desc: "Speed is synonymous with trust. Fast loading pages reduce friction during the checkout or sign-up process, directly correlating to a higher return on ad spend (ROAS)."
  },
  {
    title: "Reduced server bandwidth costs",
    desc: "Optimized code and assets consume less power and bandwidth. By minifying resources and implementing efficient caching, we reduce your infrastructure overhead and environmental footprint."
  },
  {
    title: "Mobile-first performance",
    desc: "Most traffic is mobile, often on 4G or inconsistent networks. We optimize for the 'weakest link,' ensuring your site is lightning fast even on low-tier mobile hardware and connections."
  },
  {
    title: "Future-proof scalability",
    desc: "Clean, performant code handles traffic spikes better. By removing the 'bloat,' your server can handle 3x more concurrent users without needing expensive hardware upgrades."
  }
];

const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Engineering-Led approach", desc: "We don't just install 'optimizer' plugins that hide problems. We rewrite inefficient loops, optimize database queries, and fix the root architectural causes of slowness." },
  { num: "/ 02", title: "Advanced Edge Caching", desc: "We deploy global Content Delivery Networks (CDNs) and edge-computing solutions to serve your static and dynamic assets from the server closest to your user." },
  { num: "/ 03", title: "Real-Device Testing", desc: "Our optimizations are validated on actual mobile devices and varying network speeds, not just synthetic Lighthouse scores, ensuring a real-world speed boost for your customers." },
  { num: "/ 04", title: "Precision Asset Budgeting", desc: "We implement strict performance budgets. Every byte of CSS and JavaScript is audited for necessity, ensuring only the minimum required code is delivered to the client." },
  { num: "/ 05", title: "Database Query Tuning", desc: "Slow sites are often the result of heavy backends. We profile your database calls, adding indexes and caching layers to ensure even complex data loads are instantaneous." },
  { num: "/ 06", title: "Transparent ROI tracking", desc: "We provide 'Before vs. After' speed reports linked to conversion metrics. You'll see exactly how every millisecond we saved translates into better business performance." }
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
    name: "Alex Thorne",
    role: "E-commerce Director, AuraShop",
    company: "AuraShop",
    quote: "We went from a 32 Lighthouse mobile score to 96. Our mobile checkout conversion rate jumped by 22% in the first month following the Code Nest speed optimization. The results were measurable and immediate.",
    imgSrc: "/assets/feedback/person4.jpg",
    serviceTag: "Performance Engineering",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Samantha Reed",
    role: "CEO, ReedMedia",
    company: "ReedMedia",
    quote: "As a media company, page speed is our lifeblood. Code Nest solved layout shifts and asset delivery issues that had plagued us for years. The site now feels instant across three different continents.",
    imgSrc: "/assets/feedback/person5.jpg",
    logoSrc: "/assets/feedback/logo2.png",
    serviceTag: "Speed Optimization",
    ctaText: "View Case Study",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Head of Growth, Finscale",
    company: "Finscale",
    quote: "Technical debt was slowing our SaaS application down. Code Nest performed a deep-level code split that reduced our initial JS bundle by 60%. Highly recommend for any complex React application.",
    imgSrc: "/assets/feedback/person6.jpg",
    serviceTag: "Architecture Tuning",
    ctaText: "See Results",
  },
];

const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Diagnostic Profiling",
    desc: "We perform a deep dive using Chrome DevTools, WebPageTest, and RUM (Real User Monitoring) to map out every millisecond of the Critical Rendering Path and identify exactly what's blocking the load."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Asset Modernization",
    desc: "We implement next-gen formats (WebP/Avif), automate responsive image delivery, and rewrite font-loading strategies to ensure the visual structure is ready before the user even finishes scrolling."
  },
  {
    icon: <FileText size={28} />,
    title: "Execution Optimization",
    desc: "This is where the engineering happens. We defer non-critical JS, minify CSS, implement tree-shaking, and move heavy processes to Service Workers to free up the browser's main thread for user interaction."
  },
  {
    icon: <Headphones size={28} />,
    title: "Performance Monitoring",
    desc: "Post-optimization, we set up continuous monitoring. Speed isn't a one-time fix; we install guardrails that alert us the moment a new code deployment or content update starts to degrade your metrics."
  }
];

const FAQ_DATA = [
    {
        question: "Is '100/100' on Lighthouse actually necessary?",
        answer: "While 100/100 is great, we prioritize 'Pass' status in Core Web Vitals over a vanity score. We focus on real-world interaction speed (LCP, INP, CLS) that impacts Google rankings and user psychological comfort."
    },
    {
        question: "How long does a speed optimization project take?",
        answer: "A standard optimization for a complex site takes 2 to 4 weeks. This includes audit, development, staging tests, and a 'warm-up' period for CDN caches before the final verification."
    },
    {
        question: "Can you optimize speed on Shopify or HubSpot?",
        answer: "Yes. While we have more control over custom React/PHP builds, we utilize advanced liquid optimization, app-bloat reduction, and third-party script management to speed up proprietary platforms significantly."
    },
    {
        question: "Do I have to lose my high-res images for speed?",
        answer: "Never. We use intelligent compression and 'Lazy Loading with Blur-Up' techniques. This allows you to keep stunning imagery while ensuring they only load the moment they are about to enter the viewport."
    },
    {
        question: "Will optimization break any of my site features?",
        answer: "No. Our methodology relies on testing in isolated environments. We handle sensitive features like analytics and marketing pixels with specific delay-loading triggers so they still track accurately without slowing the user experience."
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

export default function SpeedOptimization() {
  const navigate = useNavigate();

  const [openStandard, setOpenStandard] = useState<string | null>("LCP");
  
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
            <Breadcrumbs><span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Speed optimization</strong></Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Speed <br /> optimization service</motion.h1>
            <ButtonGroup>
              <MainBtn>Analyze My Site</MainBtn>
              <IconBtn><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></IconBtn>
            </ButtonGroup>
            <HeroPara>Achieve sub-second load times and pass Google's Core Web Vitals with our performance-focused engineering.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">PageSpeed</span><div className="stars">★★★★★ <span className="val">Score: 90+</span></div></RatingItem>
              <RatingItem><span className="brand">GTmetrix</span><div className="stars">★★★★★ <span className="val">Grade: A</span></div></RatingItem>
              <RatingItem><span className="brand">( Core Web Vitals )</span><div className="stars">★★★★★ <span className="val">Pass</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. SECONDARY INTRO SECTION --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Critical Path Engineering</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Slow performance <br /> is a bug—we fix the <br /> code bottlenecks that <br /> lose you revenue</motion.h2>
          <RightContentBlock>
            <p>Our deep-level audit uncovers redundant JavaScript, unoptimized database calls, and render-blocking CSS that typically escape basic tool checks. We turn bloat into speed.</p>
            <BlueButtonGroup><BlueTextBtn>Get a 60-second speed audit</BlueTextBtn><BlueIconBtn><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.lime} strokeWidth="2.5" strokeLinecap="round"/></svg></BlueIconBtn></BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. STANDARDS ACCORDION SECTION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Global performance <br /> standards mastered by <br /> our team</h2>
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
            { id: "01.", title: "Zero Layout Shift", desc: "Stable rendering that eliminates jumping text or buttons during loading." },
            { id: "02.", title: "Image Hydration", desc: "Automatic next-gen image conversion with lazy loading priorities." },
            { id: "03.", title: "Code Minification", desc: "Drastically reduced bundle sizes through tree-shaking and compression." },
            { id: "04.", title: "Reduced Latency", desc: "Fine-tuned TTFB and server-side responses for an instant feeling." },
            { id: "05.", title: "Critical CSS Path", desc: "Inline CSS for above-the-fold content to ensure immediate paint." },
            { id: "06.", title: "Interaction Readiness", desc: "A browser thread that is free to process clicks and scrolls instantly." }
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
            Why choose our speed-first <br /> architectural solutions?
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
          Why choose Code Nest for your <br /> speed & core web vitals?
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

            <BannerText>Curious about your technical debt?</BannerText>
            
            <DownloadBtn>
              Download Core Web Vitals audit guide
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
            <SubHeader>Performance Wins</SubHeader>
            <HeaderTitle>What partners say about the speed boost</HeaderTitle>
            <HeaderDesc>
              Improving performance by even 100ms leads to measurable gains in revenue
              and long-term user retention for global platforms.
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

      {/* --- 9. HOW OPTIMIZATION WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How we fix the speed
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
                        Stop the drop — let's fix <br /> your load speed today
                    </BannerTitle10>
                    <ConsultBtn>
                        Start My Free Performance Audit 
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
                        <h2>Performance related <br /> questions and answers</h2>
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
                  The Performance Journal<br />
                  <BlogLink onClick={() => navigate('/blog')} role="button" tabIndex={0}>
                     Learn about CWV <ArrowUpRight size={32} />
                  </BlogLink>
                </BlogTitle>
             </BlogHeaderWrapper>

             {loadingBlogs ? (
               <div style={{ textAlign: "center", padding: "40px", color: COLORS.textGray }}>
                   Loading Technical Articles...
               </div>
             ) : (
                <BlogSliderOuter>
                    <BlogCardsContainer ref={blogSliderRef}>
                       {blogPosts.map(post => {
                           const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                               || 'https://via.placeholder.com/600x400?text=No+Image';
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'DevOps';
                           
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
  background: ${COLORS.coaxBlue}; 
  color: white; 
  padding: 100px 10%; 
  margin-top: -80px; 
  min-height: 85vh; 
  display: flex; 
  align-items: center;

  @media (max-width: 600px) {
    padding-top: 140px;
  }
`;
const HeroInner = styled.div`
  max-width: 1440px; 
  margin: 0 auto; 
  width: 100%; 
  display: grid; 
  grid-template-columns: 1.1fr 0.9fr; 
  gap: 50px;
  h1 { 
    color: #ffffff;
    font-size: clamp(50px, 6.5vw, 92px); 
    line-height: 1.05; 
    letter-spacing: -2px; 
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;
const HeroContent = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
  @media (max-width: 600px) {
    h1 {
      font-size: 42px;
      letter-spacing: -1.5px;
    }
  }
`;
const Breadcrumbs = styled.div`
  font-size: 13px; 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  .star { color: ${COLORS.starGold}; } 
  a { color: white; text-decoration: none; opacity: 0.7; }
  flex-wrap: wrap;
`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.lime}; color: black; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer;`;
const IconBtn = styled.div`background: white; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: white; margin-left: 8px; font-weight: 300; } } @media (max-width: 400px) { .brand { font-size: 18px; } }`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; }`;

/* Intro Styles */
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column; @media (max-width: 768px) { padding: 60px 24px; }`;
const BadgeWrapper = styled.div`background: white; padding: 8px 18px; color: ${COLORS.coaxBlue}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.coaxBlue}; border-radius: 50%; display: inline-block; margin-right: 8px; }`;
const LayoutGrid = styled.div`
  display: grid; 
  grid-template-columns: 1.6fr 1fr; 
  gap: 100px; 
  align-items: flex-end; 
  .audit-heading { 
    font-size: clamp(40px, 4.4vw, 70px); 
    line-height: 1.05; 
    letter-spacing: -2px; 
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: flex-start;
  }
`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; }`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content; @media (max-width: 480px) { width: 100%; }`;
const BlueTextBtn = styled.button`background: ${COLORS.coaxBlue}; color: white; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer; @media (max-width: 480px) { width: 100%; text-align: left; }`;
const BlueIconBtn = styled.div`background: ${COLORS.darkerBlue}; width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`;

/* Standards Section */
const StandardsContainer = styled.section`padding: 140px 10%; background: white; @media (max-width: 768px) { padding: 60px 24px; }`;
const StandardsInner = styled.div`
  max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; 
  .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; } 
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 50px; }
  @media (max-width: 600px) { .section-title { font-size: 32px; letter-spacing: -1px; } }
`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.coaxBlue : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.coaxBlue}; font-weight: 700; flex-shrink: 0; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; } @media (max-width: 600px) { .header { gap: 15px; h3 { font-size: 18px; } } .content-body p { padding-left: 39px; } }`;

/* Dog-Ear Cards Styles */
const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.coaxBlue}; @media (max-width: 768px) { padding: 80px 24px; }`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: white; margin-bottom: 60px; font-weight: 500; @media (max-width: 768px) { font-size: 32px; margin-bottom: 40px; }`;
const CardsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; 
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } 
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`;
const DogEarCard = styled(motion.div)`
  background: ${COLORS.lime}; padding: 40px; min-height: 280px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); 
  .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.coaxBlue}; } 
  h3 { font-size: 24px; color: ${COLORS.textDark}; margin-bottom: 15px; } 
  p { font-size: 16px; line-height: 1.5; color: rgba(0,0,0,0.75); }
  @media (max-width: 600px) { min-height: auto; padding: 30px 24px 60px; }
`;

/* Benefits Styles */
const BenefitsContainer = styled.section`
  padding: 140px 0; background-color: white; display: flex; flex-direction: column; 
  .title-wrapper { 
    padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; 
    h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } 
  }
  @media (max-width: 768px) { padding: 80px 0; .title-wrapper { padding: 0 24px; margin-bottom: 40px; text-align: left; } }
`;
const BenefitsGridWrapper = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #eee; border-bottom: 1px solid #eee; width: 100%;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const BenefitCell = styled.div<{ isLeft: boolean, index?: number }>`
  padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; 
  border-right: ${props => props.isLeft ? "1px solid #eee" : "none"}; border-bottom: 1px solid #eee;
  &:nth-last-child(1), &:nth-last-child(2) { border-bottom: none; }
  h4 { font-size: 24px; font-weight: 600; color: ${COLORS.coaxBlue}; } 
  p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; }
  @media (max-width: 900px) { padding: 50px 24px; border-right: none !important; border-bottom: 1px solid #eee !important; &:last-child { border-bottom: none !important; } &:nth-last-child(2) { border-bottom: 1px solid #eee !important; } }
`;

/* Blue Why-Choose Styles */
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.coaxBlue}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: white; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; } @media (max-width: 768px) { padding: 80px 24px; .centered-header { text-align: left; align-self: flex-start; margin-bottom: 50px; } }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`background-color: ${COLORS.lime}; padding: 40px; min-height: 400px; position: relative; display: flex; flex-direction: column; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); .card-index { font-size: 11px; color: ${COLORS.textDark}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } .card-title { font-size: 24px; color: ${COLORS.textDark}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } .card-text { font-size: 15.5px; color: rgba(10, 31, 68, 0.85); line-height: 1.6; } @media (max-width: 600px) { min-height: auto; padding: 30px 24px 60px; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%); }`;
const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M100 240 Q 100 80, 260 80 V 240 H 100 Z" fill="#2d60ff" />
    <rect x="220" y="240" width="80" height="200" fill={COLORS.lime} />
    <circle cx="160" cy="380" r="70" fill="#00d2ff" /><circle cx="380" cy="150" r="40" stroke={COLORS.lime} strokeWidth="15" />
  </motion.svg>
);

/* Banner / Page 7 Styles */
const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif; @media (max-width: 600px) { padding: 40px 16px; }`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, #1d4ed8 0%, #3b82f6 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25); @media (max-width: 850px) { clip-path: none; border-radius: 12px; padding: 30px; }`;
const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 24px; padding: 40px 20px; }`;
const BannerText = styled.h2`color: #ffffff; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px; @media (max-width: 850px) { font-size: 28px; }`;
const DownloadBtn = styled.button`background-color: ${COLORS.lime}; color: #000000; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s, background-color 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); min-width: 280px; &:hover { transform: translateY(-2px); background-color: #d9f99d; } @media (max-width: 600px) { width: 100%; min-width: auto; justify-content: space-between; }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0;`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; pointer-events: none; opacity: 0.9; z-index: 1; @media (max-width: 850px) { top: 20px; right: 20px; transform: scale(0.6); }`;

/* Feedback Styles (Identical logic) */
const Section8 = styled.section`padding: 120px 0 160px; background-color: #f8fdfa; overflow: hidden; position: relative; @media (max-width: 850px) { padding: 80px 0 120px; }`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(#28a665 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07; z-index: 2;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px); z-index: 1;`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px); z-index: 1;`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px; @media (max-width: 600px) { text-align: left; }`;
const SubHeader = styled.h4`color: #28a665; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: #09323b; margin-bottom: 24px; line-height: 1.1; @media (max-width: 768px) { font-size: 32px; }`;
const HeaderDesc = styled.p`font-size: 18px; color: #555; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 800px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(40, 166, 101, 0.2); border-radius: 4px; z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: #28a665; border-radius: 4px; z-index: 0; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%); @media (max-width: 850px) { display: none; }`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; border-radius: 4px;`;
const CardFrame = styled(motion.div)`background-color: #ffffff; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); border-radius: 4px; overflow: hidden; @media (max-width: 850px) { clip-path: none; border-radius: 12px; height: auto; padding-bottom: 40px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; background-color: #ffffff; @media (max-width: 850px) { position: relative; grid-template-columns: 1fr; height: auto; display: flex; flex-direction: column; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%; @media (max-width: 850px) { height: 280px; flex-shrink: 0; }`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; pointer-events: none;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; height: auto; object-fit: contain; z-index: 2; background: #fff; padding: 8px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start; @media (max-width: 850px) { padding: 30px 24px; }`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; text-transform: uppercase; color: #28a665; margin-bottom: 20px; letter-spacing: 0.5px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: #28a665; font-family: serif; margin-bottom: 16px; opacity: 0.8;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: #121212; font-weight: 400; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: #121212; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: #444;`;
const AuthorCompany = styled.span`font-size: 14px; color: #28a665; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: #0b363d; color: #fff; border: none; padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start; transition: all 0.3s; &:hover { background: #28a665; transform: translateY(-2px); }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20; @media (max-width: 850px) { bottom: -80px; }`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid #e1e1e1; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: all 0.2s; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.05); &:hover { border-color: #28a665; background-color: #28a665; color: #ffffff; transform: scale(1.1); }`;

/* Audit Process Section Styles */
const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: #F8FAFD; @media (max-width: 800px) { padding: 80px 0 100px; }`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; .audit-title { font-size: clamp(38px, 4.5vw, 62px); font-weight: 400; text-align: center; color: #1a1b1e; letter-spacing: -1.5px; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; border-bottom: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; @media (max-width: 800px) { border-right: none; border-bottom: 1px solid ${COLORS.borderColor}; &:last-child { border-bottom: none; } padding: 40px 24px; } h3 { color: ${COLORS.coaxBlue}; font-size: 26px; font-weight: 500; margin-bottom: 24px; letter-spacing: -0.5px; } p { font-size: 16px; line-height: 1.6; color: ${COLORS.textGray}; font-weight: 400; }`;
const IconBox = styled.div`color: ${COLORS.coaxBlue}; margin-bottom: 24px;`;

/* FAQ / Page 10 Section Styles */
const PageTenSection = styled.section`padding: 100px 0 160px; background: #ffffff; @media (max-width: 900px) { padding: 60px 0 100px; }`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px; @media (max-width: 900px) { gap: 60px; }`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; gap: 30px; text-align: center; @media (min-width: 850px) { flex-direction: row; text-align: left; justify-content: space-between; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px); max-width: 550px;`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(235,240,255,0.7) 0%, rgba(255,255,255,0) 60%); transform: translateY(-50%); pointer-events: none; z-index: 0;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: flex-start; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; letter-spacing: -1.5px; color: #1a1b1e; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid #eee; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid #eee; } .q-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.coaxBlue : COLORS.textDark}; transition: color 0.3s; margin: 0; line-height: 1.5; } .icon-box { color: ${props => props.isOpen ? COLORS.coaxBlue : '#ccc'}; flex-shrink: 0; width: 24px; height: 24px; border: 1px solid ${props => props.isOpen ? COLORS.coaxBlue : '#e0e0e0'}; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s; } } .a-body { overflow: hidden; p { margin-top: 24px; font-size: 15px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 90%; } }`;

/* Blog Slider Styles */
const BlogSection = styled.div`
  background-color: #f2f9f5;
  padding: 100px 0 120px;
  border-top: 1px solid #e1eadd;
  overflow: hidden;
  @media (max-width: 768px) { padding: 60px 0 80px; }
`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center; @media (max-width: 768px) { padding: 0 24px; }`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; line-height: 1.1; color: #1a1a1a; margin: 0; letter-spacing: -1px; display: flex; flex-direction: column; gap: 12px; @media (max-width: 768px) { font-size: 32px; }`;
const BlogLink = styled.span`color: ${COLORS.coaxBlue}; display: inline-flex; align-items: center; justify-content: center; gap: 12px; transition: gap 0.2s ease; cursor: pointer; &:hover { gap: 16px; }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; align-items: center; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding: 20px 20px 40px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer;
  &:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(40, 166, 101, 0.15); border-color: ${COLORS.lime}; } 
  .card-img { width: 40%; background: #f1f1f1; img { width: 100%; height: 100%; object-fit: cover; } } 
  .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; } 
  .tag { background: #e6f7ee; color: #28a665; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; width: fit-content; } 
  h3 { font-size: 20px; font-weight: 700; color: #111; margin-bottom: 16px; line-height: 1.4; } 
  .date { font-size: 13px; color: #999; margin-top: auto; } 
  @media (max-width: 600px) { min-width: 85vw; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } .card-content { width: 100%; padding: 24px; } } 
`;
const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` 
  width: 56px; height: 56px; border-radius: 50%; border: 1px solid #e1eadd; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s;
  &:hover { background: #28a665; color: white; transform: scale(1.1); } 
`;
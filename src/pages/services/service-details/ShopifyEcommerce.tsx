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

// --- Design Tokens (CodeNest Company Palette) ---
const COLORS = {
  primary: "#2b945f", // Light Green
  secondary: "#0c3740", // Dark Green
  black: "#000000",
  grey: "#5a5a5a", 
  white: "#feffff", 
  
  // Functional Mappings
  textDark: "#0c3740", 
  textGray: "#5a5a5a", 
  textLight: "rgba(254, 255, 255, 0.9)",
  bgSection: "#f4fcf8", // Subtle minty white
  borderColor: "#e0ebe5", 
  starGold: "#ffc107", 
};

// --- DATA: Standards Accordion (Shopify Specific) ---
const SHOPIFY_STANDARDS = [
  { id: "LIQUID", title: "Clean Liquid Coding", desc: "We adhere to Shopify's strict theme coding standards, ensuring your Liquid code is optimized for rendering speed and future-proof updates." },
  { id: "API", title: "Storefront & Admin APIs", desc: "Expert implementation of Shopify's GraphQL APIs to build headless storefronts or custom apps that communicate perfectly with your inventory." },
  { id: "SECURITY", title: "PCI DSS Compliance", desc: "Leveraging Shopify's Level 1 PCI DSS compliance while securing custom apps and data transfers to ensure total payment security." },
  { id: "CWV", title: "Speed & Core Web Vitals", desc: "Optimizing asset loading, app scripts, and image compression to hit green scores on Mobile Google PageSpeed Insights." }
];

// --- DATA: Benefits Grid (5th Page) ---
const BENEFITS_DATA = [
  {
    title: "High-conversion architecture",
    desc: "We don't just build stores; we build sales engines. Our layouts are designed using UX principles that reduce friction at checkout, leading to higher AOV and conversion rates."
  },
  {
    title: "Seamless App Integrations",
    desc: "Avoid the 'app bloat' that slows down stores. We configure and integrate the essential ecosystem (Reviews, Loyalty, ESP) without sacrificing your site's loading speed."
  },
  {
    title: "Merchant-first editing",
    desc: "We utilize Shopify 2.0 sections and blocks so your marketing team can drag-and-drop new landing pages in minutes without needing a developer for every small change."
  },
  {
    title: "Scalable Infrastructure",
    desc: "Shopify handles the server load, but we ensure your theme architecture scales. Whether you have 10 products or 10,000 SKUs, our code structure remains stable and fast."
  },
  {
    title: "Omnichannel readiness",
    desc: "Connect your inventory seamlessly with Meta, Google Shopping, and TikTok. We ensure your product feeds are structurally perfect for global marketplace syndication."
  },
  {
    title: "International Markets (Markets Pro)",
    desc: "Ready to go global? We configure Shopify Markets for multi-currency and multi-language experiences, localized to your specific target regions."
  }
];

// --- DATA: Why Choose Code Nest (6th Page) ---
const WHY_CHOOSE_CN_DATA = [
  { num: "/ 01", title: "Certified Shopify Experts", desc: "Our team lives and breathes the Shopify ecosystem. We understand the nuances of the platform better than generalist agencies." },
  { num: "/ 02", title: "Performance-first approach", desc: "We audit every script tag. We replace heavy apps with lightweight custom code where possible to keep your site lightning fast." },
  { num: "/ 03", title: "Custom Theme Development", desc: "We don't just tweak standard templates. We build bespoke themes tailored to your unique brand identity and functional requirements." },
  { num: "/ 04", title: "Data-Driven Decisions", desc: "Our development roadmap is guided by your analytics. We prioritize features that mathematically increase your revenue and retention." },
  { num: "/ 05", title: "Complex Migrations", desc: "Moving from WooCommerce or Magento? We handle the secure migration of customer data, orders, and SEO links without data loss." },
  { num: "/ 06", title: "Long-term Growth Partners", desc: "We support you post-launch with A/B testing, feature drops, and CRO audits to ensure you dominate your niche." }
];

// --- DATA: Feedback (Page 8) - E-commerce Specific ---
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
    name: "Sarah Jenkins",
    role: "Director of eCommerce",
    company: "LuxeFashion",
    quote: "Code Nest completely transformed our Shopify Plus store. They fixed our speed issues and the custom product builder they developed increased our add-to-cart rate by 40%.",
    imgSrc: "/assets/feedback/bohdan.jpg", // Replace with real asset path
    serviceTag: "Shopify Custom Development",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Founder",
    company: "GearSupply",
    quote: "Moving from Magento to Shopify was scary, but Code Nest handled it flawlessly. All our SEO rankings were preserved and the new checkout is converting way better.",
    imgSrc: "/assets/feedback/dan.jpg", // Replace with real asset path
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "Platform Migration",
    ctaText: "View Migration Case Study",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Marketing Manager",
    company: "PureSkin",
    quote: "The team built a custom subscription flow for us that apps just couldn't handle. Professional, responsive, and truly experts in the Shopify liquid language.",
    imgSrc: "/assets/feedback/michael.jpg", // Replace with real asset path
    serviceTag: "Custom App Development",
    ctaText: "See the Store",
  },
];

// --- DATA: How Audit Works (Page 9) ---
const AUDIT_STEPS = [
  {
    icon: <Star size={28} />,
    title: "Store Health Check",
    desc: "We analyze your current theme code, active apps, and plan settings. We look for 'code residue' from uninstalled apps that might be slowing down your site."
  },
  {
    icon: <LinkIcon size={28} />,
    title: "Conversion Inspection",
    desc: "We examine the customer journey from Homepage to Thank You page. We identify friction points in the UX that are causing cart abandonment."
  },
  {
    icon: <FileText size={28} />,
    title: "Speed & SEO Report",
    desc: "You get a detailed breakdown of asset sizes, render-blocking resources, and structure data errors. We explain exactly what needs fixing to rank higher on Google."
  },
  {
    icon: <Headphones size={28} />,
    title: "Growth Roadmap",
    desc: "Beyond fixing bugs, we propose features and automated flows (Klaviyo/Postscript) that will actively grow your Customer Lifetime Value (LTV)."
  }
];

// --- DATA: FAQ (Page 10) ---
const FAQ_DATA = [
    {
        question: "Can you migrate my store from WooCommerce/Wix to Shopify?",
        answer: "Yes, migration is one of our core specialties. We securely transfer products, customers, order history, and blog posts. We also set up 301 redirects so you don't lose your SEO ranking traffic."
    },
    {
        question: "Do you work with Shopify Plus?",
        answer: "Absolutely. We are experienced in Shopify Plus specific features like Checkout Extensions, B2B implementation, Launchpad, and intricate flow automations for high-volume merchants."
    },
    {
        question: "Will I be able to edit the site myself?",
        answer: "Yes! We build with Shopify Online Store 2.0 standards. This means everything is a modular section. You can change text, images, and rearrange layouts easily without touching code."
    },
    {
        question: "How long does a custom Shopify build take?",
        answer: "A standard custom build typically takes 4-8 weeks depending on complexity. A headless commerce solution or a migration with massive data sets might take 8-12 weeks."
    },
    {
        question: "Do you optimize existing stores or only build new ones?",
        answer: "Both. We offer standalone Speed & Conversion audits for existing stores where we clean up code, remove app bloat, and improve Core Web Vitals."
    }
];

// --- BLOG TYPES & UTILS (Page 11) ---
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

// --- ANIMATION CONFIGURATION ---
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
// Page 8 Background Orbs
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

export default function ShopifyEcommerce() {
  const navigate = useNavigate();

  // --- STATE ---
  const [openStandard, setOpenStandard] = useState<string | null>("LIQUID"); // Default to first ID
  
  // Page 8 (Feedback Slider)
  const [[page, direction], setPage] = useState([0, 0]);
  const cardControls = useAnimation();
  
  // Page 10 (FAQ)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Page 11 (Blog)
  const [blogPosts, setBlogPosts] = useState<WPPost[]>([]);
  const blogSliderRef = useRef<HTMLDivElement>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Loop Logic for Feedback
  const feedbackIndex = ((page % FEEDBACKS.length) + FEEDBACKS.length) % FEEDBACKS.length;
  const currentFeedback = FEEDBACKS[feedbackIndex];

  // 1. Initial Data Fetching
  useEffect(() => {
    // Preload feedback images
    FEEDBACKS.forEach((item) => {
      const img = new Image(); img.src = item.imgSrc;
      if (item.logoSrc) { const logo = new Image(); logo.src = item.logoSrc; }
    });

    // FETCH REAL BLOGS (Same logic, potentially filter for 'shopify' in future)
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

  // Blog Scroll Logic
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
            <Breadcrumbs>
              <span className="star">✦</span><Link to="/">Home</Link> / <Link to="/services">Services</Link> / <strong>Shopify E-commerce</strong>
            </Breadcrumbs>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Shopify E-commerce <br /> Development</motion.h1>
            <ButtonGroup>
              <MainBtn>Get an Estimate</MainBtn>
              <IconBtn>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </ButtonGroup>
            <HeroPara>Build fast, high-converting, and scalable online stores using our custom Shopify Plus frameworks.</HeroPara>
            <RatingsRow>
              <RatingItem><span className="brand">Clutch</span><div className="stars">★★★★★ <span className="val">4.9 / 5</span></div></RatingItem>
              <RatingItem><span className="brand">Shopify Partners</span><div className="stars">★★★★★ <span className="val">Expert</span></div></RatingItem>
              <RatingItem><span className="brand">( NPS Score )</span><div className="stars">★★★★★ <span className="val">9.8 / 10</span></div></RatingItem>
            </RatingsRow>
          </HeroContent>
          <HeroGraphic><AbstractGraphicSVG /></HeroGraphic>
        </HeroInner>
      </HeroSection>

      {/* --- 2. INTRO --- */}
      <IntroContainer>
        <BadgeWrapper><span className="dot"></span> Store Audit Service</BadgeWrapper>
        <LayoutGrid>
          <motion.h2 className="audit-heading">Get a complete <br /> performance & UX <br /> Shopify audit to <br /> maximize sales</motion.h2>
          <RightContentBlock>
            <p>Our audit evaluates your store theme, apps, and conversion funnel. We identify why visitors are leaving and provide fixes to turn them into buyers.</p>
            <BlueButtonGroup>
              <BlueTextBtn>Audit my store performance</BlueTextBtn>
              <BlueIconBtn>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </BlueIconBtn>
            </BlueButtonGroup>
          </RightContentBlock>
        </LayoutGrid>
      </IntroContainer>

      {/* --- 3. ACCORDION --- */}
      <StandardsContainer>
        <StandardsInner>
            <h2 className="section-title">Development standards <br /> covered by our Shopify <br /> specialists</h2>
            <AccordionList>
                {SHOPIFY_STANDARDS.map((item) => (
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

      {/* --- 4. EXPECTATIONS --- */}
      <GridSection>
        <SectionHeader white>What to expect</SectionHeader>
        <CardsGrid>
          {[
            { id: "01.", title: "Store Setup", desc: "Complete configuration of shipping, taxes, and payment gateways for launch." },
            { id: "02.", title: "High Conversion", desc: "Optimizing the 'Add to Cart' flow to minimize abandonment." },
            { id: "03.", title: "Secure Checkout", desc: "Customizing Shopify Checkout (Plus) while keeping data strict and secure." },
            { id: "04.", title: "Inventory Sync", desc: "Integration with ERPs or WMS for real-time stock updates." },
            { id: "05.", title: "Clean UI/UX", desc: "Beautiful product pages that showcase your brand effectively." },
            { id: "06.", title: "Mobile Optimized", desc: "Touch-friendly interfaces for the 70% of shoppers on mobile devices." }
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
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Why choose our engineered <br /> Shopify solutions?
          </motion.h2>
        </div>

        <BenefitsGridWrapper>
          {BENEFITS_DATA.map((benefit, index) => (
            <BenefitCell key={index} isLeft={index % 2 === 0}>
              <div className="icon-row">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill={COLORS.primary}/>
                 </svg>
              </div>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </BenefitCell>
          ))}
        </BenefitsGridWrapper>
      </BenefitsContainer>

      {/* --- 6. WHY CHOOSE --- */}
      <BlueCardSection>
        <motion.h2
            className="centered-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
          Why choose Code Nest for your <br /> E-commerce Growth?
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

      {/* --- 7. BANNER (Gradient) --- */}
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

            <BannerText>Want to start with self-assessment?</BannerText>
            
            <DownloadBtn>
              Download store launch checklist
              <ArrowDown size={18} style={{ marginLeft: "auto", color: COLORS.black }} /> 
            </DownloadBtn>

            <DecoStar>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
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
            <SubHeader>CodeNest Philosophy</SubHeader>
            <HeaderTitle>What our merchants say about COAX</HeaderTitle>
            <HeaderDesc>
              Real success stories from brands that scaled their revenue with our help.
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

      {/* --- 9. HOW AUDIT WORKS --- */}
      <AuditProcessSection>
        <AuditContainer>
           <motion.h2 
              className="audit-title"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How our store audit works
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

      {/* --- 10. FAQ & BANNER --- */}
      <PageTenSection>
        <PageTenInner>
            <CTABanner10>
                 <BannerContent10>
                    <DecoCircles>
                         <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                            <path d="M-20 180 C50 180, 80 120, 80 60" stroke="#bef264" strokeWidth="3" opacity="0.8" />
                            <path d="M-40 200 C40 200, 100 140, 100 0" stroke="#bef264" strokeWidth="3" opacity="0.6" />
                            <circle cx="80" cy="180" r="60" stroke="#bef264" strokeWidth="2" opacity="0.5" />
                         </svg>
                    </DecoCircles>
                    <BannerTitle10>
                        Don't lose sales — audit <br /> your store today
                    </BannerTitle10>
                    
                    <ConsultBtn>
                        Book a free consultation 
                        <ArrowDown size={18} style={{ color: COLORS.black, transform: 'rotate(-45deg)' }} /> 
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
                        <h2>Frequently asked <br /> questions and answers</h2>
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
                  Want to know more?<br />
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
                           const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News';
                           
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
// STYLES: CODE NEST BRAND SYSTEM
// ==========================================
const PageWrapper = styled.div`background: ${COLORS.white}; overflow-x: hidden;`;

// 1. HERO SECTION
const HeroSection = styled.section`background: ${COLORS.secondary}; color: ${COLORS.white}; padding: 100px 10%; margin-top: -80px; min-height: 85vh; display: flex; align-items: center;`;
const HeroInner = styled.div`max-width: 1440px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px;`;
const HeroContent = styled.div`display: flex; flex-direction: column; gap: 30px; h1 { font-size: clamp(50px, 6.5vw, 92px); line-height: 1.05; letter-spacing: -2px; };`;
const Breadcrumbs = styled.div`font-size: 13px; display: flex; align-items: center; gap: 10px; .star { color: ${COLORS.starGold}; } a { color: ${COLORS.white}; text-decoration: none; opacity: 0.7; };`;
const ButtonGroup = styled.div`display: flex; height: 62px; width: fit-content;`;
const MainBtn = styled.button`background: ${COLORS.primary}; color: ${COLORS.white}; border: none; padding: 0 45px; font-weight: 600; font-size: 16px; border-radius: 4px 0 0 4px; cursor: pointer; transition: 0.3s; &:hover { filter: brightness(1.1); }`;
const IconBtn = styled.div`background: ${COLORS.white}; width: 62px; border-radius: 0 4px 4px 0; display: flex; align-items: center; justify-content: center;`;
const HeroPara = styled.p`max-width: 580px; font-size: 18px; color: ${COLORS.textLight};`;
const RatingsRow = styled.div`display: flex; gap: 40px; margin-top: 30px; flex-wrap: wrap;`;
const RatingItem = styled.div`.brand { font-size: 22px; font-weight: 600; letter-spacing: -1px; } .stars { color: ${COLORS.starGold}; font-size: 14px; .val { color: ${COLORS.white}; margin-left: 8px; font-weight: 300; } };`;
const HeroGraphic = styled.div`height: 450px; width: 450px; @media (max-width: 1024px) { display: none; };`;

// 2. INTRO
const IntroContainer = styled.section`padding: 120px 10%; background: ${COLORS.bgSection}; display: flex; flex-direction: column;`;
const BadgeWrapper = styled.div`background: ${COLORS.white}; padding: 8px 18px; color: ${COLORS.secondary}; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 50px; width: fit-content; .dot { width: 6px; height: 6px; background: ${COLORS.primary}; border-radius: 50%; display: inline-block; margin-right: 8px; };`;
const LayoutGrid = styled.div`display: grid; grid-template-columns: 1.6fr 1fr; gap: 100px; align-items: flex-end; .audit-heading { font-size: clamp(40px, 4.4vw, 70px); line-height: 1.05; letter-spacing: -2px; color: ${COLORS.textDark}; };`;
const RightContentBlock = styled.div`display: flex; flex-direction: column; gap: 30px; p { font-size: 16px; line-height: 1.65; color: ${COLORS.textGray}; };`;
const BlueButtonGroup = styled.div`display: flex; height: 52px; width: fit-content;`;
const BlueTextBtn = styled.button`background: ${COLORS.secondary}; color: ${COLORS.white}; border: none; padding: 0 30px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; &:hover{ opacity: 0.9; }`;
const BlueIconBtn = styled.div`background: ${COLORS.black}; width: 52px; display: flex; align-items: center; justify-content: center;`;

// 3. ACCORDION
const StandardsContainer = styled.section`padding: 140px 10%; background: ${COLORS.white};`;
const StandardsInner = styled.div`max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; .section-title { font-size: clamp(36px, 4vw, 68px); line-height: 1.05; letter-spacing: -2.5px; color: ${COLORS.textDark}; } @media (max-width: 1024px) { grid-template-columns: 1fr; };`;
const AccordionList = styled.div`display: flex; flex-direction: column;`;
const AccordionItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 30px 0; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .header { display: flex; align-items: center; gap: 30px; cursor: pointer; .btn-box { width: 24px; height: 24px; border: 1.5px solid ${props => props.isOpen ? COLORS.primary : COLORS.borderColor}; display: flex; align-items: center; justify-content: center; color: ${COLORS.primary}; font-weight: 700; } h3 { font-size: 20px; color: ${props => props.isOpen ? COLORS.primary : COLORS.textDark}; } } .content-body p { padding: 20px 0 0 54px; font-size: 15px; color: ${COLORS.textGray}; line-height: 1.7; max-width: 480px; };`;

// 4. GRID
const GridSection = styled.section`padding: 120px 10%; background-color: ${COLORS.secondary};`;
const SectionHeader = styled.h2<{ white?: boolean }>`font-size: 42px; color: ${COLORS.white}; margin-bottom: 60px; font-weight: 500;`;
const CardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; };`;
const DogEarCard = styled(motion.div)`
  background: ${COLORS.primary}; 
  padding: 40px; 
  min-height: 280px; 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
  .card-num { font-size: 14px; font-weight: bold; margin-bottom: 30px; color: ${COLORS.white}; opacity: 0.8; } 
  h3 { font-size: 24px; color: ${COLORS.white}; margin-bottom: 15px; } 
  p { font-size: 16px; line-height: 1.5; color: ${COLORS.white}; opacity: 0.9; };
`;

// 5. BENEFITS
const BenefitsContainer = styled.section`padding: 140px 0; background-color: ${COLORS.white}; display: flex; flex-direction: column; .title-wrapper { padding: 0 10%; margin-bottom: 80px; display: flex; justify-content: center; text-align: center; h2 { font-size: clamp(40px, 4.5vw, 68px); font-weight: 500; color: ${COLORS.textDark}; line-height: 1.05; letter-spacing: -2px; max-width: 800px; } }`;
const BenefitsGridWrapper = styled.div`display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; width: 100%;`;
const BenefitCell = styled.div<{ isLeft: boolean }>`padding: 80px 10%; display: flex; flex-direction: column; gap: 24px; border-right: ${props => props.isLeft ? `1px solid ${COLORS.borderColor}` : "none"}; border-bottom: 1px solid ${COLORS.borderColor}; h4 { font-size: 24px; font-weight: 600; color: ${COLORS.secondary}; } p { font-size: 16px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 480px; }`;

// 6. WHY CHOOSE
const BlueCardSection = styled.section`padding: 140px 10%; background-color: ${COLORS.secondary}; display: flex; flex-direction: column; align-items: center; .centered-header { font-size: clamp(36px, 4vw, 62px); font-weight: 500; color: ${COLORS.white}; text-align: center; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 80px; }`;
const ChooseCardsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 650px) { grid-template-columns: 1fr; }`;
const WhyChooseCard = styled(motion.div)`
  background-color: ${COLORS.primary}; 
  padding: 40px; 
  min-height: 400px; 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); 
  .card-index { font-size: 11px; color: ${COLORS.white}; opacity: 0.6; font-weight: 600; margin-bottom: 40px; } 
  .card-title { font-size: 24px; color: ${COLORS.white}; font-weight: 600; margin-bottom: 25px; line-height: 1.2; } 
  .card-text { font-size: 15.5px; color: ${COLORS.white}; opacity: 0.9; line-height: 1.6; }
`;

const AbstractGraphicSVG = () => (
  <motion.svg viewBox="0 0 500 500" width="100%" height="100%">
    <path d="M100 240 Q 100 80, 260 80 V 240 H 100 Z" fill="#2d60ff" fillOpacity={0.1} />
    <rect x="220" y="240" width="80" height="200" fill={COLORS.primary} />
    <circle cx="160" cy="380" r="70" fill={COLORS.secondary} /><circle cx="380" cy="150" r="40" stroke={COLORS.primary} strokeWidth="15" />
  </motion.svg>
);

// 7. BANNER
const PageSevenContainer = styled.div`width: 100%; max-width: 1440px; margin: 0 auto; padding: 80px 24px; font-family: 'Inter', sans-serif;`;
const BannerWrapper = styled.div`width: 100%; height: auto; min-height: 240px; background: linear-gradient(100deg, ${COLORS.secondary} 0%, ${COLORS.primary} 100%); clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(43, 148, 95, 0.2); @media (max-width: 768px) { clip-path: none; border-radius: 12px; padding: 30px; }`;
const BannerContent = styled.div`display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 5; width: 100%; max-width: 800px; padding: 60px 20px; @media (max-width: 850px) { flex-direction: column; text-align: center; gap: 24px; padding: 40px 20px; }`;
const BannerText = styled.h2`color: ${COLORS.white}; font-size: 38px; font-weight: 500; line-height: 1.1; max-width: 450px; letter-spacing: -1px; @media (max-width: 850px) { font-size: 28px; }`;
const DownloadBtn = styled.button`background-color: ${COLORS.white}; color: ${COLORS.secondary}; padding: 18px 28px; border-radius: 2px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s, background-color 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); min-width: 280px; &:hover { transform: translateY(-2px); background-color: #f0f0f0; }`;
const DecoCircles = styled.div`position: absolute; top: 0; left: 0; pointer-events: none; width: 250px; height: 200px; z-index: 0; path, circle { stroke: #5dc28e; }`;
const DecoStar = styled.div`position: absolute; top: 40px; right: 80px; pointer-events: none; opacity: 0.9; z-index: 1; @media (max-width: 850px) { top: 20px; right: 20px; transform: scale(0.6); }`;

// 8. FEEDBACK
const Section8 = styled.section`padding: 120px 0 160px; background-color: ${COLORS.bgSection}; overflow: hidden; font-family: 'Inter', sans-serif; position: relative;`;
const BackgroundWrapper = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;`;
const GridOverlay = styled.div`position: absolute; inset: 0; background-image: radial-gradient(${COLORS.primary} 1px, transparent 1px); background-size: 40px 40px; opacity: 0.07; z-index: 2;`;
const OrbOne = styled(motion.div)`position: absolute; top: -10%; left: -5%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(43, 148, 95, 0.15) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(60px); z-index: 1;`;
const OrbTwo = styled(motion.div)`position: absolute; bottom: -10%; right: -5%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(12, 55, 64, 0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; filter: blur(80px); z-index: 1;`;
const Container8 = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;`;
const HeaderWrapper = styled.div`text-align: center; max-width: 700px; margin: 0 auto 60px;`;
const SubHeader = styled.h4`color: ${COLORS.primary}; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 16px;`;
const HeaderTitle = styled.h2`font-size: 48px; font-weight: 600; color: ${COLORS.textDark}; margin-bottom: 24px; line-height: 1.1; @media (max-width: 768px) { font-size: 32px; }`;
const HeaderDesc = styled.p`font-size: 18px; color: ${COLORS.textGray}; line-height: 1.6;`;
const SliderWrapper = styled.div`position: relative; width: 100%; max-width: 980px; margin: 0 auto; height: 480px; @media (max-width: 850px) { height: auto; min-height: 750px; }`;
const StackLayerOne = styled.div`position: absolute; top: 10px; left: 10px; right: -10px; bottom: -10px; height: 100%; background: rgba(43, 148, 95, 0.2); border-radius: 4px; z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const StackLayerTwo = styled.div`position: absolute; top: 20px; left: 20px; right: -20px; bottom: -20px; height: 100%; background: ${COLORS.primary}; border-radius: 4px; z-index: 0; clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);`;
const CardWindow = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; border-radius: 4px;`;
const CardFrame = styled(motion.div)`background-color: ${COLORS.white}; width: 100%; height: 100%; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%); border-radius: 4px; overflow: hidden; @media (max-width: 850px) { clip-path: none; border-radius: 12px; }`;
const InnerGrid = styled(motion.div)`position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 42% 58%; cursor: grab; will-change: transform, opacity; background-color: ${COLORS.white}; &:active { cursor: grabbing; } @media (max-width: 850px) { grid-template-columns: 1fr; grid-template-rows: 350px auto; }`;
const ImageSide = styled.div`position: relative; background-color: #f0f0f0; height: 100%; width: 100%;`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; pointer-events: none;`;
const LogoOverlay = styled.img`position: absolute; top: 24px; right: 24px; width: 100px; height: auto; object-fit: contain; z-index: 2; background: #fff; padding: 8px; border-radius: 4px; pointer-events: none; box-shadow: 0 4px 10px rgba(0,0,0,0.05);`;
const ContentSide = styled.div`padding: 60px 50px 80px; display: flex; flex-direction: column; justify-content: flex-start; @media (max-width: 850px) { padding: 40px 24px; }`;
const ServiceTag = styled.div`font-size: 12px; font-weight: 700; text-transform: uppercase; color: ${COLORS.primary}; margin-bottom: 20px; letter-spacing: 0.5px;`;
const QuoteIcon = styled.div`font-size: 60px; line-height: 1; color: ${COLORS.primary}; font-family: serif; margin-bottom: 16px; opacity: 0.8;`;
const QuoteText = styled.p`font-size: 20px; line-height: 1.5; color: ${COLORS.textDark}; font-weight: 400; margin-bottom: 32px;`;
const AuthorBlock = styled.div`margin-top: auto;`;
const AuthorName = styled.div`font-size: 18px; font-weight: 700; color: ${COLORS.textDark}; margin-bottom: 4px;`;
const AuthorRole = styled.span`font-size: 14px; color: ${COLORS.grey};`;
const AuthorCompany = styled.span`font-size: 14px; color: ${COLORS.primary}; font-weight: 600; margin-left: 6px; &:before { content: "|"; margin-right: 6px; color: #ccc; }`;
const CtaButton = styled.button`margin-top: 24px; background: ${COLORS.secondary}; color: ${COLORS.white}; border: none; padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; align-self: flex-start; transition: all 0.3s; box-shadow: 0 4px 15px rgba(12, 55, 64, 0.2); &:hover { background: ${COLORS.primary}; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(43, 148, 95, 0.3); }`;
const Controls = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 40px; position: absolute; bottom: -70px; left: 0; right: 0; z-index: 20;`;
const NavBtn = styled.button`width: 48px; height: 48px; border: 1px solid ${COLORS.borderColor}; background: ${COLORS.white}; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.05); &:hover { border-color: ${COLORS.primary}; background-color: ${COLORS.primary}; color: ${COLORS.white}; transform: scale(1.1); box-shadow: 0 6px 16px rgba(43, 148, 95, 0.4); }`;

// 9. AUDIT
const AuditProcessSection = styled.section`padding: 140px 0 160px; background-color: ${COLORS.bgSection}; font-family: 'Inter', sans-serif;`;
const AuditContainer = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; .audit-title { font-size: clamp(38px, 4.5vw, 62px); font-weight: 400; text-align: center; color: ${COLORS.textDark}; letter-spacing: -1.5px; margin-bottom: 80px; }`;
const ProcessGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; width: 100%; border-top: 1px solid ${COLORS.borderColor}; border-bottom: 1px solid ${COLORS.borderColor}; @media (max-width: 800px) { grid-template-columns: 1fr; border-top: none; border-bottom: none; }`;
const ProcessCard = styled(motion.div)<{ idx: number }>`padding: 60px 50px; display: flex; flex-direction: column; align-items: flex-start; border-right: ${props => (props.idx % 2 === 0 ? `1px solid ${COLORS.borderColor}` : 'none')}; border-bottom: ${props => (props.idx < 2 ? `1px solid ${COLORS.borderColor}` : 'none')}; @media (max-width: 800px) { border-right: none; border-bottom: 1px solid ${COLORS.borderColor}; &:last-child { border-bottom: none; } padding: 40px 24px; } h3 { color: ${COLORS.primary}; font-size: 26px; font-weight: 500; margin-bottom: 24px; letter-spacing: -0.5px; } p { font-size: 16px; line-height: 1.6; color: ${COLORS.textGray}; font-weight: 400; }`;
const IconBox = styled.div`color: ${COLORS.primary}; margin-bottom: 24px;`;

// 10. FAQ
const PageTenSection = styled.section`padding: 100px 0 160px; background: ${COLORS.white}; font-family: 'Inter', sans-serif;`;
const PageTenInner = styled.div`max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 120px;`;
const CTABanner10 = styled(BannerWrapper)``;
const BannerContent10 = styled(BannerContent)`justify-content: center; gap: 30px; text-align: center; @media (min-width: 850px) { flex-direction: row; text-align: left; justify-content: space-between; }`;
const BannerTitle10 = styled(BannerText)`font-size: clamp(28px, 4vw, 42px); max-width: 550px;`;
const ConsultBtn = styled(DownloadBtn)`padding: 16px 32px;`;
const FAQSectionWrapper = styled.div`position: relative; width: 100%;`;
const BackgroundCurve = styled.div`position: absolute; top: 50%; left: -20%; width: 60%; height: 120%; background: radial-gradient(circle, rgba(43, 148, 95, 0.05) 0%, rgba(255,255,255,0) 60%); transform: translateY(-50%); pointer-events: none; z-index: 0;`;
const FAQContent = styled.div`position: relative; z-index: 1; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: flex-start; @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }`;
const FAQLeft = styled.div`h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 400; letter-spacing: -1.5px; color: ${COLORS.textDark}; line-height: 1.15; }`;
const FAQRight = styled.div`display: flex; flex-direction: column; width: 100%;`;
const FAQItem = styled.div<{ isOpen: boolean }>`border-top: 1px solid ${COLORS.borderColor}; padding: 24px 0; cursor: pointer; &:last-child { border-bottom: 1px solid ${COLORS.borderColor}; } .q-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; h3 { font-size: 17px; font-weight: 500; color: ${props => props.isOpen ? COLORS.primary : COLORS.textDark}; transition: color 0.3s; margin: 0; line-height: 1.5; } .icon-box { color: ${props => props.isOpen ? COLORS.primary : '#ccc'}; flex-shrink: 0; width: 24px; height: 24px; border: 1px solid ${props => props.isOpen ? COLORS.primary : '#e0e0e0'}; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s; } } .a-body { overflow: hidden; p { margin-top: 24px; margin-bottom: 8px; font-size: 15px; line-height: 1.7; color: ${COLORS.textGray}; max-width: 90%; } } &:hover .icon-box { border-color: ${COLORS.primary}; color: ${COLORS.primary}; }`;

// 11. BLOG
const BlogSection = styled.div`background-color: ${COLORS.bgSection}; padding: 100px 0 120px; border-top: 1px solid ${COLORS.borderColor}; font-family: 'Inter', sans-serif; overflow: hidden;`;
const BlogContainer = styled.div`max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; flex-direction: column; align-items: center; @media (max-width: 768px) { padding: 0 24px; }`;
const BlogHeaderWrapper = styled.div`margin-bottom: 60px; text-align: center; width: 100%;`;
const BlogTitle = styled.h2`font-size: 48px; font-weight: 600; line-height: 1.1; color: ${COLORS.textDark}; margin: 0; letter-spacing: -1px; display: flex; flex-direction: column; gap: 12px; @media (max-width: 768px) { font-size: 32px; }`;
const BlogLink = styled.span`color: ${COLORS.primary}; display: inline-flex; align-items: center; justify-content: center; gap: 12px; transition: gap 0.2s ease; cursor: pointer; outline: none; &:hover { gap: 16px; } svg { transform: translateY(2px); }`;
const BlogSliderOuter = styled.div`display: flex; flex-direction: column; align-items: center; width: 100%;`;
const BlogCardsContainer = styled.div`display: flex; gap: 30px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding: 20px 20px 40px; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const BlogCard = styled.div`min-width: 480px; background: ${COLORS.white}; display: flex; height: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid transparent; transition: all 0.3s ease; cursor: pointer; flex-shrink: 0; &:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(43, 148, 95, 0.15); border-color: ${COLORS.primary}; } .card-img { width: 40%; background: #f1f1f1; overflow: hidden; position: relative; img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; } } &:hover .card-img img { transform: scale(1.05); } .card-content { width: 60%; padding: 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; } .tag { background: #e6f7ee; color: ${COLORS.primary}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; } h3 { font-size: 20px; font-weight: 700; color: ${COLORS.textDark}; margin: 0 0 16px 0; line-height: 1.4; transition: color 0.2s; } &:hover h3 { color: ${COLORS.primary}; } .date { font-size: 13px; color: ${COLORS.textGray}; margin-top: auto; } @media (max-width: 600px) { min-width: 300px; flex-direction: column; height: auto; .card-img { width: 100%; height: 200px; } .card-content { width: 100%; padding: 24px; } }`;
const SliderControls = styled.div`display: flex; gap: 16px; margin-top: 20px;`;
const SliderButton = styled.button`width: 56px; height: 56px; border-radius: 50%; border: 1px solid ${COLORS.borderColor}; background: ${COLORS.white}; color: ${COLORS.black}; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.05); &:hover { background: ${COLORS.primary}; border-color: ${COLORS.primary}; color: ${COLORS.white}; transform: scale(1.1); box-shadow: 0 8px 20px rgba(43, 148, 95, 0.3); }`;
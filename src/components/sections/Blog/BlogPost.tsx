import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Facebook, Twitter, Linkedin, Share2, ArrowLeft, ArrowRight } from 'react-feather';
import { Helmet } from 'react-helmet-async'; // <--- NEW SEO IMPORT

// ==========================================
// 1. GLOBAL STYLES (CodeNest Blue Theme)
// ==========================================
const GlobalStyle = createGlobalStyle`
  html { scroll-behavior: smooth; }
  body {
    margin: 0; padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #ffffff;
    color: #1a202c;
    -webkit-font-smoothing: antialiased;
  }

  /* --- WORDPRESS CONTENT TYPOGRAPHY --- */
  .wp-content {
    font-size: 19px; line-height: 1.8; color: #4a5568; font-weight: 400;
  }
  .wp-content h2 {
    font-size: 42px; font-weight: 800; color: #111;
    margin-top: 80px; margin-bottom: 30px; line-height: 1.1; letter-spacing: -1.5px;
    scroll-margin-top: 140px; position: relative;
  }
  .wp-content h3 {
    font-size: 26px; font-weight: 700; color: #2d3748;
    margin-top: 50px; margin-bottom: 20px; scroll-margin-top: 140px;
  }
  .wp-content p { margin-bottom: 32px; }

  /* Blue Triangle Bullets */
  .wp-content ul { margin-bottom: 40px; padding-left: 0; list-style: none; }
  .wp-content li { margin-bottom: 16px; padding-left: 30px; position: relative; }
  .wp-content li::before {
    content: ''; position: absolute; left: 0; top: 10px; width: 0; height: 0; 
    border-top: 6px solid transparent; border-bottom: 6px solid transparent;
    border-left: 10px solid #2563eb; 
  }

  .wp-content a { color: #2563eb; text-decoration: underline; text-underline-offset: 4px; font-weight: 500; }
  .wp-content img { width: 100%; height: auto; border-radius: 12px; margin: 40px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
  
  .wp-content blockquote {
    border-left: 4px solid #2563eb; background: #f8fafc; padding: 24px 32px; margin: 40px 0;
    font-size: 20px; font-style: italic; color: #1e3a8a;
  }
`;

// --- Types ---
interface WPPostData {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string; avatar_urls?: { '96': string } }>;
  };
}

// ==========================================
// MAIN COMPONENT
// ==========================================
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const sliderRef = useRef<HTMLDivElement>(null); 

  const [post, setPost] = useState<WPPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPostData[]>([]); // New State for dynamic related posts
  const [loading, setLoading] = useState(true);
  
  // TOC State
  const [headings, setHeadings] = useState<{ id: string; text: string; tagName: string }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. Force Scroll Top on Load
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, location.pathname]); 

  // 2. Fetch Main Post AND Related Posts
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setHeadings([]); 
    
    const wpBase = `https://blogs.codenest.us.com/wp-json/wp/v2/posts`;

    // Fetch Current Post
    axios.get(`${wpBase}?slug=${slug}&_embed`)
      .then(res => {
        const currentPost = res.data[0];
        setPost(currentPost || null);
        
        // After getting current post, fetch 4 latest posts for "Related" section
        if (currentPost) {
          return axios.get(`${wpBase}?per_page=5&_embed`);
        }
      })
      .then(res => {
        if (res && res.data && post) {
          // Filter out the current post ID so it doesn't show in related
          const others = res.data.filter((p: WPPostData) => p.id !== post.id).slice(0, 5); 
          setRelatedPosts(others);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  // 3. Robust Heading Parser
  useEffect(() => {
    if (!loading && post && contentRef.current) {
      const parseHeadings = () => {
        if (!contentRef.current) return false;
        const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
        if (elements.length === 0) return false; 

        const headingData = elements.map((elem, index) => {
          const id = elem.id || `toc-section-${index}`;
          elem.id = id; 
          return { 
            id, 
            text: (elem as HTMLElement).innerText,
            tagName: elem.tagName.toLowerCase() 
          };
        });
        setHeadings(headingData);

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveId(entry.target.id);
            });
          },
          { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
        );
        elements.forEach((elem) => observer.observe(elem));
        return true; 
      };

      if (!parseHeadings()) {
        const timer = setTimeout(() => {
          if (!parseHeadings()) setTimeout(parseHeadings, 500);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, post]);

  // 4. Slider Logic
  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 450; 
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (loading) return <LoadingScreen>Loading Article...</LoadingScreen>;
  if (!post) return <LoadingScreen>Article not found.</LoadingScreen>;

  const { title, content, date, excerpt, _embedded } = post;
  const featureImg = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = _embedded?.['author']?.[0]?.name || 'Team';
  const authorImg = _embedded?.['author']?.[0]?.avatar_urls?.['96'];
  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // ----------------------------------------
  // ✅ SEO VARIABLES & HELMET
  // ----------------------------------------
  const plainTitle = title.rendered.replace(/<\/?[^>]+(>|$)/g, ""); 
  const rawExcerpt = excerpt?.rendered || "Read this article on CodeNest.";
  const plainDescription = rawExcerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const currentCanonicalUrl = `https://codenest.us.com/blog/${slug}`;

  return (
    <>
      <GlobalStyle />
      
      <Helmet>
        <title>{plainTitle} | Code Nest</title>
        <meta name="description" content={plainDescription.substring(0, 160)} />
        <link rel="canonical" href={currentCanonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={plainTitle} />
        <meta property="og:description" content={plainDescription.substring(0, 160)} />
        <meta property="og:url" content={currentCanonicalUrl} />
        {featureImg && <meta property="og:image" content={featureImg} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={plainTitle} />
        <meta name="twitter:description" content={plainDescription.substring(0, 160)} />
        {featureImg && <meta name="twitter:image" content={featureImg} />}
      </Helmet>
      
      {/* HEADER */}
      <HeaderWrapper>
        <Container>
          <NavRow>
            <Breadcrumbs>
              <Link to="/">Home</Link> <span className="arrow">›</span> <Link to="/blog">Blog</Link>
            </Breadcrumbs>
          </NavRow>

          <TitleRow>
            <MetaColumn>
               <DateBadge>{formattedDate}</DateBadge>
               <AuthorBlock>
                 {authorImg && <img src={authorImg} alt={authorName} />}
                 <div>
                   <strong>{authorName}</strong>
                   <span>on Development</span>
                 </div>
               </AuthorBlock>
            </MetaColumn>
            <MainTitle dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </TitleRow>

          {featureImg && (
            <HeroImage>
              <img src={featureImg} alt="Cover" />
            </HeroImage>
          )}
        </Container>
      </HeaderWrapper>

      {/* CONTENT GRID */}
      <MainSection>
        <Container>
          <Grid>
            {/* LEFT: TOC */}
            <SidebarColumn>
              <StickyWrapper>
                <TOCHeader>/ Table of Contents</TOCHeader>
                {headings.length > 0 ? (
                  <TOCList>
                    {headings.map((heading) => (
                      <TOCItem 
                        key={heading.id} 
                        $isActive={activeId === heading.id}
                        $isH3={heading.tagName === 'h3'}
                      >
                        <a 
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {heading.text}
                        </a>
                      </TOCItem>
                    ))}
                  </TOCList>
                ) : (
                  <EmptyTOC>Waiting for content...</EmptyTOC>
                )}
                <SidebarFooter>
                   <span>Share</span>
                   <div className="icons">
                     <Share2 size={16} /> <Linkedin size={16} /> <Twitter size={16} />
                   </div>
                </SidebarFooter>
              </StickyWrapper>
            </SidebarColumn>

            {/* RIGHT: CONTENT */}
            <ContentColumn>
              <div 
                className="wp-content" 
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: content.rendered }} 
              />
            </ContentColumn>
          </Grid>
        </Container>
      </MainSection>

      {/* --- RELATED SECTION --- */}
      <RelatedSection>
        <Container>
          <SectionHeader>
            <BigHeading>
              Want to know more?<br />
              <span className="highlight">Check our blog</span>
            </BigHeading>
          </SectionHeader>
          
          <SliderWrapper>
            <CardsContainer ref={sliderRef}>
              {relatedPosts.map((related) => {
                 const relImg = related._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                                || 'https://via.placeholder.com/450x300';
                 const relDate = new Date(related.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                 
                 return (
                  <BlogCard key={related.id} as={Link} to={`/blog/${related.slug}`}>
                    <div className="card-img">
                      <img src={relImg} alt={related.title.rendered} />
                    </div>
                    <div className="card-content">
                      <span className="tag">Recent</span>
                      <h3 dangerouslySetInnerHTML={{__html: related.title.rendered}} />
                      <span className="date">{relDate}</span>
                    </div>
                  </BlogCard>
                 );
              })}
            </CardsContainer>
            
            <SliderControls>
              <SliderButton onClick={() => scrollSlider('left')} aria-label="Previous">
                <ArrowLeft size={20} />
              </SliderButton>
              <SliderButton onClick={() => scrollSlider('right')} aria-label="Next">
                <ArrowRight size={20} />
              </SliderButton>
            </SliderControls>
          </SliderWrapper>
        </Container>
      </RelatedSection>
    </>
  );
};

export default BlogPost;

// ==========================================
// STYLED COMPONENTS
// ==========================================

const LoadingScreen = styled.div`
  height: 90vh; display: flex; align-items: center; justify-content: center; 
  font-size: 1.5rem; color: #718096; font-weight: 500;
`;

const Container = styled.div`
  max-width: 1280px; margin: 0 auto; padding: 0 40px;
  @media (max-width: 768px) { padding: 0 24px; }
`;

const HeaderWrapper = styled.header`
  padding-top: 60px; padding-bottom: 60px; background: #fff;
`;

const NavRow = styled.div` margin-bottom: 40px; `;
const Breadcrumbs = styled.div`
  font-size: 14px; color: #718096;
  a { text-decoration: none; color: inherit; transition: color 0.2s;}
  a:hover { color: #2563eb; }
  .arrow { margin: 0 8px; color: #cbd5e0; }
`;

const TitleRow = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; margin-bottom: 50px;
  @media (max-width: 900px) { flex-direction: column-reverse; gap: 20px; }
`;

const MetaColumn = styled.div`
  width: 200px; flex-shrink: 0; display: flex; flex-direction: column; gap: 20px; padding-top: 10px;
  @media (max-width: 900px) { width: 100%; flex-direction: row; align-items: center; }
`;

const DateBadge = styled.span` font-size: 14px; color: #a0aec0; `;
const AuthorBlock = styled.div`
  display: flex; align-items: center; gap: 12px;
  img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  div { display: flex; flex-direction: column; line-height: 1.3; }
  strong { font-size: 15px; color: #2563eb; font-weight: 700; }
  span { font-size: 13px; color: #718096; }
`;

const MainTitle = styled.h1`
  flex: 1; font-size: 56px; font-weight: 500; line-height: 1.1; color: #1a202c; margin: 0; letter-spacing: -1.5px; max-width: 900px;
  @media (max-width: 1024px) { font-size: 42px; }
  @media (max-width: 768px) { font-size: 32px; }
`;

const HeroImage = styled.div`
  width: 100%; border-radius: 4px; overflow: hidden; margin-bottom: 40px;
  img { width: 100%; height: auto; display: block; max-height: 600px; object-fit: cover; }
`;

const MainSection = styled.div` padding-bottom: 80px; `;
const Grid = styled.div`
  display: grid; grid-template-columns: 280px 1fr; gap: 80px;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;

const SidebarColumn = styled.aside`
  position: relative;
  @media (max-width: 900px) { display: none; } 
`;

const StickyWrapper = styled.div`
  position: sticky; top: 100px; display: flex; flex-direction: column;
`;

const TOCHeader = styled.div` font-size: 14px; color: #a0aec0; margin-bottom: 24px; `;

const TOCList = styled.ul`
  list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px;
`;

const TOCItem = styled.li<{ $isActive: boolean; $isH3?: boolean }>`
  padding-left: ${props => props.$isH3 ? '16px' : '0'}; 
  a {
    display: block; text-decoration: none; font-size: 15px; line-height: 1.5; transition: all 0.3s ease;
    color: ${props => props.$isActive ? '#2563eb' : '#a0aec0'};
    font-weight: ${props => props.$isActive ? '600' : '400'};
    border-left: 2px solid ${props => props.$isActive ? '#2563eb' : 'transparent'};
    padding-left: ${props => props.$isActive ? '16px' : '0'};
    margin-left: ${props => props.$isActive ? '-18px' : '0'};
  }
  a:hover { color: #2563eb; }
`;

const EmptyTOC = styled.div` font-size: 13px; color: #cbd5e0; font-style: italic; `;

const SidebarFooter = styled.div`
  margin-top: 60px; border-top: 1px solid #edf2f7; padding-top: 20px;
  span { display: block; font-size: 13px; color: #a0aec0; margin-bottom: 12px; }
  .icons { display: flex; gap: 16px; color: #718096; }
  svg { cursor: pointer; transition: color 0.2s; }
  svg:hover { color: #2563eb; }
`;

const ContentColumn = styled.div` min-width: 0; max-width: 820px; `;

const RelatedSection = styled.div` 
  background-color: #f2f9f5; 
  padding: 100px 0 120px; 
  margin-top: 40px; 
  overflow: hidden; 
  border-top: 1px solid #e1eadd;
`;

const SectionHeader = styled.div` margin-bottom: 60px; text-align: center; `;
const BigHeading = styled.h2` 
  font-size: 48px; font-weight: 700; line-height: 1.1; color: #1a1a1a; margin: 0; letter-spacing: -1px; 
  .highlight { color: #28a665; position: relative; display: inline-block; }
  .highlight::after {
    content: ''; position: absolute; bottom: 4px; left: 0; width: 100%; height: 8px; 
    background: rgba(40, 166, 101, 0.2); z-index: -1;
  }
  @media (max-width: 768px) { font-size: 32px; } 
`;

const SliderWrapper = styled.div` display: flex; flex-direction: column; align-items: center; `;
const CardsContainer = styled.div` 
  display: flex; gap: 30px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding: 20px 20px 40px; 
  -ms-overflow-style: none; scrollbar-width: none; 
  &::-webkit-scrollbar { display: none; } 
`;

const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; text-decoration: none;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
  transition: all 0.3s ease; cursor: pointer; border: 1px solid transparent;

  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px rgba(40, 166, 101, 0.15); 
    border-color: #28a665;
  } 

  .card-img { width: 45%; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; } } 
  &:hover .card-img img { transform: scale(1.05); }

  .card-content { width: 55%; padding: 25px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; } 
  
  .tag { 
    background: #e6f7ee; color: #28a665; 
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; 
  } 
  
  h3 { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 16px 0; line-height: 1.4; transition: color 0.2s;} 
  &:hover h3 { color: #28a665; }

  .date { font-size: 13px; color: #999; margin-top: auto; } 

  @media (max-width: 600px) { 
    min-width: 300px; flex-direction: column; height: auto; 
    .card-img { width: 100%; height: 180px; } 
    .card-content { width: 100%; padding: 20px; } 
  } 
`;

const SliderControls = styled.div` display: flex; gap: 16px; margin-top: 20px; `;
const SliderButton = styled.button` 
  width: 56px; height: 56px; border-radius: 50%;
  border: 1px solid #e1eadd; background: white; color: #111; 
  display: flex; align-items: center; justify-content: center; 
  cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  &:hover { 
    background: #28a665; border-color: #28a665; color: white; 
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(40, 166, 101, 0.3);
  } 
`;
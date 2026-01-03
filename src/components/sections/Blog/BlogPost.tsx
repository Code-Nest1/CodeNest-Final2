import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Share2, Linkedin, Twitter } from 'react-feather';
import { Helmet } from 'react-helmet-async';

// ==========================================
// 1. GLOBAL STYLES (Match Screenshot Design)
// ==========================================
const GlobalStyle = createGlobalStyle`
  html { scroll-behavior: smooth; }
  body {
    margin: 0; padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #ffffff;
    color: #1a202c;
    -webkit-font-smoothing: antialiased;
    overflow-x: initial !important; 
  }

  /* --- WORDPRESS CONTENT STYLING --- */
  .wp-content {
    font-size: 19px; line-height: 1.7; color: #333; font-weight: 400;
  }
  .wp-content h2 {
    font-size: 34px; font-weight: 700; color: #111;
    margin: 50px 0 20px; line-height: 1.2;
    scroll-margin-top: 100px;
  }
  .wp-content h3 {
    font-size: 24px; font-weight: 700; color: #111;
    margin-top: 40px; margin-bottom: 15px; scroll-margin-top: 100px;
  }
  .wp-content p { margin-bottom: 25px; }

  /* Screenshot Specific Triangle Bullets */
  .wp-content ul { margin: 25px 0; padding-left: 0; list-style: none; }
  .wp-content li { margin-bottom: 14px; padding-left: 25px; position: relative; }
  .wp-content li::before {
    content: '▲'; position: absolute; left: 0; top: 6px; 
    color: #3b82f6; font-size: 10px; transform: rotate(90deg);
  }
  .wp-content strong { color: #111; font-weight: 600; }

  .wp-content img { width: 100%; height: auto; border-radius: 4px; margin: 40px 0; }
`;

interface WPPostData {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string; avatar_urls?: { '96': string }; description?: string }>;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [post, setPost] = useState<WPPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{ id: string; text: string; tagName: string }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, location.pathname]); 

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios.get(`https://blogs.codenest.us.com/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then(res => {
        setPost(res.data[0] || null);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (!loading && post && contentRef.current) {
      const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      const headingData = elements.map((elem, index) => {
        const id = elem.id || `toc-${index}`;
        elem.id = id; 
        return { id, text: (elem as HTMLElement).innerText, tagName: elem.tagName.toLowerCase() };
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
      return () => observer.disconnect();
    }
  }, [loading, post]);

  if (loading) return <CenterText>Loading article...</CenterText>;
  if (!post) return <CenterText>Post not found.</CenterText>;

  const { title, content, date, _embedded } = post;
  const featureImg = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = _embedded?.['author']?.[0];
  const authorName = author?.name || 'CodeNest';
  const authorImg = author?.avatar_urls?.['96'];
  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <GlobalStyle />
      <Helmet><title>{title.rendered.replace(/<\/?[^>]+(>|$)/g, "")} | Code Nest</title></Helmet>

      <PageWrapper>
        {/* 1. BREADCRUMBS (Top left) */}
        <Breadcrumbs>
          <Link to="/">Home</Link> <span>›</span> <Link to="/blog">Blog</Link> <span>›</span> <div dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </Breadcrumbs>

        {/* 2. TOP SPLIT HEADER (Meta info | Title) */}
        <TopGridHeader>
           <AuthorMetaSide>
              <DateLabel>{formattedDate}</DateLabel>
              <AuthorBox>
                 {authorImg && <img src={authorImg} alt={authorName} />}
                 <div className="author-details">
                    <p className="name">{authorName}</p>
                    <p className="role">{author?.description?.split('.')[0] || "Engineer"}</p>
                    <p className="category">on Engineering</p>
                 </div>
              </AuthorBox>
           </AuthorMetaSide>
           
           <TitleColumn>
              <MainTitle dangerouslySetInnerHTML={{ __html: title.rendered }} />
           </TitleColumn>
        </TopGridHeader>

        {/* 3. HERO IMAGE (Wide) */}
        {featureImg && (
          <HeroSection>
            <img src={featureImg} alt="Cover" />
          </HeroSection>
        )}

        {/* 4. MAIN ARTICLE GRID (Sidebar | Content) */}
        <GridRow>
          <StickySidebarColumn>
            <SidebarContentInside>
              <TOCLabel>/ Table of Contents</TOCLabel>
              <TOCNav>
                {headings.map((h) => (
                  <TOCItem 
                    key={h.id} 
                    $active={activeId === h.id} 
                    $isH3={h.tagName === 'h3'}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {h.text}
                  </TOCItem>
                ))}
              </TOCNav>
              
              <ShareBoxArea>
                 <span className="share-text">Share article</span>
                 <div className="share-icons">
                    <Linkedin size={18} /> <Twitter size={18} /> <Share2 size={18} />
                 </div>
              </ShareBoxArea>
            </SidebarContentInside>
          </StickySidebarColumn>

          <ContentColumnArea>
            <div 
              className="wp-content" 
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: content.rendered }} 
            />
          </ContentColumnArea>
        </GridRow>
      </PageWrapper>
    </>
  );
};

export default BlogPost;

// ==========================================
// STYLED COMPONENTS (Restructured)
// ==========================================

const CenterText = styled.div`height: 80vh; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #666;`;

const PageWrapper = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  padding: 20px 24px 100px;
`;

const Breadcrumbs = styled.div`
  display: flex; gap: 8px; font-size: 13px; color: #94a3b8; margin-bottom: 40px; align-items: center;
  a { text-decoration: none; color: inherit; transition: 0.2s; &:hover { color: #1e293b; } }
  span { color: #cbd5e1; }
  div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px; }
`;

/* HEADER SPLIT GRID */
const TopGridHeader = styled.header`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;
  margin-bottom: 50px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const AuthorMetaSide = styled.div`
  display: flex; flex-direction: column; gap: 20px;
`;

const DateLabel = styled.div` font-size: 14px; color: #94a3b8; font-weight: 400; `;

const AuthorBox = styled.div`
  display: flex; gap: 14px;
  img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
  .name { font-weight: 700; color: #2563eb; margin: 0; font-size: 15px; }
  .role { font-size: 12px; color: #94a3b8; margin: 2px 0; line-height: 1.3; }
  .category { font-size: 12px; font-weight: 600; color: #64748b; margin-top: 5px; }
`;

const TitleColumn = styled.div``;

const MainTitle = styled.h1`
  font-size: clamp(34px, 4vw, 52px);
  line-height: 1.1; font-weight: 700; color: #1a1a1a; margin: 0;
  letter-spacing: -1.5px;
`;

const HeroSection = styled.div`
  width: 100%; border-radius: 4px; overflow: hidden; margin-bottom: 80px;
  img { width: 100%; height: auto; display: block; max-height: 500px; object-fit: cover; }
`;

/* CONTENT AREA & STABLE SIDEBAR */
const GridRow = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;
  /* Allow columns to stretch to footer */
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 40px; }
`;

const StickySidebarColumn = styled.aside`
  position: relative;
  /* Important: Must match height of Content column to provide a "rail" for sticky child */
  @media (max-width: 1024px) { display: none; }
`;

const SidebarContentInside = styled.div`
  position: sticky;
  top: 100px; /* Offset from screen top when scrolling */
  align-self: flex-start; /* Stops internal element from stretching */
  display: flex; flex-direction: column;
`;

const TOCLabel = styled.div` 
  font-size: 14px; color: #94a3b8; letter-spacing: 0.05em; 
  margin-bottom: 25px; font-weight: 400; 
`;

const TOCNav = styled.nav` display: flex; flex-direction: column; gap: 15px; `;

const TOCItem = styled.a<{ $active: boolean; $isH3: boolean }>`
  text-decoration: none;
  font-size: 15px;
  line-height: 1.3;
  padding-left: ${props => props.$isH3 ? '20px' : '0px'};
  color: ${props => props.$active ? '#111' : '#94a3b8'};
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: 0.2s ease;
  
  &:hover { color: #2563eb; }
`;

const ShareBoxArea = styled.div`
  margin-top: 60px; padding-top: 30px;
  .share-text { display: block; font-size: 14px; color: #cbd5e1; margin-bottom: 15px; }
  .share-icons { display: flex; gap: 20px; color: #94a3b8; }
  svg { cursor: pointer; transition: 0.2s; &:hover { color: #2563eb; } }
`;

const ContentColumnArea = styled.main`
  max-width: 800px;
`;
import React, { useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// --- Global Styles & Theme ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #111;
    /* Subtle gradient background for a modern feel */
    background: linear-gradient(180deg, #ffffff 0%, #f8fbf9 100%);
    overflow-x: hidden;
  }
  
  ::selection { background: #28a665; color: white; }

  /* --- WORDPRESS CONTENT STYLING (Green Theme) --- */
  .wp-content {
    font-family: 'Manrope', sans-serif;
    color: #333;
    font-size: 18px;
    line-height: 1.8;
  }

  /* HEADINGS */
  .wp-content h2, .wp-content h3, .wp-content h4 {
    color: #1a1a1a;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 20px;
    line-height: 1.3;
    letter-spacing: -0.5px;
  }
  .wp-content h2 { font-size: 32px; }
  .wp-content h3 { font-size: 26px; }

  /* PARAGRAPHS */
  .wp-content p { margin-bottom: 24px; color: #444; }

  /* IMAGES */
  .wp-content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 40px auto;
    border-radius: 12px;
    box-shadow: 0 15px 35px rgba(40, 166, 101, 0.1); /* Subtle green shadow */
  }

  /* LISTS */
  .wp-content ul, .wp-content ol { margin-bottom: 30px; padding-left: 20px; }
  .wp-content li { margin-bottom: 12px; }
  .wp-content ul { list-style: disc; }
  .wp-content ol { list-style: decimal; }
  /* Custom bullet color */
  .wp-content li::marker { color: #28a665; }

  /* BLOCKQUOTES */
  .wp-content blockquote {
    border-left: 4px solid #28a665; /* Green Accent */
    background: #f0fdf4; /* Very light green bg */
    padding: 30px 40px;
    margin: 40px 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    font-size: 20px;
    color: #1a4d33;
  }

  /* LINKS */
  .wp-content a {
    color: #28a665;
    text-decoration: underline;
    text-underline-offset: 4px;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  .wp-content a:hover { color: #1e8550; }
  
  /* CODE BLOCKS */
  .wp-content pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
  }
`;

// --- Types ---
interface WPRendered { rendered: string; }
interface WPPostData {
  id: number;
  date: string;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string; avatar_urls?: { '96': string } }>;
  };
}

// --- Icons ---
const ArrowLeftBtn = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>);
const ArrowRightBtn = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>);

// --- Hardcoded Related Posts Data ---
const relatedPosts = [
  {
    id: 1,
    tag: 'UI Development',
    title: 'Data orchestration: How to automate data pipelines?',
    date: 'December 3, 2024',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?w=740',
  },
  {
    id: 2,
    tag: 'Development',
    title: 'Build your strategy right: Construction supply chain...',
    date: 'November 15, 2024',
    image: 'https://img.freepik.com/free-vector/construction-worker-concept-illustration_114360-3536.jpg?w=740',
  },
  {
    id: 3,
    tag: 'SaaS',
    title: 'Top 5 Trends in Cloud Computing for 2025',
    date: 'October 28, 2024',
    image: 'https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?w=740',
  }
];

// --- Main Component ---
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    
    // Fetch from your specific subdomain
    const wpUrl = `https://blogs.codenest.us.com/wp-json/wp/v2/posts?slug=${slug}&_embed`;

    axios.get(wpUrl)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPost(res.data[0]);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        setLoading(false);
        setPost(null);
      });
  }, [slug]);

  // Slider Logic
  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400; 
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (loading) return <LoadingContainer>Loading Article...</LoadingContainer>;
  if (!post) return <LoadingContainer>Article not found.</LoadingContainer>;

  // Extract Data
  const title = post.title.rendered;
  const content = post.content.rendered;
  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const featureImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = post._embedded?.['author']?.[0]?.name || 'Editor';
  const authorImg = post._embedded?.['author']?.[0]?.avatar_urls?.['96'] || 'https://via.placeholder.com/96';

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        {/* Header & Breadcrumbs */}
        <HeaderWrapper>
          <Breadcrumbs>
            <Link to="/">Home</Link><span className="divider">/</span>
            <Link to="/blog">Blog</Link><span className="divider">/</span>
            <span className="current" dangerouslySetInnerHTML={{ __html: title }} />
          </Breadcrumbs>
          
          <DateText>{date}</DateText>
          
          <HeaderGrid>
            <AuthorBox>
              <AuthorImg src={authorImg} alt={authorName} />
              <AuthorInfo>
                <AuthorName>{authorName}</AuthorName>
                <AuthorRole>Author</AuthorRole>
              </AuthorInfo>
            </AuthorBox>
            <MainTitle dangerouslySetInnerHTML={{ __html: title }} />
          </HeaderGrid>
        </HeaderWrapper>

        {/* Hero Image */}
        {featureImg && (
          <HeroSection>
            <HeroImg src={featureImg} alt="Cover" />
          </HeroSection>
        )}

        {/* Main Content Area */}
        <ContentContainer>
          <ArticleBody className="wp-content" dangerouslySetInnerHTML={{ __html: content }} />
        </ContentContainer>
      </PageContainer>

      {/* --- Related Blogs Slider (Updated Color Theme) --- */}
      <RelatedSection>
        <PageContainer>
          <SectionHeader>
            <BigHeading>
              Want to know more?<br />
              <span className="highlight">Check our blog</span>
            </BigHeading>
          </SectionHeader>
          
          <SliderWrapper>
            <CardsContainer ref={sliderRef}>
              {relatedPosts.map((post) => (
                <BlogCard key={post.id}>
                  <div className="card-img">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="card-content">
                    <span className="tag">{post.tag}</span>
                    <h3>{post.title}</h3>
                    <span className="date">{post.date}</span>
                  </div>
                </BlogCard>
              ))}
            </CardsContainer>
            
            <SliderControls>
              <SliderButton onClick={() => scrollSlider('left')} aria-label="Previous"><ArrowLeftBtn /></SliderButton>
              <SliderButton onClick={() => scrollSlider('right')} aria-label="Next"><ArrowRightBtn /></SliderButton>
            </SliderControls>
          </SliderWrapper>
        </PageContainer>
      </RelatedSection>
    </>
  );
};

export default BlogPost;

// ==========================================
// STYLED COMPONENTS (Green Theme: #28a665)
// ==========================================

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoadingContainer = styled.div`
  text-align: center; padding: 100px; font-size: 1.5rem; color: #555;
`;

const PageContainer = styled.div`
  max-width: 1440px; margin: 0 auto; padding: 60px;
  animation: ${fadeIn} 0.6s ease-out;
  @media (max-width: 1024px) { padding: 40px 20px; }
`;

const HeaderWrapper = styled.header`
  margin-bottom: 50px;
  max-width: 1000px; 
  margin-left: auto; margin-right: auto;
`;

const Breadcrumbs = styled.nav`
  font-size: 13px; color: #888; display: flex; align-items: center; gap: 8px; margin-bottom: 24px;
  a { transition: color 0.2s; &:hover { color: #28a665; } }
  .divider { color: #ccc; }
  .current { 
    color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 300px; 
  }
`;

const DateText = styled.div` 
  font-size: 13px; color: #28a665; margin-bottom: 20px; 
  text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;
`;

const HeaderGrid = styled.div`
  display: flex; flex-direction: column; gap: 30px; align-items: flex-start;
`;

const AuthorBox = styled.div` display: flex; gap: 16px; align-items: center; `;
const AuthorImg = styled.img` width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); `;
const AuthorInfo = styled.div` display: flex; flex-direction: column; font-size: 14px; line-height: 1.3; `;
const AuthorName = styled.span` font-weight: 700; color: #111; `;
const AuthorRole = styled.span` color: #28a665; font-size: 12px; font-weight: 600; text-transform: uppercase; `;

const MainTitle = styled.h1`
  font-size: 52px; font-weight: 800; line-height: 1.1; color: #111; margin: 0; letter-spacing: -1.5px;
  @media (max-width: 768px){ font-size: 36px; }
`;

const HeroSection = styled.div`
  width: 100%; max-width: 1200px; height: 500px; margin: 0 auto 80px; 
  overflow: hidden; border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15); /* Deep shadow */
  @media (max-width: 768px){ height: 300px; margin-bottom: 40px; }
`;

const HeroImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.8s ease;
  &:hover { transform: scale(1.03); } 
`;

const ContentContainer = styled.div`
  display: flex; justify-content: center;
`;

const ArticleBody = styled.div`
  max-width: 800px; width: 100%; padding-bottom: 60px;
`;

// --- Related Section Styles ---
const RelatedSection = styled.div` 
  /* Light mint background for related section */
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
  display: flex; gap: 30px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding: 20px 0 40px; 
  -ms-overflow-style: none; scrollbar-width: none; 
  &::-webkit-scrollbar { display: none; } 
`;

const BlogCard = styled.div` 
  min-width: 450px; background: white; display: flex; height: 260px; 
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
  transition: all 0.3s ease; cursor: pointer; border: 1px solid transparent;

  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px rgba(40, 166, 101, 0.15); /* Green shadow on hover */
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
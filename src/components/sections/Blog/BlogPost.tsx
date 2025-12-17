import React, { useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #111;
    background: #fff;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  ul, ol { list-style: none; padding: 0; margin: 0; }
  button { font-family: inherit; }
  ::selection { background: #2e5bff; color: white; }
`;

// --- Icons ---
const ArrowRightIcon = () => (<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12l-18 12v-24z" /></svg>);
const ArrowLeftBtn = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>);
const ArrowRightBtn = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>);

// Workflow Icons
const IconBIM = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e5bff" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>);
const IconPreConst = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e5bff" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>);
const IconOps = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e5bff" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
const IconChange = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e5bff" strokeWidth="1.5"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>);
const IconSite = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2e5bff" strokeWidth="1.5"><path d="M3 21h18M5 21V7l8-4 8 4v14"/><path d="M13 11v10"/></svg>);

// --- Data ---
const articleData = {
  title: 'How to implement construction time tracking software',
  author: {
    name: 'Petro Starych',
    role: 'COO, Co-Founder COAX Software',
    subRole: 'on Development',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100&q=80',
    date: 'December 12, 2024',
  },
  coverImage: 'https://img.freepik.com/free-vector/blue-futuristic-networking-technology_53876-100694.jpg?w=1380',
  toc: [
    { id: 'intro', title: 'How is time tracking software better than manual timesheets?' },
    { id: 'benefits', title: 'Benefits of construction timesheet software' },
    { id: 'roi', title: 'The ROI of construction time tracking software' },
    { id: 'how-does', title: 'How does construction timekeeping software work?' },
    { id: 'steps', title: 'Steps to implement time tracking software in construction' },
    { id: 'faq', title: 'FAQ' },
  ],
};

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
  const [activeSection, setActiveSection] = useState('intro');
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = articleData.toc.map(s => document.getElementById(s.id));
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400; // Width of a card
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        {/* Header & Content */}
        <HeaderWrapper>
          <Breadcrumbs>
            <Link to="/">Home</Link><span className="divider">.</span>
            <Link to="/blog">Blog</Link><span className="divider">.</span>
            <span className="current">{articleData.title}</span>
          </Breadcrumbs>
          <DateText>{articleData.author.date}</DateText>
          <HeaderGrid>
            <AuthorBox>
              <AuthorImg src={articleData.author.image} alt={articleData.author.name} />
              <AuthorInfo>
                <AuthorName>{articleData.author.name}</AuthorName>
                <AuthorRole>{articleData.author.role}</AuthorRole>
                <AuthorSubRole>{articleData.author.subRole}</AuthorSubRole>
              </AuthorInfo>
            </AuthorBox>
            <MainTitle>{articleData.title}</MainTitle>
          </HeaderGrid>
        </HeaderWrapper>

        <HeroSection><HeroImg src={articleData.coverImage} alt="Hero" /></HeroSection>

        <ContentContainer>
          <Sidebar>
            <TocLabel><span>/</span> Table of Contents</TocLabel>
            <TocList>
              {articleData.toc.map((item) => (
                <TocItem key={item.id} $active={activeSection === item.id} onClick={() => scrollToSection(item.id)}>
                  {item.title}
                </TocItem>
              ))}
            </TocList>
          </Sidebar>

          <ArticleBody>
             <div id="intro">
               <IntroText>
                 To get out of the trap that <LinkSpan>40% of employees</LinkSpan> fall into, wasting 25% of their time on manual data entry, an <LinkSpan>experiment by Redman et al.</LinkSpan> suggests a workflow on how to implement automatic construction productivity tracking.
               </IntroText>
               <CustomList>
                 <li><div className="icon"><ArrowRightIcon /></div><p><strong>Use on-the-go mobile apps</strong> instead of repetitive manual processes.</p></li>
                 <li><div className="icon"><ArrowRightIcon /></div><p><strong>Integrate the mentioned apps</strong> with a project management software.</p></li>
               </CustomList>
               <p>Sound simple? Well, there are many nuances to trace. In this article, we will break down the benefits, workflows, and implementation steps.</p>
             </div>

             <div id="benefits">
               <SectionHeading>Benefits of construction timesheet software</SectionHeading>
               <p>Digital technologies open up a world of possibilities:</p>
               <CustomList>
                 <li><div className="icon"><ArrowRightIcon /></div><p><strong>Digital time sheet software eliminates data entry</strong>, saving about two full days.</p></li>
                 <li><div className="icon"><ArrowRightIcon /></div><p><strong>Managers get instant visual feedback</strong> on what labor costs are for each project.</p></li>
               </CustomList>
             </div>

             <div id="roi">
               <SectionHeading>The ROI of construction time tracking software</SectionHeading>
               <p>Time theft costs roughly 7% of labor budgets. <strong>Time tracking software uses real-time monitoring and GPS verification to directly address these losses.</strong></p>
               <StatsContainer>
                  <div className="stat-box left">
                    <p className="stat-label">Instead of focusing on priority activities, construction professionals spend</p>
                    <div className="chart-circle"><span>35%</span></div>
                    <p className="stat-sub">of their work hours completing non-optimal activities</p>
                  </div>
                  <div className="divider-line"></div>
                  <div className="stat-box right">
                    <div className="top-val">14+ hours</div>
                    <p className="stat-label">are wasted each week, dealing with</p>
                    <div className="tree-diagram">
                      <div className="branch"><span className="val">4.7</span><span className="desc">Conflict resolution</span></div>
                      <div className="branch center"><span className="val">5.5</span><span className="desc">Dispersed info</span></div>
                      <div className="branch"><span className="val">3.9</span><span className="desc">Mistakes/Rework</span></div>
                    </div>
                  </div>
               </StatsContainer>
             </div>

             <div id="how-does">
               <SectionHeading>How does construction timekeeping software work?</SectionHeading>
               <WorkflowContainer>
                 <h6>5 essential construction workflows</h6>
                 <div className="grid">
                   <div className="item"><IconBIM /><span>BIM workflow</span></div>
                   <div className="item"><IconPreConst /><span>Pre-construction</span></div>
                   <div className="item"><IconOps /><span>OPs</span></div>
                   <div className="item"><IconChange /><span>Change orders</span></div>
                   <div className="item"><IconSite /><span>Construction site</span></div>
                 </div>
               </WorkflowContainer>
             </div>

             <div id="steps">
               <SectionHeading>Steps to implement time tracking software</SectionHeading>
               <NumberedList>
                 <li><strong>Set communication and goals.</strong> Communicate purposes clearly.</li>
                 <li><strong>Choose the software.</strong> Look for mobile capabilities and GPS.</li>
                 <li><strong>Create an implementation schedule.</strong> Assign oversight to seasoned staff.</li>
                 <li><strong>Carry out pilot testing.</strong> Soft launch with a small team.</li>
                 <li><strong>Offer thorough instruction.</strong> Conduct focused training sessions.</li>
               </NumberedList>
             </div>
             
             <div id="faq" style={{height:'50px'}}></div>
          </ArticleBody>
        </ContentContainer>
      </PageContainer>

      {/* --- Related Blogs Slider --- */}
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
              <SliderButton onClick={() => scrollSlider('left')}><ArrowLeftBtn /></SliderButton>
              <SliderButton onClick={() => scrollSlider('right')}><ArrowRightBtn /></SliderButton>
            </SliderControls>
          </SliderWrapper>
        </PageContainer>
      </RelatedSection>
    </>
  );
};

export default BlogPost;

// ==========================================
// STYLED COMPONENTS
// ==========================================

const PageContainer = styled.div`
  max-width: 1440px; margin: 0 auto; padding: 40px 60px;
  @media (max-width: 1024px) { padding: 20px; }
`;
const HeaderWrapper = styled.header` margin-bottom: 40px; `;
const Breadcrumbs = styled.nav`
  font-size: 13px; color: #999; display: flex; align-items: center; gap: 8px; margin-bottom: 24px;
  a { transition: color 0.2s; &:hover { color: #2e5bff; } }
  .divider { color: #ccc; padding-bottom: 5px; }
  .current { color: #111; }
`;
const DateText = styled.div` font-size: 13px; color: #999; margin-bottom: 20px; `;
const HeaderGrid = styled.div` display: grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: flex-start; @media (max-width: 768px){ grid-template-columns: 1fr; }`;
const AuthorBox = styled.div` display: flex; gap: 16px; `;
const AuthorImg = styled.img` width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 1px solid #eee; `;
const AuthorInfo = styled.div` display: flex; flex-direction: column; font-size: 14px; line-height: 1.4; `;
const AuthorName = styled.span` font-weight: 700; color: #2e5bff; `;
const AuthorRole = styled.span` color: #999; font-size: 12px; `;
const AuthorSubRole = styled.span` color: #999; font-size: 12px; `;
const MainTitle = styled.h1` font-size: 48px; font-weight: 400; line-height: 1.15; color: #1a1a1a; margin: 0; letter-spacing: -1.5px; @media (max-width: 768px){ font-size: 32px; } `;
const HeroSection = styled.div` width: 100%; height: 400px; margin-bottom: 60px; overflow: hidden; `;
const HeroImg = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const ContentContainer = styled.div` display: grid; grid-template-columns: 280px 1fr; gap: 60px; @media(max-width:900px){ grid-template-columns: 1fr; } `;
const Sidebar = styled.aside` position: sticky; top: 100px; align-self: start; @media(max-width:900px){ display:none; } `;
const TocLabel = styled.div` font-size: 14px; color: #999; margin-bottom: 24px; span{ color:#ccc; margin-right:5px; }`;
const TocList = styled.div` display: flex; flex-direction: column; gap: 16px; `;
const TocItem = styled.a<{ $active: boolean }>` font-size: 14px; color: ${p=>p.$active?'#2e5bff':'#999'}; cursor:pointer; &:hover{color:#2e5bff;} `;
const ArticleBody = styled.div` font-size: 16px; line-height: 1.7; color: #444; max-width: 800px; p { margin-bottom: 24px; } `;
const IntroText = styled.p` font-size: 16px; color: #333; margin-bottom: 30px; `;
const LinkSpan = styled.span` text-decoration: underline; text-decoration-color: #ccc; text-underline-offset: 3px; color: #111; font-weight: 500; cursor: pointer; &:hover{ color:#2e5bff; text-decoration-color:#2e5bff; } `;
const CustomList = styled.ul` margin: 30px 0; li{ display:flex; gap:16px; margin-bottom:20px; } .icon{ min-width:10px; margin-top:6px; color:#111; } `;
const SectionHeading = styled.h2` font-size: 40px; font-weight: 400; line-height: 1.1; color: #111; margin: 60px 0 30px; letter-spacing: -1px; `;
const NumberedList = styled.ol` margin: 30px 0; padding-left:0; counter-reset: item; li{ display:block; margin-bottom:24px; padding-left:24px; position:relative; &:before{ content:counter(item)". "; counter-increment:item; position:absolute; left:0; top:0; font-weight:700; color:#111; } } `;
const StatsContainer = styled.div` display: flex; background: #fff; margin: 50px 0; padding: 20px 0; align-items: flex-start; @media(max-width:768px){ flex-direction:column; gap:30px; } .divider-line{ width:1px; background:#eee; margin:0 40px; align-self:stretch; } .stat-box{ flex:1; text-align:center; display:flex; flex-direction:column; align-items:center; } .stat-label{ font-size:14px; font-weight:700; margin-bottom:20px; max-width:280px; } .stat-sub{ font-size:13px; color:#666; margin-top:15px; font-weight:600; max-width:200px; } .chart-circle{ width:120px; height:120px; border-radius:50%; background:conic-gradient(#00e0ff 0% 35%, #f0f0f0 35% 100%); display:flex; align-items:center; justify-content:center; position:relative; &:after{ content:''; position:absolute; width:80px; height:80px; background:#fff; border-radius:50%; } span{ position:relative; z-index:2; font-size:24px; font-weight:700; color:#2e5bff; } } .top-val{ font-size:32px; font-weight:700; color:#2e5bff; margin-bottom:10px; } .tree-diagram{ display:flex; gap:10px; width:100%; justify-content:space-between; margin-top:20px; position:relative; &:before{ content:''; position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:1px; height:10px; background:#ccc; } &:after{ content:''; position:absolute; top:-10px; left:15%; right:15%; height:1px; background:#ccc; } .branch{ display:flex; flex-direction:column; align-items:center; position:relative; flex:1; &:before{ content:''; position:absolute; top:-10px; width:1px; height:10px; background:#ccc; } .val{ font-size:18px; font-weight:700; color:#2e5bff; margin-bottom:5px; } .desc{ font-size:11px; font-weight:700; line-height:1.2; } } } `;
const WorkflowContainer = styled.div` margin:50px 0; h6{ text-align:center; font-size:14px; font-weight:700; text-transform:uppercase; margin-bottom:30px; } .grid{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; } .item{ display:flex; flex-direction:column; align-items:center; gap:12px; width:100px; text-align:center; span{ font-size:12px; font-weight:600; } } `;

// Related & Slider Styles
const RelatedSection = styled.div` background-color: #f7f8fa; padding: 80px 0 100px; margin-top: 80px; overflow: hidden; `;
const SectionHeader = styled.div` margin-bottom: 50px; `;
const BigHeading = styled.h2` font-size: 48px; font-weight: 400; line-height: 1.1; color: #1a1a1a; margin: 0; letter-spacing: -1.5px; .highlight { color: #2e5bff; } @media (max-width: 768px) { font-size: 36px; } `;
const SliderWrapper = styled.div` display: flex; flex-direction: column; align-items: center; `;
const CardsContainer = styled.div` display: flex; gap: 30px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding-bottom: 20px; -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; } `;
const BlogCard = styled.div` min-width: 500px; background: white; display: flex; height: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s; cursor: pointer; &:hover { transform: translateY(-5px); } .card-img { width: 45%; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } } .card-content { width: 55%; padding: 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; } .tag { background: #eef2ff; color: #2e5bff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 12px; border-radius: 4px; margin-bottom: 16px; } h3 { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 16px 0; line-height: 1.4; } .date { font-size: 13px; color: #999; margin-top: auto; } @media (max-width: 600px) { min-width: 300px; flex-direction: column; height: auto; .card-img { width: 100%; height: 180px; } .card-content { width: 100%; } } `;
const SliderControls = styled.div` display: flex; gap: 12px; margin-top: 40px; `;
const SliderButton = styled.button` width: 48px; height: 48px; border: 1px solid #ddd; background: white; color: #111; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; &:hover { background: #2e5bff; border-color: #2e5bff; color: white; } `;
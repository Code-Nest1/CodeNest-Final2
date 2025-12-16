// src/pages/ProjectDetail.tsx

import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../../data/portfolioData";
import { 
  ArrowRight, Linkedin, Facebook, Smartphone, 
  Layers, Users, MessageSquare, Shield, Zap, GitMerge, 
  ChevronDown, ChevronUp, ExternalLink, Box,
  Instagram
} from "react-feather";

// --- TYPES ---
interface ActiveProp {
  $active: boolean;
}

// --- GLOBAL STYLES ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; }
  body {
    background-color: #f7f7fa;
    color: #111;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; color: inherit; transition: color 0.2s; }
  ul { list-style: none; padding: 0; margin: 0; }
  button { font-family: 'Inter', sans-serif; }
  
  /* Scrollbar Polish */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
`;

// --- THEME ---
const THEME = {
  blue: "#2E40E6", 
  blueHover: "#2432b5",
  green: "#00b865", 
  greenHover: "#009954",
  textMain: "#111111",
  textSec: "#6B7280",
  textLight: "#9CA3AF",
  bgBody: "#f7f7fa",
  bgWhite: "#ffffff",
  border: "#E5E7EB",
  gold: "#CBB05B", 
};

// --- GENERIC DATA ---
const REASONS = [
  { title: "Flexibility & adaptability", icon: <Layers />, desc: "Code Nest understands the importance of flexibility, working around your schedule to provide services when convenient." },
  { title: "Skilled and dedicated team", icon: <Users />, desc: "The Code Nest team consists of pioneering industry experts and experienced professionals who meet high proficiency standards." },
  { title: "Ongoing support", icon: <MessageSquare />, desc: "We're committed to providing excellent support throughout the entire project lifecycle." },
  { title: "Security and confidentiality", icon: <Shield />, desc: "We take data privacy and security very seriously. We sign a non-disclosure agreement (NDA) to keep information safe." },
  { title: "Growth-focused approach", icon: <Zap />, desc: "We implement cutting-edge tools that help your business and technology scale for long-term success." },
  { title: "Agile methodology", icon: <GitMerge />, desc: "We follow a truly agile approach. We aim to remain flexible and responsive to your needs at all times." },
];

// --- COMPONENTS ---
const AccordionItem = ({ title, items }: { title: string, items: string[] }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for better visibility
  return (
    <AccordionWrapper>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </AccordionHeader>
      <AnimatePresence>
        {isOpen && (
          <AccordionContent
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </AccordionContent>
        )}
      </AnimatePresence>
    </AccordionWrapper>
  );
};

// --- MAIN PAGE ---

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<"challenge" | "solution">("challenge"); 
  const [featureIdx, setFeatureIdx] = useState(0);

  // Find the project based on URL slug
  const project = projectsData.find(p => p.slug === slug);

  // Scroll to top on load
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Handle 404
  if (!project) {
    return (
      <ErrorContainer>
        <h1>Project not found</h1>
        <Link to="/portfolio">Return to Portfolio</Link>
      </ErrorContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      
      {/* --- NAVBAR --- */}
      <Navbar>
        <Container>
          <NavFlex>
            <LogoArea>
              <div className="icon"><Box size={24} strokeWidth={2.5}/></div>
              <span className="text">Code Nest</span>
            </LogoArea>
            <NavLinks>
              <Link to="/">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/">About</Link>
              <ContactButton>Contact Us</ContactButton>
            </NavLinks>
          </NavFlex>
        </Container>
      </Navbar>

      <PageWrapper>
        {/* --- MAIN GRID LAYOUT --- */}
        <MainGridContainer>
          
          {/* LEFT COLUMN: STICKY SIDEBAR */}
          <SidebarColumn>
            <StickySidebar>
              <CategoryTag>
                <Smartphone size={14} /> {project.category}
              </CategoryTag>

              <SidebarSection>
                <SidebarTitle>Services:</SidebarTitle>
                <TagsWrapper>
                  {project.services.map((s) => <Tag key={s}>{s}</Tag>)}
                </TagsWrapper>
              </SidebarSection>

              <Divider />
              {project.team && <AccordionItem title={`The team`} items={project.team} />}
              {project.technologies && <AccordionItem title={`Technologies`} items={project.technologies} />}
              {project.integrations && <AccordionItem title={`Integrations`} items={project.integrations} />}
              <Divider />

              <MetaBox>
                <span className="label">Timeline:</span>
                <span className="value">{project.timeline}</span>
              </MetaBox>
              <MetaBox>
                <span className="label">Website:</span>
                <a href={`https://exclusivecarfinance.com/`} target="_blank" rel="noreferrer" className="link">
                  {project.website} <ExternalLink size={12}/>
                </a>
              </MetaBox>

              <SocialLinks>
                <SocialIcon><Linkedin size={18} /></SocialIcon>
                <SocialIcon><Facebook size={18} /></SocialIcon>
                <SocialIcon><Instagram size={18} /></SocialIcon>
              </SocialLinks>
            </StickySidebar>
          </SidebarColumn>

          {/* RIGHT COLUMN: SCROLLABLE CONTENT */}
          <ContentColumn>
            <Breadcrumb>
              <span>🛠 Projects</span> / {project.title}
            </Breadcrumb>
            
            <MainHeading>{project.title}</MainHeading>

            <HeroFrame>
              <img src={project.heroImage} alt={project.title} />
            </HeroFrame>

            <Section>
              <IntroText>
                {project.intro}
              </IntroText>

              <ToggleContainer>
                <ToggleLabel $active={viewState === "challenge"} onClick={() => setViewState("challenge")}>
                  Challenge
                </ToggleLabel>
                <ToggleSwitch onClick={() => setViewState(viewState === "challenge" ? "solution" : "challenge")}>
                  <motion.div 
                    className="handle"
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    style={{ left: viewState === "challenge" ? "4px" : "calc(100% - 34px)" }}
                  />
                </ToggleSwitch>
                <ToggleLabel $active={viewState === "solution"} onClick={() => setViewState("solution")}>
                  The solution
                </ToggleLabel>
              </ToggleContainer>

              <AnimatePresence mode="wait">
                <AnimatedText
                  key={viewState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {viewState === "challenge" ? project.challenge : project.solution}
                </AnimatedText>
              </AnimatePresence>
            </Section>

            <Section>
              <SectionTitle>User Roles</SectionTitle>
              <RoleList>
                {project.userRoles.map((role, index) => (
                  <RoleRow key={index}>
                    <h4>{role.title}</h4>
                    <p>{role.desc}</p>
                  </RoleRow>
                ))}
              </RoleList>
            </Section>

            {/* --- FEATURES SECTION --- */}
            <FeaturesContainer>
              <CenteredFeatureTitle>Key features</CenteredFeatureTitle>
              
              <div style={{ width: '100%' }}>
                <SmallLabel>/ Features</SmallLabel>
                
                <FeatureTabsList>
                  {project.features.map((f, i) => (
                    <FeatureTab 
                      key={f.id} 
                      $active={featureIdx === i} 
                      onClick={() => setFeatureIdx(i)}
                    >
                      {f.title}
                    </FeatureTab>
                  ))}
                </FeatureTabsList>

                <FeatureCardWrapper>
                  {/* Left: White Card with Text & Arrows */}
                  <FeatureContentSide>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featureIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                      >
                        <div>
                          <h3 className="feat-title">{project.features[featureIdx].title}</h3>
                          <p className="feat-desc">{project.features[featureIdx].desc}</p>
                        </div>

                        {/* Arrows */}
                        <NavControlBox>
                          <NavButton onClick={() => setFeatureIdx(curr => curr === 0 ? project.features.length-1 : curr - 1)}>
                            <ArrowRight size={20} style={{transform: 'rotate(180deg)'}}/>
                          </NavButton>
                          <NavButton onClick={() => setFeatureIdx(curr => (curr + 1) % project.features.length)}>
                            <ArrowRight size={20}/>
                          </NavButton>
                        </NavControlBox>

                      </motion.div>
                    </AnimatePresence>
                  </FeatureContentSide>

                  {/* Right: Gold Card with Image */}
                  <FeatureVisualSide>
                     <AnimatePresence mode="wait">
                      <motion.div 
                        className="phone-mockup"
                        key={featureIdx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img src={project.features[featureIdx].img} alt="Feature Visual" />
                      </motion.div>
                     </AnimatePresence>
                     <div className="corner-label">/ {project.features[featureIdx].title}</div>
                  </FeatureVisualSide>
                </FeatureCardWrapper>
              </div>
            </FeaturesContainer>

            <Section>
              <SectionTitle>Project Outcomes</SectionTitle>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: THEME.textSec }}>
                {project.outcome}
              </p>
            </Section>

            <FullWidthBanner>
               <img src={project.heroImage} alt="Project Banner" />
            </FullWidthBanner>

          </ContentColumn>
        </MainGridContainer>

        {/* --- BOTTOM SECTION --- */}
        <BottomSection>
          <Container>
            <CenteredHeading>Why partner with Code Nest?</CenteredHeading>
            <Grid2Col>
              {REASONS.map((r, i) => (
                <GridItem key={i}>
                  <IconBox>{r.icon}</IconBox>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </GridItem>
              ))}
            </Grid2Col>
          </Container>
        </BottomSection>

        {/* --- FOOTER --- */}
        <Footer>
          <Container>
            <FooterHeader>
              <h2>Other projects</h2>
              <Link to="/portfolio" className="see-all">
                See All Projects <ArrowRight size={16} />
              </Link>
            </FooterHeader>
            <ProjectsGrid>
              {projectsData.filter(p => p.id !== project.id).slice(0, 2).map(other => (
                <ProjectCard key={other.id} onClick={() => navigate(`/portfolio/${other.slug}`)}>
                  <CardImage><img src={other.heroImage} alt={other.title} /></CardImage>
                  <CardContent>
                    <TagSmall>{other.category}</TagSmall>
                    <h3>{other.title}</h3>
                    <p>{other.subtitle}</p>
                  </CardContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </Container>
        </Footer>

      </PageWrapper>
    </>
  );
}

// --- STYLED COMPONENTS ---

const Navbar = styled.nav`
  position: fixed; top: 0; left: 0; width: 100%; height: 80px;
  background: white; border-bottom: 1px solid ${THEME.border}; z-index: 1000;
  display: flex; align-items: center;
`;
const Container = styled.div` max-width: 1320px; width: 100%; margin: 0 auto; padding: 0 32px; `;

const NavFlex = styled.div` display: flex; justify-content: space-between; align-items: center; `;
const LogoArea = styled.div`
  display: flex; align-items: center; gap: 10px;
  .icon { color: #108a54; } 
  .text { font-size: 20px; font-weight: 700; color: ${THEME.textMain}; letter-spacing: -0.02em; }
`;
const NavLinks = styled.div`
  display: flex; gap: 40px;
  @media(max-width: 900px) { display: none; }
  a { font-size: 15px; font-weight: 500; color: #4b5563; &:hover { color: ${THEME.blue}; } }
`;
const ContactButton = styled.button`
  background: ${THEME.green}; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s;
  &:hover { background: ${THEME.greenHover}; }
`;

// --- LAYOUT GRID ---
const PageWrapper = styled.div` padding-top: 10px; `;

const MainGridContainer = styled(Container)`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 80px;
  margin-top: 60px;
  margin-bottom: 120px;
  position: relative;
  
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 40px; }
`;

const SidebarColumn = styled.div`
  height: 100%; 
  @media (max-width: 1024px) { display: none; } 
`;

const StickySidebar = styled.aside`
  position: sticky;
  top: 120px;
  height: fit-content;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: 10px;
`;

const ContentColumn = styled.main`
  min-width: 0;
`;

// --- SIDEBAR ITEMS ---
const CategoryTag = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  background: #EEF2FF; color: ${THEME.blue}; padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; width: fit-content; margin-bottom: 40px;
`;
const SidebarSection = styled.div` margin-bottom: 24px; `;
const SidebarTitle = styled.h5` font-size: 12px; color: ${THEME.textLight}; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin: 0 0 16px 0; `;
const TagsWrapper = styled.div` display: flex; flex-wrap: wrap; gap: 8px; `;
const Tag = styled.span` background: white; border: 1px solid ${THEME.border}; padding: 6px 12px; font-size: 14px; border-radius: 4px; color: ${THEME.textMain}; `;
const Divider = styled.div` height: 1px; background: ${THEME.border}; margin: 24px 0; `;
const AccordionWrapper = styled.div` border-bottom: 1px solid ${THEME.border}; &:first-of-type { border-top: 1px solid ${THEME.border}; margin-top: -25px; } `;
const AccordionHeader = styled.div` padding: 16px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 500; font-size: 15px; color: ${THEME.textMain}; &:hover { color: ${THEME.blue}; } `;
const AccordionContent = styled(motion.div)` overflow: hidden; ul { padding-bottom: 16px; } li { font-size: 14px; color: ${THEME.textSec}; margin-bottom: 8px; padding-left: 10px; border-left: 2px solid ${THEME.blue}; } `;
const MetaBox = styled.div` margin-bottom: 16px; font-size: 14px; display: flex; flex-direction: column; gap: 4px; .label { color: ${THEME.textLight}; } .value { font-weight: 500; } .link { color: ${THEME.blue}; font-weight: 500; display: flex; align-items: center; gap: 4px; text-decoration: underline;} `;
const SocialLinks = styled.div` display: flex; gap: 12px; margin-top: 20px; `;
const SocialIcon = styled.a` width: 40px; height: 40px; border-radius: 50%; background: #111; color: white; display: flex; align-items: center; justify-content: center; transition: 0.2s; cursor: pointer; &:hover { background: ${THEME.blue}; } `;

// --- CONTENT ITEMS ---
const Breadcrumb = styled.div` color: ${THEME.textSec}; font-size: 14px; margin-bottom: 24px; span { font-weight: 600; color: ${THEME.textMain}; } `;
const MainHeading = styled.h1` font-size: clamp(32px, 4vw, 56px); font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 60px; `;
const HeroFrame = styled.div` width: 100%; aspect-ratio: 16/9; background: #f0f0f0; border-radius: 12px; overflow: hidden; margin-bottom: 80px; img { width: 100%; height: 100%; object-fit: cover; } `;
const Section = styled.div` margin-bottom: 100px; `;
const IntroText = styled.p` font-size: 20px; line-height: 1.6; color: ${THEME.textMain}; max-width: 90%; margin-bottom: 60px; `;
const ToggleContainer = styled.div` display: flex; align-items: center; gap: 24px; margin-bottom: 40px; `;
const ToggleLabel = styled.h2<ActiveProp>` font-size: 28px; font-weight: 600; cursor: pointer; margin: 0; color: ${props => props.$active ? THEME.textMain : "#E5E7EB"}; transition: color 0.3s ease; `;
const ToggleSwitch = styled.div` width: 64px; height: 36px; background: ${THEME.blue}; border-radius: 20px; position: relative; cursor: pointer; padding: 4px; .handle { width: 28px; height: 28px; background: white; border-radius: 50%; position: absolute; top: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); } `;
const AnimatedText = styled(motion.div)` font-size: 18px; line-height: 1.8; color: ${THEME.textSec}; `;
const SectionTitle = styled.h2` font-size: 42px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 40px; `;
const RoleList = styled.div` border-top: 1px solid ${THEME.border}; `;
const RoleRow = styled.div` padding: 32px 0; border-bottom: 1px solid ${THEME.border}; display: grid; grid-template-columns: 200px 1fr; gap: 20px; h4 { margin: 0; font-size: 18px; font-weight: 700; } p { margin: 0; font-size: 16px; color: ${THEME.textSec}; line-height: 1.6; max-width: 600px; } @media(max-width: 768px) { grid-template-columns: 1fr; } `;
const ErrorContainer = styled.div` min-height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; h1 { margin-bottom: 20px; } a { color: ${THEME.blue}; text-decoration: underline; }`;

// --- FEATURES STYLED COMPONENTS ---
const FeaturesContainer = styled.div`
  margin-bottom: 120px;
  width: 100%;
  background: #FCFCFD;
  padding: 40px;
  border-radius: 20px;
  @media(max-width: 768px) { padding: 20px; }
`;

const CenteredFeatureTitle = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 60px;
  letter-spacing: -0.03em;
  color: ${THEME.textMain};
`;

const SmallLabel = styled.div`
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 16px;
  font-weight: 500;
`;

const FeatureTabsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
  justify-content: flex-start;
`;

const FeatureTab = styled.button<ActiveProp>`
  background: ${props => props.$active ? THEME.blue : "transparent"};
  color: ${props => props.$active ? "white" : "#4b5563"};
  border: 1px solid ${props => props.$active ? THEME.blue : "#e5e7eb"};
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${THEME.blue};
    color: ${props => props.$active ? "white" : THEME.blue};
  }
`;

const FeatureCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: stretch;

  @media(max-width: 900px) { 
    grid-template-columns: 1fr; 
  }
`;

const FeatureContentSide = styled.div`
  background: #f7f7fa;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 500px;
  border-radius: 12px;

  .feat-title {
    font-size: 32px;
    line-height: 1.1;
    margin-bottom: 20px;
    font-weight: 600;
    color: ${THEME.textMain};
  }
  .feat-desc {
    font-size: 16px;
    line-height: 1.7;
    color: #6B7280;
    margin-bottom: 40px;
  }
  @media(max-width: 768px) { padding: 30px; }
`;

const NavControlBox = styled.div`
  display: flex; 
  gap: 0; 
  margin-top: auto; 
`;

const NavButton = styled.button`
  width: 50px; 
  height: 50px; 
  border: 1px solid #E5E7EB; 
  background: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  transition: 0.2s;
  color: ${THEME.textMain};
  
  &:first-child { border-right: none; border-radius: 8px 0 0 8px; }
  &:last-child { border-radius: 0 8px 8px 0; }
  
  &:hover { 
    background: #f9fafb;
    color: ${THEME.blue}; 
  }
`;

const FeatureVisualSide = styled.div`
  background: ${THEME.gold};
  border-radius: 12px;
  height: 100%;
  min-height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
  
  .phone-mockup {
    width: 100%;
    max-width: 350px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.2);
    border-radius: 12px;
    overflow: hidden;
    background: #111;
    img { display: block; width: 100%; height: auto; }
  }

  .corner-label {
    position: absolute;
    bottom: 20px;
    right: 30px;
    color: rgba(255,255,255,0.9);
    font-size: 14px;
    font-weight: 500;
  }
`;

// --- BOTTOM ---
const FullWidthBanner = styled.div` width: 100%; height: 500px; border-radius: 12px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } `;
const BottomSection = styled.section` background: #FCFCFD; padding: 120px 0; border-top: 1px solid ${THEME.border}; `;
const CenteredHeading = styled.h2` text-align: center; font-size: 48px; font-weight: 600; margin-bottom: 80px; letter-spacing: -0.03em; `;
const Grid2Col = styled.div` display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid ${THEME.border}; border-left: 1px solid ${THEME.border}; @media(max-width: 768px) { grid-template-columns: 1fr; } `;
const GridItem = styled.div` padding: 48px; border-bottom: 1px solid ${THEME.border}; border-right: 1px solid ${THEME.border}; background: #FCFCFD; transition: background 0.3s; &:hover { background: #fff; } h4 { font-size: 20px; font-weight: 600; margin: 24px 0 16px; color: ${THEME.textMain}; } p { font-size: 16px; color: ${THEME.textSec}; line-height: 1.6; } `;
const IconBox = styled.div` color: ${THEME.blue}; svg { width: 32px; height: 32px; } `;

// --- FOOTER ---
const Footer = styled.footer` background: ${THEME.bgBody}; padding: 100px 0; `;
const FooterHeader = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; h2 { font-size: 42px; font-weight: 600; margin: 0; letter-spacing: -0.02em; } .see-all { display: flex; align-items: center; gap: 8px; background: ${THEME.blue}; color: white; padding: 14px 28px; border-radius: 6px; font-weight: 600; transition: background 0.2s; &:hover { background: ${THEME.blueHover}; } } `;
const ProjectsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 32px; @media(max-width: 768px){ grid-template-columns: 1fr; } `;
const ProjectCard = styled.div` background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); cursor: pointer; transition: transform 0.3s ease; &:hover { transform: translateY(-5px); } `;
const CardImage = styled.div` height: 300px; background: #eee; img { width: 100%; height: 100%; object-fit: cover; } `;
const CardContent = styled.div` padding: 32px; `;
const TagSmall = styled.span` background: #EEF2FF; color: ${THEME.blue}; font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 6px 10px; border-radius: 4px; display: inline-block; margin-bottom: 16px; `;
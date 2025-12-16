import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// --- Types ---
interface BlogPost {
  id: number;
  tag: string;
  title: string;
  date: string;
  image: string;
}

// --- Data: Blog Posts ---
const blogPosts: BlogPost[] = [
  {
    id: 1,
    tag: 'Travel',
    title: 'AI in hospitality: How to prepare your hospitality business',
    date: 'November 28, 2025',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    tag: 'eCommerce',
    title: 'Retail on cloud nine: A full guide to cloud modernization',
    date: 'November 26, 2025',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    tag: 'Construction',
    title: 'How to launch an online marketplace for selling building materials',
    date: 'November 24, 2025',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    tag: 'Travel',
    title: 'A complete guide to hotel mapping tools',
    date: 'November 21, 2025',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    tag: 'Healthcare',
    title: 'Telemedicine App Development: Features & Cost',
    date: 'November 18, 2025',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    tag: 'Fintech',
    title: 'The Future of Digital Banking: Trends to Watch',
    date: 'November 15, 2025',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    tag: 'eCommerce',
    title: 'Optimizing User Experience in Mobile Shopping Apps',
    date: 'November 12, 2025',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa0db79b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    tag: 'Real Estate',
    title: 'PropTech: How Technology is Changing Real Estate',
    date: 'November 10, 2025',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    tag: 'Travel',
    title: 'Sustainable Tourism: Tech Solutions for Green Travel',
    date: 'November 08, 2025',
    image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    tag: 'Education',
    title: 'EdTech Trends: Gamification in Learning',
    date: 'November 05, 2025',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// --- BRAND SVG COMPONENTS (Clean, No-Download, High Quality) ---

const BmwLogo = () => (
  <svg viewBox="0 0 50 50" width="100%" height="100%">
    <circle cx="25" cy="25" r="24" fill="#1d1d1b" />
    <circle cx="25" cy="25" r="23" fill="none" stroke="#fff" strokeWidth="0.5" />
    <path d="M25 25 L41 25 A16 16 0 0 1 25 41 Z" fill="#2E8BC5" />
    <path d="M25 25 L25 9 A16 16 0 0 1 41 25 Z" fill="#fff" />
    <path d="M25 25 L9 25 A16 16 0 0 1 25 9 Z" fill="#2E8BC5" />
    <path d="M25 25 L25 41 A16 16 0 0 1 9 25 Z" fill="#fff" />
    <text x="25" y="7" textAnchor="middle" fill="#fff" fontSize="5" fontFamily="Arial" fontWeight="bold">BMW</text>
  </svg>
);

const DiorLogo = () => (
  <svg viewBox="0 0 100 30" width="100%" height="100%">
    <text x="50" y="22" textAnchor="middle" fill="#000" fontSize="26" fontFamily="Times New Roman, serif">DIOR</text>
  </svg>
);

const HermesLogo = () => (
  <svg viewBox="0 0 120 40" width="100%" height="100%">
    <text x="60" y="25" textAnchor="middle" fill="#111" fontSize="22" fontFamily="Georgia, serif">HERMÈS</text>
    <text x="60" y="35" textAnchor="middle" fill="#111" fontSize="8" fontFamily="Arial" letterSpacing="2">PARIS</text>
  </svg>
);

const SainsburysLogo = () => (
  <svg viewBox="0 0 120 30" width="100%" height="100%">
    <text x="60" y="22" textAnchor="middle" fill="#ef8300" fontSize="20" fontFamily="Arial" fontWeight="bold">Sainsbury's</text>
  </svg>
);

// ✅ FIXED: Clean Netflix Path (No crossed lines)
const NetflixLogo = () => (
  <svg viewBox="0 0 140 38" width="100%" height="100%">
     <path fill="#E50914" d="M20 27h4.2V10l9.1 17h4.2V8.5h-4.1v15.3l-9-16.7H20v19.9zm20.6 0h13.4v-3.8h-9.2v-4h8.3v-3.7h-8.3V11.4h9.2V7.7H40.6v19.3zm16.9 0h4.2V11.6h5.9V7.7H57.5v3.9h6v15.4zm13.1 0h12.4v-3.8h-8.2v-4h7.5v-3.7h-7.5V11.4h8.2V7.7H70.6v19.3zm15.4 0h11.7v-3.8H90.2V7.7H86v19.3zm14.7 0h4.2V7.7h-4.2v19.3zm7.3 0h5l3.8-6.5 3.8 6.5h5l-6.2-10.2 5.9-9h-4.9l-3.5 6.2-3.4-6.2h-4.9l5.9 8.9-6.5 10.3z"/>
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 120 40" width="100%" height="100%">
     <g fill="#1DB954">
       <circle cx="25" cy="20" r="14" />
       <path d="M20 18 Q25 16 30 18 M19 22 Q25 20 31 22 M19 26 Q25 24 31 26" stroke="#fff" strokeWidth="2" fill="none" />
     </g>
     <text x="45" y="27" fill="#1DB954" fontSize="18" fontFamily="Arial" fontWeight="bold">Spotify</text>
  </svg>
);

const CocaColaLogo = () => (
  <svg viewBox="0 0 120 40" width="100%" height="100%">
    <text x="60" y="25" textAnchor="middle" fill="#F40009" fontSize="24" fontFamily="Brush Script MT, cursive" fontWeight="bold">Coca-Cola</text>
  </svg>
);

const GivenchyLogo = () => (
  <svg viewBox="0 0 100 50" width="100%" height="100%">
    <rect x="35" y="0" width="30" height="30" stroke="#000" strokeWidth="2" fill="none"/>
    <text x="50" y="20" textAnchor="middle" fill="#000" fontSize="16" fontFamily="Arial" fontWeight="bold">G</text>
    <text x="50" y="45" textAnchor="middle" fill="#000" fontSize="10" fontFamily="Arial" letterSpacing="2">GIVENCHY</text>
  </svg>
);

const SantanderLogo = () => (
  <svg viewBox="0 0 140 40" width="100%" height="100%">
    <path d="M25 20 Q30 10 35 20 Q30 30 25 20" fill="#EC0000" stroke="#EC0000" strokeWidth="15" />
    <text x="55" y="28" fill="#EC0000" fontSize="20" fontFamily="Arial" fontWeight="bold">Santander</text>
  </svg>
);

// --- Component Configuration ---
const topRowComponents = [
  { id: 'bmw', Comp: BmwLogo },
  { id: 'dior', Comp: DiorLogo },
  { id: 'hermes', Comp: HermesLogo },
  { id: 'sainsburys', Comp: SainsburysLogo },
  { id: 'netflix', Comp: NetflixLogo },
];

const bottomRowComponents = [
  { id: 'spotify', Comp: SpotifyLogo },
  { id: 'cocacola', Comp: CocaColaLogo },
  { id: 'givenchy', Comp: GivenchyLogo },
  { id: 'santander', Comp: SantanderLogo },
];

// --- Icons ---
const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DiagonalArrow = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', fontSize: '0.8em' }}>
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Main Component ---

const BlogSection = () => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <SectionWrapper>
      <HeaderContainer>
        <MainTitle>Want to know more?</MainTitle>
        <LinkTitle href="/blog">
          Check our blog <DiagonalArrow />
        </LinkTitle>
      </HeaderContainer>

      <SliderContainer>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl, nextEl }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1.1, slidesPerGroup: 1 },
            768: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
          style={{ paddingBottom: '20px' }}
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <Card>
                <ImageWrapper>
                  <img src={post.image} alt={post.title} />
                </ImageWrapper>
                <CardContent>
                  <TagBadge>{post.tag}</TagBadge>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDate>{post.date}</CardDate>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>

      <NavContainer>
        <NavButton ref={(node) => setPrevEl(node)}>
          <ArrowLeftIcon />
        </NavButton>
        <NavButton ref={(node) => setNextEl(node)}>
          <ArrowRightIcon />
        </NavButton>
      </NavContainer>

      {/* --- INDUSTRY LEADERS --- */}
      <LeadersSection>
        <LeadersTitle>
          Industry leaders our <br /> clients work with
        </LeadersTitle>
        
        <LogosGridWrapper>
          <LogosRow>
            {topRowComponents.map(({ id, Comp }) => (
              <LogoBox key={id}>
                <LogoInner>
                  <Comp />
                </LogoInner>
              </LogoBox>
            ))}
          </LogosRow>
          <LogosRow>
            {bottomRowComponents.map(({ id, Comp }) => (
              <LogoBox key={id}>
                <LogoInner>
                  <Comp />
                </LogoInner>
              </LogoBox>
            ))}
          </LogosRow>
        </LogosGridWrapper>
      </LeadersSection>

    </SectionWrapper>
  );
};

export default BlogSection;

// --- Styles ---

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: #f9f9fa; 
  font-family: 'Inter', sans-serif; 
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 50px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: #111;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LinkTitle = styled.a`
  font-size: 3rem;
  font-weight: 500;
  color: #28a665;
  text-decoration: none;
  border-bottom: 3px solid #28a665;
  display: inline-flex;
  align-items: center;
  line-height: 1.2;
  transition: opacity 0.3s ease;
  margin-top: 10px;

  &:hover { opacity: 0.8; }

  @media (max-width: 768px) {
    font-size: 2rem;
    border-bottom-width: 2px;
  }
`;

const SliderContainer = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
`;

const Card = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #eaeaea;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img { transform: scale(1.05); }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
`;

const TagBadge = styled.span`
  background-color: #eef2fa;
  color: #28a665;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  margin-bottom: 16px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  line-height: 1.4;
  color: #111;
  margin: 0 0 20px 0;
  font-weight: 400;
  flex-grow: 1; 
`;

const CardDate = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: auto;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #111;
  transition: all 0.2s ease;

  &:hover {
    border-color: #28a665;
    color: #28a665;
    background: #fff;
  }
  
  &:disabled { opacity: 0.3; }
`;

/* --- STYLES FOR INDUSTRY LEADERS --- */

const LeadersSection = styled.div`
  margin-top: 120px;
  text-align: center;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

const LeadersTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 60px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }
`;

const LogosGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
`;

const LogosRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #e0e0e0;
`;

const LogoBox = styled.div`
  flex: 0 0 20%; 
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 20px;
  transition: background-color 0.3s;

  &:last-child { border-right: none; }
  &:hover { background-color: #fff; }

  /* 2nd Row (4 items) = 25% width */
  ${LogosRow}:last-child & { flex: 0 0 25%; }

  @media (max-width: 900px) {
    flex: 0 0 33.33% !important; 
    border-right: 1px solid #e0e0e0;
    &:nth-child(3n) { border-right: none; }
  }

  @media (max-width: 600px) {
    flex: 0 0 50% !important;
    height: 100px;
    &:nth-child(2n) { border-right: none; }
  }
`;

const LogoInner = styled.div`
  width: 100%;
  max-width: 120px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`;
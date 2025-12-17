import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTED FOR NAVIGATION

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
    // ✅ Updated to match the specific Detail Page we created
    tag: 'Construction',
    title: 'How to implement construction time tracking software',
    date: 'November 28, 2025',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
];

// --- BRAND SVG COMPONENTS ---
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
  const navigate = useNavigate(); // ✅ Hook for navigation

  // ✅ Helper: Convert Title to Slug & Navigate
  const handleCardClick = (title: string) => {
    // 1. Convert to lowercase
    // 2. Remove special chars
    // 3. Replace spaces with dashes
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Navigate to the specific blog page
    navigate(`/blog/${slug}`);
  };

  return (
    <SectionWrapper>
      <HeaderContainer>
        <MainTitle>Want to know more?</MainTitle>
        {/* Clickable Header Link */}
        <LinkTitle onClick={() => navigate('/blog')} style={{ cursor: 'pointer' }}>
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
              {/* ✅ Added onClick event to the Card */}
              <Card onClick={() => handleCardClick(post.title)}>
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
  padding: 100px 20px;
  background-color: #f9f9fa; 
  font-family: 'Inter', sans-serif; 
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 60px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
`;

const MainTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 500;
  color: #111;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LinkTitle = styled.span`
  font-size: 3.5rem;
  font-weight: 500;
  color: #28a665;
  border-bottom: 3px solid #28a665;
  display: inline-flex;
  align-items: center;
  line-height: 1.1;
  transition: opacity 0.3s ease;
  margin-top: 10px;
  letter-spacing: -1px;

  &:hover { opacity: 0.8; }

  @media (max-width: 768px) {
    font-size: 2.5rem;
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
  min-height: 440px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;

  /* Replicating the clean hover lift of Coaxsoft */
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    transform: translateY(-8px);
    border-color: transparent;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${Card}:hover & img { transform: scale(1.08); }
`;

const CardContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
`;

const TagBadge = styled.span`
  background-color: #e6f7ef; /* Very light green bg */
  color: #28a665;
  font-size: 11px;
  font-weight: 700;
  padding: 8px 12px;
  margin-bottom: 20px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-radius: 4px;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  line-height: 1.4;
  color: #111;
  margin: 0 0 20px 0;
  font-weight: 500;
  flex-grow: 1; 
  transition: color 0.2s;

  ${Card}:hover & {
    color: #28a665;
  }
`;

const CardDate = styled.div`
  font-size: 14px;
  color: #999;
  font-weight: 500;
  margin-top: auto;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border: 1px solid #e0e0e0;
  background: transparent;
  border-radius: 50%; /* Rounded circles like Coaxsoft */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #111;
  transition: all 0.3s ease;

  &:hover {
    border-color: #28a665;
    color: #fff;
    background: #28a665;
  }
  
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

/* --- STYLES FOR INDUSTRY LEADERS --- */

const LeadersSection = styled.div`
  margin-top: 140px;
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const LeadersTitle = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 80px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 50px;
  }
`;

const LogosGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0; /* Complete the grid border */
`;

const LogosRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const LogoBox = styled.div`
  flex: 0 0 20%; 
  height: 160px; /* Taller boxes */
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 30px;
  background: #f9f9fa;
  transition: background-color 0.3s;

  &:hover { background-color: #fff; }

  /* 2nd Row (4 items) = 25% width */
  ${LogosRow}:last-child & { flex: 0 0 25%; }

  @media (max-width: 900px) {
    flex: 0 0 33.33% !important; 
  }

  @media (max-width: 600px) {
    flex: 0 0 50% !important;
    height: 120px;
  }
`;

const LogoInner = styled.div`
  width: 100%;
  max-width: 140px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7; /* Slight fade by default */
  transition: opacity 0.3s;
  
  ${LogoBox}:hover & { opacity: 1; }

  svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    filter: grayscale(100%);
    transition: filter 0.3s;
  }

  ${LogoBox}:hover & svg { filter: grayscale(0%); }
`;
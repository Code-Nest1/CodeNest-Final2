import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

const BlogIndex = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const wpUrl = 'https://blogs.codenest.us.com/wp-json/wp/v2/posts?_embed';
    axios.get(wpUrl)
      .then(res => {
        setPosts(res.data);
        setFilteredPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  // --- Real-time Search & Filter Logic ---
  useEffect(() => {
    let result = posts;

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(post => 
        post._embedded?.['wp:term']?.[0]?.some(cat => cat.name === activeCategory)
      );
    }

    // Filter by Search Query
    if (searchQuery) {
      result = result.filter(post => 
        post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.rendered.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(result);
  }, [searchQuery, activeCategory, posts]);

  const categories = ["All", "Fintech", "Education", "Retail", "Logistics", "Personal protection", "Prop Tech", "Mortgages", "IoT"];

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <PageTitle>Blog</PageTitle>
        </HeaderSection>

        {/* --- Modern Coax Filter Bar --- */}
        <FilterContainer>
          <div className="left-side">
            <Label>Latest news</Label>
            <SearchBox>
               <SearchIcon viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></SearchIcon>
               <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               />
            </SearchBox>
          </div>
          
          <CategoryScroll>
            {categories.map(cat => (
              <CategoryBtn 
                key={cat} 
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </CategoryBtn>
            ))}
          </CategoryScroll>
        </FilterContainer>

        {/* --- Article List --- */}
        {loading ? (
          <SkeletonLoader>Loading latest stories...</SkeletonLoader>
        ) : (
          <Grid>
            {filteredPosts.length > 0 ? filteredPosts.map((post) => {
              const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400';
              const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
              
              return (
                <BlogCard key={post.id} onClick={() => navigate(`/blog/${post.slug}`)}>
                  <VerticalCategory>{category}</VerticalCategory>
                  <CardImage>
                    <img src={imageUrl} alt={post.title.rendered} />
                  </CardImage>
                  <CardDetails>
                    <PostTitle dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <PostExcerpt dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 150) + '...' }} />
                  </CardDetails>
                </BlogCard>
              );
            }) : (
              <NoResults>No articles found for "{searchQuery}"</NoResults>
            )}
          </Grid>
        )}

        {filteredPosts.length > 0 && <LoadMore>Next —›</LoadMore>}
      </ContentWrapper>
    </PageContainer>
  );
};

export default BlogIndex;

// --- STYLED COMPONENTS (The Coax Design System) ---

const PageContainer = styled.div`
  background-color: #fcfcfc;
  color: #1a1a1a;
  min-height: 100vh;
  padding: 100px 0;
  font-family: 'Inter', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
`;

const HeaderSection = styled.div`
  margin-bottom: 80px;
`;

const PageTitle = styled.h1`
  font-size: 110px;
  font-weight: 500;
  letter-spacing: -4px;
  margin: 0;
  line-height: 1;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 60px;
  }
`;

const FilterContainer = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;

  .left-side {
      display: flex;
      align-items: center;
      gap: 30px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const Label = styled.span`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  input {
    border: none;
    padding: 5px 5px 5px 30px;
    font-size: 16px;
    outline: none;
    background: transparent;
    &::placeholder { color: #aaa; }
  }
`;

const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #666;
  position: absolute;
  left: 0;
`;

const CategoryScroll = styled.div`
  display: flex;
  gap: 25px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CategoryBtn = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: ${props => props.isActive ? '700' : '400'};
  color: ${props => props.isActive ? '#2547d6' : '#555'};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s;
  &:hover { color: #2547d6; }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const VerticalCategory = styled.div`
  position: absolute;
  left: -120px;
  top: 10px;
  width: 100px;
  text-align: right;
  font-size: 12px;
  font-weight: 700;
  color: #2547d6;
  text-transform: uppercase;

  @media (max-width: 1150px) {
    position: static;
    text-align: left;
    margin-bottom: 10px;
    width: auto;
  }
`;

const BlogCard = styled.article`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 50px;
  position: relative;
  cursor: pointer;
  
  &:hover {
      img { transform: scale(1.05); }
      h2 { color: #2547d6; }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CardImage = styled.div`
  height: 260px;
  background: #f0f0f0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostTitle = styled.h2`
  font-size: 42px;
  font-weight: 500;
  margin: 0 0 20px 0;
  line-height: 1.1;
  transition: color 0.3s;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PostExcerpt = styled.div`
  font-size: 17px;
  color: #666;
  line-height: 1.6;
  p { margin: 0; }
`;

const LoadMore = styled.button`
  display: block;
  margin: 80px auto 0;
  padding: 12px 30px;
  background: #2547d6;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover { opacity: 0.9; }
`;

const SkeletonLoader = styled.div`padding: 100px; text-align: center; color: #888;`;
const NoResults = styled.div`padding: 60px; text-align: center; font-size: 20px; color: #666;`;
import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  padding: 160px 0;
  background: #248253;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden; /* CRITICAL: Prevents horizontal scroll from transforms */

  @media (max-width: 1024px) {
    padding: 100px 0;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const MainHeading = styled.h2`
  color: #fff;
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  max-width: 900px;
  margin-bottom: 60px;

  /* Responsive Font Sizes */
  @media (max-width: 1024px) {
    font-size: 56px;
  }

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 1320px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 70px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr; /* Stack left text and grid vertically */
    gap: 40px;
    padding: 0 20px;
  }
`;

const LeftText = styled.div`
  text-align: left;

  @media (max-width: 1200px) {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SubText = styled.p`
  color: white;
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.7;
  max-width: 340px;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 45px;
  position: relative;

  @media (max-width: 1100px) {
    gap: 30px;
  }

  /* Single column stack for tablet and mobile */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 55px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  transition: 0.3s ease;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #ffff url("/images/bg-star.svg");
    background-size: cover;
  }

  /* Reduced padding on small screens so text fits */
  @media (max-width: 768px) {
    padding: 40px 30px;
    margin-bottom: 0 !important; /* Reset overlap on mobile */
  }
`;

/* ⭐ Card #2: Left-aligned for stagger on desktop */
const Card02 = styled(Card)`
  transform: translateX(-35px);

  @media (max-width: 1100px) {
    transform: none; /* Reset transform so card stays inside screen */
  }
`;

/* PERFECT LEFT SHIFT FOR BOTTOM CARDS (ONLY FOR LARGE SCREENS) */
const Card03 = styled(Card)`
  grid-column: 1 / 2;
  transform: translateX(-402px);
  margin-bottom: -35px; /* Added desktop overlap back */

  @media (max-width: 1200px) {
    grid-column: auto;
    transform: none;
    margin-bottom: 0;
  }
`;

const Card04 = styled(Card)`
  grid-column: 2 / 3;
  transform: translateX(-438px);
  margin-bottom: -35px;

  @media (max-width: 1200px) {
    grid-column: auto;
    transform: none;
    margin-bottom: 0;
  }
`;

const Number = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #09353d;
  opacity: 0.85;
`;

const Title = styled.h4`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #09353d;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Desc = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: #0f0f0f;
  opacity: 0.85;
`;

export default function Challenges() {
  return (
    <Wrapper>
      <MainHeading>
        Simplifying your toughest tech challenges
      </MainHeading>

      <ContentArea>
        {/* LEFT SECTION */}
        <LeftText>
          <SubText>
            We tackle complexities that exceed standard product development
            agency capabilities. Whether you need modernizing solutions or scaling
            your team with expert technical consulting, we help you accelerate
            growth and drive positive change.
          </SubText>
        </LeftText>

        {/* RIGHT GRID */}
        <Grid>
          {/* CARD 1 — NORMAL */}
          <Card>
            <Number>/ 01</Number>
            <Title>Digital transformation</Title>
            <Desc>
              Enhance your business with smart, scalable, and modern product
              solutions that fuel innovation and operational efficiency.
            </Desc>
          </Card>

          {/* CARD 2 — CUSTOMIZED */}
          <Card02>
            <Number>/ 02</Number>
            <Title>Technology consulting</Title>
            <Desc>
              Gain expert advice to align technology decisions with your long-term
              strategy, optimizing performance and reducing risk.
            </Desc>
          </Card02>

          {/* SHIFTED CARDS */}
          <Card03>
            <Number>/ 03</Number>
            <Title>Software modernization</Title>
            <Desc>
              Modernize legacy systems with secure, scalable, and future-ready
              architectures to extend the life of your applications.
            </Desc>
          </Card03>

          <Card04>
            <Number>/ 04</Number>
            <Title>Team extension</Title>
            <Desc>
              Augment your team with vetted software engineers who seamlessly
              integrate into your workflow and accelerate delivery.
            </Desc>
          </Card04>
        </Grid>
      </ContentArea>
    </Wrapper>
  );
}
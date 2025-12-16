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
`;

const MainHeading = styled.h2`
  color: #fff;
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  max-width: 900px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 1320px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 70px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const LeftText = styled.div`
  text-align: left;

  @media (max-width: 1100px) {
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const SubText = styled.p`
  color: white;
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.7;
  max-width: 340px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 45px;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 55px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  transition: 0.3s ease;
  text-align: left;
  cursor: pointer;
  margin-bottom: -35px;

  &:hover {
    background: #ffff url("/images/bg-star.svg");
    background-size: cover;
    opacity: 10;
  }
`;

/* ⭐ NEW — Custom styling for Card #2 */
const Card02 = styled(Card)`
  /* CHANGE POSITION OF CARD #2 HERE */
  transform: translateX(-35px);

  @media (max-width: 1100px) {
    transform: none;
  }
`;

/* PERFECT LEFT SHIFT FOR BOTTOM CARDS */
const Card03 = styled(Card)`
  grid-column: 1 / 2;
  transform: translateX(-402px);

  @media (max-width: 1100px) {
    transform: none;
  }
`;

const Card04 = styled(Card)`
  grid-column: 2 / 3;
  transform: translateX(-438px);

  @media (max-width: 1100px) {
    transform: none;
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

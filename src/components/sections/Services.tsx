import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/global";

const servicesData = [
  {
    title: "Web Design & Development",
    image: "/images/web-dev.png",
    items: [
      { 
        name: "WordPress", 
        desc: "Custom themes and plugins tailored to your brand, offering an easy-to-manage CMS with powerful flexibility." 
      },
      { 
        name: "Shopify", 
        desc: "High-converting e-commerce stores with seamless payment integration, inventory management, and stunning product displays." 
      },
      { 
        name: "Custom Web Applications", 
        desc: "We build scalable, high-performance web apps using modern technologies like React.js, Next.js, and Node.js for unique business needs." 
      },
    ],
  },
  {
    title: "App Development",
    image: "/images/app-dev.png",
    items: [
      { 
        name: "iOS Apps", 
        desc: "Native iOS applications built with Swift, ensuring top-tier performance and a seamless user experience within the Apple ecosystem." 
      },
      { 
        name: "Android Apps", 
        desc: "Robust Android solutions designed to reach a massive audience, optimized for speed and compatibility across all devices." 
      },
      {
        name: "Cross-Platform (Flutter/React Native)",
        desc: "Cost-effective hybrid apps that work perfectly on both iOS and Android from a single codebase."
      }
    ],
  },
  {
    title: "Digital Marketing",
    image: "/images/digital-marketing.png",
    items: [
      { 
        name: "SEO (Search Engine Optimization)", 
        desc: "Data-driven strategies to improve your Google ranking, drive organic traffic, and increase online visibility." 
      },
      { 
        name: "Google Ads (PPC)", 
        desc: "Targeted advertising campaigns that generate immediate leads and maximize your return on ad spend." 
      },
      { 
        name: "Social Media Campaigns", 
        desc: "Engaging content strategies for Instagram, LinkedIn, and Facebook to build community and brand loyalty." 
      },
    ],
  },
  {
    title: "Managed Services & Virtual Assistance",
    image: "/images/managed-services.png",
    items: [
      { 
        name: "Website Maintenance", 
        desc: "Regular security patches, plugin updates, and backups to ensure your digital assets are always safe and running smoothly." 
      },
      { 
        name: "Performance Optimization", 
        desc: "Speed enhancements and core web vitals improvements to ensure fast load times and better user retention." 
      },
    ],
  },
  {
    title: "Creative Services",
    image: "/images/creative-design.png",
    items: [
      { 
        name: "Branding & Identity", 
        desc: "Logo design, color palettes, and brand guidelines that tell your story and make a lasting impression." 
      },
      { 
        name: "Graphic Design", 
        desc: "Marketing materials, social media assets, and UI/UX design that visually communicate your message effectively." 
      },
    ],
  },
];

const ServicesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Wrapper>
      <Left>
        <Title>
          Digital Solutions <br /> to Scale Your Business
        </Title>
        <Subtitle>
          Whether you need a website that converts, an app that engages, or marketing that grows revenue — Code Nest delivers.
        </Subtitle>
      </Left>

      <Right>
        {servicesData.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <Accordion key={index}>
              <AccordionHeader onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span className={isOpen ? "open" : ""}>{isOpen ? "−" : "+"}</span>
                <h3>{section.title}</h3>
              </AccordionHeader>

              <AccordionBody open={isOpen}>
                <BodyInner>
                  <BodyLeft>
                    {section.items.map((item, i) => (
                      <div key={i} className="item">
                        <h4>{item.name}</h4>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </BodyLeft>

                  <BodyRight>
                    <ServiceImage 
                      src={section.image} 
                      alt={section.title} 
                      onError={(e) => {
                        // Fallback in case image isn't found yet
                        e.currentTarget.src = "https://placehold.co/400x400/e0f2f1/004d40?text=Image+Missing"; 
                      }}
                    />
                  </BodyRight>
                </BodyInner>
              </AccordionBody>
            </Accordion>
          );
        })}
      </Right>
    </Wrapper>
  );
};

export default ServicesPage;

// ------------------- STYLES -------------------

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 40% 60%;
  padding: 80px 5%;
  background: #feffff;
  min-height: 100vh;
  gap: 60px; /* Increased gap slightly for better spacing */
  align-items: start;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: sticky; /* Keeps the title visible while scrolling accordion */
  top: 100px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${COLORS.darkGreen};
  margin-bottom: 25px;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${COLORS.grey};
  max-width: 90%;
  line-height: 1.6;
`;

const Right = styled.div`
  border-left: 2px solid ${COLORS.lightGreen};
  padding-left: 50px;
`;

const Accordion = styled.div`
  margin-bottom: 30px;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  user-select: none;

  span {
    font-size: 28px;
    color: ${COLORS.lightGreen};
    transition: transform 0.3s ease;
    display: block;
    line-height: 1;
  }

  span.open {
    transform: rotate(180deg);
  }

  h3 {
    color: ${COLORS.darkGreen};
    font-size: 24px;
    font-weight: 700;
  }
`;

/* SMOOTH ACCORDION ANIMATION */
const AccordionBody: any = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? "800px" : "0px")}; /* Increased max-height for content */
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out;
`;

const BodyInner = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  gap: 20px;
`;

const BodyLeft = styled.div`
  .item {
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      color: ${COLORS.darkGreen};
      font-size: 19px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    p {
      color: ${COLORS.grey};
      font-size: 15px;
      line-height: 1.5;
    }
  }
`;

const BodyRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligns image to top, change to 'center' if you prefer */
  padding-top: 10px;
`;

const ServiceImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;
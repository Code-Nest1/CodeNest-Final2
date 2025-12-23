import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
} from "./styles";

const ContentBlock = ({
  icon,
  title,
  content,
  section,
  button,
  t,
  id,
  direction,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  return (
    <ContentSection>
      <Fade direction={direction === "left" ? "left" : "right"} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          {/* Main Icon Col */}
          <Col lg={11} md={11} sm={24} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          
          {/* Text Content Col */}
          <Col lg={11} md={11} sm={24} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {direction === "right" ? (
                <ButtonWrapper>
                  {Array.isArray(button) &&
                    button.map(
                      (item: { color?: string; title: string }, id: number) => (
                        <Button
                          key={id}
                          color={item.color}
                          onClick={() => scrollTo("about")}
                        >
                          {t(item.title)}
                        </Button>
                      )
                    )}
                </ButtonWrapper>
              ) : (
                <ServiceWrapper>
                  <Row justify="space-between">
                    {Array.isArray(section) &&
                      section.map(
                        (item: { title: string; content: string; icon: string }, id: number) => (
                          /* FIXED: On small phones, services take 24 spans (100%), on tablets/desktop they take 11 spans (~50%) */
                          <Col key={id} lg={11} md={11} sm={11} xs={24} style={{ marginBottom: "2rem" }}>
                            <SvgIcon src={item.icon} width="60px" height="60px" />
                            <MinTitle>{t(item.title)}</MinTitle>
                            <MinPara>{t(item.content)}</MinPara>
                          </Col>
                        )
                      )}
                  </Row>
                </ServiceWrapper>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default withTranslation()(ContentBlock);
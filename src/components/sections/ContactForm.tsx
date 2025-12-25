"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// --- Configuration & Colors ---
const COAX_BLUE = "#28a665";
const TEXT_DARK = "#111111";
const TEXT_GREY = "#4b5563";
const TEXT_LIGHT_GREY = "#6b7280";
const BG_LEFT = "#f7f7fa";
const BG_RIGHT = "#e8e8ed";
const BORDER_COLOR = "#d1d5db";

// --- Icons (Same as before) ---
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}>
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
  </svg>
);
const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8 }}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const SendPlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 10 }}>
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" stroke="none"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<'contact' | 'estimation'>('estimation');
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    agreeFuture: false,
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBudgetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, budget: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in First Name, Email, and Message.");
      return;
    }
    setIsSending(true);
    
    // --- Simulation for Demo ---
    setTimeout(() => {
        alert("Message sent successfully!");
        setIsSending(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "", budget: "", agreeFuture: false, agreeTerms: false });
    }, 1500);

    /* 
    // Enable this when real keys are ready
    const templateParams = { ...formData, budget: formData.budget || "Not specified", agreeFuture: formData.agreeFuture ? "Yes" : "No", agreeTerms: formData.agreeTerms ? "Yes" : "No" };
    emailjs.send("service_id", "template_id", templateParams, "public_key")
    .then(() => { ... })
    */
  };

  return (
    <SectionWrapper id="contact-section">
      <MainContainer
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* ================= LEFT SIDE (Form) ================= */}
        <LeftPanel>
          <TabsContainer>
            <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>
              <ChatIcon /> Contact Us
            </TabButton>
            <TabButton active={activeTab === 'estimation'} onClick={() => setActiveTab('estimation')}>
              <PenIcon /> Request Estimation
            </TabButton>
          </TabsContainer>

          <AnimatePresence mode="wait">
            {activeTab === 'estimation' ? (
              <motion.div
                key="estimation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <IntroText>
                  Tell me about your industry, your idea, and expectations. Your input helps me provide an accurate project estimation.
                </IntroText>
                <SmallLabel>Tell me more about your project</SmallLabel>
                <FullWidthField>
                  <StyledTextArea name="message" placeholder="Enter your request..." value={formData.message} onChange={handleChange} />
                </FullWidthField>
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                 <HeaderTitle>How can I help you?</HeaderTitle>
                 <SubText>Describe your request and tell me about your project idea.</SubText>
                 <FullWidthField>
                  <StyledTextArea name="message" placeholder="Enter your request..." value={formData.message} onChange={handleChange} />
                </FullWidthField>
              </motion.div>
            )}
          </AnimatePresence>

          <Form>
            <SectionLabel>Contact details</SectionLabel>
            <Row>
              <FieldGroup>
                <Label>First Name</Label>
                <StyledInput name="firstName" placeholder="Jane" value={formData.firstName} onChange={handleChange} />
              </FieldGroup>
              <FieldGroup>
                <Label>Last Name</Label>
                <StyledInput name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
              </FieldGroup>
            </Row>

            <Row>
              <FieldGroup>
                <Label>Email</Label>
                <StyledInput name="email" type="email" placeholder="janedoe@mail.com" value={formData.email} onChange={handleChange} />
              </FieldGroup>
              <FieldGroup>
                <Label>Phone (Optional)</Label>
                <StyledInput name="phone" placeholder="+1 423 23 76" value={formData.phone} onChange={handleChange} />
              </FieldGroup>
            </Row>

            <AnimatePresence>
            {activeTab === 'estimation' && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <SectionLabel>Budget</SectionLabel>
<BudgetGrid>
  <RadioOption 
    label="$1k - $3k" 
    name="budget" 
    value="1-3" 
    checked={formData.budget === "1-3"} 
    onChange={handleBudgetChange} 
  />
  <RadioOption 
    label="$3k - $5k" 
    name="budget" 
    value="3-5" 
    checked={formData.budget === "3-5"} 
    onChange={handleBudgetChange} 
  />
  <RadioOption 
    label="$5k - $10k" 
    name="budget" 
    value="5-10" 
    checked={formData.budget === "5-10"} 
    onChange={handleBudgetChange} 
  />
  <RadioOption 
    label="> $20k" 
    name="budget" 
    value="20+" 
    checked={formData.budget === "20+"} 
    onChange={handleBudgetChange} 
  />
</BudgetGrid>
              </motion.div>
            )}
            </AnimatePresence>

            <CheckboxGroup>
              <CheckboxLabel>
                <HiddenCheckbox name="agreeFuture" checked={formData.agreeFuture} onChange={handleChange} />
                <StyledCheckbox checked={formData.agreeFuture}>{formData.agreeFuture && <CheckIcon />}</StyledCheckbox>
                <span>Allow CODE NEST to contact me via email.</span>
              </CheckboxLabel>

              <CheckboxLabel>
                <HiddenCheckbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                <StyledCheckbox checked={formData.agreeTerms}>{formData.agreeTerms && <CheckIcon />}</StyledCheckbox>
                <span>I accept the <a href="#">Terms & Privacy Policy</a></span>
              </CheckboxLabel>
            </CheckboxGroup>

            <SubmitButton 
              whileHover={{ scale: isSending ? 1 : 1.01 }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isSending}
            >
              {isSending ? "Sending..." : (activeTab === 'estimation' ? "Send Request" : "Send Message")} 
              {!isSending && <SendPlaneIcon />}
            </SubmitButton>
          </Form>
        </LeftPanel>

        {/* ================= RIGHT SIDE ================= */}
        <RightPanel>
          <RightTopCard>
            <InfoTitle>What I'll do next?</InfoTitle>
            <StepsList>
              <StepItem>
                <StepNumber>1</StepNumber>
                <StepText>Contact you within <BlueText>24 hours</BlueText></StepText>
              </StepItem>
              <StepItem>
                <StepNumber>2</StepNumber>
                <StepText>Clarify business objectives & requirements</StepText>
              </StepItem>
              <StepItem>
                <StepNumber>3</StepNumber>
                <StepText>Develop and accept a proposal</StepText>
              </StepItem>
              <StepItem>
                <StepNumber>4</StepNumber>
                <StepText>Start our partnership</StepText>
              </StepItem>
            </StepsList>
          </RightTopCard>

          <RightBottomCard>
            <StarBackground />
            <ProfileInfo>
              <ProfileName>Khrystyna Chebanenko</ProfileName>
              <ProfileRole>Client engagement manager</ProfileRole>
              
              {/* Wrapped email to prevent text overflow */}
              <EmailLink href="mailto:contact@codenest.us.com">
                contact@codenest.us.com
              </EmailLink>
              
              <PhoneInfo>
                <span><strong>US:</strong> +1 805 399 2436</span>
                {/* <span><strong>UA:</strong> +1 805 399 2436</span> */}
              </PhoneInfo>
            </ProfileInfo>
            
            <ProfileImageContainer>
               <img src="/images/Manager.png" alt="Manager" onError={(e) => { e.currentTarget.src='https://placehold.co/400x400/png?text=Profile'; }}/>
            </ProfileImageContainer>
          </RightBottomCard>
        </RightPanel>
      </MainContainer>
    </SectionWrapper>
  );
}

// --- Helper Component ---
const RadioOption = ({ label, name, value, checked, onChange }: any) => (
  <RadioLabel>
    <HiddenRadio name={name} value={value} checked={checked} onChange={() => onChange(value)} />
    <RadioCircle checked={checked} />
    <span>{label}</span>
  </RadioLabel>
);

// --- STYLES ---

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  overflow: hidden; /* Critical for mobile responsiveness with absolute images */
  
  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const MainContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  width: 100%;
  max-width: 1180px;
  min-height: 700px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.06);
  border-radius: 4px;
  overflow: hidden;

  /* Stack layouts nicely on Tablet/Mobile */
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    box-shadow: none; 
    border-radius: 0;
  }
`;

// --- LEFT PANEL STYLES ---

const LeftPanel = styled.div`
  padding: 45px 50px;
  background: ${BG_LEFT};
  
  /* Adaptive padding for tablet */
  @media (max-width: 960px) {
    padding: 30px;
  }
  
  /* Tighter padding for mobile phones */
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${props => props.active ? COAX_BLUE : "#fff"};
  color: ${props => props.active ? "#fff" : TEXT_DARK};
  transition: all 0.2s;
  
  /* Fix touch target and font size on mobile */
  @media (max-width: 480px) {
    font-size: 13px;
    padding: 12px 6px;
    white-space: nowrap;
    
    svg {
        width: 14px; height: 14px; margin-right: 5px;
    }
  }
`;

const IntroText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${TEXT_DARK};
  margin-bottom: 25px;
  @media (max-width: 480px) { font-size: 14px; }
`;

const HeaderTitle = styled.h2`
  font-size: 32px;
  color: ${TEXT_DARK};
  font-weight: 400;
  margin-bottom: 12px;
  
  @media (max-width: 480px) { font-size: 26px; }
`;

const SubText = styled.p`
  color: ${TEXT_GREY};
  font-size: 15px;
  margin-bottom: 25px;
  @media (max-width: 480px) { font-size: 14px; }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullWidthField = styled.div`
  margin-bottom: 20px;
`;

const SmallLabel = styled.label`
  font-size: 13px;
  color: ${TEXT_LIGHT_GREY};
  margin-bottom: 8px;
  display: block;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 14px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: ${TEXT_DARK};
  resize: none;
  transition: border-color 0.2s;
  
  &::placeholder { color: #d1d5db; }
  &:focus { outline: none; border-color: ${COAX_BLUE}; }
`;

const SectionLabel = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: ${TEXT_DARK};
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 15px;
  
  /* Stack fields earlier for better touch usage */
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 13px;
  color: ${TEXT_LIGHT_GREY};
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
  font-size: 14px;
  color: ${TEXT_DARK};
  transition: border-color 0.2s;
  
  &::placeholder { color: #d1d5db; }
  &:focus { outline: none; border-color: ${COAX_BLUE}; }
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 25px;
  
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: ${TEXT_GREY};
  gap: 10px;
  padding: 5px 0;
  
  &:hover span { color: ${TEXT_DARK}; }
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })` display: none; `;

const RadioCircle = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${props => props.checked ? COAX_BLUE : "#d1d5db"};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  flex-shrink: 0;
  
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COAX_BLUE};
    opacity: ${props => props.checked ? 1 : 0};
    transform: scale(${props => props.checked ? 1 : 0.5});
    transition: all 0.2s;
  }
`;

const CheckboxGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start; /* Aligns checkbox to top of text for multiline */
  cursor: pointer;
  font-size: 13px;
  color: ${TEXT_GREY};
  gap: 10px;
  line-height: 1.5;
  
  a { color: ${TEXT_DARK}; text-decoration: underline; }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })` display: none; `;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 1px solid ${props => props.checked ? COAX_BLUE : "#ccc"};
  background: ${props => props.checked ? COAX_BLUE : "transparent"};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px; /* Visual alignment with text */
`;

const SubmitButton = styled(motion.button)`
  background-color: ${COAX_BLUE};
  color: #fff;
  border: none;
  padding: 14px 30px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0, 69, 204, 0.2);
  transition: background 0.2s;

  &:disabled { opacity: 0.7; cursor: not-allowed; }

  @media (max-width: 480px) { width: 100%; /* Full width for easy tap on phones */ }
`;

// --- RIGHT PANEL STYLES (SPLIT CARDS) ---

const RightPanel = styled.div`
  background-color: ${BG_RIGHT}; 
  display: flex;
  flex-direction: column;
  position: relative;
  /* Clip-path modified for responsiveness: corner cut only exists on Desktop/Tablet if wider than mobile */
  @media (min-width: 961px) {
    clip-path: polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%);
  }
`;

// -- Top Card --
const RightTopCard = styled.div`
  padding: 60px 40px 40px 40px; 
  border-bottom: 2px solid #fff;
  flex: 1; 
  display: flex;
  flex-direction: column;
  
  @media (max-width: 960px) {
    padding: 40px 30px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 26px;
  color: ${TEXT_DARK};
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.5px;
  
  @media (max-width: 480px) { font-size: 22px; }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center; 
  gap: 24px;
  padding-top: 30px;
`;

const StepItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${COAX_BLUE};
  background: #fff;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 1px;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 15px;
  color: ${TEXT_GREY};
  margin: 0;
  line-height: 1.5;
  @media (max-width: 480px) { font-size: 14px; }
`;

const BlueText = styled.span` color: ${COAX_BLUE}; font-weight: 700; `;

// -- Bottom Card --
const RightBottomCard = styled.div`
  padding: 40px;
  flex: 0 0 auto; 
  height: 340px; 
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  overflow: hidden; 

  /* Allow height to adjust on mobile if content needs more space */
  @media (max-width: 960px) {
    padding: 30px;
    height: auto;
    min-height: 300px;
  }
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg-star.svg'); 
  background-repeat: no-repeat;
  background-position: center; 
  background-size: cover;
  z-index: 1;
  pointer-events: none;
`;

const ProfileInfo = styled.div`
  position: relative;
  z-index: 5; /* Text must be above image */
  margin-bottom: 20px;
  
  /* Create a slight backdrop gradient for text readability on mobile in case overlap happens */
  @media (max-width: 480px) {
    margin-bottom: 0;
  }
`;

const ProfileName = styled.h4`
  font-size: 18px;
  color: ${TEXT_DARK};
  margin: 0 0 5px 0;
  font-weight: 600;
`;

const ProfileRole = styled.p`
  font-size: 14px;
  color: ${TEXT_GREY};
  margin: 0 0 25px 0;
`;

const EmailLink = styled.a`
  display: inline-block;
  font-size: 20px;
  color: ${COAX_BLUE};
  text-decoration: none;
  margin-bottom: 8px;
  word-break: break-word; /* Prevents long emails from breaking mobile layout */
  
  &:hover { text-decoration: underline; }
  
  @media (max-width: 480px) { font-size: 18px; }
`;

const PhoneInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: ${TEXT_DARK};
  flex-wrap: wrap; /* Wraps phone numbers on very small screens */
  gap: 15px;

  strong {
    color: ${TEXT_GREY}; 
    font-weight: 600;
    margin-right: 4px;
  }
  
  @media (max-width: 1200px) {
     flex-direction: column; 
     gap: 6px; 
  }
  @media (max-width: 960px) {
      flex-direction: row; 
      gap: 15px; 
  }
  @media (max-width: 480px) {
      flex-direction: column;
      margin-top: 15px;
      /* Background ensure readability over image bottom edge */
      background: rgba(255,255,255,0.7); 
      backdrop-filter: blur(2px);
      padding: 8px;
      border-radius: 4px;
      width: fit-content;
  }
`;

const ProfileImageContainer = styled.div`
  width: 310px;
  height: 310px;
  position: absolute;
  bottom: 0;
  right: -67px; 
  z-index: 2;
  
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    object-position: center top; 
  }

  /* Responsive Positioning for Image */
  @media (max-width: 960px) {
      right: -20px; /* Bring image slightly in on tablet */
  }

  @media (max-width: 480px) {
      width: 180px; 
      height: 180px;
      right: -20px;
      bottom: 0;
      opacity: 0.9;
  }
`;
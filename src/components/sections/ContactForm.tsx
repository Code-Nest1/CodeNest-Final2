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

// --- Icons ---
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
    setFormData(prev => ({ ...prev, budget: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in First Name, Email, and Message.");
      return;
    }

    setIsSending(true);

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      budget: formData.budget || "Not specified",
      agreeFuture: formData.agreeFuture ? "Yes" : "No",
      agreeTerms: formData.agreeTerms ? "Yes" : "No",
    };

    emailjs.send(
      "service_v0bvgaj",      
      "template_9jp1jr8",     
      templateParams,
      "MNATOKAylaiM9uzxD"     
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("Message sent successfully!");
      setIsSending(false);
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", message: "", 
        budget: "", agreeFuture: false, agreeTerms: false,
      });
    }, (err) => {
      console.log('FAILED...', err);
      alert("Failed to send message. Please try again.");
      setIsSending(false);
    });
  };

  return (
    <SectionWrapper id="contact-section">
      <MainContainer
        layout // ✅ 1. Enables smooth height animation for the whole container
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* ================= LEFT SIDE ================= */}
        <LeftPanel>
          <TabsContainer>
            <TabButton 
              active={activeTab === 'contact'} 
              onClick={() => setActiveTab('contact')}
            >
              <ChatIcon /> Contact Us
            </TabButton>
            <TabButton 
              active={activeTab === 'estimation'} 
              onClick={() => setActiveTab('estimation')}
            >
              <PenIcon /> Request Estimation
            </TabButton>
          </TabsContainer>

          <AnimatePresence mode="wait">
            {activeTab === 'estimation' ? (
              <motion.div
                key="estimation"
                layout // ✅ Smooth layout transition
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <IntroText>
                  Tell me about your industry, your idea, your expectations, and any work that has already been completed. Your input will help me provide you with an accurate project estimation.
                </IntroText>
                
                <SmallLabel>Tell me more about your project</SmallLabel>
                <FullWidthField>
                  <StyledTextArea
                    name="message"
                    placeholder="Enter your request..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </FullWidthField>
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                layout // ✅ Smooth layout transition
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                 <HeaderTitle>How can I help you?</HeaderTitle>
                 <SubText>Describe your request and tell me about your project idea.</SubText>
                 <FullWidthField>
                  <StyledTextArea
                    name="message"
                    placeholder="Enter your request..."
                    value={formData.message}
                    onChange={handleChange}
                  />
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

            {/* Budget Section (Conditional) */}
            <AnimatePresence>
            {activeTab === 'estimation' && (
              <motion.div
                layout // ✅ Smooth expansion
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <SectionLabel>Budget</SectionLabel>
                <BudgetGrid>
                  <RadioOption label="$25k - $50k" name="budget" value="25-50" checked={formData.budget === "25-50"} onChange={handleBudgetChange} />
                  <RadioOption label="$50k - $100k" name="budget" value="50-100" checked={formData.budget === "50-100"} onChange={handleBudgetChange} />
                  <RadioOption label="$100k - $200k" name="budget" value="100-200" checked={formData.budget === "100-200"} onChange={handleBudgetChange} />
                  <RadioOption label="more than $200k" name="budget" value="200+" checked={formData.budget === "200+"} onChange={handleBudgetChange} />
                  <RadioOption label="don't know yet" name="budget" value="unknown" checked={formData.budget === "unknown"} onChange={handleBudgetChange} />
                </BudgetGrid>
              </motion.div>
            )}
            </AnimatePresence>

            <CheckboxGroup>
              <CheckboxLabel>
                <HiddenCheckbox name="agreeFuture" checked={formData.agreeFuture} onChange={handleChange} />
                <StyledCheckbox checked={formData.agreeFuture}>{formData.agreeFuture && <CheckIcon />}</StyledCheckbox>
                <span>CODE NEST can contact me over email with related information in the future</span>
              </CheckboxLabel>

              <CheckboxLabel>
                <HiddenCheckbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                <StyledCheckbox checked={formData.agreeTerms}>{formData.agreeTerms && <CheckIcon />}</StyledCheckbox>
                <span>I accept the <a href="#">Terms & Privacy Policy</a></span>
              </CheckboxLabel>
            </CheckboxGroup>

            <SubmitButton 
              whileHover={{ scale: isSending ? 1 : 1.02 }} 
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              onClick={handleSubmit}
              disabled={isSending}
              style={{ opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
            >
              {isSending ? "Sending..." : (activeTab === 'estimation' ? "Send Request" : "Send Message")} 
              {!isSending && <SendPlaneIcon />}
            </SubmitButton>
          </Form>
        </LeftPanel>

        {/* ================= RIGHT SIDE (2 SECTIONS) ================= */}
        <RightPanel>
          {/* Top Card: What I'll do next */}
          <RightTopCard>
            <InfoTitle>What I'll do next?</InfoTitle>
            <StepsList>
              <StepItem>
                <StepNumber>1</StepNumber>
                <StepText>Contact you within <BlueText>24 hours</BlueText></StepText>
              </StepItem>
              <StepItem>
                <StepNumber>2</StepNumber>
                <StepText>Clarify your expectations, business objectives, and project requirements</StepText>
              </StepItem>
              <StepItem>
                <StepNumber>3</StepNumber>
                <StepText>Develop and accept a proposal</StepText>
              </StepItem>
              <StepItem>
                <StepNumber>4</StepNumber>
                <StepText>After that, we can start our partnership</StepText>
              </StepItem>
            </StepsList>
          </RightTopCard>

          {/* Bottom Card: Profile */}
          <RightBottomCard>
            <StarBackground />
            
            <ProfileInfo>
              <ProfileName>Khrystyna Chebanenko</ProfileName>
              <ProfileRole>Client engagement manager</ProfileRole>
              
              <EmailLink href="mailto:contact@codenest.us.com">contact@codenest.us.com</EmailLink>
              
              <PhoneInfo>
                <span><strong>US:</strong> +1 805 399 2436</span>
                <span style={{marginLeft: 15}}><strong>UA:</strong> +1 805 399 2436</span>
              </PhoneInfo>
            </ProfileInfo>
            
            <ProfileImageContainer>
               <img src="/images/Manager.png" alt="Manager" />
            </ProfileImageContainer>
          </RightBottomCard>
        </RightPanel>
      </MainContainer>
    </SectionWrapper>
  );
}

// --- Helper Component for Radio ---
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
`;

const MainContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  width: 100%;
  max-width: 1180px;
  min-height: 700px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

// --- LEFT PANEL STYLES ---

const LeftPanel = styled.div`
  padding: 40px 50px;
  background: ${BG_LEFT};
  
  @media (max-width: 960px) {
    padding: 30px 20px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 4px;
  background: #fff;
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

  &:hover {
    background-color: ${props => props.active ? COAX_BLUE : "#fcfcfc"};
  }
`;

const IntroText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${TEXT_DARK};
  margin-bottom: 25px;
`;

const HeaderTitle = styled.h2`
  font-size: 32px;
  color: ${TEXT_DARK};
  font-weight: 400;
  margin-bottom: 12px;
`;

const SubText = styled.p`
  color: ${TEXT_GREY};
  font-size: 15px;
  margin-bottom: 25px;
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
  height: 90px;
  padding: 14px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: ${TEXT_DARK};
  resize: none;
  
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
  @media (max-width: 600px) { grid-template-columns: 1fr; }
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
  &::placeholder { color: #d1d5db; }
  &:focus { outline: none; border-color: ${COAX_BLUE}; }
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 12px;
  column-gap: 15px;
  margin-bottom: 25px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: ${TEXT_GREY};
  gap: 10px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })` display: none; `;

const RadioCircle = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${props => props.checked ? COAX_BLUE : "#d1d5db"};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  
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
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: ${TEXT_GREY};
  gap: 10px;
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
`;

const SubmitButton = styled(motion.button)`
  background-color: ${COAX_BLUE};
  color: #fff;
  border: none;
  padding: 12px 30px;
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
`;

// --- RIGHT PANEL STYLES (SPLIT CARDS) ---

const RightPanel = styled.div`
  background-color: ${BG_RIGHT}; 
  display: flex;
  flex-direction: column;
  position: relative;
  /* Cut corner effect on the Top Right */
  clip-path: polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%);
`;

// -- Top Card --
const RightTopCard = styled.div`
  padding: 60px 40px 40px 40px; 
  border-bottom: 2px solid #fff;
  
  /* Flex settings to grow */
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Title stays at the top */
`;

const InfoTitle = styled.h3`
  font-size: 26px;
  color: ${TEXT_DARK};
  margin-bottom: 0px; /* Removed bottom margin here, handled by StepsList */
  font-weight: 400;
  letter-spacing: -0.5px;
  flex-shrink: 0;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Takes up the remaining space inside the Top Card */
  justify-content: center; /* Centers the whole list block vertically in that space */
  gap: 24px; /* Increased gap to 24px for perfect spacing */
  padding-top: 20px;
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
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  margin-top: 2px;
`;

const StepText = styled.p`
  font-size: 14px;
  color: ${TEXT_GREY};
  margin: 0;
  line-height: 1.5;
`;

const BlueText = styled.span` color: ${COAX_BLUE}; font-weight: 700; `;

// -- Bottom Card --
const RightBottomCard = styled.div`
  padding: 40px;
  flex: 0 0 auto; 
  height: 340px; /* Fixed Height */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  overflow: hidden; 
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
  opacity: 1;
  pointer-events: none;
`;

const ProfileInfo = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
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
  display: block;
  font-size: 20px;
  color: ${COAX_BLUE};
  text-decoration: none;
  margin-bottom: 8px;
  &:hover { text-decoration: underline; }
`;

const PhoneInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: ${TEXT_DARK};
  
  strong {
    color: ${TEXT_GREY}; 
    font-weight: 600;
    margin-right: 4px;
  }
  
  @media (max-width: 1200px) { flex-direction: column; gap: 5px; }
`;

const ProfileImageContainer = styled.div`
  width: 310px;
  height: 310px;
  overflow: hidden;
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
`;
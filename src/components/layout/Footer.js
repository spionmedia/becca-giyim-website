import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: white;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Newsletter = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const NewsletterForm = styled.form`
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md} 0 0 ${props => props.theme.borderRadius.md};
  flex-grow: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: ${props => props.theme.borderRadius.md};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const NewsletterButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0;
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: ${props => props.theme.borderRadius.md};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: ${props => props.theme.spacing.lg} 0;
`;

const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const PaymentIcon = styled.img`
  height: 24px;
  opacity: 0.9;
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Newsletter form işleme
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>Becca Giyim</FooterTitle>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '1rem' }}>
              Kadın ve erkek koleksiyonlarında modern siluetler, sürdürülebilir materyaller ve zamansız tasarımlar.
            </p>
            <SocialIcons>
              <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FiFacebook />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FiInstagram />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FiTwitter />
              </SocialIcon>
              <SocialIcon href="https://youtube.com" target="_blank" aria-label="YouTube">
                <FiYoutube />
              </SocialIcon>
            </SocialIcons>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Hızlı Linkler</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/">Ana Sayfa</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/products">Ürünler</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/categories">Kategoriler</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/about">Hakkımızda</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/contact">İletişim</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Yardım</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/faq">Sıkça Sorulan Sorular</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/teslimat-ve-iade">Teslimat ve İade</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/size-guide">Beden Rehberi</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/gizlilik-politikasi">Gizlilik Politikası</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Bülten</FooterTitle>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '1rem' }}>
              Drop koleksiyonları, styling önerileri ve özel kampanyalara ilk siz erişin.
            </p>
            <Newsletter>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <NewsletterInput 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  required 
                />
                <NewsletterButton type="submit">Abone Ol</NewsletterButton>
              </NewsletterForm>
            </Newsletter>
          </FooterSection>
        </FooterGrid>
        
        <Divider />
        
        <BottomFooter>
          <Copyright>
            &copy; {new Date().getFullYear()} Becca Giyim. Tüm hakları saklıdır.
          </Copyright>
          <PaymentMethods>
            <PaymentIcon src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
            <PaymentIcon src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" />
            <PaymentIcon src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" />
            <PaymentIcon src="https://cdn-icons-png.flaticon.com/512/5968/5968299.png" alt="Apple Pay" />
          </PaymentMethods>
        </BottomFooter>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { motion } from 'framer-motion';

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
  grid-template-columns: repeat(3, 1fr);
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

const SocialIcon = styled(motion.a)`
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
              <SocialIcon
                href="https://www.instagram.com/beccagiyimm?igsh=d3o5cW82cjc5M21i"
                target="_blank"
                aria-label="Instagram"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiInstagram />
              </SocialIcon>
              <SocialIcon
                href="https://www.tiktok.com/@beccagiyimm?_r=1&_t=ZS-920ClMuUMwJ"
                target="_blank"
                aria-label="TikTok"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiTiktok />
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
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Yardım</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink to="/teslimat-ve-iade">Teslimat ve İade</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink to="/gizlilik-politikasi">Gizlilik Politikası</FooterLink>
              </FooterListItem>
            </FooterList>
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

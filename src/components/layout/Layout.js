import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.lg} 0;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Container
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;

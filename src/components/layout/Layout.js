import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 200px); /* Header ve footer'ı hesaba katarak */
  padding: ${props => props.theme.spacing.lg} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;

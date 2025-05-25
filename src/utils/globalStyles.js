import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Google Fonts import */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily.body};
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.fontFamily.heading};
    font-weight: ${props => props.theme.typography.fontWeight.semiBold};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: ${props => props.theme.typography.fontSize.xxxl};
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize.xxl};
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }

  h4 {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  /* Responsive typography */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;

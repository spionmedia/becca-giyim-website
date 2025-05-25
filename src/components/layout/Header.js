import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import Button from '../common/Button';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navigation = styled.nav`
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.background};
    flex-direction: column;
    padding: ${props => props.theme.spacing.xl};
    z-index: 200;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    margin-top: ${props => props.theme.spacing.xl};
  }
`;

const NavItem = styled.li`
  margin: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: ${props => props.theme.spacing.md} 0;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${props => props.active 
    ? props.theme.typography.fontWeight.semiBold 
    : props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}11;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    padding: ${props => props.theme.spacing.sm} 0;
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.25rem;
  padding: ${props => props.theme.spacing.xs};
  margin-left: ${props => props.theme.spacing.sm};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  font-size: 0.7rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const cartItemsCount = 0; // Bu değer sepet context'inden gelecek
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">TeeVogue</Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          <FiMenu />
        </MobileMenuButton>
        
        <Navigation isOpen={isMenuOpen}>
          {isMenuOpen && (
            <CloseButton onClick={closeMenu}>
              <FiX />
            </CloseButton>
          )}
          
          <NavList>
            <NavItem>
              <NavLink to="/" active={isActive('/')} onClick={closeMenu}>
                Ana Sayfa
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/products" active={isActive('/products')} onClick={closeMenu}>
                Ürünler
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/categories" active={isActive('/categories')} onClick={closeMenu}>
                Kategoriler
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about" active={isActive('/about')} onClick={closeMenu}>
                Hakkımızda
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
                İletişim
              </NavLink>
            </NavItem>
          </NavList>
        </Navigation>
        
        <Actions>
          <IconButton aria-label="Arama">
            <FiSearch />
          </IconButton>
          <IconButton aria-label="Favoriler">
            <FiHeart />
          </IconButton>
          <IconButton aria-label="Sepet">
            <FiShoppingCart />
            {cartItemsCount > 0 && <Badge>{cartItemsCount}</Badge>}
          </IconButton>
          <IconButton aria-label="Hesabım">
            <FiUser />
          </IconButton>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

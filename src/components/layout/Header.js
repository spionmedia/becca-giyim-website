import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt, FaBoxOpen, FaUserCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled(motion.header)`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const TopBar = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 5px 0;
  font-size: 12px;
  text-align: center;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-family: 'Playfair Display', serif;
`;

const Menu = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    gap: 20px;
  }
`;

const MenuItem = styled.li`
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CartCount = styled(motion.span)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  font-size: 12px;
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
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover .dropdown {
    display: block;
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 10px 0;
  z-index: 1001;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 0;
    left: 0;
    height: 10px;
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: ${props => props.theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  width: 100%;
  border: none;
  background: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  font-family: inherit;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cart } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Çıkış yapılamadı:', error);
    }
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <TopBar>
        750 TL ve Üzeri Kargo Bedava!
      </TopBar>
      <Nav>
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Logo to="/">BECCA</Logo>
        </motion.div>

        <Menu isOpen={isMenuOpen}>
          <MenuItem><Link to="/kadin">KADIN</Link></MenuItem>
          <MenuItem><Link to="/erkek">ERKEK</Link></MenuItem>
          <MenuItem><Link to="/products">TÜM ÜRÜNLER</Link></MenuItem>
        </Menu>

        <Icons>
          {user ? (
            <UserMenu>
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <FaUser />
              </motion.div>
              <Dropdown className="dropdown">
                <DropdownItem to="/account">
                  <FaUserCog /> Hesabım
                </DropdownItem>
                <DropdownItem to="/orders">
                  <FaBoxOpen /> Siparişlerim
                </DropdownItem>
                <LogoutButton onClick={handleSignOut}>
                  <FaSignOutAlt /> Çıkış Yap
                </LogoutButton>
              </Dropdown>
            </UserMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <IconLink to="/login"><FaUser /></IconLink>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <IconLink to="/cart">
              <FaShoppingCart />
              <AnimatePresence>
                {cart.length > 0 && (
                  <CartCount
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cart.length}
                  </CartCount>
                )}
              </AnimatePresence>
            </IconLink>
          </motion.div>
        </Icons>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

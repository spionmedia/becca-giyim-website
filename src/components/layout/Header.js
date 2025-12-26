import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt, FaBoxOpen, FaUserCog, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import categoryMeta from '../../constants/categoryMeta';

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
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  
  img {
    height: 40px;
    width: auto;
    border-radius: 4px;
  }
`;

const Menu = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    gap: 0;
    z-index: 1000;
  }
`;

const MenuItem = styled.li`
  position: relative;
  
  > a {
    text-decoration: none;
    color: ${props => props.theme.colors.text.primary};
    font-weight: 500;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 0;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CategoryMenuItem = styled.li`
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-bottom: 1px solid #eee;
    
    &:last-of-type {
      border-bottom: none;
    }
  }
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    font-size: 10px;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const CategoryDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  min-width: 220px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border-radius: 12px;
  padding: 8px 0;
  z-index: 1001;
  margin-top: 8px;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: static;
    transform: none;
    box-shadow: none;
    border-radius: 0;
    margin-top: 0;
    padding: 0;
    background: #f9f9f9;
    
    &::before {
      display: none;
    }
  }
`;

const CategoryDropdownHeader = styled(Link)`
  display: block;
  padding: 12px 20px;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid #eee;
  margin-bottom: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px 16px;
  }
`;

const CategoryDropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.colors.primary}10;
    color: ${props => props.theme.colors.primary};
    padding-left: 24px;
  }
  
  span {
    display: block;
    font-size: 12px;
    color: ${props => props.theme.colors.text.secondary};
    margin-top: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px 16px 10px 24px;
    
    &:hover {
      padding-left: 28px;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary};
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
  color: ${props => props.theme.colors.text.primary};

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
  color: ${props => props.theme.colors.text.primary};
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

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
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

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const closeDropdowns = () => {
    setOpenCategory(null);
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
          <Logo to="/" aria-label="Becca Giyim Ana Sayfa">
            <img src="/logo.jpg" alt="Becca Giyim Logo" />
            BECCA
          </Logo>
        </motion.div>

        <Menu $isOpen={isMenuOpen}>
          <MenuItem>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>ANA SAYFA</Link>
          </MenuItem>

          {/* Kadın Kategorisi */}
          <CategoryMenuItem
            onMouseEnter={() => window.innerWidth > 768 && setOpenCategory('kadin')}
            onMouseLeave={() => window.innerWidth > 768 && setOpenCategory(null)}
          >
            <CategoryButton
              $isOpen={openCategory === 'kadin'}
              onClick={() => toggleCategory('kadin')}
            >
              KADIN <FaChevronDown />
            </CategoryButton>

            <AnimatePresence>
              {openCategory === 'kadin' && (
                <CategoryDropdown
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CategoryDropdownHeader
                    to="/kadin"
                    onClick={() => { closeDropdowns(); setIsMenuOpen(false); }}
                  >
                    Tüm Kadın Ürünleri
                  </CategoryDropdownHeader>
                  {categoryMeta.kadin.subcategories.map((sub) => (
                    <CategoryDropdownItem
                      key={sub.slug}
                      to={`/kadin/${sub.slug}`}
                      onClick={() => { closeDropdowns(); setIsMenuOpen(false); }}
                    >
                      {sub.label}
                      <span>{sub.description}</span>
                    </CategoryDropdownItem>
                  ))}
                </CategoryDropdown>
              )}
            </AnimatePresence>
          </CategoryMenuItem>

          {/* Erkek Kategorisi */}
          <CategoryMenuItem
            onMouseEnter={() => window.innerWidth > 768 && setOpenCategory('erkek')}
            onMouseLeave={() => window.innerWidth > 768 && setOpenCategory(null)}
          >
            <CategoryButton
              $isOpen={openCategory === 'erkek'}
              onClick={() => toggleCategory('erkek')}
            >
              ERKEK <FaChevronDown />
            </CategoryButton>

            <AnimatePresence>
              {openCategory === 'erkek' && (
                <CategoryDropdown
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CategoryDropdownHeader
                    to="/erkek"
                    onClick={() => { closeDropdowns(); setIsMenuOpen(false); }}
                  >
                    Tüm Erkek Ürünleri
                  </CategoryDropdownHeader>
                  {categoryMeta.erkek.subcategories.map((sub) => (
                    <CategoryDropdownItem
                      key={sub.slug}
                      to={`/erkek/${sub.slug}`}
                      onClick={() => { closeDropdowns(); setIsMenuOpen(false); }}
                    >
                      {sub.label}
                      <span>{sub.description}</span>
                    </CategoryDropdownItem>
                  ))}
                </CategoryDropdown>
              )}
            </AnimatePresence>
          </CategoryMenuItem>

          <MenuItem>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>TÜM ÜRÜNLER</Link>
          </MenuItem>
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

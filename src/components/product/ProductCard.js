import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import Button from '../common/Button';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-4px);
    
    .product-image img {
      transform: scale(1.05);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.sm};
  z-index: 1;
  
  svg {
    color: ${props => props.isWishlisted 
      ? props.theme.colors.secondary 
      : props.theme.colors.text.primary};
    font-size: 18px;
  }
  
  &:hover svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  left: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.xs};
  z-index: 1;
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Category = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
  
  /* İki satırdan fazla olursa kırp */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const Price = styled.span`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const OldPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: ${props => props.theme.spacing.sm};
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ProductCard = ({ 
  product = {
    id: 1,
    title: 'Ürün Adı',
    category: 'Kategori',
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: 'https://via.placeholder.com/300',
    isWishlisted: false
  },
  onAddToCart,
  onToggleWishlist
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
  };
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (onToggleWishlist) onToggleWishlist(product);
  };
  
  return (
    <Card>
      <ImageContainer className="product-image">
        <img src={product.image} alt={product.title} />
        <WishlistButton 
          onClick={handleToggleWishlist} 
          isWishlisted={product.isWishlisted}
          aria-label={product.isWishlisted ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          <FiHeart fill={product.isWishlisted ? "currentColor" : "none"} />
        </WishlistButton>
        {product.discount && (
          <DiscountBadge>%{product.discount} İndirim</DiscountBadge>
        )}
      </ImageContainer>
      
      <Content>
        <Category>{product.category}</Category>
        <Title>{product.title}</Title>
        
        <PriceContainer>
          <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
          {product.oldPrice && (
            <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
          )}
        </PriceContainer>
        
        <Actions>
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleAddToCart}
            leftIcon={<FiShoppingCart />}
          >
            Sepete Ekle
          </Button>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;

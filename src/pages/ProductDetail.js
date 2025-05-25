import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiShare2, FiChevronRight, FiStar } from 'react-icons/fi';
import Button from '../components/common/Button';

// Styled Components
const BreadcrumbNav = styled.nav`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BreadcrumbList = styled.ol`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.xs};
    
    &::after {
      content: '/';
      margin-left: ${props => props.theme.spacing.xs};
      color: ${props => props.theme.colors.text.secondary};
    }
  }
  
  a {
    color: ${props => props.theme.colors.text.secondary};
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  &:last-child {
    color: ${props => props.theme.colors.text.primary};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.md};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.sm};
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCategory = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProductTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  
  svg {
    color: #FFD700;
    margin-right: 2px;
  }
`;

const ReviewCount = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  margin-left: ${props => props.theme.spacing.sm};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Price = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const OldPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: ${props => props.theme.spacing.md};
`;

const DiscountBadge = styled.span`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-left: ${props => props.theme.spacing.md};
`;

const ProductDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.surface};
  margin: ${props => props.theme.spacing.md} 0;
`;

const OptionLabel = styled.span`
  display: block;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ColorOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SizeOption = styled.div`
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.selected 
    ? props.theme.colors.primary 
    : props.theme.colors.text.disabled};
  background-color: ${props => props.selected 
    ? props.theme.colors.primary 
    : 'transparent'};
  color: ${props => props.selected 
    ? 'white' 
    : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  padding: 0 ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => !props.disabled && props.theme.colors.primary};
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.lg};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}11;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.sm};
  text-align: center;
  margin: 0 ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.md};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ProductMeta = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  
  p {
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.text.secondary};
    
    span {
      color: ${props => props.theme.colors.text.primary};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
    }
  }
`;

// Örnek ürün verisi
const mockProduct = {
  id: 1,
  title: 'Vintage Baskılı T-Shirt',
  category: 'Erkek',
  price: 199.99,
  oldPrice: 249.99,
  discount: 20,
  rating: 4.5,
  reviewCount: 12,
  description: 'Yüksek kaliteli %100 pamuklu kumaştan üretilmiş vintage baskılı t-shirt. Rahat kesimi ve dayanıklı baskısı ile uzun süre kullanım sağlar. Günlük kombinlerinize şık bir hava katmak için ideal.',
  images: [
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  ],
  colors: [
    { name: 'Siyah', code: '#000000', available: true },
    { name: 'Beyaz', code: '#FFFFFF', available: true },
    { name: 'Gri', code: '#808080', available: true },
    { name: 'Mavi', code: '#0000FF', available: false }
  ],
  sizes: [
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: true },
    { name: 'XL', available: true },
    { name: 'XXL', available: false }
  ],
  sku: 'TS-VB-001',
  inStock: true,
  tags: ['vintage', 't-shirt', 'erkek']
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0].name);
  const [quantity, setQuantity] = useState(1);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const addToCart = () => {
    alert(`${quantity} adet ${selectedSize} beden ${selectedColor} renk ${mockProduct.title} sepete eklendi!`);
  };
  
  const addToWishlist = () => {
    alert(`${mockProduct.title} favorilere eklendi!`);
  };
  
  return (
    <>
      <BreadcrumbNav aria-label="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Ana Sayfa</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/products">Ürünler</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/category/${mockProduct.category.toLowerCase()}`}>{mockProduct.category}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{mockProduct.title}</BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbNav>
      
      <ProductContainer>
        <ProductImages>
          <MainImage>
            <img src={mockProduct.images[selectedImage]} alt={mockProduct.title} />
          </MainImage>
          <ThumbnailsContainer>
            {mockProduct.images.map((image, index) => (
              <Thumbnail 
                key={index} 
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${mockProduct.title} - ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ProductImages>
        
        <ProductInfo>
          <ProductCategory>{mockProduct.category}</ProductCategory>
          <ProductTitle>{mockProduct.title}</ProductTitle>
          
          <ProductRating>
            {Array.from({ length: 5 }).map((_, index) => (
              <FiStar 
                key={index}
                fill={index < Math.floor(mockProduct.rating) ? 'currentColor' : 'none'}
              />
            ))}
            <span>{mockProduct.rating}</span>
            <ReviewCount>({mockProduct.reviewCount} değerlendirme)</ReviewCount>
          </ProductRating>
          
          <PriceContainer>
            <Price>{mockProduct.price.toLocaleString('tr-TR')} ₺</Price>
            {mockProduct.oldPrice && (
              <>
                <OldPrice>{mockProduct.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
                <DiscountBadge>%{mockProduct.discount} İndirim</DiscountBadge>
              </>
            )}
          </PriceContainer>
          
          <ProductDescription>{mockProduct.description}</ProductDescription>
          
          <Divider />
          
          <OptionLabel>Renk: {selectedColor}</OptionLabel>
          <ColorOptions>
            {mockProduct.colors.map(color => (
              <ColorOption 
                key={color.name}
                color={color.code}
                selected={selectedColor === color.name}
                onClick={() => color.available && setSelectedColor(color.name)}
                style={{ 
                  opacity: color.available ? 1 : 0.5,
                  cursor: color.available ? 'pointer' : 'not-allowed',
                  border: color.code === '#FFFFFF' ? '1px solid #ddd' : undefined
                }}
                title={color.name}
              />
            ))}
          </ColorOptions>
          
          <OptionLabel>Beden: {selectedSize}</OptionLabel>
          <SizeOptions>
            {mockProduct.sizes.map(size => (
              <SizeOption 
                key={size.name}
                selected={selectedSize === size.name}
                disabled={!size.available}
                onClick={() => size.available && setSelectedSize(size.name)}
              >
                {size.name}
              </SizeOption>
            ))}
          </SizeOptions>
          
          <OptionLabel>Adet</OptionLabel>
          <QuantitySelector>
            <QuantityButton onClick={decreaseQuantity} disabled={quantity <= 1}>-</QuantityButton>
            <QuantityInput 
              type="number" 
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantitySelector>
          
          <ActionButtons>
            <Button 
              variant="primary" 
              size="large"
              fullWidth
              leftIcon={<FiShoppingCart />}
              onClick={addToCart}
            >
              Sepete Ekle
            </Button>
            
            <Button 
              variant="outline" 
              size="large"
              leftIcon={<FiHeart />}
              onClick={addToWishlist}
            >
              Favorilere Ekle
            </Button>
            
            <Button 
              variant="text" 
              size="large"
              leftIcon={<FiShare2 />}
              onClick={() => alert('Paylaşım linki kopyalandı!')}
            >
              Paylaş
            </Button>
          </ActionButtons>
          
          <ProductMeta>
            <p>SKU: <span>{mockProduct.sku}</span></p>
            <p>Kategori: <span>{mockProduct.category}</span></p>
            <p>Etiketler: <span>{mockProduct.tags.join(', ')}</span></p>
          </ProductMeta>
        </ProductInfo>
      </ProductContainer>
    </>
  );
};

export default ProductDetail;

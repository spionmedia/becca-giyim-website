import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiShare2, FiStar } from 'react-icons/fi';
import Button from '../components/common/Button';
import { getProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import categoryMeta from '../constants/categoryMeta';

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

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (mounted) {
          setProduct(data || null);
          if (data?.colors?.length) {
            setSelectedColor(data.colors[0].name);
          }
          if (data?.sizes?.length) {
            const firstSize = typeof data.sizes[0] === 'string' ? data.sizes[0] : data.sizes[0].name;
            setSelectedSize(firstSize);
          }
        }
      } catch (err) {
        if (mounted) {
          setError('Ürün yüklenemedi');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    const gallery = product.gallery || [];
    const candidates = [product.heroImage, product.image, ...gallery];
    return candidates.filter(Boolean);
  }, [product]);

  const colorOptions = useMemo(() => {
    if (!product?.colors) return [];
    return product.colors.map(color => ({
      name: color.name,
      code: color.code,
      available: color.available ?? true
    }));
  }, [product]);

  const sizeOptions = useMemo(() => {
    if (!product?.sizes) return [];
    return product.sizes.map(size => typeof size === 'string'
      ? { name: size, available: true }
      : size
    );
  }, [product]);

  useEffect(() => {
    if (colorOptions.length && !selectedColor) {
      setSelectedColor(colorOptions[0].name);
    }
  }, [colorOptions, selectedColor]);

  useEffect(() => {
    if (sizeOptions.length && !selectedSize) {
      setSelectedSize(sizeOptions[0].name);
    }
  }, [sizeOptions, selectedSize]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
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
    if (!product) return;

    // Renk ve beden kontrolü
    if (colorOptions.length > 0 && !selectedColor) {
      alert('Lütfen bir renk seçiniz!');
      return;
    }

    if (sizeOptions.length > 0 && !selectedSize) {
      alert('Lütfen bir beden seçiniz!');
      return;
    }

    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const addToWishlist = () => {
    if (!product) return;
    alert(`${product.title} favorilere eklendi!`);
  };

  const categoryLabel = useMemo(() => {
    if (!product) return '';
    const meta = categoryMeta[product.gender];
    const sub = meta?.subcategories?.find(item => item.slug === product.category);
    return sub ? `${meta.label} · ${sub.label}` : meta?.label || product.category;
  }, [product]);

  if (loading) {
    return <p>Ürün yükleniyor...</p>;
  }

  if (error || !product) {
    return <p>Ürün bulunamadı.</p>;
  }

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
          {product.gender && (
            <BreadcrumbItem>
              <Link to={`/${product.gender}`}>
                {categoryMeta[product.gender]?.label || product.gender}
              </Link>
            </BreadcrumbItem>
          )}
          {product.category && (
            <BreadcrumbItem>
              <Link to={`/${product.gender}/${product.category}`}>
                {categoryMeta[product.gender]?.subcategories?.find(sub => sub.slug === product.category)?.label || product.category}
              </Link>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem>{product.title}</BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbNav>

      <ProductContainer>
        <ProductImages>
          <MainImage>
            <img src={images[selectedImage]} alt={product.title} />
          </MainImage>
          <ThumbnailsContainer>
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.title} - ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ProductImages>

        <ProductInfo>
          <ProductCategory>{categoryLabel}</ProductCategory>
          <ProductTitle>{product.title}</ProductTitle>

          <ProductRating>
            {Array.from({ length: 5 }).map((_, index) => (
              <FiStar
                key={index}
                fill={index < Math.floor(product.rating || 0) ? 'currentColor' : 'none'}
              />
            ))}
            {product.rating && <span>{product.rating}</span>}
            {product.reviewCount && (
              <ReviewCount>({product.reviewCount} değerlendirme)</ReviewCount>
            )}
          </ProductRating>

          <PriceContainer>
            <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
            {product.oldPrice && product.oldPrice > 0 && (
              <>
                <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
                {product.discount && (
                  <DiscountBadge>%{product.discount} İndirim</DiscountBadge>
                )}
              </>
            )}
          </PriceContainer>

          <ProductDescription>{product.description}</ProductDescription>

          <Divider />

          {colorOptions.length > 0 && (
            <>
              <OptionLabel>Renk: {selectedColor}</OptionLabel>
              <ColorOptions>
                {colorOptions.map(color => (
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
            </>
          )}

          {sizeOptions.length > 0 && (
            <>
              <OptionLabel>Beden: {selectedSize}</OptionLabel>
              <SizeOptions>
                {sizeOptions.map(size => (
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
            </>
          )}

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
            {product.sku && <p>SKU: <span>{product.sku}</span></p>}
            <p>Kategori: <span>{categoryLabel}</span></p>
            {product.tags?.length && (
              <p>Etiketler: <span>{product.tags.join(', ')}</span></p>
            )}
          </ProductMeta>
        </ProductInfo>
      </ProductContainer>
    </>
  );
};

export default ProductDetail;

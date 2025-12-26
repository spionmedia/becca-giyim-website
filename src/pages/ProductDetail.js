import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiShare2, FiStar, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { getProductById, deleteProduct } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import categoryMeta from '../constants/categoryMeta';
import { updateSEO, setProductStructuredData } from '../utils/seo';

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

const ProductContainer = styled(motion.div)`
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

const MainImage = styled(motion.div)`
  width: 100%;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  cursor: zoom-in;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    border-radius: ${props => props.theme.borderRadius.md};
  }
  
  &:hover img {
    transform: scale(1.15);
  }
`;

const ZoomModal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
  
  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const EditButton = styled(motion.div)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  z-index: 10;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.sm};
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: border-color 0.2s ease;
  
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

          // SEO güncelle
          if (data) {
            const categoryLabel = categoryMeta[data.gender]?.label || '';
            const subCategoryLabel = categoryMeta[data.gender]?.subcategories?.find(sub => sub.slug === data.category)?.label || '';

            updateSEO({
              title: data.title,
              description: data.description || `${data.title} - ${categoryLabel} ${subCategoryLabel} | Becca Giyim'de uygun fiyatlarla satın alın.`,
              image: data.heroImage || data.image,
              url: `/#/product/${data.id}`,
              type: 'product',
              breadcrumbs: [
                { name: 'Ana Sayfa', url: '/' },
                { name: 'Ürünler', url: '/#/products' },
                ...(data.gender ? [{ name: categoryMeta[data.gender]?.label || data.gender, url: `/#/${data.gender}` }] : []),
                ...(data.category ? [{ name: subCategoryLabel || data.category, url: `/#/${data.gender}/${data.category}` }] : []),
                { name: data.title, url: `/#/product/${data.id}` }
              ]
            });

            setProductStructuredData({
              id: data.id,
              name: data.title,
              description: data.description,
              price: data.price,
              images: [data.heroImage || data.image, ...(data.gallery || [])],
              stock: Object.values(data.sizeStock || {}).reduce((a, b) => a + b, 0)
            });
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
    if (!product?.sizeStock && !product?.sizes) return [];

    // Yeni format: sizeStock objesi
    if (product.sizeStock && typeof product.sizeStock === 'object') {
      return Object.entries(product.sizeStock).map(([size, stock]) => ({
        name: size,
        stock: stock,
        available: stock > 0
      }));
    }

    // Eski format: sizes array
    return product.sizes.map(size => typeof size === 'string'
      ? { name: size, stock: 0, available: false }
      : { ...size, stock: size.stock || 0, available: (size.stock || 0) > 0 }
    );
  }, [product]);

  useEffect(() => {
    if (colorOptions.length && !selectedColor) {
      setSelectedColor(colorOptions[0].name);
    }
  }, [colorOptions, selectedColor]);

  useEffect(() => {
    if (sizeOptions.length && !selectedSize) {
      // İlk stokta olan bedeni seç
      const availableSize = sizeOptions.find(s => s.available);
      if (availableSize) {
        setSelectedSize(availableSize.name);
      }
    }
  }, [sizeOptions, selectedSize]);

  // Beden değiştiğinde quantity'yi 1'e sıfırla
  useEffect(() => {
    setQuantity(1);
  }, [selectedSize]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      // Stok sınırını aşmasın
      setQuantity(Math.min(value, selectedSizeStock || 1));
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < selectedSizeStock) {
      setQuantity(quantity + 1);
    }
  };

  // Seçili bedenin stok bilgisi
  const selectedSizeStock = useMemo(() => {
    if (!selectedSize || !sizeOptions.length) return 0;
    const sizeOption = sizeOptions.find(s => s.name === selectedSize);
    return sizeOption?.stock || 0;
  }, [selectedSize, sizeOptions]);

  // Tüm bedenler tükendi mi?
  const allSizesOutOfStock = useMemo(() => {
    return sizeOptions.length > 0 && sizeOptions.every(s => !s.available);
  }, [sizeOptions]);

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

    // Stok kontrolü
    if (selectedSizeStock <= 0) {
      alert('Seçtiğiniz beden stokta yok!');
      return;
    }

    if (quantity > selectedSizeStock) {
      alert(`Bu bedenden en fazla ${selectedSizeStock} adet alabilirsiniz.`);
      return;
    }

    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm(`"${product.title}" ürününü silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`)) {
      return;
    }

    setDeleting(true);
    try {
      await deleteProduct(product.id);
      alert('Ürün başarıyla silindi!');
      navigate('/products');
    } catch (err) {
      console.error('Silme hatası:', err);
      alert('Ürün silinirken hata oluştu: ' + err.message);
    } finally {
      setDeleting(false);
    }
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

      <ProductContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ProductImages>
          <MainImage
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setIsZoomed(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt={product.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

          </MainImage>

          <AnimatePresence>
            {isZoomed && (
              <ZoomModal
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(false)}
              >
                <motion.img
                  src={images[selectedImage]}
                  alt={product.title}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                />
              </ZoomModal>
            )}
          </AnimatePresence>
          <ThumbnailsContainer>
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={image} alt={`${product.title} - ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ProductImages>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProductInfo>
            <ProductCategory>{categoryLabel}</ProductCategory>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
              <ProductTitle>{product.title}</ProductTitle>
              {user?.user_metadata?.is_admin && (
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <Button
                    variant="outline"
                    size="small"
                    leftIcon={<FiEdit />}
                    onClick={() => navigate(`/admin/urun-duzenle/${product.id}`)}
                  >
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    leftIcon={<FiTrash2 />}
                    onClick={handleDeleteProduct}
                    disabled={deleting}
                    style={{ borderColor: '#d14343', color: '#d14343' }}
                  >
                    {deleting ? 'Siliniyor...' : 'Sil'}
                  </Button>
                </div>
              )}
            </div>

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
                <OptionLabel>
                  Beden: {selectedSize}
                  {selectedSize && selectedSizeStock > 0 && (
                    <span style={{ fontWeight: 'normal', color: '#666', marginLeft: '8px' }}>
                      ({selectedSizeStock} adet stokta)
                    </span>
                  )}
                </OptionLabel>
                <SizeOptions>
                  {sizeOptions.map(size => (
                    <SizeOption
                      key={size.name}
                      selected={selectedSize === size.name}
                      disabled={!size.available}
                      onClick={() => size.available && setSelectedSize(size.name)}
                      title={size.available ? `${size.stock} adet stokta` : 'Stokta yok'}
                    >
                      {size.name}
                      {!size.available && <span style={{ fontSize: '10px', display: 'block' }}>Tükendi</span>}
                    </SizeOption>
                  ))}
                </SizeOptions>
                {allSizesOutOfStock && (
                  <p style={{ color: '#d14343', marginTop: '8px', fontWeight: 'bold' }}>
                    Bu ürün şu anda stokta bulunmamaktadır.
                  </p>
                )}
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
                disabled={allSizesOutOfStock || selectedSizeStock <= 0}
              >
                {allSizesOutOfStock ? 'Stokta Yok' : selectedSizeStock <= 0 ? 'Bu Beden Tükendi' : 'Sepete Ekle'}
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
        </motion.div>
      </ProductContainer>
    </>
  );
};

export default ProductDetail;

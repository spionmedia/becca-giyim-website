import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import categoryMeta from '../../constants/categoryMeta';

const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  height: 100%;
  text-decoration: none;
  color: inherit;
  
  .product-image img {
    transition: transform 0.5s ease;
  }
  
  &:hover .product-image img {
    transform: scale(1.08);
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
    gender: 'kadin',
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: 'https://via.placeholder.com/300',
    heroImage: ''
  }
}) => {
  const displayImage = product.image || product.heroImage;

  const getCategoryLabel = () => {
    const genderMeta = categoryMeta[product.gender];
    const subcategory = genderMeta?.subcategories?.find(sub => sub.slug === product.category);
    if (genderMeta && subcategory) {
      return `${genderMeta.label} · ${subcategory.label}`;
    }
    return subcategory?.label || genderMeta?.label || product.category;
  };

  return (
    <Card
      to={`/product/${product.id}`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <ImageContainer className="product-image">
        <img src={displayImage} alt={product.title} />
        {product.discount && (
          <DiscountBadge>%{product.discount} İndirim</DiscountBadge>
        )}
      </ImageContainer>

      <Content>
        <Category>{getCategoryLabel()}</Category>
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
            as="div"
            leftIcon={<FiEye />}
          >
            İncele
          </Button>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;

import { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { updateSEO, PAGE_SEO } from '../utils/seo';

const Page = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CartList = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 120px 1fr 160px;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const ItemTitle = styled.h3`
  margin: 0;
`;

const Meta = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

const QtyButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  background: ${props => props.theme.colors.surface};
  font-size: ${props => props.theme.typography.fontSize.md};
  cursor: pointer;
`;

const QtyValue = styled.span`
  min-width: 32px;
  text-align: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`;

const Price = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  text-decoration: underline;
`;

const SummaryCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const SummaryTotal = styled(SummaryRow)`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Cart = () => {
  const { items, summary, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO({
      title: PAGE_SEO.cart.title,
      description: PAGE_SEO.cart.description,
      url: '/#/cart',
      breadcrumbs: [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Sepetim', url: '/#/cart' }
      ]
    });
  }, []);

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = (item) => {
    removeItem(item.id);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Sipariş vermek için lütfen giriş yapınız.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (!items.length) {
    return (
      <EmptyState>
        <h2>Sepetiniz boş</h2>
        <p>Becca Giyim koleksiyonlarını keşfetmeye ne dersiniz?</p>
        <Button as={Link} to="/products" variant="primary">Ürünlere Göz At</Button>
      </EmptyState>
    );
  }

  return (
    <div>
      <Title>Sepet ({summary.itemCount} ürün)</Title>
      <Page>
        <CartList>
          <AnimatePresence>
            {items.map((item, index) => (
              <CartItem
                key={`${item.id}-${item.color}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <ItemImage src={item.image} alt={item.title} />
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  {item.color && <Meta>Renk: {item.color}</Meta>}
                  {item.size && <Meta>Beden: {item.size}</Meta>}
                  <Meta>Kategori: {item.category}</Meta>
                  <RemoveButton onClick={() => handleRemove(item)}>Kaldır</RemoveButton>
                </ItemInfo>
                <PriceBlock>
                  <Price>{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</Price>
                  <QuantityControls>
                    <QtyButton onClick={() => handleDecrease(item)}>-</QtyButton>
                    <QtyValue>{item.quantity}</QtyValue>
                    <QtyButton onClick={() => handleIncrease(item)}>+</QtyButton>
                  </QuantityControls>
                </PriceBlock>
              </CartItem>
            ))}
          </AnimatePresence>
        </CartList>

        <SummaryCard>
          <SummaryRow>
            <span>Ara Toplam</span>
            <span>{summary.subtotal.toLocaleString('tr-TR')} ₺</span>
          </SummaryRow>
          <SummaryRow>
            <span>Kargo</span>
            <span>Ücretsiz</span>
          </SummaryRow>
          <SummaryTotal>
            <span>Genel Toplam</span>
            <span>{summary.subtotal.toLocaleString('tr-TR')} ₺</span>
          </SummaryTotal>
          <Button
            variant="primary"
            size="large"
            fullWidth
            style={{ marginTop: '1rem' }}
            onClick={handleCheckout}
          >
            Ödemeye Geç
          </Button>
          <Button variant="text" fullWidth onClick={clearCart} style={{ marginTop: '0.5rem' }}>
            Sepeti Temizle
          </Button>
          <Button as={Link} to="/products" variant="outline" fullWidth style={{ marginTop: '0.5rem' }}>
            Alışverişe Devam Et
          </Button>
        </SummaryCard>
      </Page>
    </div>
  );
};

export default Cart;

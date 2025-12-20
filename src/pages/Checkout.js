import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { processPayment3D } from '../services/paymentService';
import { checkStock } from '../services/productService';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const OrderSummary = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  flex: 0 0 350px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${props => props.$isTotal ? '18px' : '14px'};
  font-weight: ${props => props.$isTotal ? 'bold' : 'normal'};
  padding-top: ${props => props.$isTotal ? '10px' : '0'};
  border-top: ${props => props.$isTotal ? '1px solid #ddd' : 'none'};
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const IframeContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10000;
`;

const Checkout = () => {
  const { items: cart, summary, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show3DSecure, setShow3DSecure] = useState(false);
  const [iframeHtml, setIframeHtml] = useState('');
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const [stockErrors, setStockErrors] = useState([]);

  // Sayfa yüklendiğinde stok kontrolü yap
  useEffect(() => {
    const validateStock = async () => {
      const errors = [];
      for (const item of cart) {
        if (item.size) {
          try {
            const result = await checkStock(item.product_id, item.size, item.quantity);
            if (!result.available) {
              errors.push({
                item,
                available: result.stock,
                message: `"${item.title}" (${item.size}) - Stokta ${result.stock} adet var, sepetinizde ${item.quantity} adet`
              });
            }
          } catch (err) {
            console.error('Stok kontrolü hatası:', err);
          }
        }
      }
      setStockErrors(errors);
    };

    if (cart.length > 0) {
      validateStock();
    }
  }, [cart]);

  const [address, setAddress] = useState({
    title: '',
    full_name: '',
    phone: '',
    address_line: '',
    city: '',
    district: '',
    zip_code: ''
  });

  const [payment, setPayment] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const rawValue = value.replace(/\D/g, '');
      const truncatedValue = rawValue.slice(0, 16);
      const formattedValue = truncatedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      setPayment({ ...payment, [name]: formattedValue });
    } else {
      setPayment({ ...payment, [name]: value });
    }
  };

  // Iframe'den gelen mesajları dinle
  React.useEffect(() => {
    const handleMessage = (event) => {
      console.log('Received message:', event.data);

      if (event.data.type === 'PAYMENT_CALLBACK') {
        console.log('Payment callback received in parent');
        setShow3DSecure(false);

        // React router'a yönlendir
        const params = new URLSearchParams();
        if (event.data.conversationId) params.append('conversationId', event.data.conversationId);
        if (event.data.paymentId) params.append('paymentId', event.data.paymentId);
        if (event.data.status) params.append('status', event.data.status);
        if (event.data.mdStatus) params.append('mdStatus', event.data.mdStatus);

        navigate(`/payment-callback?${params.toString()}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Sipariş vermek için lütfen giriş yapınız.');
      navigate('/login');
      return;
    }

    // Stok hatası varsa devam etme
    if (stockErrors.length > 0) {
      alert('Sepetinizdeki bazı ürünlerin stoğu yetersiz. Lütfen sepetinizi güncelleyin.');
      return;
    }

    setLoading(true);

    try {
      // Son bir kez daha stok kontrolü yap
      for (const item of cart) {
        if (item.size) {
          const result = await checkStock(item.product_id, item.size, item.quantity);
          if (!result.available) {
            alert(`"${item.title}" (${item.size}) için yeterli stok yok. Mevcut: ${result.stock}`);
            setLoading(false);
            return;
          }
        }
      }

      const cleanPayment = {
        ...payment,
        cardNumber: payment.cardNumber.replace(/\s/g, '')
      };

      // Adres ve telefon doğrulaması
      if (!address.full_name || !address.phone || !address.address_line || !address.city) {
        alert('Lütfen tüm teslimat bilgilerini doldurunuz.');
        setLoading(false);
        return;
      }

      // Sipariş datasını sakla
      const orderData = {
        user_id: user.id,
        status: 'processing',
        total_amount: summary.subtotal,
        cart: cart,
        shipping_address: address
      };
      setPendingOrderData(orderData);

      // Callback URL - Supabase Edge Function kullan
      const callbackUrl = 'https://zcyzcxinohycrtkpynlm.supabase.co/functions/v1/payment-callback-redirect';

      // 3D Secure'ü başlat - gerçek adres ve telefon bilgileriyle
      const response = await processPayment3D(
        cleanPayment,
        user,
        summary.subtotal,
        callbackUrl,
        address
      );

      if (response.status === 'success' && response.threeDSHtmlContent) {
        // 3D Secure iframe göster
        let htmlContent = response.threeDSHtmlContent;

        // Base64 kontrolü: < ile başlamıyorsa muhtemelen Base64'tür
        if (!htmlContent.trim().startsWith('<')) {
          try {
            const decoded = atob(htmlContent);
            // Decode edilmiş veri HTML'e benziyor mu?
            if (decoded.includes('<html') || decoded.includes('<!DOCTYPE')) {
              htmlContent = decoded;
            }
          } catch (e) {
            console.warn('Content is not Base64 or decode failed, using raw content');
          }
        }

        setIframeHtml(htmlContent);
        setShow3DSecure(true);

        // conversationId'yi localStorage'a kaydet (callback için)
        localStorage.setItem('pendingPayment', JSON.stringify({
          conversationId: response.conversationId,
          orderData: orderData
        }));
      } else {
        alert('3D Secure başlatılamadı: ' + (response.errorMessage || 'Bilinmeyen hata'));
      }
    } catch (error) {
      alert('İşlem başarısız: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const close3DSecure = () => {
    setShow3DSecure(false);
    setIframeHtml('');
    localStorage.removeItem('pendingPayment');
  };

  if (cart.length === 0) {
    return (
      <Container>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h2>Sepetiniz boş</h2>
          <Button onClick={() => navigate('/products')} style={{ maxWidth: '200px' }}>
            Alışverişe Başla
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div>
          <Section>
            <Title>Teslimat Adresi</Title>
            <Form>
              <Input
                name="title"
                placeholder="Adres Başlığı (Ev, İş)"
                value={address.title}
                onChange={handleAddressChange}
                required
              />
              <Input
                name="full_name"
                placeholder="Ad Soyad"
                value={address.full_name}
                onChange={handleAddressChange}
                required
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Telefon Numarası"
                value={address.phone}
                onChange={handleAddressChange}
                required
              />
              <Input
                name="address_line"
                placeholder="Adres"
                value={address.address_line}
                onChange={handleAddressChange}
                required
              />
              <InputGroup>
                <Input
                  name="city"
                  placeholder="İl"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                />
                <Input
                  name="district"
                  placeholder="İlçe"
                  value={address.district}
                  onChange={handleAddressChange}
                  required
                />
              </InputGroup>
              <Input
                name="zip_code"
                placeholder="Posta Kodu"
                value={address.zip_code}
                onChange={handleAddressChange}
                required
              />
            </Form>
          </Section>

          <Section>
            <Title>Ödeme Bilgileri</Title>
            <Form onSubmit={handleSubmit}>
              <Input
                name="cardHolder"
                placeholder="Kart Üzerindeki İsim"
                value={payment.cardHolder}
                onChange={handlePaymentChange}
                required
              />
              <Input
                name="cardNumber"
                placeholder="Kart Numarası"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                maxLength="19"
                required
              />
              <InputGroup>
                <Input
                  name="expiryDate"
                  placeholder="AA/YY"
                  value={payment.expiryDate}
                  onChange={handlePaymentChange}
                  maxLength="5"
                  required
                />
                <Input
                  name="cvv"
                  placeholder="CVV"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  maxLength="3"
                  required
                />
              </InputGroup>
              <Button type="submit" disabled={loading}>
                {loading ? 'İşleniyor...' : 'Güvenli Ödeme Yap'}
              </Button>
            </Form>
          </Section>
        </div>

        <OrderSummary>
          <Title>Sipariş Özeti</Title>
          {cart.map((item, index) => (
            <SummaryRow key={index}>
              <span>{item.title} ({item.size}) x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} TL</span>
            </SummaryRow>
          ))}
          <SummaryRow $isTotal>
            <span>Toplam</span>
            <span>{summary.subtotal.toFixed(2)} TL</span>
          </SummaryRow>

          {stockErrors.length > 0 && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#fee',
              border: '1px solid #d14343',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#d14343', fontWeight: 'bold', marginBottom: '10px' }}>
                ⚠️ Stok Uyarısı
              </p>
              {stockErrors.map((error, idx) => (
                <p key={idx} style={{ color: '#d14343', fontSize: '14px', marginBottom: '5px' }}>
                  {error.message}
                </p>
              ))}
              <Button
                onClick={() => navigate('/cart')}
                style={{ marginTop: '10px', background: '#d14343' }}
              >
                Sepeti Düzenle
              </Button>
            </div>
          )}
        </OrderSummary>
      </Container>

      {show3DSecure && (
        <Modal>
          <IframeContainer>
            <CloseButton onClick={close3DSecure}>İptal</CloseButton>
            <iframe
              srcDoc={iframeHtml}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="3D Secure"
            />
          </IframeContainer>
        </Modal>
      )}
    </>
  );
};

export default Checkout;

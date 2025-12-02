import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verify3DSecure } from '../services/paymentService';
import { createOrder } from '../services/orderService';
import { useCart } from '../contexts/CartContext';

const Container = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding: 40px;
  text-align: center;
`;

const Message = styled.h2`
  color: ${props => props.error ? '#ff4444' : '#4CAF50'};
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Ödemeniz doğrulanıyor...');

    useEffect(() => {
        verifyPayment();
    }, []);

    const verifyPayment = async () => {
        try {
            // URL'den parametreleri al
            const conversationId = searchParams.get('conversationId');
            const paymentId = searchParams.get('paymentId');

            // localStorage'dan pending ödeme datasını al
            const pendingData = localStorage.getItem('pendingPayment');

            if (!pendingData) {
                setStatus('error');
                setMessage('Ödeme bilgisi bulunamadı');
                return;
            }

            const { conversationId: storedConversationId, orderData } = JSON.parse(pendingData);

            // 3D Secure doğrulama
            const verifyResult = await verify3DSecure(storedConversationId, paymentId);

            if (verifyResult.status === 'success') {
                // Sipariş oluştur
                const finalOrderData = {
                    ...orderData,
                    payment_id: verifyResult.paymentId
                };

                await createOrder(finalOrderData, orderData.cart);

                // Başarılı
                clearCart();
                localStorage.removeItem('pendingPayment');
                setStatus('success');
                setMessage('Ödemeniz başarıyla tamamlandı!');

                setTimeout(() => {
                    navigate('/orders');
                }, 3000);
            } else {
                setStatus('error');
                setMessage('Ödeme başarısız: ' + (verifyResult.errorMessage || 'Bilinmeyen hata'));
            }
        } catch (error) {
            setStatus('error');
            setMessage('Doğrulama hatası: ' + error.message);
        }
    };

    return (
        <Container>
            <Message error={status === 'error'}>{message}</Message>
            {status === 'processing' && <p>Lütfen bekleyin...</p>}
            {status === 'error' && (
                <Button onClick={() => navigate('/checkout')}>
                    Ödeme Sayfasına Dön
                </Button>
            )}
            {status === 'success' && (
                <Button onClick={() => navigate('/orders')}>
                    Siparişlerime Git
                </Button>
            )}
        </Container>
    );
};

export default PaymentCallback;

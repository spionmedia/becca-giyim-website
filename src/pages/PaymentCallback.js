import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Ödemeniz doğrulanıyor...');

    useEffect(() => {
        // Kısa bir gecikme ekle - Iyzico redirect'i tamamlasın
        const timer = setTimeout(() => {
            verifyPayment();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const verifyPayment = async () => {
        try {
            console.log('=== Payment Callback Started ===');
            console.log('Full URL:', window.location.href);
            console.log('Search params:', window.location.search);

            // localStorage'dan pending ödeme datasını al
            const pendingData = localStorage.getItem('pendingPayment');
            console.log('Pending data from localStorage:', pendingData);

            if (!pendingData) {
                setStatus('error');
                setMessage('Ödeme bilgisi bulunamadı. Lütfen tekrar deneyin.');
                console.error('No pending payment data found in localStorage');
                return;
            }

            const { conversationId: storedConversationId, orderData } = JSON.parse(pendingData);

            // URL'den parametreleri al (Iyzico'dan dönen)
            const urlConversationId = searchParams.get('conversationId');
            const paymentId = searchParams.get('paymentId');
            const status = searchParams.get('status');
            const mdStatus = searchParams.get('mdStatus');

            console.log('=== Payment Parameters ===');
            console.log('Stored conversationId:', storedConversationId);
            console.log('URL conversationId:', urlConversationId);
            console.log('Payment ID:', paymentId);
            console.log('Status:', status);
            console.log('MD Status:', mdStatus);
            console.log('Order Data:', orderData);

            if (!paymentId && !urlConversationId) {
                setStatus('error');
                setMessage('Ödeme ID bulunamadı. Lütfen tekrar deneyin.');
                console.error('No payment ID found in URL parameters');
                return;
            }

            // 3D Secure doğrulama - stored conversationId kullan
            console.log('Calling verify3DSecure...');
            const verifyResult = await verify3DSecure(storedConversationId, paymentId || urlConversationId);
            console.log('Verify result:', verifyResult);

            // Iyzico response'u kontrol et - farklı field'lar olabilir
            // mdStatus === 1 veya '1' başarılı demektir
            const urlMdStatus = searchParams.get('mdStatus');
            const isSuccess =
                verifyResult.status === 'success' ||
                verifyResult.status === 'SUCCESS' ||
                verifyResult.paymentStatus === 'SUCCESS' ||
                verifyResult.paymentStatus === 'success' ||
                verifyResult.mdStatus === '1' ||
                verifyResult.mdStatus === 1 ||
                urlMdStatus === '1' ||
                (status && status.toLowerCase() === 'success');

            console.log('Is payment successful?', isSuccess);
            console.log('Verify result status:', verifyResult.status);
            console.log('Verify result paymentStatus:', verifyResult.paymentStatus);
            console.log('Verify result mdStatus:', verifyResult.mdStatus);
            console.log('URL mdStatus:', urlMdStatus);
            console.log('URL status:', status);

            if (isSuccess) {
                console.log('Payment verified successfully!');

                // Sipariş oluştur
                const finalOrderData = {
                    ...orderData,
                    payment_id: verifyResult.paymentId || verifyResult.paymentTransactionId || paymentId || 'unknown'
                };

                console.log('Creating order with data:', finalOrderData);
                await createOrder(finalOrderData, orderData.cart);
                console.log('Order created successfully!');

                // Başarılı
                clearCart();
                localStorage.removeItem('pendingPayment');
                setStatus('success');
                setMessage('Ödemeniz başarıyla tamamlandı!');

                setTimeout(() => {
                    navigate('/orders');
                }, 3000);
            } else {
                console.error('Payment verification failed:', verifyResult);
                setStatus('error');
                setMessage('Ödeme başarısız: ' + (verifyResult.errorMessage || verifyResult.errorCode || 'Bilinmeyen hata'));
            }
        } catch (error) {
            console.error('Payment callback error:', error);
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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const OrderId = styled.span`
  font-weight: bold;
`;

const OrderDate = styled.span`
  color: #666;
`;

const StatusSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: ${props => {
        switch (props.value) {
            case 'completed': return '#d4edda';
            case 'processing': return '#fff3cd';
            case 'cancelled': return '#f8d7da';
            default: return '#fff';
        }
    }};
`;

const ItemsList = styled.div`
  margin-top: 15px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AdminOrders = () => {
    const { user, profile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('Bu sayfaya erişmek için giriş yapmalısınız.');
            navigate('/login');
            return;
        }

        if (profile && !profile.is_admin) {
            alert('Bu sayfaya erişim yetkiniz yok.');
            navigate('/');
            return;
        }

        fetchOrders();
    }, [user, profile, navigate]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (
            *,
            product:products (title)
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Siparişler yüklenirken hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            alert('Sipariş durumu güncellendi.');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenemedi.');
        }
    };

    if (loading) return <Container>Yükleniyor...</Container>;

    return (
        <Container>
            <Title>Sipariş Yönetimi (Admin)</Title>
            {orders.length === 0 ? (
                <p>Henüz hiç sipariş yok.</p>
            ) : (
                orders.map(order => (
                    <OrderCard key={order.id}>
                        <OrderHeader>
                            <div>
                                <OrderId>Sipariş #{order.id.slice(0, 8)}</OrderId>
                                <br />
                                <OrderDate>{new Date(order.created_at).toLocaleDateString('tr-TR')}</OrderDate>
                            </div>
                            <div>
                                <strong>Toplam: {order.total_amount} TL</strong>
                            </div>
                            <div>
                                <StatusSelect
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="pending">Beklemede</option>
                                    <option value="processing">İşleniyor</option>
                                    <option value="shipped">Kargolandı</option>
                                    <option value="completed">Tamamlandı</option>
                                    <option value="cancelled">İptal Edildi</option>
                                </StatusSelect>
                            </div>
                        </OrderHeader>
                        <ItemsList>
                            {order.order_items?.map((item, index) => (
                                <Item key={index}>
                                    <span>{item.product?.title || 'Ürün'} (x{item.quantity})</span>
                                    <span>{item.price * item.quantity} TL</span>
                                </Item>
                            ))}
                        </ItemsList>
                        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                            <strong>Müşteri ID:</strong> {order.user_id}
                            <br />
                            <strong>Ödeme ID:</strong> {order.payment_id}
                            {order.shipping_address && (
                                <>
                                    <br /><br />
                                    <strong>Teslimat Adresi:</strong><br />
                                    {order.shipping_address.full_name} - {order.shipping_address.phone}<br />
                                    {order.shipping_address.address_line}<br />
                                    {order.shipping_address.district} / {order.shipping_address.city} {order.shipping_address.zip_code}
                                </>
                            )}
                        </div>
                    </OrderCard>
                ))
            )}
        </Container>
    );
};

export default AdminOrders;

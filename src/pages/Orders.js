import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import supabase from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const OrderCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background: #fff;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
`;

const OrderStatus = styled.span`
  font-weight: bold;
  color: ${props => {
        switch (props.status) {
            case 'delivered': return 'green';
            case 'shipped': return 'blue';
            case 'processing': return 'orange';
            case 'cancelled': return 'red';
            default: return '#666';
        }
    }};
`;

const OrderTotal = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
`;

const ViewButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data);
            } catch (error) {
                console.error('Siparişler getirilemedi:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <Container>
            <Title>Siparişlerim</Title>
            {orders.length === 0 ? (
                <p>Henüz hiç siparişiniz yok.</p>
            ) : (
                orders.map(order => (
                    <OrderCard key={order.id}>
                        <OrderHeader>
                            <span>Sipariş No: #{order.id.slice(0, 8)}</span>
                            <span>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                        </OrderHeader>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div>Durum: <OrderStatus status={order.status}>{order.status}</OrderStatus></div>
                                <div style={{ marginTop: '5px' }}>
                                    {order.tracking_number && <span>Kargo Takip: {order.tracking_number}</span>}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <OrderTotal>{order.total_amount} {order.currency}</OrderTotal>
                                <ViewButton to={`/order/${order.id}`}>Detayları Gör</ViewButton>
                            </div>
                        </div>
                    </OrderCard>
                ))
            )}
        </Container>
    );
};

export default Orders;

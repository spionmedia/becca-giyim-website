import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import supabase from '../services/supabaseClient';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (orderError) throw orderError;
        setOrder(orderData);

        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', id);

        if (itemsError) throw itemsError;
        setItems(itemsData);

      } catch (error) {
        console.error('Sipariş detayları alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!order) return <div>Sipariş bulunamadı.</div>;

  return (
    <Container>
      <BackLink to="/orders">← Siparişlerime Dön</BackLink>
      <Title>Sipariş Detayı #{order.id.slice(0, 8)}</Title>

      <Card>
        <h3>Sipariş Bilgileri</h3>
        <p><strong>Tarih:</strong> {new Date(order.created_at).toLocaleDateString('tr-TR')}</p>
        <p><strong>Durum:</strong> {order.status}</p>
        <p><strong>Toplam Tutar:</strong> {order.total_amount} {order.currency}</p>
        {order.tracking_number && <p><strong>Kargo Takip No:</strong> {order.tracking_number}</p>}
      </Card>

      {order.shipping_address && (
        <Card>
          <h3>Teslimat Adresi</h3>
          <p><strong>Ad Soyad:</strong> {order.shipping_address.full_name}</p>
          <p><strong>Telefon:</strong> {order.shipping_address.phone}</p>
          <p><strong>Adres:</strong> {order.shipping_address.address_line}</p>
          <p><strong>İlçe/İl:</strong> {order.shipping_address.district} / {order.shipping_address.city}</p>
          {order.shipping_address.zip_code && <p><strong>Posta Kodu:</strong> {order.shipping_address.zip_code}</p>}
        </Card>
      )}

      <Card>
        <h3>Ürünler</h3>
        {items.map(item => (
          <ItemRow key={item.id}>
            <ItemInfo>
              {item.image_url && <ItemImage src={item.image_url} alt={item.product_name} />}
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.product_name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{item.variant_name}</div>
                <div style={{ fontSize: '14px' }}>Adet: {item.quantity}</div>
              </div>
            </ItemInfo>
            <div style={{ fontWeight: 'bold' }}>
              {item.price} TRY
            </div>
          </ItemRow>
        ))}
      </Card>
    </Container>
  );
};

export default OrderDetail;

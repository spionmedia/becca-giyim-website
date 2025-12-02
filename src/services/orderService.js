import supabase from './supabaseClient';

export const createOrder = async (orderData, items) => {
    try {
        // 1. Siparişi oluştur
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Sipariş detaylarını (ürünleri) ekle
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id || item.id,
            product_name: item.title,
            quantity: item.quantity,
            price: item.price,
            variant_name: item.size ? `Beden: ${item.size}` : null,
            image_url: item.heroimage
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error('Sipariş oluşturma hatası:', error);
        throw error;
    }
};

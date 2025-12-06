import supabase from './supabaseClient';

export const createOrder = async (orderData, items) => {
    try {
        // Orders tablosuna sadece gerekli kolonları gönder (cart hariç, shipping_address dahil)
        const { cart, ...cleanOrderData } = orderData;

        // 1. Siparişi oluştur
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([cleanOrderData])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Sipariş detaylarını (ürünleri) ekle
        const orderItems = items.map(item => {
            const variants = [];
            if (item.color) variants.push(`Renk: ${item.color}`);
            if (item.size) variants.push(`Beden: ${item.size}`);

            return {
                order_id: order.id,
                product_id: item.product_id || item.id,
                product_name: item.title,
                quantity: item.quantity,
                price: item.price,
                variant_name: variants.length > 0 ? variants.join(', ') : null,
                image_url: item.heroimage || item.image
            };
        });

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

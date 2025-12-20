import supabase from './supabaseClient';
import { decreaseStock, checkStock } from './productService';

export const createOrder = async (orderData, items) => {
    try {
        // Orders tablosuna sadece gerekli kolonları gönder (cart hariç, shipping_address dahil)
        const { cart, ...cleanOrderData } = orderData;

        // 1. Önce tüm ürünlerin stok kontrolünü yap
        for (const item of items) {
            if (item.size) {
                const stockResult = await checkStock(item.product_id || item.id, item.size, item.quantity);
                if (!stockResult.available) {
                    throw new Error(`"${item.title}" ürününün ${item.size} bedeni için yeterli stok yok. Mevcut: ${stockResult.stock}, İstenen: ${item.quantity}`);
                }
            }
        }

        // 2. Siparişi oluştur
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([cleanOrderData])
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Sipariş detaylarını (ürünleri) ekle
        const orderItems = items.map(item => {
            const variants = [];
            if (item.color && item.color !== 'null') variants.push(`Renk: ${item.color}`);
            if (item.size && item.size !== 'null') variants.push(`Beden: ${item.size}`);

            return {
                order_id: order.id,
                product_id: item.product_id || item.id,
                product_name: item.title,
                quantity: item.quantity,
                price: item.price,
                variant_name: variants.length > 0 ? variants.join(', ') : 'Standart',
                image_url: item.heroimage || item.image
            };
        });

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 4. Stokları düşür
        for (const item of items) {
            if (item.size) {
                const result = await decreaseStock(item.product_id || item.id, item.size, item.quantity);
                if (!result.success) {
                    console.error('Stok düşürme hatası:', result);
                    // Sipariş zaten oluşturuldu, sadece log'la
                }
            }
        }

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error('Sipariş oluşturma hatası:', error);
        throw error;
    }
};

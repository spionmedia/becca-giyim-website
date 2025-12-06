import supabase from './supabaseClient';

export const processPayment3D = async (paymentData, user, totalAmount, callbackUrl, shippingAddress) => {
    try {
        // Gerçek adres ve telefon bilgilerini kullan
        const fullName = shippingAddress?.full_name || user.user_metadata?.full_name || 'Müşteri Kullanıcı';
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || 'Müşteri';
        const lastName = nameParts.slice(1).join(' ') || 'Kullanıcı';

        const phone = shippingAddress?.phone || user.user_metadata?.phone || '5555555555';
        const cleanPhone = phone.replace(/\D/g, '');
        // Telefon numarasını +90 formatında gönder
        const formattedPhone = cleanPhone.startsWith('90') ? `+${cleanPhone}` : `+90${cleanPhone}`;

        const { data, error } = await supabase.functions.invoke('payment', {
            body: {
                paymentData: {
                    price: totalAmount.toString(),
                    paidPrice: totalAmount.toString(),
                    cardHolderName: paymentData.cardHolder,
                    cardNumber: paymentData.cardNumber,
                    expireMonth: paymentData.expiryDate.split('/')[0],
                    expireYear: '20' + paymentData.expiryDate.split('/')[1],
                    cvc: paymentData.cvv
                },
                user: {
                    id: user.id,
                    email: user.email,
                    name: firstName,
                    surname: lastName,
                    gsmNumber: formattedPhone,
                    identityNumber: '11111111111' // Iyzico test için gerekli
                },
                shippingAddress: shippingAddress ? {
                    contactName: fullName,
                    address: shippingAddress.address_line,
                    city: shippingAddress.city,
                    country: 'Turkey',
                    zipCode: shippingAddress.zip_code || '34000'
                } : null,
                billingAddress: shippingAddress ? {
                    contactName: fullName,
                    address: shippingAddress.address_line,
                    city: shippingAddress.city,
                    country: 'Turkey',
                    zipCode: shippingAddress.zip_code || '34000'
                } : null,
                callbackUrl: callbackUrl
            }
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Payment error:', error);
        throw error;
    }
};

export const verify3DSecure = async (conversationId, paymentId) => {
    try {
        const { data, error } = await supabase.functions.invoke('payment-callback', {
            body: {
                conversationId,
                paymentId
            }
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('3D Secure verification error:', error);
        throw error;
    }
};

// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { paymentData, user, callbackUrl, shippingAddress, billingAddress } = await req.json()

        const apiKey = 'gqblYQXsy4KZZD7r3ELaf8x11gt9luS9';
        const secretKey = 'sBs7CzHZEockaX6Aa4JqGy4uV088qTZ6';
        const baseUrl = 'https://api.iyzipay.com';
        const uriPath = '/payment/3dsecure/initialize';
        const randomString = Date.now().toString();

        const requestBody = {
            locale: 'tr',
            conversationId: randomString,
            price: paymentData.price,
            paidPrice: paymentData.paidPrice,
            currency: 'TRY',
            basketId: 'B' + randomString,
            paymentGroup: 'PRODUCT',
            callbackUrl: callbackUrl,
            paymentCard: {
                cardHolderName: paymentData.cardHolderName,
                cardNumber: paymentData.cardNumber,
                expireMonth: paymentData.expireMonth,
                expireYear: paymentData.expireYear,
                cvc: paymentData.cvc,
                registerCard: 0
            },
            buyer: {
                id: user.id,
                name: user.name || 'Müşteri',
                surname: user.surname || 'Kullanıcı',
                gsmNumber: user.gsmNumber || '+905350000000',
                email: user.email,
                identityNumber: user.identityNumber || '11111111111',
                lastLoginDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                registrationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                registrationAddress: shippingAddress?.address || 'Adres bilgisi girilmedi',
                ip: '85.34.78.112',
                city: shippingAddress?.city || 'Istanbul',
                country: shippingAddress?.country || 'Turkey',
                zipCode: shippingAddress?.zipCode || '34000'
            },
            shippingAddress: {
                contactName: shippingAddress?.contactName || user.name || 'Müşteri',
                city: shippingAddress?.city || 'Istanbul',
                country: shippingAddress?.country || 'Turkey',
                address: shippingAddress?.address || 'Adres bilgisi girilmedi',
                zipCode: shippingAddress?.zipCode || '34000'
            },
            billingAddress: {
                contactName: billingAddress?.contactName || shippingAddress?.contactName || user.name || 'Müşteri',
                city: billingAddress?.city || shippingAddress?.city || 'Istanbul',
                country: billingAddress?.country || shippingAddress?.country || 'Turkey',
                address: billingAddress?.address || shippingAddress?.address || 'Adres bilgisi girilmedi',
                zipCode: billingAddress?.zipCode || shippingAddress?.zipCode || '34000'
            },
            basketItems: [
                {
                    id: 'BI101',
                    name: 'Product',
                    category1: 'Giyim',
                    category2: 'Aksesuar',
                    itemType: 'PHYSICAL',
                    price: paymentData.price
                }
            ]
        };

        const requestBodyStr = JSON.stringify(requestBody);
        const dataToSign = randomString + uriPath + requestBodyStr;

        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        const messageData = encoder.encode(dataToSign);

        const importedKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signatureBuffer = await crypto.subtle.sign('HMAC', importedKey, messageData);
        const signatureArray = Array.from(new Uint8Array(signatureBuffer));
        const signature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const authParams = [
            `apiKey:${apiKey}`,
            `randomKey:${randomString}`,
            `signature:${signature}`
        ].join('&');

        const authorization = `IYZWSv2 ${btoa(authParams)}`;

        const response = await fetch(`${baseUrl}${uriPath}`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
                'x-iyzi-rnd': randomString,
                'x-iyzi-client-version': 'iyzipay-deno-1.0.0'
            },
            body: requestBodyStr
        });

        const data = await response.json();

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || 'Unknown error' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})

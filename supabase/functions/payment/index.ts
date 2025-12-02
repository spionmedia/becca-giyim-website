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
        const { paymentData, user, callbackUrl } = await req.json()

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
                name: user.name || 'John',
                surname: user.surname || 'Doe',
                gsmNumber: '+905350000000',
                email: user.email,
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Nidakule Goztepe, Merdivenkov Mah. Bora Sok. No:1',
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: user.name || 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Goztepe, Merdivenkov Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: user.name || 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Goztepe, Merdivenkov Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: [
                {
                    id: 'BI101',
                    name: 'Product',
                    category1: 'Fashion',
                    category2: 'Clothing',
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

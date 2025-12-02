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
        const { conversationId, paymentId } = await req.json()

        const apiKey = 'gqblYQXsy4KZZD7r3ELaf8x11gt9luS9';
        const secretKey = 'sBs7CzHZEockaX6Aa4JqGy4uV088qTZ6';
        const baseUrl = 'https://api.iyzipay.com';
        const uriPath = '/payment/3dsecure/auth';
        const randomString = Date.now().toString();

        const requestBody = {
            locale: 'tr',
            conversationId: conversationId,
            paymentId: paymentId
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

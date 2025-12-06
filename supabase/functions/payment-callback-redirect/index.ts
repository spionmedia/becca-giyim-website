import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore - Deno is available in Supabase Edge Functions runtime
Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    console.log('Payment callback redirect received');
    console.log('Method:', req.method);
    console.log('URL:', req.url);

    try {
        // URL'den parametreleri al (GET)
        const url = new URL(req.url);
        let conversationId = url.searchParams.get('conversationId');
        let paymentId = url.searchParams.get('paymentId');
        let status = url.searchParams.get('status');
        let mdStatus = url.searchParams.get('mdStatus');

        // Eğer GET parametreleri yoksa, POST body'den al
        if (!conversationId || !paymentId) {
            try {
                const contentType = req.headers.get('content-type');
                console.log('Content-Type:', contentType);

                if (contentType?.includes('application/x-www-form-urlencoded')) {
                    // Form data olarak geliyorsa
                    const formData = await req.formData();
                    conversationId = conversationId || formData.get('conversationId')?.toString() || null;
                    paymentId = paymentId || formData.get('paymentId')?.toString() || null;
                    status = status || formData.get('status')?.toString() || null;
                    mdStatus = mdStatus || formData.get('mdStatus')?.toString() || null;
                } else if (contentType?.includes('application/json')) {
                    // JSON olarak geliyorsa
                    const body = await req.json();
                    conversationId = conversationId || body.conversationId;
                    paymentId = paymentId || body.paymentId;
                    status = status || body.status;
                    mdStatus = mdStatus || body.mdStatus;
                }
            } catch (e) {
                console.log('Could not parse body:', e);
            }
        }

        console.log('Params:', { conversationId, paymentId, status, mdStatus });

        // React uygulamasına yönlendir
        const params = new URLSearchParams();
        if (conversationId && conversationId !== 'null') params.append('conversationId', conversationId);
        if (paymentId && paymentId !== 'null') params.append('paymentId', paymentId);
        if (status && status !== 'null') params.append('status', status);
        if (mdStatus && mdStatus !== 'null') params.append('mdStatus', mdStatus);

        console.log('Building redirect URL with params:', {
            conversationId,
            paymentId,
            status,
            mdStatus,
            paramsString: params.toString()
        });

        // Frontend URL'ini environment variable'dan al veya default kullan
        // @ts-ignore - Deno is available in Supabase Edge Functions runtime
        const frontendUrl = Deno.env.get('FRONTEND_URL') || 'http://localhost:3000';
        const redirectUrl = `${frontendUrl}/#/payment-callback?${params.toString()}`;

        console.log('Redirecting to:', redirectUrl);

        // HTML response ile redirect
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Ödeme İşleniyor...</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
          }
          .container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Ödemeniz İşleniyor</h2>
          <div class="spinner"></div>
          <p>Yönlendiriliyorsunuz...</p>
        </div>
        <script>
          console.log('Redirecting to:', '${redirectUrl}');
          
          // Eğer iframe içindeyse parent'a mesaj gönder
          if (window.parent !== window) {
            window.parent.postMessage({
              type: 'PAYMENT_CALLBACK',
              conversationId: '${conversationId}',
              paymentId: '${paymentId}',
              status: '${status}',
              mdStatus: '${mdStatus}'
            }, '*');
          }
          
          // Her durumda redirect yap
          setTimeout(function() {
            window.top.location.href = '${redirectUrl}';
          }, 1000);
        </script>
      </body>
      </html>
    `;

        return new Response(html, {
            headers: {
                ...corsHeaders,
                'Content-Type': 'text/html; charset=utf-8',
            },
        });
    } catch (error: any) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Unknown error' }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        );
    }
})

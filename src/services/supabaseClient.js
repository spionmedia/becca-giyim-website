import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://zcyzcxinohycrtkpynlm.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeXpjeGlub2h5Y3J0a3B5bmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NDgxODksImV4cCI6MjA3OTMyNDE4OX0.R1vhXkbj0HvgSoGQl28gvsLTZ0oPQ24_jDQI812nMOY';

export default createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
    },
    global: {
        headers: {
            'x-client-info': 'supabase-js-web'
        },
        fetch: (url, options = {}) => {
            return fetch(url, {
                ...options,
                // Force HTTP/2 instead of HTTP/3 (QUIC) to avoid protocol errors
                mode: 'cors',
                credentials: 'same-origin'
            });
        }
    },
    db: {
        schema: 'public'
    },
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
});

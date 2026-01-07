import { serve } from "https://deno.land/std/http/server.ts";

const apiMapping = {
    '/anthropic': 'https://api.anthropic.com',
    '/cerebras': 'https://api.cerebras.ai',
    '/claude': 'https://api.anthropic.com',
    '/cohere': 'https://api.cohere.ai',
    '/discord': 'https://discord.com/api',
    '/fireworks': 'https://api.fireworks.ai',
    '/gemini': 'https://generativelanguage.googleapis.com',
    '/groq': 'https://api.groq.com/openai',
    '/huggingface': 'https://api-inference.huggingface.co',
    '/meta': 'https://www.meta.ai/api',
    '/novita': 'https://api.novita.ai',
    '/nvidia': 'https://integrate.api.nvidia.com',
    '/oaipro': 'https://api.oaipro.com',
    '/openai': 'https://api.openai.com',
    '/openrouter': 'https://openrouter.ai/api',
    '/portkey': 'https://api.portkey.ai',
    '/reka': 'https://api.reka.ai',
    '/telegram': 'https://api.telegram.org',
    '/together': 'https://api.together.xyz',
    '/xai': 'https://api.x.ai'
};

serve(async (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/' || pathname === '/index.html') {
        return new Response('Service is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    if (pathname === '/robots.txt') {
        return new Response('User-agent: *\nDisallow: /', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    const [prefix, rest] = extractPrefixAndRest(pathname, Object.keys(apiMapping));
    if (!prefix) {
        return new Response('Not Found', { status: 404 });
    }

    const targetUrl = `${apiMapping[prefix]}${rest}`;

    try {
        const headers = new Headers();
        const allowedHeaders = ['accept', 'content-type', 'authorization'];
        for (const [key, value] of request.headers.entries()) {
            if (allowedHeaders.includes(key.toLowerCase())) {
                headers.set(key, value);
            }
        }

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: headers,
            body: request.body
        });

        const responseHeaders = new Headers(response.headers);
        responseHeaders.set('X-Content-Type-Options', 'nosniff');
        responseHeaders.set('X-Frame-Options', 'DENY');
        responseHeaders.set('Referrer-Policy', 'no-referrer');

        return new Response(response.body, {
            status: response.status,
            headers: responseHeaders
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
});

function extractPrefixAndRest(pathname, prefixes) {
    for (const prefix of prefixes) {
        if (pathname.startsWith(prefix)) {
            return [prefix, pathname.slice(prefix.length)];
        }
    }
    return [null, null];
}
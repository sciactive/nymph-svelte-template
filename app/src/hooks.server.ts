import type { HandleFetch, HandleServerError } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const { PUBLIC_DOMAIN, PUBLIC_PROTO } = env;

const PORT = Number(process.env.PORT ?? process.env.PROD_PORT ?? 5173);

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  const url = new URL(request.url);

  if (
    url.hostname === PUBLIC_DOMAIN &&
    (url.port === `${PORT}` || url.port === '') &&
    url.protocol === `${PUBLIC_PROTO}:` &&
    url.pathname === '/rest'
  ) {
    const cookie = request.headers.get('Cookie');
    const authCookiePattern = /(?:(?:^|.*;\s*)TILMELDAUTH\s*=\s*([^;]*).*$)/;

    try {
      if (cookie && cookie.match(authCookiePattern)) {
        const token = cookie.replace(authCookiePattern, '$1');
        const base64Url = token.split('.')[1] || '';
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json =
          typeof atob === 'undefined'
            ? Buffer.from(base64, 'base64').toString('binary') // node
            : atob(base64); // browser
        const jwt = JSON.parse(json);

        // Clone the original request, to add a header.
        request = new Request(request.url, request);

        request.headers.set('X-Xsrf-Token', jwt.xsrfToken);
      }
    } catch (e: any) {
      // Ignore error.
    }
  }

  return await fetch(request, { credentials: 'include' });
};

export const handleError: HandleServerError = ({ error, event }) => {
  console.error('Unexpected Error', error, event);

  return {
    message: (error as any)?.message ?? 'Unexpected Error',
    code: (error as any)?.code ?? (error as any)?.status ?? 'UNKNOWN',
  };
};

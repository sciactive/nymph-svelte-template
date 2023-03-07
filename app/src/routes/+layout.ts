import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { buildSessionStuff } from '$lib/nymph';
import type { LayoutLoad } from './$types';

export const prerender = false;

export const load: LayoutLoad = async ({ data, fetch }) => {
  const authCookiePattern = /(?:(?:^|.*;\s*)TILMELDAUTH\s*=\s*([^;]*).*$)/;

  const { DOMAIN, SECURE } = data;
  let tokens: { xsrfToken?: string; token?: string } = data.tokens || {};

  if (
    typeof document !== 'undefined' &&
    document.cookie &&
    document.cookie.match(authCookiePattern)
  ) {
    const token = document.cookie.replace(authCookiePattern, '$1');
    if (token) {
      tokens.token = token;

      try {
        const base64Url = tokens.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json =
          typeof atob === 'undefined'
            ? Buffer.from(base64, 'base64').toString('binary') // node
            : atob(base64); // browser
        const jwt = JSON.parse(json);

        tokens.xsrfToken = jwt.xsrfToken;
      } catch (e: any) {
        tokens = {};
      }
    }
  }

  const stuff = buildSessionStuff(fetch, tokens, DOMAIN, SECURE == 'true');

  const {
    readyPromise,
    settingsReadyPromise,
    projectsReadyPromise,
    systemAdmin,
  } = stuff.stores;

  await get(readyPromise);
  await get(settingsReadyPromise);
  await get(projectsReadyPromise);

  if (get(systemAdmin)) {
    throw redirect(302, `/user/`);
  }

  return stuff;
};

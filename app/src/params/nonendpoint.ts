import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return !['rest', 'user'].includes(
    param.replace(/^\//, '').replace(/\/.*$/, '')
  );
};

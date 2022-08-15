/* eslint-disable import/prefer-default-export */
import qs from 'qs';

export const paramsSerializer = (params: any): string => qs.stringify(params, {
  indices: false,
});

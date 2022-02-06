import type { ParsedUrlQuery } from 'querystring';

export interface GroupQuery extends ParsedUrlQuery {
  id: string;
}

export type ValueOf<T> = T[keyof T];

export type KeyPair<T> = {
  [K in keyof T]?: T[K];
};

export type SelectOption<T> = {
  value: T; label: string;
}

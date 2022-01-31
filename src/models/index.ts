import type { ParsedUrlQuery } from 'querystring';

export interface GroupQuery extends ParsedUrlQuery {
  id: string;
}

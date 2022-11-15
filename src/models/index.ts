import { RefObject } from 'react';

import type { ParsedUrlQuery } from 'querystring';

export interface GroupQuery extends ParsedUrlQuery {
  id: string;
}

export type SelectOption<T> = {
  value: T; label: string;
}

export interface InfiniteResponse<T> {
  items: T[];
  lastUid?: string;
}

export interface InfiniteRequest {
  perPage?: number;
  lastUid?: string;
}

export interface InfiniteRefState<T> {
  lastItemRef: (node?: Element | null | undefined) => void;
  wrapperRef?: RefObject<T>;
}

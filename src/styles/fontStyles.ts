import { css } from '@emotion/react';

const fontWeight = (isBold: boolean) => css`
  font-weight: ${isBold ? '600' : 'normal'};
`;

export const h2Font = (isBold = false) => css`
  font-weight: ${isBold ? 'bold' : 'normal'};
  font-size: 2rem;
  line-height: 3rem;
`;

export const h3Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 1.375rem;
  line-height: 2rem;
`;

export const h4Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const body1Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 1rem;
  line-height: 1.625rem;
`;

export const body2Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 0.875rem;
  line-height: 1.375rem;
`;

export const subtitle1Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 0.825rem;
  line-height: 1.25rem;
`;

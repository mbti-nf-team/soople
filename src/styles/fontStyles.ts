import { css } from '@emotion/react';

const fontWeight = (isBold: boolean) => css`
  font-weight: ${isBold ? '600' : 'normal'};
`;

export const h2Font = (isBold = false) => css`
  font-weight: ${isBold ? 'bold' : 'normal'};
  font-size: 32px;
  line-height: 48px;
`;

export const h3Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 22px;
  line-height: 32px;
`;

export const h4Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 17px;
  line-height: 24px;
`;

export const body1Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 15px;
  line-height: 24px;
`;

export const body2Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 14px;
  line-height: 22px;
`;

export const subtitle1Font = (isBold = false) => css`
  ${fontWeight(isBold)};
  font-size: 13px;
  line-height: 20px;
`;

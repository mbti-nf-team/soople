import React, { ReactElement } from 'react';

import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import palette from './palette';

const setGlobalStyles = () => css`
  ${emotionNormalize}

  body {
    background: ${palette.accent1};
  }
`;

function GlobalStyles(): ReactElement {
  return (
    <Global styles={setGlobalStyles()} />
  );
}

export default GlobalStyles;

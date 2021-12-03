import React, { ReactElement } from 'react';

import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const setGlobalStyles = () => css`
  ${emotionNormalize}
`;

function GlobalStyles(): ReactElement {
  return (
    <Global styles={setGlobalStyles()} />
  );
}

export default GlobalStyles;

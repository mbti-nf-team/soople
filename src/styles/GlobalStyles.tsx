import React, { ReactElement } from 'react';

import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import { h2Font, h3Font, h4Font } from './fontStyles';
import palette from './palette';

const setGlobalStyles = () => css`
  ${emotionNormalize}

  body {
    color: ${palette.foreground};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    background: ${palette.accent1};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    outline: none;
    cursor: pointer;
    border: unset;

    &:disabled {
      cursor: not-allowed;
    }
  }

  h4 {
    ${h4Font()};
  }

  h3 {
    ${h3Font(true)};
  }

  h2 {
    ${h2Font(true)};
  }
`;

function GlobalStyles(): ReactElement {
  return (
    <Global styles={setGlobalStyles()} />
  );
}

export default GlobalStyles;

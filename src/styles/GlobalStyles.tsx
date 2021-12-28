import React, { ReactElement } from 'react';

import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

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
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    text-align: center;
  }
`;

function GlobalStyles(): ReactElement {
  return (
    <Global styles={setGlobalStyles()} />
  );
}

export default GlobalStyles;

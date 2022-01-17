import React, { ReactElement } from 'react';

import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { useRouter } from 'next/router';

import {
  body2Font, h2Font, h3Font, h4Font,
} from './fontStyles';
import palette from './palette';

const setGlobalStyles = (path: string) => css`
  ${emotionNormalize}

  body {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: ${palette.foreground};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    background: ${path === '/' ? palette.accent1 : palette.background};
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

  :disabled {
    cursor: not-allowed;
  }

  .toastBody {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: ${palette.accent7};
    ${body2Font()}
  }
`;

function GlobalStyles(): ReactElement {
  const router = useRouter();

  return (
    <Global styles={setGlobalStyles(router.pathname)} />
  );
}

export default GlobalStyles;

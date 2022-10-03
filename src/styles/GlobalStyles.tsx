import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import {
  css, Global, Theme, useTheme,
} from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import {
  h1Font, h2Font, h3Font, h4Font,
} from './fontStyles';

const hasBackground = (pathname: string) => pathname === '/' || pathname === '/404' || pathname === '/500';

export const setGlobalStyles = (pathname: string, theme: Theme) => css`
  ${emotionNormalize};

  body {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: ${theme.foreground};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    background: ${hasBackground(pathname) ? theme.accent1 : theme.background};
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

  code {
    font-family: Menlo, Monaco, Consolas, monospace;
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

  h1 {
    ${h1Font(true)};
  }

  :disabled {
    cursor: not-allowed;
  }

  input:read-only, textarea:read-only {
    pointer-events: none;
  }

  input[type="datetime-local"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
  }

  input[type="date"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
  }
`;

function GlobalStyles(): ReactElement {
  const theme = useTheme();
  const { pathname } = useRouter();

  return (
    <Global styles={setGlobalStyles(pathname, theme)} />
  );
}

export default GlobalStyles;

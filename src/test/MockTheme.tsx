import { ReactElement, ReactNode } from 'react';

import { Theme, ThemeProvider } from '@emotion/react';

import { lightTheme } from '@/styles/theme';

interface Props {
  theme?: Theme;
  children: ReactNode;
}

function MockTheme({ theme = lightTheme, children }: Props): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;

import '@emotion/react';

import { lightTheme } from '@/styles/theme';

declare module '@emotion/react' {
  type CustomTheme = typeof lightTheme;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}

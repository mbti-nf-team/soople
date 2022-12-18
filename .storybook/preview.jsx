import * as NextImage from "next/image";

import { Global, ThemeProvider } from '@emotion/react';

import { setGlobalStyles } from '../src/styles/GlobalStyles';
import { lightTheme } from '../src/styles/theme';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Global styles={setGlobalStyles('', lightTheme)} />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

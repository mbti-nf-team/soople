import { setGlobalStyles } from '../src/styles/GlobalStyles';
import { Global } from '@emotion/react';

export const decorators = [
  (Story) => (
    <>
      <Global styles={setGlobalStyles('')} />
      <Story />
    </>
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

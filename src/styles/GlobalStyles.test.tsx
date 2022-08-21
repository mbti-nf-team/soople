import { setGlobalStyles } from './GlobalStyles';
import { lightTheme } from './theme';

describe('setGlobalStyles', () => {
  context('path가 "/"이거나 "/404"이거나 "/500"인 경우', () => {
    it(`styles에 background이 ${lightTheme.accent1}여야만 한다`, () => {
      const result = setGlobalStyles('/', lightTheme);

      expect(result.styles).toContain(`background:${lightTheme.accent1}`);
    });
  });

  context('path가 "/"이거나 "/404"이거나 "/500"가 아닌 경우', () => {
    it(`styles에 background이 ${lightTheme.background}여야만 한다`, () => {
      const result = setGlobalStyles('/detail', lightTheme);

      expect(result.styles).toContain(`background:${lightTheme.background}`);
    });
  });
});

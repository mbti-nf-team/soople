import { setGlobalStyles } from './GlobalStyles';
import palette from './palette';

describe('setGlobalStyles', () => {
  context('path가 "/"인 경우', () => {
    it(`styles에 background이 ${palette.accent1}여야만 한다`, () => {
      const result = setGlobalStyles('/');

      expect(result.styles).toContain(`background:${palette.accent1}`);
    });
  });

  context('path가 "/"가 아닌 경우', () => {
    it(`styles에 background이 ${palette.background}여야만 한다`, () => {
      const result = setGlobalStyles('/test');

      expect(result.styles).toContain(`background:${palette.background}`);
    });
  });
});

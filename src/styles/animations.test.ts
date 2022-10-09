import animations from './animations';
import { lightTheme } from './theme';

describe('animations', () => {
  describe('modalBackground', () => {
    context('isVisible이 true인 경우', () => {
      it('styles에 visibility는 "visible"여야만 한다', () => {
        const result = animations.modalBackground({
          theme: lightTheme,
          isVisible: true,
        });

        expect(result.styles).toContain('visibility:visible');
      });
    });

    context('isVisible이 false인 경우', () => {
      it('styles에 visibility는 "hidden"여야만 한다', () => {
        const result = animations.modalBackground({
          theme: lightTheme,
          isVisible: false,
        });

        expect(result.styles).toContain('visibility:hidden');
      });
    });
  });

  describe('modalBox', () => {
    context('isVisible이 true인 경우', () => {
      it('styles에 visibility는 "visible"여야만 한다', () => {
        const result = animations.modalBox({
          theme: lightTheme,
          isVisible: true,
        });

        expect(result.styles).toContain('visibility:visible');
      });
    });

    context('isVisible이 false인 경우', () => {
      it('styles에 visibility는 "hidden"여야만 한다', () => {
        const result = animations.modalBox({
          theme: lightTheme,
          isVisible: false,
        });

        expect(result.styles).toContain('visibility:hidden');
      });
    });
  });
});

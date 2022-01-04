import {
  body1Font, body2Font, h2Font, h3Font, h4Font, subtitle1Font,
} from './fontStyles';

describe('h2Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 bold여야만 한다', () => {
      const result = h2Font(true);

      expect(result.styles).toContain('font-weight:bold;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h2Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('h3Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = h3Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h3Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('h4Font', () => {
  it('font-size는 17px이어야만 한다', () => {
    const result = h4Font();

    expect(result.styles).toContain('font-size:17px;');
  });
});

describe('body1Font', () => {
  it('font-size는 15px이어야만 한다', () => {
    const result = body1Font();

    expect(result.styles).toContain('font-size:15px;');
  });
});

describe('body2Font', () => {
  it('font-size는 14px이어야만 한다', () => {
    const result = body2Font();

    expect(result.styles).toContain('font-size:14px;');
  });
});

describe('subtitle1Font', () => {
  it('font-size는 13px이어야만 한다', () => {
    const result = subtitle1Font();

    expect(result.styles).toContain('font-size:13px;');
  });
});

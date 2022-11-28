import {
  body1Font, body2Font, h1Font, h2Font, h3Font, h4Font, subtitle1Font, subtitle2Font,
} from './fontStyles';

describe('h1Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 bold여야만 한다', () => {
      const result = h1Font(true);

      expect(result.styles).toContain('font-weight:bold;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h1Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

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
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = h4Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h4Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('body1Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = body1Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = body1Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('body2Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = body2Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = body2Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('subtitle1Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = subtitle1Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = subtitle1Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('subtitle2Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = subtitle2Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = subtitle2Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

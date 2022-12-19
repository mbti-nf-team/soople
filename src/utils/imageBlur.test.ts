import { shimmer, toBase64 } from './imageBlur';

describe('shimmer', () => {
  it('사이즈에 따른 svg string 태그가 나타나야만 한다', () => {
    const result = shimmer(100, 100);

    expect(result).toContain('width="100"');
  });
});

describe('toBase64', () => {
  context('window 객체가 존재하는 경우', () => {
    it('base64로 변환된 값이 반환되어야만 한다', () => {
      const result = toBase64('test');

      expect(result).toBe('dGVzdA==');
    });
  });

  context('window 객체가 존재하지 않는 경우', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get') as any;

    afterEach(() => {
      windowSpy.mockRestore();
    });

    it('base64로 변환된 값이 반환되어야만 한다', () => {
      windowSpy.mockImplementation(() => undefined);

      const result = toBase64('test');

      expect(result).toBe('dGVzdA==');
    });
  });
});

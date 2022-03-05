import { filteredWithSanitizeHtml, removeAllHtml } from './filter';

describe('removeAllHtml', () => {
  it('html 태그가 삭제된 후 반환해야만 한다', () => {
    const result = removeAllHtml('<h1>test</h1><h2>11</h2>');

    expect(result).toBe('test11');
  });
});

describe('filteredWithSanitizeHtml', () => {
  it('허용되지 않은 html 태그가 필터링된 후 반환해야만 한다', () => {
    const result = filteredWithSanitizeHtml('<script>console.log("test")</script><span>test</span>');

    expect(result).toBe('<span>test</span>');
  });
});

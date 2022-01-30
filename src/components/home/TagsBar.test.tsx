import { render } from '@testing-library/react';

import TagsBar from './TagsBar';

describe('TagsBar', () => {
  const tags = [
    { name: 'test', count: 1 },
    { name: 'test1', count: 0 },
  ];

  const renderTagsBar = () => render((
    <TagsBar
      isLoading={given.isLoading}
      tags={tags}
    />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderTagsBar();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    it('태그들이 나타나야만 한다', () => {
      const { container } = renderTagsBar();

      tags.forEach(({ name }) => {
        expect(container).toHaveTextContent(name);
      });
    });
  });
});

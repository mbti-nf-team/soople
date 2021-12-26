import { render } from '@testing-library/react';

import TagsBar from './TagsBar';

describe('TagsBar', () => {
  const renderTagsBar = () => render((
    <TagsBar
      tags={given.tags}
    />
  ));

  context('tag들이 존재하지 않는 경우', () => {
    given('tags', () => []);

    it('"태그가 없어요!" 문구가 나타나야만 한다', () => {
      const { container } = renderTagsBar();

      expect(container).toHaveTextContent('태그가 없어요!');
    });
  });

  context('tag들이 존재하는 경우', () => {
    const tags = [{ name: 'test' }, { name: 'test1' }];

    given('tags', () => tags);

    it('태그들이 나타나야만 한다', () => {
      const { container } = renderTagsBar();

      tags.forEach(({ name }) => {
        expect(container).toHaveTextContent(name);
      });
    });
  });
});

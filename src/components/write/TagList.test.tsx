import { fireEvent, render, screen } from '@testing-library/react';

import TagList from './TagList';

describe('TagList', () => {
  const handleRemove = jest.fn();

  const renderTagList = (tags: string[]) => render((
    <TagList
      onRemove={handleRemove}
      tags={tags}
    />
  ));

  it('태그들이 나타나야만 한다', () => {
    const tags = ['javascript', 'typescript', 'scala'];

    const { container } = renderTagList(tags);

    tags.forEach((tag) => {
      expect(container).toHaveTextContent(`#${tag}`);
    });
  });

  describe('태그를 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderTagList(['javascript']);

      fireEvent.click(screen.getByText('x'));

      expect(handleRemove).toBeCalledWith([]);
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import Tag from './Tag';

describe('Tag', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderTag = () => render((
    <Tag
      tag="tag"
      onRemove={given.onRemove}
      onClick={given.onClick}
    />
  ));

  context('삭제 함수가 존재하는 경우', () => {
    given('onRemove', () => handleClick);

    describe('태그를 클릭한다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderTag();

        fireEvent.click(screen.getByTestId('remove-icon'));

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });

  context('클릭 함수가 존재하는 경우', () => {
    given('onClick', () => jest.fn());

    it('삭제 아이콘이 나타나지 않아야한다', () => {
      renderTag();

      expect(screen.queryByTestId('remove-icon')).not.toBeInTheDocument();
    });
  });
});

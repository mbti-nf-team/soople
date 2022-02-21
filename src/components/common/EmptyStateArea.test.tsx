import { render, screen } from '@testing-library/react';

import EmptyStateArea from './EmptyStateArea';

describe('EmptyStateArea', () => {
  const handleClick = jest.fn();

  const renderEmptyStateArea = () => render((
    <EmptyStateArea
      emptyText="emptyText"
      buttonText="buttonText"
      onClick={handleClick}
      imageUrl={given.imageUrl}
      imageName="imageName"
    />
  ));

  context('이미지 url이 존재하는 경우', () => {
    given('imageUrl', () => 'test.com');

    it('이미지가 나타나야만 한다', () => {
      renderEmptyStateArea();

      expect(screen.getByTestId('empty-state-image')).toBeInTheDocument();
    });
  });

  context('이미지 url이 존재하지 않는 경우', () => {
    given('imageUrl', () => '');

    it('empty state에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderEmptyStateArea();

      expect(container).toHaveTextContent('emptyText');
    });
  });
});

import { render } from '@testing-library/react';

import EmptyStateArea from './EmptyStateArea';

describe('EmptyStateArea', () => {
  const handleClick = jest.fn();

  const renderEmptyStateArea = () => render((
    <EmptyStateArea
      emptyText="emptyText"
      buttonText="buttonText"
      onClick={handleClick}
    />
  ));

  it('empty state area에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderEmptyStateArea();

    expect(container).toHaveTextContent('emptyText');
  });
});

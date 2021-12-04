import { render, screen } from '@testing-library/react';

import NewHeader from './NewHeader';

describe('NewHeader', () => {
  const renderNewHeader = () => render((
    <NewHeader />
  ));

  it('헤더 정보가 나타나야만 한다', () => {
    const { container } = renderNewHeader();

    expect(container).toHaveTextContent('등록하기');
    expect(screen.getByText('< 팀 모집하기')).toHaveAttribute('href', '/');
  });
});

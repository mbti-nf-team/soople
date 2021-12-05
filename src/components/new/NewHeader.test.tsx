import { fireEvent, render, screen } from '@testing-library/react';

import NewHeader from './NewHeader';

describe('NewHeader', () => {
  const handleSubmit = jest.fn();

  const renderNewHeader = () => render((
    <NewHeader
      onSubmit={handleSubmit}
    />
  ));

  it('헤더 정보가 나타나야만 한다', () => {
    const { container } = renderNewHeader();

    expect(container).toHaveTextContent('등록하기');
    expect(screen.getByText('< 팀 모집하기')).toHaveAttribute('href', '/');
  });

  describe('"등록하기" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderNewHeader();

      fireEvent.click(screen.getByText('등록하기'));

      expect(handleSubmit).toBeCalledTimes(1);
    });
  });
});

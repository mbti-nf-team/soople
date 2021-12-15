import { fireEvent, render, screen } from '@testing-library/react';

import WriteHeader from './WriteHeader';

describe('WriteHeader', () => {
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
  });

  const renderWriteHeader = () => render((
    <WriteHeader
      title={given.title}
      onSubmit={handleSubmit}
    />
  ));

  it('헤더 정보가 나타나야만 한다', () => {
    const { container } = renderWriteHeader();

    expect(container).toHaveTextContent('등록하기');
    expect(screen.getByText('< 팀 모집하기')).toHaveAttribute('href', '/');
  });

  describe('"등록하기" 버튼을 클릭한다', () => {
    context('제목이 존재하는 경우', () => {
      given('title', () => 'title');

      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderWriteHeader();

        fireEvent.click(screen.getByText('등록하기'));

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    context('제목이 존재하지 않는 경우', () => {
      given('title', () => '');

      it('"등록하기" 버튼은 disable되어야만 한다', () => {
        renderWriteHeader();

        expect(screen.getByText('등록하기')).toHaveAttribute('disabled');
      });
    });
  });
});

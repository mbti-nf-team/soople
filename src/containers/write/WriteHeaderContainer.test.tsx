import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import WriteHeaderContainer from './WriteHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('recoil');

describe('WriteHeaderContainer', () => {
  const mockBack = jest.fn();
  const handleSetPublishModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSetRecoilState as jest.Mock).mockImplementation(() => handleSetPublishModalVisible);
    (useRecoilValue as jest.Mock).mockImplementation(() => (given.writeFields));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: given.query,
      back: mockBack,
    }));
  });

  const renderWriteHeaderContainer = () => render((
    <WriteHeaderContainer />
  ));

  context('query.id가 존재하는 경우', () => {
    given('query', () => ({
      id: 'id',
    }));
    given('writeFields', () => ({
      title: 'title',
    }));

    it('"글 수정하기"가 보여야만 한다', () => {
      const { container } = renderWriteHeaderContainer();

      expect(container).toHaveTextContent('글 수정하기');
    });
  });

  context('query.id가 존재하지 않은 경우', () => {
    given('query', () => (null));

    context('제목이 작성되지 않은 경우', () => {
      given('writeFields', () => ({
        title: '',
      }));

      describe('"등록하기" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 발생하면 안된다', () => {
          renderWriteHeaderContainer();

          fireEvent.click(screen.getByText('등록하기'));

          expect(handleSetPublishModalVisible).not.toBeCalled();
        });
      });

      describe('"팀 모집하기"을 클릭한다', () => {
        it('router.back이 호출되어야만 한다', () => {
          renderWriteHeaderContainer();

          fireEvent.click(screen.getByText('팀 모집하기'));

          expect(mockBack).toBeCalledTimes(1);
        });
      });
    });

    context('제목이 작성된 경우', () => {
      given('writeFields', () => ({
        title: 'title',
      }));

      describe('"등록하기" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 발생해야만 한다', () => {
          renderWriteHeaderContainer();

          fireEvent.click(screen.getByText('등록하기'));

          expect(handleSetPublishModalVisible).toBeCalledWith(true);
        });
      });
    });
  });
});

import { useRouter } from 'next/router';

import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';

import WriteHeaderContainer from './WriteHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('recoil');

describe('WriteHeaderContainer', () => {
  const title = 'title';
  const mockBack = jest.fn();
  const handleSetPublishModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useSetRecoilState as jest.Mock).mockImplementation(() => handleSetPublishModalVisible);
    (useRecoilValue as jest.Mock).mockImplementation(() => (given.writeFields));
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: given.query,
      back: mockBack,
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderWriteHeaderContainer = () => render((
    <InjectResponsiveContext width={given.width}>
      <WriteHeaderContainer />
    </InjectResponsiveContext>
  ));

  context('모바일인 경우', () => {
    given('width', () => 400);
    given('writeFields', () => ({
      title,
    }));

    context('스크롤 위치가 30이하 경우', () => {
      it('타이틀 텍스트는 존재하지 않아야만 한다', () => {
        renderWriteHeaderContainer();

        fireEvent.scroll(window, { target: { scrollY: 20 } });

        expect(screen.getByTestId('go-back-title')).toHaveTextContent('');
      });
    });

    context('스크롤 위치가 30초과인 경우', () => {
      it('타이틀 텍스트는 제목이여야만 한다', async () => {
        renderWriteHeaderContainer();

        await act(async () => {
          fireEvent.scroll(window, { target: { scrollY: 300 } });
          await jest.advanceTimersByTime(200);
        });

        expect(screen.getByTestId('go-back-title')).toHaveTextContent(title);
      });
    });
  });

  context('query.id가 존재하는 경우', () => {
    given('query', () => ({
      id: 'id',
    }));
    given('writeFields', () => ({
      title,
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
        title,
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

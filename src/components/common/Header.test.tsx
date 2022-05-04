import { fireEvent, render, screen } from '@testing-library/react';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';

import FIXTURE_ALARM from '../../../fixtures/alarm';

import Header from './Header';

jest.mock('@/hooks/api/alarm/useFetchAlertAlarms');

describe('Header', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchAlertAlarms as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_ALARM],
    }));
  });

  const renderHeader = () => render((
    <Header
      signOut={jest.fn()}
      isScrollTop
      user={given.user}
      onClick={handleClick}
      hasBackground
      isLoading={given.isLoading}
      hasOnlyLogo={given.hasOnlyLogo}
    />
  ));

  context('signup 페이지인 경우', () => {
    given('hasOnlyLogo', () => true);

    it('signUp 헤더에 대한 정보가 나타나야만 한다', () => {
      renderHeader();

      expect(screen.getByTestId('only-logo-block')).toBeInTheDocument();
    });
  });

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderHeader();

      expect(screen.getByTitle('loading-skeleton')).toBeInTheDocument();
    });
  });

  context('세션이 존재한 경우', () => {
    given('user', () => ({
      uid: '1',
      name: 'test',
      email: 'test@test.com',
      image: 'http://image.com',
    }));

    it('"팀 모집하기" 링크가 나타나야만 한다', () => {
      renderHeader();

      expect(screen.getByText('팀 모집하기')).toHaveAttribute('href', '/write');
    });
  });

  context('세션 정보가 존재하지 않는 경우', () => {
    given('user', () => (null));

    it('"시작하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('시작하기');
    });

    describe('"시작하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('시작하기'));

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});

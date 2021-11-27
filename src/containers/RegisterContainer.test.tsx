import { useSelector } from 'react-redux';

import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import PROFILE_FIXTURE from '../../fixtures/profile';

import RegisterContainer from './RegisterContainer';

describe('RegisterContainer', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        auth: given.auth,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderRegisterContainer = () => render((
    <RegisterContainer />
  ));

  context('로그인 후 가입페이지로 redirect된 경우', () => {
    given('auth', () => (PROFILE_FIXTURE));

    it('회원가입 페이지에 대한 정보 나타나야만 한다', () => {
      const { container } = renderRegisterContainer();

      expect(container).toHaveTextContent('기본 회원 정보를 등록해주세요.');
    });

    describe('저장버튼을 클리한다', () => {
      const spyOnConsole = jest.spyOn(window.console, 'log');

      beforeEach(() => {
        spyOnConsole.mockReturnValueOnce();
      });

      it('"console.log"가 호출되어야만 한다', async () => {
        renderRegisterContainer();

        await act(async () => {
          await fireEvent.submit(screen.getByText('저장'));
        });

        expect(spyOnConsole).toBeCalledWith({
          displayName: 'test',
          id: 'test',
          portfolioUrl: '',
        });
      });
    });
  });

  context('비정상적으로 가입페이지로 redirect된 경우', () => {
    given('auth', () => (null));

    it('"로그인부터 진행해주세요!" 메시지가 나타나야만 한다', () => {
      const { container } = renderRegisterContainer();

      expect(container).toHaveTextContent('로그인부터 진행해주세요!');
    });
  });
});

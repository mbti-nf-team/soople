import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';

import ApplicationStatusHeaderContainer from './ApplicationStatusHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatusHeaderContainer', () => {
  const handleBack = jest.fn();
  const handleReplace = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        group: given.group,
        applicants: [{
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        }],
      },
    }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      back: handleBack,
      replace: handleReplace,
    }));
  });

  const renderApplicationStatusHeaderContainer = () => render((
    <ApplicationStatusHeaderContainer />
  ));

  context('모집완료가 되지 않은 글인 경우', () => {
    given('group', () => GROUP_FIXTURE);

    describe('"1명의 신청현황"을 클릭한다', () => {
      it('router.back이 호출되어야만 한다', () => {
        renderApplicationStatusHeaderContainer();

        fireEvent.click(screen.getByText('1명의 신청현황'));

        expect(handleBack).toBeCalledTimes(1);
      });
    });

    describe('"모집완료" 버튼 클릭 후 모달창에서 "완료하기" 버튼을 클릭한다', () => {
      it('dispatch 액션이 호출되어야만 한다', () => {
        renderApplicationStatusHeaderContainer();

        fireEvent.click(screen.getByText('모집 완료'));
        fireEvent.click(screen.getByText('완료하기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });

  context('모집완료된 글인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: true,
    }));

    it('router.replace가 호출되어야만 한다', () => {
      renderApplicationStatusHeaderContainer();

      expect(handleReplace).toBeCalledTimes(1);
    });
  });
});

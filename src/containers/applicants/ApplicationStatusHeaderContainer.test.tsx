import { useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusHeaderContainer from './ApplicationStatusHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatusHeaderContainer', () => {
  const handleBack = jest.fn();

  beforeEach(() => {
    handleBack.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        applicants: [APPLICANT_FIXTURE],
      },
    }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      back: handleBack,
    }));
  });

  const renderApplicationStatusHeaderContainer = () => render((
    <ApplicationStatusHeaderContainer />
  ));

  describe('"1명의 신청현황"을 클릭한다', () => {
    it('router.back이 호출되어야만 한다', () => {
      renderApplicationStatusHeaderContainer();

      fireEvent.click(screen.getByText('1명의 신청현황'));

      expect(handleBack).toBeCalledTimes(1);
    });
  });
});

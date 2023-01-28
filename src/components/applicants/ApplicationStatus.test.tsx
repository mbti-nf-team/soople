import { useRouter } from 'next/router';

import { fireEvent, render, screen } from '@testing-library/react';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import { errorToast } from '@/utils/toast';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatus from './ApplicationStatus';

jest.mock('@/utils/toast');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/applicant/useUpdateApplicant');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatus', () => {
  const updateMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: given.applicants || [],
    }));

    (useUpdateApplicant as jest.Mock).mockImplementation(() => ({
      mutate: updateMutate,
    }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        applicant: given.query,
      },
      back: jest.fn(),
    }));
  });

  const renderApplicationStatus = () => render((
    <ApplicationStatus />
  ));

  context('모집한 신청자가 존재하는 경우', () => {
    given('applicants', () => [APPLICANT_FIXTURE]);

    describe('"선택" 버튼을 클릭한다', () => {
      it('toggleConfirm mutate 액션이 호출되어야만 한다', () => {
        renderApplicationStatus();

        fireEvent.click(screen.getByText('선택'));

        expect(updateMutate).toHaveBeenCalledWith({
          ...APPLICANT_FIXTURE,
          isConfirm: !APPLICANT_FIXTURE.isConfirm,
        });
      });
    });

    context('query의 applicant가 신청자리스트에 존재하지 않는 경우', () => {
      given('query', () => 'applicantId');

      it('errorToast가 "신청을 취소한 사용자에요."와 함께 호출되어야만 한다', () => {
        renderApplicationStatus();

        expect(errorToast).toHaveBeenCalledWith('신청을 취소한 사용자에요.');
      });
    });

    context('query의 applicant가 신청자리스트에 존재하는 경우', () => {
      given('query', () => '12345678');

      it('errorToast가 호출되지 않아야만 한다', () => {
        renderApplicationStatus();

        expect(errorToast).not.toHaveBeenCalled();
      });
    });
  });

  context('모집한 신청자가 존재하지 않은 경우', () => {
    given('applicants', () => []);

    it('"신청한 사람이 없어요" 문구가 보여야만 한다', () => {
      const { container } = renderApplicationStatus();

      expect(container).toHaveTextContent('신청한 사람이 없어요');
    });
  });
});

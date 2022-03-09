import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import { errorToast } from '@/utils/toast';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusContainer from './ApplicationStatusContainer';

jest.mock('@/utils/toast');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/applicant/useUpdateApplicant');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatusContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      back: jest.fn(),
      query: {
        applicant: given.query,
      },
    }));

    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: given.applicants || [],
      isLoading: given.isLoading,
      isSuccess: true,
    }));

    (useUpdateApplicant as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderApplicationStatusContainer = () => render((
    <ApplicationStatusContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderApplicationStatusContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);
    given('applicants', () => [APPLICANT_FIXTURE]);

    describe('"선택" 버튼을 클릭한다', () => {
      it('toggleConfirm mutate 액션이 호출되어야만 한다', () => {
        renderApplicationStatusContainer();

        fireEvent.click(screen.getByText('선택'));

        expect(mutate).toBeCalledWith({
          ...APPLICANT_FIXTURE,
          isConfirm: !APPLICANT_FIXTURE.isConfirm,
        });
      });
    });

    context('API가 로딩중이 아니고 성공하고 query의 applicant가 신청자리스트에 존재하지 않는 경우', () => {
      given('isLoading', () => false);
      given('applicants', () => [APPLICANT_FIXTURE]);
      given('query', () => 'applicantId');

      it('errorToast가 "신청을 취소한 사용자에요."와 함께 호출되어야만 한다', () => {
        renderApplicationStatusContainer();

        expect(errorToast).toBeCalledWith('신청을 취소한 사용자에요.');
      });
    });

    context('API가 로딩중이 아니고 성공하고 query의 applicant가 신청자리스트에 존재하는 경우', () => {
      given('isLoading', () => false);
      given('applicants', () => [APPLICANT_FIXTURE]);
      given('query', () => '12345678');

      it('errorToast가 호출되지 않아야만 한다', () => {
        renderApplicationStatusContainer();

        expect(errorToast).not.toBeCalled();
      });
    });
  });
});

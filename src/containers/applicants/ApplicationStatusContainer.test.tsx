import { fireEvent, render, screen } from '@testing-library/react';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusContainer from './ApplicationStatusContainer';

jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/applicant/useUpdateApplicant');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    back: jest.fn(),
  })),
}));

describe('ApplicationStatusContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    mutate.mockClear();

    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [APPLICANT_FIXTURE],
      isLoading: given.isLoading,
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
  });
});

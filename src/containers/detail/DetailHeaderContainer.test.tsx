import { act, fireEvent, screen } from '@testing-library/react';
import { useSetRecoilState } from 'recoil';

import useApplyGroup from '@/hooks/api/applicant/useApplyGroup';
import useCancelApply from '@/hooks/api/applicant/useCancelApply';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import renderWithPortal from '@/test/renderWithPortal';
import { successToast } from '@/utils/toast';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderContainer from './DetailHeaderContainer';

jest.mock('@/hooks/api/applicant/useApplyGroup');
jest.mock('@/hooks/api/applicant/useCancelApply');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/utils/toast');
jest.mock('recoil');

describe('DetailHeaderContainer', () => {
  const handleSetSignInModalVisible = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: GROUP_FIXTURE,
    }));
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: given.applicants,
      isLoading: false,
    }));
    (useApplyGroup as jest.Mock).mockImplementation(() => ({
      mutate,
      isSuccess: given.isSuccessApply,
    }));
    (useCancelApply as jest.Mock).mockImplementation(() => ({
      mutate,
      isSuccess: given.isSuccessCancelApply,
    }));
    (useSetRecoilState as jest.Mock).mockImplementation(() => handleSetSignInModalVisible);
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
  });

  const renderDetailHeaderContainer = () => renderWithPortal((
    <DetailHeaderContainer />
  ));

  context('비로그인 사용자인 경우', () => {
    given('user', () => null);
    given('applicants', () => []);

    describe('"신청하기" 버튼을 클릭한다', () => {
      it('handleSetSignInModalVisible가 true와 함께 호출되어야만 한다', () => {
        renderDetailHeaderContainer();

        fireEvent.click(screen.getByText('신청하기'));

        expect(handleSetSignInModalVisible).toHaveBeenCalledWith(true);
      });
    });
  });

  context('로그인한 사용자인 경우', () => {
    const user = {
      ...PROFILE_FIXTURE,
      uid: '123',
    };

    given('user', () => (user));

    context('신청하지 않은 사용자인 경우', () => {
      given('applicants', () => []);

      describe('신청 모달창의 "신청하기" 버튼을 클릭한다', () => {
        it('신청 mutate 액션이 발생해야만 한다', async () => {
          renderDetailHeaderContainer();

          fireEvent.click(screen.getByText('신청하기'));
          await act(async () => {
            await fireEvent.change(screen.getByPlaceholderText('간단한 소개글을 입력하세요'), {
              target: { value: 'test' },
            });
            fireEvent.submit(screen.getByTestId('apply-button'));
          });

          expect(mutate).toHaveBeenCalledWith({
            portfolioUrl: PROFILE_FIXTURE.portfolioUrl,
            introduce: 'test',
            group: GROUP_FIXTURE,
            applicant: user,
          });
        });
      });

      context('신청에 성공한 경우', () => {
        given('isSuccessApply', () => true);

        it('successToast가 "팀 신청을 완료했어요."와 함께 호출되어야만 한다', () => {
          renderDetailHeaderContainer();

          expect(successToast).toHaveBeenCalledWith('팀 신청을 완료했어요.');
        });
      });
    });

    context('신청한 사용자인 경우', () => {
      given('applicants', () => [{
        ...APPLICANT_FIXTURE,
        applicant: {
          ...APPLICANT_FIXTURE.applicant,
          uid: '123',
        },
      }]);

      describe('"신청 취소" 버튼을 클릭한다', () => {
        it('신청 취소 mutate 액션이 호출되어야만 한다', () => {
          renderDetailHeaderContainer();

          fireEvent.click(screen.getByText('신청 취소'));
          fireEvent.click(screen.getByText('취소하기'));

          expect(mutate).toHaveBeenCalledWith(APPLICANT_FIXTURE.uid);
        });
      });

      context('신청을 취소한 경우', () => {
        given('isSuccessCancelApply', () => true);

        it('successToast가 "신청을 취소했어요."와 함께 호출되어야만 한다', () => {
          renderDetailHeaderContainer();

          expect(successToast).toHaveBeenCalledWith('신청을 취소했어요.');
        });
      });
    });
  });
});

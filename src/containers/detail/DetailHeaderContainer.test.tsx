import { useDispatch, useSelector } from 'react-redux';

import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import useApplyGroup from '@/hooks/api/useApplyGroup';
import useCancelApply from '@/hooks/api/useCancelApply';
import useFetchApplicants from '@/hooks/api/useFetchApplicants';
import useFetchGroup from '@/hooks/api/useFetchGroup';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderContainer from './DetailHeaderContainer';

jest.mock('@/hooks/api/useApplyGroup');
jest.mock('@/hooks/api/useCancelApply');
jest.mock('@/hooks/api/useFetchApplicants');
jest.mock('@/hooks/api/useFetchGroup');

describe('DetailHeaderContainer', () => {
  const dispatch = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mutate.mockClear();

    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: GROUP_FIXTURE,
    }));
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: given.applicants,
      isLoading: false,
    }));
    (useApplyGroup as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useCancelApply as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  const renderDetailHeaderContainer = () => render((
    <DetailHeaderContainer />
  ));

  context('비로그인 사용자인 경우', () => {
    given('user', () => null);
    given('applicants', () => []);

    describe('"신청하기" 버튼을 클릭한다', () => {
      it('dispatch 액션이 type은 auth/setSignInModalVisible와 payload는 true와 같이 호출되어야만 한다', () => {
        renderDetailHeaderContainer();

        fireEvent.click(screen.getByText('신청하기'));

        expect(dispatch).toBeCalledWith({
          type: 'auth/setSignInModalVisible',
          payload: true,
        });
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

          expect(mutate).toBeCalledWith({
            portfolioUrl: PROFILE_FIXTURE.portfolioUrl,
            introduce: 'test',
            groupId: GROUP_FIXTURE.groupId,
            applicant: user,
          });
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

          expect(mutate).toBeCalledWith(APPLICANT_FIXTURE.uid);
        });
      });
    });
  });
});

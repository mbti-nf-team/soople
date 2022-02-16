import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import useUpdateCompletedApply from '@/hooks/api/group/useUpdateCompletedApply';
import { tomorrow } from '@/utils/utils';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';

import ApplicationStatusHeaderContainer from './ApplicationStatusHeaderContainer';

jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/hooks/api/group/useUpdateCompletedApply');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ApplicationStatusHeaderContainer', () => {
  const handleBack = jest.fn();
  const handleReplace = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [{
        ...APPLICANT_FIXTURE,
        isConfirm: true,
      }, {
        ...APPLICANT_FIXTURE,
      }],
    }));
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: given.group,
    }));
    (useUpdateCompletedApply as jest.Mock).mockImplementation(() => ({
      mutate,
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
    given('isConfirm', () => true);

    context('현재 시간이 마감시간 전인 경우', () => {
      given('group', () => ({
        ...GROUP_FIXTURE,
        recruitmentEndDate: tomorrow(new Date()),
        recruitmentEndSetting: 'automatic',
      }));

      it('모집 완료 모달창에서 "아직 모집 마감시간이"가 보여야만 한다', () => {
        const { container } = renderApplicationStatusHeaderContainer();

        fireEvent.click(screen.getByText('모집 완료'));

        expect(container).toHaveTextContent('아직 모집 마감시간이');
      });
    });

    context('현재 시간이 마감시간 후인 경우', () => {
      given('group', () => GROUP_FIXTURE);

      describe('"2명의 신청현황"을 클릭한다', () => {
        it('router.back이 호출되어야만 한다', () => {
          renderApplicationStatusHeaderContainer();

          fireEvent.click(screen.getByText('2명의 신청현황'));

          expect(handleBack).toBeCalledTimes(1);
        });
      });

      describe('"모집완료" 버튼 클릭 후 모달창에서 "완료하기" 버튼을 클릭한다', () => {
        it('onSubmit mutate 액션이 호출되어야만 한다', () => {
          renderApplicationStatusHeaderContainer();

          fireEvent.click(screen.getByText('모집 완료'));
          fireEvent.click(screen.getByText('완료하기'));

          expect(mutate).toBeCalledWith({
            groupId: GROUP_FIXTURE.groupId,
            completedGroupForm: {
              numberConfirmApplicants: 1,
              message: '',
            },
            alarmForms: [
              {
                groupId: GROUP_FIXTURE.groupId,
                type: 'confirmed',
                userUid: APPLICANT_FIXTURE.applicant.uid,
              },
              {
                groupId: GROUP_FIXTURE.groupId,
                type: 'rejected',
                userUid: APPLICANT_FIXTURE.applicant.uid,
              },
            ],
          });
        });
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

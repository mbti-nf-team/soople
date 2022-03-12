import { act, renderHook } from '@testing-library/react-hooks';

import { postAddAlarm } from '@/services/api/alarm';
import { patchCompletedGroup } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useUpdateCompletedApply from './useUpdateCompletedApply';

jest.mock('@/services/api/group');
jest.mock('@/services/api/alarm');

describe('useUpdateCompletedApply', () => {
  const useUpdateCompletedApplyHook = () => renderHook(() => useUpdateCompletedApply(), {
    wrapper,
  });

  it('patchCompletedGroup를 호출해야만 한다', async () => {
    const { result } = useUpdateCompletedApplyHook();

    await act(async () => {
      await result.current.mutate({
        groupId: 'groupId',
        completedGroupForm: {
          message: 'message',
          numberConfirmApplicants: 1,
        },
        alarmForms: [{
          group: FIXTURE_GROUP,
          type: 'confirmed',
          userUid: 'userUid',
          applicantUid: 'applicantUid',
        }],
      });
    });

    expect(patchCompletedGroup).toBeCalled();
    expect(postAddAlarm).toBeCalled();
    expect(result.current.isSuccess).toBeTruthy();
  });
});

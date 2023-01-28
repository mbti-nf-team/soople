import { useRouter } from 'next/router';

import { act, renderHook } from '@testing-library/react';

import { postAddAlarm } from '@/services/api/alarm';
import { patchCompletedGroup } from '@/services/api/group';
import wrapper from '@/test/InjectMockProviders';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useUpdateCompletedApply from './useUpdateCompletedApply';

jest.mock('@/services/api/group');
jest.mock('@/services/api/alarm');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useUpdateCompletedApply', () => {
  const mockReplace = jest.fn();
  const groupId = 'groupId';

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
  });

  const useUpdateCompletedApplyHook = () => renderHook(() => useUpdateCompletedApply(), {
    wrapper,
  });

  it('replace가 해당 글 url과 함께 호출해야만 한다', async () => {
    const { result } = useUpdateCompletedApplyHook();

    await act(async () => {
      await result.current.mutate({
        groupId,
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

    expect(patchCompletedGroup).toHaveBeenCalled();
    expect(postAddAlarm).toHaveBeenCalled();
    expect(result.current.isSuccess).toBeTruthy();
    expect(mockReplace).toHaveBeenCalledWith(`/detail/${groupId}`);
  });
});

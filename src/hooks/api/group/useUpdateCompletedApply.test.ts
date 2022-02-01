import { act, renderHook } from '@testing-library/react-hooks';

import { patchCompletedGroup } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import useUpdateCompletedApply from './useUpdateCompletedApply';

jest.mock('@/services/api/group');

describe('useUpdateCompletedApply', () => {
  const useUpdateCompletedApplyHook = () => renderHook(() => useUpdateCompletedApply(), {
    wrapper,
  });

  it('patchCompletedGroup를 호출해야만 한다', async () => {
    const { result } = useUpdateCompletedApplyHook();

    await act(async () => {
      await result.current.mutate({
        groupId: '1',
        numberConfirmApplicants: 5,
      });
    });

    expect(patchCompletedGroup).toBeCalled();
    expect(result.current.isSuccess).toBeTruthy();
  });
});

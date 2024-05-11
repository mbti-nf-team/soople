import { renderHook, waitFor } from '@testing-library/react';

import { getUserAppliedGroupCount } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchUserAppliedGroups from './useFetchUserAppliedGroupCount';

jest.mock('@/services/api/applicants');

describe('useFetchUserAppliedGroups', () => {
  const count = 2;

  const useFetchUserAppliedGroupsHook = () => renderHook(() => useFetchUserAppliedGroups('userUid'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getUserAppliedGroupCount as jest.Mock).mockImplementation(() => (count));
  });

  it('신청한 groups에 대한 개수를 반환해야만 한다', async () => {
    const { result } = useFetchUserAppliedGroupsHook();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toBe(count);
  });
});

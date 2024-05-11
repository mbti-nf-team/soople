import { renderHook, waitFor } from '@testing-library/react';

import { getUserRecruitedGroupCount } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchUserRecruitedGroupCount from './useFetchUserRecruitedGroupCount';

jest.mock('@/services/api/group');

describe('useFetchUserRecruitedGroupCount', () => {
  const count = 3;

  const useFetchUserRecruitedGroupCountHook = () => renderHook(() => useFetchUserRecruitedGroupCount('userUid'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getUserRecruitedGroupCount as jest.Mock).mockImplementation(() => (count));
  });

  it('모집한 groups 대한 개수를 반환해야만 한다', async () => {
    const { result } = useFetchUserRecruitedGroupCountHook();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBe(count);
  });
});

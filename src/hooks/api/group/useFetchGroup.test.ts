import { renderHook } from '@testing-library/react-hooks';

import { getGroupDetail } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchGroup from './useFetchGroup';

jest.mock('@/services/api/group');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: 'groupId',
    },
  })),
}));

describe('useFetchGroup', () => {
  const useFetchGroupHook = () => renderHook(() => useFetchGroup(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (getGroupDetail as jest.Mock).mockImplementation(() => (FIXTURE_GROUP));
  });

  it('group에 대한 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useFetchGroupHook();

    await waitFor(() => result.current.isSuccess);

    expect(getGroupDetail).toBeCalledWith('groupId');
    expect(result.current.data).toEqual(FIXTURE_GROUP);
  });
});

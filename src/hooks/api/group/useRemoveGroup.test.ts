import { act, renderHook } from '@testing-library/react-hooks';

import { deleteGroup } from '@/services/api/group';
import { deleteTagCount } from '@/services/api/tagsCount';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useRemoveGroup from './useRemoveGroup';

jest.mock('@/services/api/group');
jest.mock('@/services/api/tagsCount');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));

describe('useRemoveGroup', () => {
  const useRemoveGroupHook = () => renderHook(() => useRemoveGroup(), {
    wrapper,
  });

  it('deleteGroup를 호출해야만 한다', async () => {
    const { result } = useRemoveGroupHook();

    await act(async () => {
      await result.current.mutate({
        ...FIXTURE_GROUP,
        tags: ['test'],
      });
    });

    expect(deleteGroup).toBeCalled();
    expect(deleteTagCount).toBeCalled();
    expect(result.current.isSuccess).toBeTruthy();
  });
});

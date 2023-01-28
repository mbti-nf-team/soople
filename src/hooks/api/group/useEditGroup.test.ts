import { useRouter } from 'next/router';

import { act, renderHook } from '@testing-library/react';

import { patchEditGroup } from '@/services/api/group';
import wrapper from '@/test/InjectMockProviders';

import WRITE_FIELDS_FIXTURE from '../../../../fixtures/writeFields';

import useEditGroup from './useEditGroup';

jest.mock('@/services/api/group');
jest.mock('@/services/api/tagsCount');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useEditGroup', () => {
  const replace = jest.fn();
  const groupId = 'groupId';

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace,
    }));
  });

  const useEditGroupHook = () => renderHook(() => useEditGroup(), {
    wrapper,
  });

  it('patchEditGroup를 호출해야만 한다', async () => {
    const { result } = useEditGroupHook();

    await act(async () => {
      await result.current.mutate({
        groupId,
        writeFields: WRITE_FIELDS_FIXTURE,
        deleteTags: ['test'],
      });
    });

    expect(patchEditGroup).toHaveBeenCalledWith(groupId, WRITE_FIELDS_FIXTURE);
    expect(result.current.isSuccess).toBeTruthy();
    expect(replace).toHaveBeenCalledWith(`/detail/${groupId}`);
  });
});

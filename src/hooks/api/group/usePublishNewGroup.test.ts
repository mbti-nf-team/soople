import { useRouter } from 'next/router';

import { act, renderHook } from '@testing-library/react';

import { postNewGroup } from '@/services/api/group';
import wrapper from '@/test/InjectMockProviders';

import PROFILE_FIXTURE from '../../../../fixtures/profile';
import WRITE_FIELDS_FIXTURE from '../../../../fixtures/writeFields';

import usePublishNewGroup from './usePublishNewGroup';

jest.mock('@/services/api/group');
jest.mock('@/services/api/tagsCount');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('usePublishNewGroup', () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (postNewGroup as jest.Mock).mockResolvedValue('1');
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace,
    }));
  });

  const usePublishNewGroupHook = () => renderHook(() => usePublishNewGroup(), {
    wrapper,
  });

  it('postNewGroup를 호출해야만 한다', async () => {
    const { result } = usePublishNewGroupHook();

    await act(async () => {
      await result.current.mutate({
        profile: PROFILE_FIXTURE,
        writeFields: WRITE_FIELDS_FIXTURE,
      });
    });

    expect(postNewGroup).toBeCalledWith(PROFILE_FIXTURE, WRITE_FIELDS_FIXTURE);
    expect(result.current.isSuccess).toBeTruthy();
    expect(replace).toBeCalledWith('/detail/1');
  });
});

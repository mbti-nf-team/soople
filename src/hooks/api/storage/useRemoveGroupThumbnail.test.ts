import { act, renderHook, waitFor } from '@testing-library/react';

import { deleteGroupThumbnail } from '@/services/api/storage';
import wrapper from '@/test/InjectMockProviders';

import useRemoveGroupThumbnail from './useRemoveGroupThumbnail';

jest.mock('@/services/api/storage');

describe('useRemoveGroupThumbnail', () => {
  const thumbnailUrl = 'www.test.com';

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteGroupThumbnail as jest.Mock).mockImplementation(() => thumbnailUrl);
  });

  const useRemoveGroupThumbnailHook = () => renderHook(() => useRemoveGroupThumbnail(), {
    wrapper,
  });

  it('deleteGroupThumbnail를 호출해야만 한다', async () => {
    const { result } = useRemoveGroupThumbnailHook();

    await act(async () => {
      await result.current.mutate(thumbnailUrl);
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(deleteGroupThumbnail).toBeCalledWith(thumbnailUrl);
  });
});

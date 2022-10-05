import { act, renderHook, waitFor } from '@testing-library/react';

import { deleteStorageFile } from '@/services/api/storage';
import wrapper from '@/test/InjectMockProviders';

import useDeleteStorageFile from './useDeleteStorageFile';

jest.mock('@/services/api/storage');

describe('useDeleteStorageFile', () => {
  const thumbnailUrl = 'www.test.com';

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteStorageFile as jest.Mock).mockImplementation(() => thumbnailUrl);
  });

  const useDeleteStorageFileHook = () => renderHook(() => useDeleteStorageFile(), {
    wrapper,
  });

  it('deleteStorageFile를 호출해야만 한다', async () => {
    const { result } = useDeleteStorageFileHook();

    await act(async () => {
      await result.current.mutate(thumbnailUrl);
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(deleteStorageFile).toBeCalledWith(thumbnailUrl);
  });
});

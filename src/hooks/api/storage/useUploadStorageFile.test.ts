import { act, renderHook, waitFor } from '@testing-library/react';

import { uploadStorageFile } from '@/services/api/storage';
import wrapper from '@/test/ReactQueryWrapper';

import useUploadStorageFile from './useUploadStorageFile';

jest.mock('@/services/api/storage');

describe('useUploadStorageFile', () => {
  const thumbnailUrl = 'www.test.com';

  beforeEach(() => {
    jest.clearAllMocks();

    (uploadStorageFile as jest.Mock).mockImplementation(() => thumbnailUrl);
  });

  const useUploadStorageFileHook = () => renderHook(() => useUploadStorageFile(), {
    wrapper,
  });

  it('uploadStorageFile를 호출해야만 한다', async () => {
    const { result } = useUploadStorageFileHook();

    await act(async () => {
      await result.current.mutate({
        file: { name: thumbnailUrl } as File,
        storagePath: '/test',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(uploadStorageFile).toBeCalledWith({ file: { name: thumbnailUrl } as File, storagePath: '/test' });
  });
});

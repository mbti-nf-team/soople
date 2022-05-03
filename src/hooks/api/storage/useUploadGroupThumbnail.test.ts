import { act, renderHook } from '@testing-library/react';

import { uploadGroupThumbnail } from '@/services/api/storage';
import wrapper from '@/test/InjectMockProviders';

import useUploadGroupThumbnail from './useUploadGroupThumbnail';

jest.mock('@/services/api/storage');

describe('useUploadGroupThumbnail', () => {
  const thumbnailUrl = 'www.test.com';

  beforeEach(() => {
    jest.clearAllMocks();

    (uploadGroupThumbnail as jest.Mock).mockImplementation(() => thumbnailUrl);
  });

  const useUploadGroupThumbnailHook = () => renderHook(() => useUploadGroupThumbnail(), {
    wrapper,
  });

  it('uploadGroupThumbnail를 호출해야만 한다', async () => {
    const { result } = useUploadGroupThumbnailHook();

    await act(async () => {
      await result.current.mutate({
        thumbnail: { name: thumbnailUrl } as File,
        userUid: 'userUid',
      });
    });

    expect(uploadGroupThumbnail).toBeCalledWith({ thumbnail: { name: 'www.test.com' }, userUid: 'userUid' });
    expect(result.current.isSuccess).toBeTruthy();
  });
});

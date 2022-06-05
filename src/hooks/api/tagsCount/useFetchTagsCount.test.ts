import { renderHook } from '@testing-library/react-hooks';

import { getTagsCount } from '@/services/api/tagsCount';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchTagsCount from './useFetchTagsCount';

jest.mock('@/services/api/tagsCount');

describe('useFetchTagsCount', () => {
  const useFetchTagsCountHook = () => renderHook(() => useFetchTagsCount(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (getTagsCount as jest.Mock).mockImplementation(() => (given.tagsCount));
  });

  const tagsCount = [
    { name: 'JavaScript' },
    { count: 1 },
  ];

  given('tagsCount', () => tagsCount);

  it('태그에 대한 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useFetchTagsCountHook();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(tagsCount);
  });
});

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

  context('useQuery 반환값이 존재하지 않는 경우', () => {
    given('tagsCount', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchTagsCountHook();

      await waitFor(() => !!result.current.data);

      expect(result.current.data).toEqual([]);
    });
  });

  context('useQuery 반환값이 존재하는 경우', () => {
    const tagsCount = [
      { name: 'JavaScript' },
      { count: 1 },
    ];

    given('tagsCount', () => tagsCount);

    it('태그에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchTagsCountHook();

      await waitFor(() => !!result.current.data);

      expect(result.current.data).toEqual(tagsCount);
    });
  });
});

import { act, renderHook } from '@testing-library/react';
import { parseCookies, setCookie } from 'nookies';

import { patchIncreaseView } from '@/services/api/group';
import wrapper from '@/test/InjectMockProviders';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useFetchGroup from './useFetchGroup';
import useIncreaseView from './useIncreaseView';

jest.mock('@/services/api/group');
jest.mock('./useFetchGroup');
jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  parseCookies: jest.fn(),
  setCookie: jest.fn(),
}));

describe('useIncreaseView', () => {
  const viewedIds = 'groupId';

  beforeEach(() => {
    jest.clearAllMocks();

    (parseCookies as jest.Mock).mockImplementation(() => ({
      viewedGroup: viewedIds,
    }));

    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_GROUP,
    }));

    (patchIncreaseView as jest.Mock).mockImplementation(() => ({
      isAlreadyRead: given.isAlreadyRead,
      viewedIds,
    }));
  });

  const useIncreaseViewHook = () => renderHook(() => useIncreaseView(), {
    wrapper,
  });

  context('isAlreadyRead가 true인 경우', () => {
    given('isAlreadyRead', () => true);

    it('setCookie가 호출되지 않아야만 한다', async () => {
      const { result } = useIncreaseViewHook();

      await act(async () => {
        await result.current.mutate({
          groupId: FIXTURE_GROUP.groupId,
          views: FIXTURE_GROUP.views,
          viewedIds,
        });
      });

      expect(patchIncreaseView).toBeCalledWith({
        groupId: FIXTURE_GROUP.groupId,
        views: FIXTURE_GROUP.views,
      }, viewedIds);
      expect(setCookie).not.toBeCalled();
    });
  });

  context('isAlreadyRead가 false인 경우', () => {
    given('isAlreadyRead', () => false);
    const expiredDate = new Date();
    expiredDate.setUTCHours(24, 0, 0, 0);
    expiredDate.setUTCDate(expiredDate.getUTCDate() + 1);

    it('setCookie가 호출되어야만 한다', async () => {
      const { result } = useIncreaseViewHook();

      await act(async () => {
        await result.current.mutate({
          groupId: FIXTURE_GROUP.groupId,
          views: FIXTURE_GROUP.views,
          viewedIds,
        });
      });

      expect(patchIncreaseView).toBeCalledWith({
        groupId: FIXTURE_GROUP.groupId,
        views: FIXTURE_GROUP.views,
      }, viewedIds);
      expect(setCookie).toBeCalledWith(null, 'viewedGroup', viewedIds, {
        expires: expiredDate,
        path: '/',
      });
    });
  });
});

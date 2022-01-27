import { where } from 'firebase/firestore';

import { getGroupsQuery } from './getQuery';

describe('getQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupsQuery', () => {
    context('isCompleted가 true인 경우', () => {
      it('where이 두 번 호출되어야만 한다', () => {
        getGroupsQuery({
          category: ['project'],
          isFilterCompleted: true,
        });

        expect(where).toBeCalledWith('category', 'in', ['project']);
        expect(where).toBeCalledWith('isCompleted', '==', false);
      });
    });

    context('isCompleted가 false인 경우', () => {
      it('where이 한 번 호출되어야만 한다', () => {
        getGroupsQuery({
          category: ['project'],
          isFilterCompleted: false,
        });

        expect(where).toBeCalledWith('category', 'in', ['project']);
      });
    });
  });
});

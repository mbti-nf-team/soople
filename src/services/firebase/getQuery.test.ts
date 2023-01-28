import { where } from 'firebase/firestore';

import { getGroupsQuery } from './getQuery';

describe('getQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupsQuery', () => {
    context('isCompleted가 true인 경우', () => {
      context('tag가 존재하는 경우', () => {
        it('where이 세 번 호출되어야만 한다', () => {
          getGroupsQuery({
            category: ['project'],
            isFilterCompleted: true,
            tag: 'tag',
          }, []);

          expect(where).toHaveBeenCalledWith('category', 'in', ['project']);
          expect(where).toHaveBeenCalledWith('isCompleted', '==', false);
          expect(where).toHaveBeenCalledWith('tags', 'array-contains', 'tag');
        });
      });

      context('tag가 존재하지 않는 경우', () => {
        it('where이 두 번 호출되어야만 한다', () => {
          getGroupsQuery({
            category: ['project'],
            isFilterCompleted: true,
            tag: '',
          });

          expect(where).toHaveBeenCalledWith('category', 'in', ['project']);
          expect(where).toHaveBeenCalledWith('isCompleted', '==', false);
        });
      });
    });

    context('isCompleted가 false인 경우', () => {
      context('tag가 존재하는 경우', () => {
        it('where이 두 번 호출되어야만 한다', () => {
          getGroupsQuery({
            category: ['project'],
            isFilterCompleted: false,
            tag: 'tag',
          });

          expect(where).toHaveBeenCalledWith('category', 'in', ['project']);
          expect(where).toHaveBeenCalledWith('tags', 'array-contains', 'tag');
        });
      });

      context('tag가 존재하지 않는 경우', () => {
        it('where이 한 번 호출되어야만 한다', () => {
          getGroupsQuery({
            category: ['project'],
            isFilterCompleted: false,
            tag: '',
          });

          expect(where).toHaveBeenCalledWith('category', 'in', ['project']);
        });
      });
    });
  });
});

import { testApiHandler } from 'next-test-api-route-handler';

import { getFilteredGroups } from '@/services/api/group';

import group from '../../../fixtures/group';

import endpoint from './groups.api';

const handler: typeof endpoint = endpoint;

jest.mock('@/services/api/group');

describe('fetchGroups', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getFilteredGroups as jest.Mock).mockImplementation(() => ([group]));
  });

  context('GET이 아닌 메소드로 접근할 경우', () => {
    it('Status Code 404를 반환한다', async () => {
      await testApiHandler({
        handler,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'POST' });

          await expect(res.status).toBe(404);
        },
      });
    });

    context('GET 메소드로 접근할 경우', () => {
      context('category param이 두개인 경우', () => {
        it('Status Code 200을 반환한다', async () => {
          await testApiHandler({
            handler,
            url: '/api/groups?category=study&category=project&isFilterCompleted=true&tag=',
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              });

              await expect(res.status).toBe(200);
            },
          });
        });
      });

      context('category param이 한개인 경우', () => {
        it('Status Code 200을 반환한다', async () => {
          await testApiHandler({
            handler,
            url: '/api/groups?category=study&isFilterCompleted=true&tag=',
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              });

              await expect(res.status).toBe(200);
            },
          });
        });
      });
    });
  });
});

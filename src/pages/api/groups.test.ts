import { testApiHandler } from 'next-test-api-route-handler';

import endpoint from './groups.api';

const handler: typeof endpoint = endpoint;

jest.mock('@/services/api/group');

describe('fetchGroups', () => {
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
      it('Status Code 200을 반환한다', async () => {
        await testApiHandler({
          handler,
          url: '/api/groups?category=study,project&isFilterCompleted=true&tag=',
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

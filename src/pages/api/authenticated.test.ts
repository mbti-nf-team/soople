/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import firebaseAdmin from '@/services/firebase/firebaseAdmin';

import authenticated from './authenticated.api';

jest.mock('@/services/firebase/firebaseAdmin', () => ({
  auth: jest.fn(),
}));

describe('authenticated API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('Error가 존재하지 않는 경우', () => {
    const token = 'token';

    beforeEach(() => {
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      }));
    });

    it('status code는 200이고 token이 반환되어야만 한다', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        cookies: {
          token,
        },
      });

      await authenticated(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        token,
      });
    });
  });

  context('Error가 존재하는 경우', () => {
    const token = 'token';

    beforeEach(() => {
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockRejectedValue(new Error('Error')),
      }));
    });

    it('status code는 500이어야만 한다', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        cookies: {
          token,
        },
      });

      await authenticated(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

      expect(res._getStatusCode()).toBe(500);
    });
  });
});

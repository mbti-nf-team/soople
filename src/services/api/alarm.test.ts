import {
  addDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

import { AlarmForm } from '@/models/alarm';
import { formatAlarm } from '@/utils/firestore';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import { getUserAlarm, postAddAlarm } from './alarm';

jest.mock('../firebase');
jest.mock('@/utils/firestore');

describe('alarm API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postAddAlarm', () => {
    const collection = 'collectionRef';
    const createdAt = '2021-11-11';

    const alarm: AlarmForm = {
      group: GROUP_FIXTURE,
      type: 'apply',
      user: PROFILE_FIXTURE,
    };

    beforeEach(() => {
      (collectionRef as jest.Mock).mockReturnValueOnce(collection);
      (addDoc as jest.Mock).mockImplementation(() => ({
        id: '1',
      }));

      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const id = await postAddAlarm(alarm);

      expect(addDoc).toBeCalledWith(collection, {
        ...alarm,
        isViewed: false,
        createdAt,
      });

      expect(id).toBe('1');
    });
  });

  describe('getUserAlarm', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [PROFILE_FIXTURE],
      }));
      (formatAlarm as jest.Mock).mockReturnValueOnce(PROFILE_FIXTURE);
    });

    it('알람 리스트가 반환되어야만 한다', async () => {
      const response = await getUserAlarm('groupId');

      expect(response).toEqual([PROFILE_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });
});

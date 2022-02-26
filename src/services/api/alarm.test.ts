import {
  addDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

import { AlarmForm } from '@/models/alarm';
import { formatAlarm, formatCreatedAt } from '@/utils/firestore';

import ALARM_FIXTURE from '../../../fixtures/alarm';
import { collectionRef } from '../firebase';

import { getUserAlarm, getUserAlertAlarm, postAddAlarm } from './alarm';

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
      groupId: 'groupId',
      type: 'applied',
      userUid: 'userUid',
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
        docs: [ALARM_FIXTURE],
      }));
      (formatAlarm as jest.Mock).mockResolvedValue(ALARM_FIXTURE);
    });

    it('알람 리스트가 반환되어야만 한다', async () => {
      const response = await getUserAlarm('userUid');

      expect(response).toEqual([ALARM_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });

  describe('getUserAlertAlarm', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [ALARM_FIXTURE],
      }));
      (formatCreatedAt as jest.Mock).mockReturnValueOnce(ALARM_FIXTURE);
    });

    it('알람 리스트가 반환되어야만 한다', async () => {
      const response = await getUserAlertAlarm('userUid');

      expect(response).toEqual([ALARM_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });
});

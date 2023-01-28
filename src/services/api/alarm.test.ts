import {
  addDoc, getDocs, serverTimestamp, updateDoc,
} from 'firebase/firestore';

import { AlarmForm } from '@/models/alarm';
import { formatAlarm, formatCreatedAt, isLessThanPerPage } from '@/utils/firestore';

import ALARM_FIXTURE from '../../../fixtures/alarm';
import FIXTURE_GROUP from '../../../fixtures/group';
import { collectionRef } from '../firebase';

import {
  getUserAlarms, getUserAlertAlarm, patchAlarmViewed, postAddAlarm,
} from './alarm';

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
      group: FIXTURE_GROUP,
      type: 'applied',
      userUid: 'userUid',
      applicantUid: 'applicantUid',
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

      expect(addDoc).toHaveBeenCalledWith(collection, {
        ...alarm,
        isViewed: false,
        createdAt,
      });

      expect(id).toBe('1');
    });
  });

  describe('getUserAlarms', () => {
    const lastVisibleId = 'lastVisibleId';

    context('"lastUid"가 존재하지 않는 경우', () => {
      beforeEach(() => {
        (getDocs as jest.Mock).mockImplementationOnce(() => ({
          docs: [{
            ...ALARM_FIXTURE,
            id: lastVisibleId,
          }],
        }));
        (formatAlarm as jest.Mock).mockReturnValueOnce(ALARM_FIXTURE);
      });

      it('알람 리스트가 반환되어야만 한다', async () => {
        const response = await getUserAlarms('userUid', {
          perPage: 10,
        });

        expect(response).toEqual({
          items: [ALARM_FIXTURE],
          lastUid: lastVisibleId,
        });
      });
    });

    context('"lastUid"가 존재하는 경우', () => {
      context('empty가 true이거나 docs 길이가 perPage보다 작을 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: true,
            docs: [{
              ...ALARM_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatAlarm as jest.Mock).mockReturnValueOnce(ALARM_FIXTURE);
          (isLessThanPerPage as jest.Mock).mockImplementationOnce(
            () => jest.fn().mockReturnValueOnce(true),
          );
        });

        it('알람 리스트가 반환되어야만 한다', async () => {
          const response = await getUserAlarms('userUid', {
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [ALARM_FIXTURE],
          });
        });
      });

      context('empty가 false이고 docs 길이가 perPage보다 클 경우', () => {
        beforeEach(() => {
          (getDocs as jest.Mock).mockImplementationOnce(() => ({
            empty: false,
            docs: [{
              ...ALARM_FIXTURE,
              id: lastVisibleId,
            }],
          }));
          (formatAlarm as jest.Mock).mockReturnValueOnce(ALARM_FIXTURE);
        });

        it('알람 리스트가 반환되어야만 한다', async () => {
          const response = await getUserAlarms('userUid', {
            perPage: 0,
            lastUid: lastVisibleId,
          });

          expect(response).toEqual({
            items: [ALARM_FIXTURE],
            lastUid: lastVisibleId,
          });
        });
      });
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
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
  });

  describe('patchAlarmViewed', () => {
    it('updateDoc가 호출되어야만 한다', async () => {
      await patchAlarmViewed('alarmUid');

      expect(updateDoc).toHaveBeenCalledWith(undefined, {
        isViewed: true,
      });
    });
  });
});

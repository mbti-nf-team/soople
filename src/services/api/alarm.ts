import {
  addDoc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, startAfter, updateDoc, where,
} from 'firebase/firestore';

import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Alarm, AlarmForm, AlertAlarm } from '@/models/alarm';
import { formatAlarm, formatCreatedAt, isLessThanPerPage } from '@/utils/firestore';
import { targetFalseThenValue } from '@/utils/utils';

import { collectionRef, docRef } from '../firebase';

const ALARMS = 'alarms';

export const postAddAlarm = async (form: AlarmForm) => {
  const { id } = await addDoc(collectionRef(ALARMS), {
    ...form,
    isViewed: false,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getUserAlarms = async (userUid: string, {
  perPage = 10, lastUid,
}: InfiniteRequest): Promise<InfiniteResponse<Alarm>> => {
  const alarmsRef = collectionRef(ALARMS);
  const commonQueries = [where('userUid', '==', userUid), orderBy('createdAt', 'desc')];

  const isLengthLessThanPerPage = isLessThanPerPage(perPage);

  if (!lastUid) {
    const getQuery = query(
      alarmsRef,
      ...commonQueries,
      limit(perPage),
    );

    const response = await getDocs(getQuery);
    const lastVisible = response.docs[response.docs.length - 1];

    const alarms = await Promise.all([...response.docs.map(formatAlarm)]);

    return {
      items: alarms,
      lastUid: targetFalseThenValue(isLengthLessThanPerPage(response))(lastVisible?.id),
    };
  }

  const lastGroupRef = await getDoc(docRef(ALARMS, lastUid));
  const getQuery = query(
    alarmsRef,
    ...commonQueries,
    startAfter(lastGroupRef),
    limit(perPage),
  );

  const response = await getDocs(getQuery);

  if (isLengthLessThanPerPage(response)) {
    const alarms = await Promise.all([...response.docs.map(formatAlarm)]);

    return {
      items: alarms,
    };
  }

  const lastVisible = response.docs[response.docs.length - 1];
  const alarms = await Promise.all([...response.docs.map(formatAlarm)]);

  return {
    items: alarms,
    lastUid: lastVisible?.id,
  };
};

export const getUserAlertAlarm = async (userUid: string) => {
  const getQuery = query(
    collectionRef(ALARMS),
    where('userUid', '==', userUid),
    where('isViewed', '==', false),
  );

  const response = await getDocs(getQuery);

  return response.docs.map(formatCreatedAt) as AlertAlarm[];
};

export const patchAlarmViewed = async (uid: string) => {
  await updateDoc(docRef(ALARMS, uid), {
    isViewed: true,
  });
};

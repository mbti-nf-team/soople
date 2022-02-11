import {
  addDoc, getDocs, orderBy, query, serverTimestamp, where,
} from 'firebase/firestore';

import { Alarm, AlarmForm } from '@/models/alarm';
import { formatAlarm } from '@/utils/firestore';

import { collectionRef } from '../firebase';

const ALARMS = 'alarms';

export const postAddAlarm = async (form: AlarmForm) => {
  const { id } = await addDoc(collectionRef(ALARMS), {
    ...form,
    isViewed: false,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getUserAlarm = async (userUid: string) => {
  const getQuery = query(
    collectionRef(ALARMS),
    where('user.uid', '==', userUid),
    orderBy('createdAt', 'desc'),
  );

  const response = await getDocs(getQuery);

  return response.docs.map(formatAlarm) as Alarm[];
};

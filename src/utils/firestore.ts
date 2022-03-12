import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { Alarm, AlarmResponse } from '@/models/alarm';
import { Profile } from '@/models/auth';
import { getUserProfile } from '@/services/api/auth';

export const timestampToString = (timestamp: any) => timestamp.toDate().toString();

export const formatGroup = (group: QueryDocumentSnapshot<DocumentData>) => {
  const { createdAt } = group.data();

  return {
    ...group.data(),
    groupId: group.id,
    createdAt: timestampToString(createdAt),
  };
};

export const formatComment = (comment: QueryDocumentSnapshot<DocumentData>) => {
  const { createdAt } = comment.data();

  return {
    ...comment.data(),
    commentId: comment.id,
    createdAt: timestampToString(createdAt),
  };
};

export const formatCreatedAt = (applicant: QueryDocumentSnapshot<DocumentData>) => {
  const { createdAt } = applicant.data();

  return {
    ...applicant.data(),
    uid: applicant.id,
    createdAt: timestampToString(createdAt),
  };
};

export const formatAlarm = async (alarm: QueryDocumentSnapshot<DocumentData>) => {
  const {
    createdAt, group, userUid, isViewed, type, applicantUid,
  } = alarm.data() as AlarmResponse;

  const convertedAlarm = {
    uid: alarm.id,
    userUid,
    group,
    type,
    isViewed,
    createdAt: timestampToString(createdAt),
  };

  if (applicantUid) {
    const applicant = await getUserProfile(applicantUid) as Profile;

    return {
      ...convertedAlarm,
      applicant,
    } as Alarm;
  }

  return {
    ...convertedAlarm,
    applicant: null,
  } as Alarm;
};

import { Timestamp } from 'firebase/firestore';

export const timestampToString = jest.fn((date: Timestamp) => date);

export const formatGroup = jest.fn();

export const formatComment = jest.fn();

export const formatCreatedAt = jest.fn();

export const formatAlarm = jest.fn();

export const isLessThanPerPage = jest.fn().mockImplementation(() => jest.fn());

export const filterGroups = jest.fn();

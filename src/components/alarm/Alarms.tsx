import React, { ReactElement } from 'react';

import { Alarm } from '@/models/alarm';

import EmptyStateArea from '../common/EmptyStateArea';

import AlarmItem from './AlarmItem';

interface Props {
  alarms: Alarm[];
  isLoading: boolean;
}

function Alarms({ alarms, isLoading }: Props): ReactElement {
  if (isLoading) {
    return <>로딩중...</>;
  }

  if (alarms.length === 0) {
    return (
      <EmptyStateArea
        emptyText="알림이 없어요."
        buttonText="팀 살펴보기"
        href="/"
        marginTop="80px"
      />
    );
  }

  return (
    <>
      {alarms.map((alarm) => (
        <AlarmItem key={alarm.uid} alarm={alarm} />
      ))}
    </>
  );
}

export default Alarms;

import React, { ReactElement } from 'react';

import { Alarm } from '@/models/alarm';

import AlarmItem from './AlarmItem';

interface Props {
  alarms: Alarm[];
  isLoading: boolean;
}

function Alarms({ alarms, isLoading }: Props): ReactElement {
  if (isLoading) {
    return <>로딩중...</>;
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

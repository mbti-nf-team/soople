import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

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
        marginTop="80px"
      />
    );
  }

  return (
    <AlarmsWrapper>
      {alarms.map((alarm) => (
        <AlarmItem key={alarm.uid} alarm={alarm} />
      ))}
    </AlarmsWrapper>
  );
}

export default Alarms;

const AlarmsWrapper = styled.div`
  & > a:last-of-type {
    border-bottom: none;
  }
`;

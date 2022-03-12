import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { isEmpty } from 'ramda';

import { Alarm } from '@/models/alarm';

import EmptyStateArea from '../common/EmptyStateArea';

import AlarmItem from './AlarmItem';

interface Props {
  alarms: Alarm[];
  onClickAlarm: (alarmUid: string) => void;
}

function Alarms({ alarms, onClickAlarm }: Props): ReactElement {
  if (isEmpty(alarms)) {
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
        <AlarmItem
          key={alarm.uid}
          alarm={alarm}
          onClick={onClickAlarm}
        />
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

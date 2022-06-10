import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import { isEmpty } from 'ramda';

import { InfiniteRefState, InfiniteResponse } from '@/models';
import { Alarm } from '@/models/alarm';
import { targetFalseThenValue } from '@/utils/utils';

import EmptyStateArea from '../common/EmptyStateArea';

import AlarmItem from './AlarmItem';
import AlarmsSkeletonLoader from './AlarmsSkeletonLoader';

interface Props {
  alarms: InfiniteResponse<Alarm>[];
  refState: InfiniteRefState<HTMLAnchorElement>;
  onClickAlarm: (alarmUid: string) => void;
  isLoading?: boolean;
}

function Alarms({
  alarms, refState, isLoading, onClickAlarm,
}: Props): ReactElement {
  if (isEmpty(alarms) || isEmpty(alarms[0].items)) {
    return (
      <EmptyStateArea
        emptyText="알림이 없어요."
        marginTop="80px"
      />
    );
  }

  return (
    <>
      <AlarmsWrapper>
        {alarms.map(({ items }) => (
          items.map((alarm, index) => {
            const isLastItem = index === items.length - 1;

            return (
              <AlarmItem
                key={alarm.uid}
                alarm={alarm}
                onClick={onClickAlarm}
                ref={targetFalseThenValue(!isLastItem)(refState.lastItemRef)}
              />
            );
          })
        ))}
      </AlarmsWrapper>
      {isLoading && (
        <AlarmsSkeletonLoader />
      )}
    </>
  );
}

export default memo(Alarms);

const AlarmsWrapper = styled.div`
  & > a:last-of-type {
    border-bottom: none;
  }
`;

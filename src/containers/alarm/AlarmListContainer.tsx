import React, { ReactElement, useCallback } from 'react';

import Alarms from '@/components/alarm/Alarms';
import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
import useInfiniteFetchAlarms from '@/hooks/api/alarm/useInfiniteFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

function AlarmListContainer(): ReactElement {
  const { query, refState } = useInfiniteFetchAlarms();
  const { mutate: updateAlarm } = useUpdateAlarmViewed();

  const onClickAlarm = useCallback((alarmUid: string) => updateAlarm(alarmUid), [updateAlarm]);

  if (query.isLoading && ['fetching', 'idle'].includes(query.fetchStatus)) {
    return <AlarmsSkeletonLoader />;
  }

  return (
    <Alarms
      refState={refState}
      alarms={query.data.pages}
      onClickAlarm={onClickAlarm}
      isLoading={query.isFetchingNextPage}
    />
  );
}

export default AlarmListContainer;

import React, { ReactElement, useCallback } from 'react';

import Alarms from '@/components/alarm/Alarms';
import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

function AlarmListContainer(): ReactElement {
  const { data: alarms, isLoading, isIdle } = useFetchAlarms();
  const { mutate: updateAlarm } = useUpdateAlarmViewed();

  const onClickAlarm = useCallback((alarmUid: string) => updateAlarm(alarmUid), [updateAlarm]);

  if (isLoading || isIdle) {
    return <>로딩중...</>;
  }

  return (
    <Alarms
      alarms={alarms}
      onClickAlarm={onClickAlarm}
    />
  );
}

export default AlarmListContainer;

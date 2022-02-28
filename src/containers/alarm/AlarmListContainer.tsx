import React, { ReactElement } from 'react';

import Alarms from '@/components/alarm/Alarms';
import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';

function AlarmListContainer(): ReactElement {
  const { data: alarms, isLoading, isIdle } = useFetchAlarms();

  return (
    <Alarms
      alarms={alarms}
      isLoading={isLoading || isIdle}
    />
  );
}

export default AlarmListContainer;

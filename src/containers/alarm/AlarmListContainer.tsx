import React, { ReactElement } from 'react';

import Alarms from '@/components/alarm/Alarms';
import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';

function AlarmListContainer(): ReactElement {
  const { data: alarms, isLoading } = useFetchAlarms();

  return (
    <Alarms
      alarms={alarms}
      isLoading={isLoading}
    />
  );
}

export default AlarmListContainer;

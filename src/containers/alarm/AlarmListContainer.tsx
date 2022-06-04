import React, {
  lazy, ReactElement, Suspense, useCallback,
} from 'react';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
// import Alarms from '@/components/alarm/Alarms';
import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

// const Alarms = dynamic(() => import('@/components/alarm/Alarms'), {
//   suspense: true,
// });

const Alarms = lazy(() => import('@/components/alarm/Alarms'));

function AlarmListContainer(): ReactElement {
  const { data: alarms } = useFetchAlarms();
  const { mutate: updateAlarm } = useUpdateAlarmViewed();

  const onClickAlarm = useCallback((alarmUid: string) => updateAlarm(alarmUid), [updateAlarm]);

  // console.log(isLoading, isIdle);
  // console.log(alarms);

  return (
    <Suspense fallback={<AlarmsSkeletonLoader />}>
      <Alarms
        alarms={alarms}
        onClickAlarm={onClickAlarm}
      />
    </Suspense>
  );
}

export default AlarmListContainer;

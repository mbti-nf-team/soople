import { ReactElement, useCallback } from 'react';

import Alarms from '@/components/alarm/Alarms';
import useInfiniteFetchAlarms from '@/hooks/api/alarm/useInfiniteFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';

function AlarmListContainer(): ReactElement {
  const { data: user } = useFetchUserProfile({ suspense: true, useErrorBoundary: true });
  const { query, refState } = useInfiniteFetchAlarms({ userUid: user?.uid });
  const { mutate: updateAlarm } = useUpdateAlarmViewed();

  const onClickAlarm = useCallback((alarmUid: string) => updateAlarm(alarmUid), [updateAlarm]);

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

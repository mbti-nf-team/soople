import React, { ReactElement } from 'react';

import { Alarm } from '@/models/alarm';

interface Props {
  alarm: Alarm;
}

function AlarmItem({ alarm }: Props): ReactElement {
  const { group } = alarm;

  return (
    <div>{group.title}</div>
  );
}

export default AlarmItem;

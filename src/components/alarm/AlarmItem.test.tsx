import { render } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmItem from './AlarmItem';

describe('AlarmItem', () => {
  const renderAlarmItem = () => render((
    <AlarmItem alarm={ALARM_FIXTURE} />
  ));

  it('알람에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderAlarmItem();

    expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
  });
});

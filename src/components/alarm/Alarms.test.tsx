import { render } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import Alarms from './Alarms';

describe('Alarms', () => {
  const renderAlarms = () => render((
    <Alarms
      alarms={given.alarms}
      onClickAlarm={jest.fn()}
    />
  ));

  context('알람이 존재하는 경우', () => {
    given('alarms', () => [ALARM_FIXTURE]);

    it('알람에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderAlarms();

      expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
    });
  });

  context('알람이 존재하지 않는 경우', () => {
    given('alarms', () => []);

    it('"알림이 없어요." 문구가 나타나야만 한다', () => {
      const { container } = renderAlarms();

      expect(container).toHaveTextContent('알림이 없어요.');
    });
  });
});

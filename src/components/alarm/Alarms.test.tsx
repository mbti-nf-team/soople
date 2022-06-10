import { render, screen } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import Alarms from './Alarms';

describe('Alarms', () => {
  const lastItemRef = jest.fn();

  const renderAlarms = () => render((
    <Alarms
      alarms={given.alarms}
      refState={{
        lastItemRef,
      }}
      onClickAlarm={jest.fn()}
      isLoading={given.isLoading}
    />
  ));

  context('로딩중인 경우', () => {
    given('alarms', () => [{
      items: [ALARM_FIXTURE],
    }]);
    given('isLoading', () => true);

    it('skeleton loading이 나타나야만 한다', () => {
      renderAlarms();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  context('알람이 존재하는 경우', () => {
    given('alarms', () => [{
      items: [ALARM_FIXTURE],
    }]);

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

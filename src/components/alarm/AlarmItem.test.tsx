import { render } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmItem from './AlarmItem';

describe('AlarmItem', () => {
  const renderAlarmItem = () => render((
    <AlarmItem alarm={{
      ...ALARM_FIXTURE,
      type: given.type,
    }}
    />
  ));

  context('알람 타입이 "confirmed" 상태인 경우', () => {
    given('type', () => 'confirmed');

    it('confirm된 알람 메시지가 나타나야만 한다', () => {
      const { container } = renderAlarmItem();

      expect(container).toHaveTextContent('팀원이 되었어요.');
    });
  });

  context('알람 타입이 "rejected" 상태인 경우', () => {
    given('type', () => 'rejected');

    it('reject된 알람 메시지가 나타나야만 한다', () => {
      const { container } = renderAlarmItem();

      expect(container).toHaveTextContent('팀원이 되지 않았어요.');
    });
  });

  context('알람 타입이 "applied" 상태인 경우', () => {
    given('type', () => 'applied');

    it('apply된 알람 메시지가 나타나야만 한다', () => {
      const { container } = renderAlarmItem();

      expect(container).toHaveTextContent('팀원을 신청했어요.');
    });
  });
});

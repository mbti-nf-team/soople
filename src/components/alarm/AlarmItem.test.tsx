import { fireEvent, render, screen } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmItem from './AlarmItem';

jest.mock('next/link', () => ({ children }: any) => children);

describe('AlarmItem', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderAlarmItem = () => render((
    <AlarmItem
      alarm={{
        ...ALARM_FIXTURE,
        type: given.type,
        isViewed: given.isViewed,
      }}
      onClick={handleClick}
    />
  ));

  context('isViewed가 false인 경우', () => {
    given('isViewed', () => false);
    given('type', () => 'confirmed');

    describe('알람을 클릭한다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderAlarmItem();

        fireEvent.click(screen.getByText(ALARM_FIXTURE.group.title));

        expect(handleClick).toBeCalledWith(ALARM_FIXTURE.uid);
      });
    });
  });

  context('isViewed가 true인 경우', () => {
    given('isViewed', () => true);
    given('type', () => 'confirmed');

    describe('알람을 클릭한다', () => {
      it('클릭 이벤트가 발생하지 않아야만 한다', () => {
        renderAlarmItem();

        fireEvent.click(screen.getByText(ALARM_FIXTURE.group.title));

        expect(handleClick).not.toBeCalled();
      });
    });
  });

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

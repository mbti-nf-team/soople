import { render } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import Alarms from './Alarms';

describe('Alarms', () => {
  const renderAlarms = () => render((
    <Alarms
      isLoading={given.isLoading}
      alarms={given.alarms}
    />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderAlarms();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

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
});

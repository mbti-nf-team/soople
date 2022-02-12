import { render } from '@testing-library/react';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import Alarms from './Alarms';

describe('Alarms', () => {
  const renderAlarms = () => render((
    <Alarms
      isLoading={given.isLoading}
      alarms={[ALARM_FIXTURE]}
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

    it('알람에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderAlarms();

      expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
    });
  });
});

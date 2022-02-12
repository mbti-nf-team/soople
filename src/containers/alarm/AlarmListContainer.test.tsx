import { render } from '@testing-library/react';

import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmListContainer from './AlarmListContainer';

jest.mock('@/hooks/api/alarm/useFetchAlarms');

describe('AlarmListContainer', () => {
  beforeEach(() => {
    (useFetchAlarms as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: [ALARM_FIXTURE],
    }));
  });

  const renderAlarmListContainer = () => render((
    <AlarmListContainer />
  ));

  it('알람 리스트에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderAlarmListContainer();

    expect(useFetchAlarms).toBeCalled();
    expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
  });
});

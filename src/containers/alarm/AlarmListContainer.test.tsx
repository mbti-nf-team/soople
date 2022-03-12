import { fireEvent, render, screen } from '@testing-library/react';

import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmListContainer from './AlarmListContainer';

jest.mock('@/hooks/api/alarm/useFetchAlarms');
jest.mock('@/hooks/api/alarm/useUpdateAlarmViewed');
jest.mock('next/link', () => ({ children }: any) => children);

describe('AlarmListContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchAlarms as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      isIdle: false,
      data: [ALARM_FIXTURE],
    }));
    (useUpdateAlarmViewed as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderAlarmListContainer = () => render((
    <AlarmListContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderAlarmListContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

    it('알람 리스트에 대한 정보가 나타나야만 한다', () => {
      const { container } = renderAlarmListContainer();

      expect(useFetchAlarms).toBeCalled();
      expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
    });

    describe('알람을 클릭한다', () => {
      it('mutate 액션이 호출되어야만 한다', () => {
        renderAlarmListContainer();

        fireEvent.click(screen.getByText(ALARM_FIXTURE.group.title));

        expect(mutate).toBeCalledWith(ALARM_FIXTURE.uid);
      });
    });
  });
});

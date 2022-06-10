import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import useInfiniteFetchAlarms from '@/hooks/api/alarm/useInfiniteFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

import ALARM_FIXTURE from '../../../fixtures/alarm';

import AlarmListContainer from './AlarmListContainer';

jest.mock('@/hooks/api/alarm/useInfiniteFetchAlarms');
jest.mock('@/hooks/api/alarm/useUpdateAlarmViewed');
jest.mock('next/link', () => ({ children }: any) => children);

describe('AlarmListContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useInfiniteFetchAlarms as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [ALARM_FIXTURE],
          }],
        },
        isLoading: given.isLoading,
        isIdle: false,
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
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

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderAlarmListContainer();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

    it('알람 리스트에 대한 정보가 나타나야만 한다', () => {
      const { container } = renderAlarmListContainer();

      expect(useInfiniteFetchAlarms).toBeCalled();
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

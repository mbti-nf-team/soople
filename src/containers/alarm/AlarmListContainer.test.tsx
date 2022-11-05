import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import useInfiniteFetchAlarms from '@/hooks/api/alarm/useInfiniteFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';

import ALARM_FIXTURE from '../../../fixtures/alarm';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import AlarmListContainer from './AlarmListContainer';

jest.mock('@/hooks/api/alarm/useInfiniteFetchAlarms');
jest.mock('@/hooks/api/alarm/useUpdateAlarmViewed');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('next/link', () => ({ children }: any) => children);

describe('AlarmListContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));

    (useInfiniteFetchAlarms as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [ALARM_FIXTURE],
          }],
        },
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

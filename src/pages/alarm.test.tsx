import { createRef } from 'react';

import { render } from '@testing-library/react';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';
import useInfiniteFetchAlarms from '@/hooks/api/alarm/useInfiniteFetchAlarms';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useSignOut from '@/hooks/api/auth/useSignOut';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import ALARM_FIXTURE from '../../fixtures/alarm';
import PROFILE_FIXTURE from '../../fixtures/profile';

import AlarmPage from './alarm.page';

jest.mock('@/hooks/api/alarm/useInfiniteFetchAlarms');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useSignOut');
jest.mock('@/hooks/api/alarm/useFetchAlertAlarms');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathName: '/alarm',
  })),
}));

describe('AlarmPage', () => {
  beforeEach(() => {
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (useSignOut as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
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
    (useFetchAlertAlarms as jest.Mock).mockImplementation(() => ({
      data: [ALARM_FIXTURE],
    }));
  });

  const renderAlarmPage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoilState>
        <AlarmPage />
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
  ));

  it('알람에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderAlarmPage();

    expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
  });
});

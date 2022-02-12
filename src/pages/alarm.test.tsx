import { render } from '@testing-library/react';

import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignOut from '@/hooks/api/auth/useSignOut';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import ALARM_FIXTURE from '../../fixtures/alarm';
import PROFILE_FIXTURE from '../../fixtures/profile';

import AlarmPage from './alarm.page';

jest.mock('@/hooks/api/alarm/useFetchAlarms');
jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useSignOut');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathName: '/alarm',
  })),
}));

describe('AlarmPage', () => {
  beforeEach(() => {
    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (useSignOut as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
    (useFetchAlarms as jest.Mock).mockImplementation(() => ({
      data: [ALARM_FIXTURE],
    }));
  });

  const renderAlarmPage = () => render((
    <InjectTestingRecoilState>
      <AlarmPage />
    </InjectTestingRecoilState>
  ));

  it('알람에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderAlarmPage();

    expect(container).toHaveTextContent(ALARM_FIXTURE.group.title);
  });
});

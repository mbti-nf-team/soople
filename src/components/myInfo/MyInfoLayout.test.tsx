import { render } from '@testing-library/react';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useSignOut from '@/hooks/api/auth/useSignOut';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';
import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';
import InjectMockProviders from '@/test/InjectMockProviders';

import FIXTURE_ALARM from '../../../fixtures/alarm';
import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import getMyInfoLayout from './MyInfoLayout';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/group/useFetchUserAppliedGroups');
jest.mock('@/hooks/api/group/useFetchUserRecruitedGroups');
jest.mock('@/hooks/api/alarm/useFetchAlertAlarms');
jest.mock('@/hooks/api/auth/useSignOut');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '/',
  })),
}));

describe('MyInfoLayout', () => {
  beforeEach(() => {
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));

    (useFetchUserAppliedGroups as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_GROUP,
    }));

    (useFetchUserRecruitedGroups as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_GROUP,
    }));

    (useSignOut as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));

    (useFetchAlertAlarms as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_ALARM],
    }));
  });

  const GetLayout = getMyInfoLayout('setting');
  function MockComponent(): JSX.Element {
    return <>Test</>;
  }

  const renderMyInfoLayout = () => render((
    <InjectMockProviders>
      {GetLayout(<MockComponent />)}
    </InjectMockProviders>
  ));

  it('MyInfo 레이아웃에 대한 내용이 보여야만 한다', () => {
    const { container } = renderMyInfoLayout();

    expect(container).toHaveTextContent('Test');
  });
});

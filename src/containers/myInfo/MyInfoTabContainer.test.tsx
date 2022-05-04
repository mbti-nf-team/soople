import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';
import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoTabContainer from './MyInfoTabContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/group/useFetchUserAppliedGroups');
jest.mock('@/hooks/api/group/useFetchUserRecruitedGroups');

describe('MyInfoTabContainer', () => {
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
  });

  const renderMyInfoTabContainer = () => render((
    <MyInfoTabContainer activeTab="setting" />
  ));

  it('내 정보 탭에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderMyInfoTabContainer();

    expect(container).toHaveTextContent('내 정보 수정');
  });
});

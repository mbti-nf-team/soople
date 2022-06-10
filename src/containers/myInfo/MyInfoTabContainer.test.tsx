import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroupCount from '@/hooks/api/group/useFetchUserAppliedGroupCount';
import useFetchUserRecruitedGroupCount from '@/hooks/api/group/useFetchUserRecruitedGroupCount';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoTabContainer from './MyInfoTabContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/group/useFetchUserAppliedGroupCount');
jest.mock('@/hooks/api/group/useFetchUserRecruitedGroupCount');

describe('MyInfoTabContainer', () => {
  beforeEach(() => {
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));

    (useFetchUserAppliedGroupCount as jest.Mock).mockImplementation(() => ({
      data: 3,
    }));

    (useFetchUserRecruitedGroupCount as jest.Mock).mockImplementation(() => ({
      data: 0,
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

import { ReactElement } from 'react';

import { checkNumber } from '@nf-team/core';

import MyInfoTab from '@/components/myInfo/MyInfoTab';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroupCount from '@/hooks/api/group/useFetchUserAppliedGroupCount';
import useFetchUserRecruitedGroupCount from '@/hooks/api/group/useFetchUserRecruitedGroupCount';

export type ActiveMyInfoTab = 'setting' | 'recruited' | 'applied';

interface Props {
  activeTab: ActiveMyInfoTab;
}

function MyInfoTabContainer({ activeTab }: Props): ReactElement {
  const { data: user } = useFetchUserProfile();
  const { data: appliedGroupCount } = useFetchUserAppliedGroupCount(user?.uid);
  const { data: recruitedGroupCount } = useFetchUserRecruitedGroupCount(user?.uid);

  return (
    <MyInfoTab
      activeTab={activeTab}
      numberAppliedGroups={checkNumber(appliedGroupCount)}
      numberRecruitedGroups={checkNumber(recruitedGroupCount)}
    />
  );
}

export default MyInfoTabContainer;

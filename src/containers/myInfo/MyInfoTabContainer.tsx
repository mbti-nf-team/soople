import React, { ReactElement } from 'react';

import MyInfoTab from '@/components/myInfo/MyInfoTab';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroupCount from '@/hooks/api/group/useFetchUserAppliedGroupCount';
import useFetchUserRecruitedGroupCount from '@/hooks/api/group/useFetchUserRecruitedGroupCount';
import { checkNumNull } from '@/utils/utils';

export type ActiveMyInfoTab = 'setting' | 'recruited' | 'applied';

interface Props {
  activeTab: ActiveMyInfoTab;
}

function MyInfoTabContainer({ activeTab }: Props): ReactElement {
  const { data: user } = useFetchUserProfile();
  const { data: appliedGroupCount } = useFetchUserAppliedGroupCount(user?.uid);
  const { data: recruitedGroups } = useFetchUserRecruitedGroupCount(user?.uid);

  return (
    <MyInfoTab
      activeTab={activeTab}
      numberAppliedGroups={checkNumNull(appliedGroupCount)}
      numberRecruitedGroups={checkNumNull(recruitedGroups)}
    />
  );
}

export default MyInfoTabContainer;

import React, { ReactElement } from 'react';

import MyInfoTab from '@/components/myInfo/MyInfoTab';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';
import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';

export type ActiveMyInfoTab = 'setting' | 'recruited' | 'applied';

interface Props {
  activeTab: ActiveMyInfoTab;
}

function MyInfoTabContainer({ activeTab }: Props): ReactElement {
  const { data: user } = useGetUser();
  const { data: appliedGroups } = useFetchUserAppliedGroups(user?.uid);
  const { data: recruitedGroups } = useFetchUserRecruitedGroups(user?.uid);

  return (
    <MyInfoTab
      activeTab={activeTab}
      numberAppliedGroups={appliedGroups.length}
      numberRecruitedGroups={recruitedGroups.length}
    />
  );
}

export default MyInfoTabContainer;

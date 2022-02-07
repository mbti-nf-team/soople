import React, { ReactElement } from 'react';

import MyInfoTab from '@/components/myInfo/MyInfoTab';

export type ActiveMyInfoTab = 'setting' | 'recruited' | 'applied';

interface Props {
  activeTab: ActiveMyInfoTab;
}

function MyInfoTabContainer({ activeTab }: Props): ReactElement {
  return (
    <MyInfoTab activeTab={activeTab} />
  );
}

export default MyInfoTabContainer;

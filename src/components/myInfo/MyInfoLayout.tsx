import { ReactElement } from 'react';

import HeaderContainer from '@/containers/common/HeaderContainer';
import MyInfoTabContainer, { ActiveMyInfoTab } from '@/containers/myInfo/MyInfoTabContainer';

const getMyInfoLayout = (activeTab: ActiveMyInfoTab) => function GetLayout(page: ReactElement) {
  return (
    <>
      <HeaderContainer />
      <MyInfoTabContainer activeTab={activeTab} />
      {page}
    </>
  );
};

export default getMyInfoLayout;

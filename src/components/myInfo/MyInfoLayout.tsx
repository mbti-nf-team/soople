import { ReactElement } from 'react';

import HeaderContainer from '@/containers/common/HeaderContainer';

import MyInfoTab, { MyInfoNavActive } from './MyInfoTab';

const getMyInfoLayout = (active: MyInfoNavActive) => function GetLayout(page: ReactElement) {
  return (
    <>
      <HeaderContainer />
      <MyInfoTab active={active} />
      {page}
    </>
  );
};

export default getMyInfoLayout;

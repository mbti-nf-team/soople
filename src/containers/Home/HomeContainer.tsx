import React, { ReactElement } from 'react';

import HeaderContainer from '../common/HeaderContainer';

function HomeContainer(): ReactElement {
  return (
    <div>
      홈!
      <HeaderContainer />
    </div>
  );
}

export default HomeContainer;

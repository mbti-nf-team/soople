import React, { ReactElement } from 'react';

import HeaderContainer from './HeaderContainer';

function Home(): ReactElement {
  return (
    <div>
      홈!
      <HeaderContainer />
    </div>
  );
}

export default Home;

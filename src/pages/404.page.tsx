import { ReactElement } from 'react';

import HeaderWrapper from '@/components/common/HeaderWrapper';

function Custom404(): ReactElement {
  return (
    <>
      <HeaderWrapper
        hasBackground
        isScrollTop
      />
      <h1>404 - Page Not Found</h1>
    </>
  );
}

export default Custom404;

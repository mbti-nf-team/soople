import { ReactElement } from 'react';

import HeaderWrapper from '@/components/common/HeaderWrapper';

function Custom500(): ReactElement {
  return (
    <>
      <HeaderWrapper
        hasBackground
        isScrollTop
      />
      <h1>500 - Server-side error occurred</h1>
    </>
  );
}

export default Custom500;

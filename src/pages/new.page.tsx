import React, { ReactElement } from 'react';

import NewHeaderContainer from '@/containers/new/NewHeaderContainer';
import NewWriteFormContainer from '@/containers/new/NewWriteFormContainer';

function NewPage(): ReactElement {
  return (
    <div>
      <NewHeaderContainer />
      <NewWriteFormContainer />
    </div>
  );
}

export default NewPage;

import React, { ReactElement } from 'react';

import NewHeaderContainer from '@/containers/new/NewHeaderContainer';
import NewWriteFormContainer from '@/containers/new/NewWriteFormContainer';
import RegisterModalContainer from '@/containers/new/RegisterModalContainer';

function NewPage(): ReactElement {
  return (
    <div>
      <NewHeaderContainer />
      <NewWriteFormContainer />
      <RegisterModalContainer />
    </div>
  );
}

export default NewPage;

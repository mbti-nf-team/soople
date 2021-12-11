import React, { ReactElement } from 'react';

import NewHeaderContainer from '@/containers/new/NewHeaderContainer';
import NewWriteFormContainer from '@/containers/new/NewWriteFormContainer';
import PublishModalContainer from '@/containers/new/PublishModalContainer';

function NewPage(): ReactElement {
  return (
    <div>
      <NewHeaderContainer />
      <NewWriteFormContainer />
      <PublishModalContainer />
    </div>
  );
}

export default NewPage;

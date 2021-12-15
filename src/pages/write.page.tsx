import React, { ReactElement } from 'react';

import PublishModalContainer from '@/containers/write/PublishModalContainer';
import WriteFormContainer from '@/containers/write/WriteFormContainer';
import WriteHeaderContainer from '@/containers/write/WriteHeaderContainer';

function WritePage(): ReactElement {
  return (
    <div>
      <WriteHeaderContainer />
      <WriteFormContainer />
      <PublishModalContainer />
    </div>
  );
}

export default WritePage;

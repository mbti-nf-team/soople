import React, { ReactElement } from 'react';

import RemirorEditorProvider from '@/components/write/RemirorEditorProvider';
import PublishModalContainer from '@/containers/write/PublishModalContainer';
import WriteFormContainer from '@/containers/write/WriteFormContainer';
import WriteHeaderContainer from '@/containers/write/WriteHeaderContainer';
import { DetailLayout } from '@/styles/Layout';

function WritePage(): ReactElement {
  return (
    <>
      <WriteHeaderContainer />
      <DetailLayout>
        <RemirorEditorProvider>
          <WriteFormContainer />
          <PublishModalContainer />
        </RemirorEditorProvider>
      </DetailLayout>
    </>
  );
}

export default WritePage;

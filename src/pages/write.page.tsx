import React, { ReactElement } from 'react';

import PublishModalContainer from '@/containers/write/PublishModalContainer';
import WriteFormContainer from '@/containers/write/WriteFormContainer';
import WriteHeaderContainer from '@/containers/write/WriteHeaderContainer';
import Layout from '@/styles/Layout';

function WritePage(): ReactElement {
  return (
    <Layout>
      <WriteHeaderContainer />
      <WriteFormContainer />
      <PublishModalContainer />
    </Layout>
  );
}

export default WritePage;

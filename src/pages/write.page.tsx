import React, { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import RemirorEditorProvider from '@/components/write/RemirorEditorProvider';
import PublishModalContainer from '@/containers/write/PublishModalContainer';
import WriteFormContainer from '@/containers/write/WriteFormContainer';
import WriteHeaderContainer from '@/containers/write/WriteHeaderContainer';
import { DetailLayout } from '@/styles/Layout';

function WritePage(): ReactElement {
  return (
    <>
      <NextSeo
        title="Conners - 팀 모집하기"
      />
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

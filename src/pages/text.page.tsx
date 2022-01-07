import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import HeaderContainer from '@/containers/common/HeaderContainer';
import { h2Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';

function TextPage(): ReactElement {
  const text = '';

  text.slice();

  return (
    <>
      <HeaderContainer />
      <Layout>
        <H2 isBold>test</H2>
      </Layout>
    </>
  );
}

export default TextPage;

const H2 = styled.h2<{isBold: boolean;}>`
  ${h2Font()};
`;

/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import facepaint from 'facepaint';

const mq1 = facepaint([
  '@media(min-width: 1100px)',
]);

const mq2 = facepaint([
  '@media(min-width: 700px)',
]);

function Layout({ children, ...rest }: PropsWithChildren) {
  return (
    <LayoutWrapper {...rest}>
      {children}
    </LayoutWrapper>
  );
}

export const DetailLayout = styled(Layout)`
  ${mq2({
    width: ['calc(100% - 2rem)', '686px'],
  })};
`;

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  ${mq1({
    width: ['calc(100% - 3rem)', '1040px'],
  })};
`;

export default Layout;

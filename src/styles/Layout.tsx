/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';
import facepaint from 'facepaint';

const mq = facepaint([
  '@media(min-width: 1300px)',
]);

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  ${mq({
    width: ['calc(100% - 3rem)', '1280px'],
  })};
`;

const Layout = ({ children, ...rest }: PropsWithChildren<{}>): ReactElement => (
  <LayoutWrapper {...rest}>
    {children}
  </LayoutWrapper>
);

export default Layout;

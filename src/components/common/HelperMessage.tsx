import React, { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

interface Props {
  message?: string | null;
  isError?: boolean;
}

function HelperMessage({ isError, message }: Props): ReactElement | null {
  if (!message) {
    return null;
  }

  return (
    <HelperText isError={isError}>
      {message}
    </HelperText>
  );
}

export default HelperMessage;

const HelperText = styled.small<{ isError?: boolean; }>`
  ${subtitle1Font()}
  margin: 6px 0px 0px 4px;
  transition: color .2s ease-in-out;

  ${({ isError }) => (isError ? css`
    color: ${palette.warning};
  ` : css`
    color: ${palette.accent5};
  `)};
`;

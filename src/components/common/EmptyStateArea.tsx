import React from 'react';

import styled from '@emotion/styled';

import { h3Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Button from './Button';

interface Props {
  emptyText: string;
  buttonText: string;
  onClick?: () => void;
  href?: string;
  marginTop?: string;
}

function EmptyStateArea({
  emptyText, buttonText, onClick, href, marginTop = '24px',
}: Props) {
  return (
    <EmptyStateWrapper marginTop={marginTop}>
      <EmptyStateText>
        {emptyText}
      </EmptyStateText>
      <Button
        color="primary"
        size="medium"
        type="button"
        onClick={onClick}
        href={href}
      >
        {buttonText}
      </Button>
    </EmptyStateWrapper>
  );
}

export default EmptyStateArea;

const EmptyStateWrapper = styled.section<{ marginTop: string; }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop};
`;

const EmptyStateText = styled.div`
  margin-bottom: 16px;

  ${h3Font(true)};
  color: ${palette.accent5};
`;

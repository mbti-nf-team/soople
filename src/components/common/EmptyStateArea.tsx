import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { h3Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Button, { ColorType } from './Button';

interface Props {
  imageUrl?: string;
  imageName?: string;
  svg?: ReactElement;
  emptyText: string;
  buttonText?: string;
  buttonColor?: ColorType;
  onClick?: () => void;
  href?: string;
  marginTop?: string;
}

function EmptyStateArea({
  imageUrl, svg, imageName, emptyText, buttonText, buttonColor = 'primary', onClick, href, marginTop = '24px',
}: Props) {
  return (
    <EmptyStateWrapper marginTop={marginTop}>
      <div className="empty-state-image">
        {imageUrl && <img src={imageUrl} alt={imageName} data-testid="empty-state-image" />}
        {svg}
      </div>
      <EmptyStateText>
        {emptyText}
      </EmptyStateText>
      {buttonText && (
        <Button
          color={buttonColor}
          size="medium"
          type="button"
          onClick={onClick}
          href={href}
        >
          {buttonText}
        </Button>
      )}
    </EmptyStateWrapper>
  );
}

export default EmptyStateArea;

const EmptyStateWrapper = styled.section<{ marginTop: string; }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop};

  .empty-state-image {
    margin-bottom: 24px;
  }
`;

const EmptyStateText = styled.div`
  margin-bottom: 16px;
  white-space: pre-line;
  text-align: center;

  ${h3Font(true)};
  color: ${palette.accent5};
`;

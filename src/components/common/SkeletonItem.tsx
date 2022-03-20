/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import palette from '@/styles/palette';
import transitions from '@/styles/transitions';

export interface SkeletonProps {
  width?: string;
  height?: string;
  flex?: number;
  margin?: string;
  circle?: boolean;
  className?: string;
  borderRadius?: string;
}

function SkeletonItem({
  width,
  height,
  flex,
  margin,
  circle,
  className,
  borderRadius,
  ...rest
}: SkeletonProps) {
  return (
    <SkeletonBlock
      style={{
        width, height, flex, margin, borderRadius,
      }}
      circle={circle}
      className={className}
      {...rest}
    />
  );
}

export default SkeletonItem;

const SkeletonBlock = styled.span<{ circle?: boolean; }>`
  background: ${palette.accent2};
  animation: ${transitions.blink} 1s ease-in-out infinite;
  display: inline-block;
  border-radius: 4px;
  height: 1em;

  ${({ circle }) => circle && css`
    border-radius: 50%;
  `}
`;

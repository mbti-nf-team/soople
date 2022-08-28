/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import transitions from '@/styles/transitions';

export interface SkeletonProps {
  circle?: boolean;
  className?: string;
  styles?: CSSProperties;
}

function SkeletonItem({
  circle,
  className,
  styles,
  ...rest
}: SkeletonProps) {
  return (
    <SkeletonBlock
      style={styles}
      circle={circle}
      className={className}
      {...rest}
    />
  );
}

export default SkeletonItem;

const SkeletonBlock = styled.span<{ circle?: boolean; }>`
  user-select: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.accent2};
  animation: ${transitions.blink} 1s ease-in-out infinite;
  display: inline-block;
  border-radius: 4px;
  height: 1em;

  ${({ circle }) => circle && css`
    border-radius: 50%;
  `}
`;

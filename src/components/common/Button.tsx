/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps, PropsWithChildren, ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { body1Font, body2Font, h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

export type ColorType = 'success' | 'outlined' | 'primary' | 'warning' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType;
  size?: ButtonSize;
}

interface StyledButtonProps {
  color: ColorType;
  size: ButtonSize;
}

function Button({
  color = 'outlined', size = 'medium', href, children, type = 'button', ...rest
}: PropsWithChildren<Props>): ReactElement {
  const htmlProps = rest as any;

  if (href) {
    return (
      <Link href={href} passHref>
        <StyledLink
          color={color}
          size={size}
          {...htmlProps}
        >
          {children}
        </StyledLink>
      </Link>
    );
  }

  return (
    <StyledButton
      color={color}
      size={size}
      type={type}
      {...htmlProps}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

const ButtonWrapper = ({ color, size }: StyledButtonProps) => css`
  position: relative;
  transform: translateZ(0);
  user-select: none;
  transition:
    color .1s ease-in-out,
    background-color .1s ease-in-out,
    border-color .1s ease-in-out,
    opacity .1s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  border-radius: 6px;

  @media(hover: hover) and (pointer: fine) {
    &:not(:disabled):after {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: ${palette.foreground};
      opacity: 0;
      transition: opacity .1s ease-in-out;
    }

    &:not(:disabled):not(.disabled):hover:after {
      opacity: 0.15;
    }
  }

  ${size === 'large' && css`
    ${h4Font(true)};
    height: 48px;
    padding: 0;
    border-radius: 8px;
    width: 320px;
  `};

  ${size === 'medium' && css`
    ${body1Font(true)};
    height: 36px;
  `};

  ${size === 'small' && css`
    ${body2Font(true)};
    height: 32px;
  `};

  ${color === 'outlined' && css`
    color: ${palette.foreground};
    background-color: ${palette.background};
    border: 1px solid ${palette.accent2};
  `}

  ${color === 'success' && css`
    color: ${palette.background};
    background-color: ${palette.success};
  `}

  ${color === 'primary' && css`
    color: ${palette.background};
    background-color: ${palette.accent7};
  `}

  ${color === 'warning' && css`
    color: ${palette.background};
    background-color: ${palette.warning};
  `}

  ${color === 'ghost' && css`
    color: ${palette.foreground};
    background-color: initial;
  `}

  &:disabled {
    color: ${palette.accent4};
    background-color: ${palette.accent1};
  }
`;

const StyledLink = styled.a<StyledButtonProps>`
  ${ButtonWrapper}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${ButtonWrapper}
`;

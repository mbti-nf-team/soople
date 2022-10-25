/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps, PropsWithChildren, ReactElement } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

import Link from 'next/link';

import { css, Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font, body2Font, h4Font } from '@/styles/fontStyles';

export type ColorType = 'success' | 'outlined' | 'primary' | 'warning' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType;
  size?: ButtonSize;
  isLoading?: boolean;
}

interface StyledButtonProps {
  color: ColorType;
  size: ButtonSize;
  theme: Theme;
}

function Button({
  color = 'outlined', size = 'medium', href, children, type = 'button', isLoading = false, disabled, ...rest
}: PropsWithChildren<Props>): ReactElement {
  const theme = useTheme();
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
      disabled={disabled || isLoading}
      {...htmlProps}
    >
      <FadeLoader
        height={size === 'large' ? 5.4 : 4}
        margin={size === 'large' ? -11 : -12}
        width={size === 'large' ? 2 : 1.6}
        color={theme.accent4}
        cssOverride={{
          top: size === 'large' ? '18px' : '19px',
          left: '21px',
          marginRight: size === 'large' ? '8px' : '4px',
        }}
        loading={isLoading}
      />
      {children}
    </StyledButton>
  );
}

export default Button;

const ButtonWrapper = ({ color, size, theme }: StyledButtonProps) => css`
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
      background-color: ${theme.foreground};
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
    color: ${theme.foreground};
    background-color: ${theme.background};
    border: 1px solid ${theme.accent2};
  `}

  ${color === 'success' && css`
    color: ${theme.background};
    background-color: ${theme.success};
  `}

  ${color === 'primary' && css`
    color: ${theme.background};
    background-color: ${theme.accent8};
  `}

  ${color === 'warning' && css`
    color: ${theme.background};
    background-color: ${theme.warning};
  `}

  ${color === 'ghost' && css`
    color: ${theme.foreground};
    background-color: initial;
  `}

  &:disabled {
    color: ${theme.accent4};
    background-color: ${theme.accent1};
  }
`;

const StyledLink = styled.a<StyledButtonProps>`
  ${ButtonWrapper}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${ButtonWrapper}
`;

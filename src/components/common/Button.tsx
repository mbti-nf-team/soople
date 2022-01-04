/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps, PropsWithChildren, ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { body1Font, body2Font, h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

type ColorType = 'success' | 'outlined' | 'primary';
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
  color = 'outlined', size = 'medium', href, children, ...rest
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
      {...htmlProps}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

const ButtonWrapper = ({ color, size }: StyledButtonProps) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  border-radius: 6px;
  transition: all .3s;

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
    background: ${palette.background};
    border: 1px solid ${palette.accent2};

    &:hover {
      background: ${palette.accent2};
      border: 1px solid ${palette.accent3};
    }

    &:disabled {
      color: ${palette.accent4};
      background: ${palette.accent1};
      border: 1px solid ${palette.accent1};
    }
  `}

  ${color === 'success' && css`
    color: ${palette.background};
    background: ${palette.success};

    &:hover {
      color: ${palette.accent2};
      background: ${palette.success10};
    }

    &:disabled {
      color: ${palette.accent4};
      background: ${palette.accent1};
    }
  `}

  ${color === 'primary' && css`
    color: ${palette.background};
    background: ${palette.accent7};

    &:hover {
      color: ${palette.accent2};
      background: ${palette.accent6};
    }

    &:disabled {
      color: ${palette.accent4};
      background: ${palette.accent1};
    }
  `}
`;

const StyledLink = styled.a<StyledButtonProps>`
  ${ButtonWrapper}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${ButtonWrapper}
`;

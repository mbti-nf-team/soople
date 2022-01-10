/* eslint-disable react/jsx-props-no-spreading */
import React, {
  DetailedHTMLProps, ForwardedRef, forwardRef, ReactElement, TextareaHTMLAttributes,
} from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

interface Props extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement
> {
  placeholder: string;
  isError?: boolean;
}

function Textarea({
  value, onChange, placeholder, disabled, isError, ...rest
}: Props, ref: ForwardedRef<HTMLTextAreaElement>): ReactElement {
  return (
    <TextareaBlock
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      isError={isError}
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef<HTMLTextAreaElement, Props>(Textarea);

const TextareaBlock = styled.textarea<{isError?: boolean; }>`
  ${body1Font()};
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${palette.background};
  box-sizing: border-box;
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border .2s;

  &::placeholder {
    color: ${palette.accent4};
  }

  &:disabled {
    color: ${palette.accent4};
    background: ${palette.accent1};
  }

  ${({ isError }) => (isError ? css`
    border: 1px solid ${palette.warning};
  ` : css`
    border: 1px solid ${palette.accent2};

    &:focus {
      border: 1px solid ${palette.success};
    }
  `)};
`;

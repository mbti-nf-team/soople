/* eslint-disable react/jsx-props-no-spreading */
import React, {
  DetailedHTMLProps, ForwardedRef, forwardRef, ReactElement, TextareaHTMLAttributes,
} from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import HelperMessage from './HelperMessage';
import Label from './Label';

interface Props extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement
> {
  height?: string;
  placeholder: string;
  isError?: boolean;
  labelText?: string;
  labelOptionText?: string;
  message?: string;
}

function Textarea({
  value,
  onChange,
  placeholder,
  disabled,
  isError, height, id, labelText, labelOptionText, message, ...rest
}: Props, ref: ForwardedRef<HTMLTextAreaElement>): ReactElement {
  return (
    <TextareaWrapper isError={isError}>
      {labelText && (
        <Label
          htmlFor={id}
          isError={isError}
          labelText={labelText}
          labelOptionText={labelOptionText}
        />
      )}
      <TextareaBlock
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        isError={isError}
        height={height}
        ref={ref}
        {...rest}
      />
      <HelperMessage
        message={message}
        isError={isError}
      />
    </TextareaWrapper>
  );
}

export default forwardRef<HTMLTextAreaElement, Props>(Textarea);

const TextareaWrapper = styled.div<{ isError?: boolean; }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;

  &:focus-within {
    & > label > span {
      ${({ isError }) => !isError && css`
        color: ${palette.success};
      `}
    }
  }
`;

const TextareaBlock = styled.textarea<{isError?: boolean; height?: string }>`
  ${body1Font()};
  width: 100%;
  height: ${({ height }) => (height || '72px')};
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

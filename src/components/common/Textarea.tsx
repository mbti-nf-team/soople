/* eslint-disable react/jsx-props-no-spreading */
import React, {
  DetailedHTMLProps, ForwardedRef, forwardRef, ReactElement, TextareaHTMLAttributes,
} from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useActionKeyEvent from '@/hooks/useActionKeyEvent';
import { body1Font } from '@/styles/fontStyles';

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
  const handleKeyDownEvent = useActionKeyEvent<HTMLTextAreaElement>(['Enter', 'NumpadEnter'], (e) => {
    e.stopPropagation();
  });

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
        onKeyDown={handleKeyDownEvent}
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
      ${({ isError, theme }) => !isError && css`
        color: ${theme.success};
      `}
    }
  }
`;

const TextareaBlock = styled.textarea<{ isError?: boolean; height?: string }>`
  ${body1Font()};
  width: 100%;
  height: ${({ height }) => (height || '72px')};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background};
  box-sizing: border-box;
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border .2s;

  &::placeholder {
    color: ${({ theme }) => theme.accent4};
  }

  &:disabled {
    color: ${({ theme }) => theme.accent4};
    background: ${({ theme }) => theme.accent1};
  }

  ${({ isError, theme }) => (isError ? css`
    border: 1px solid ${theme.warning};
  ` : css`
    border: 1px solid ${theme.accent2};

    &:focus {
      border: 1px solid ${theme.success};
    }
  `)};
`;

/* eslint-disable react/jsx-props-no-spreading */
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';
import { XCircle } from 'react-feather';
import { UseFormRegisterReturn } from 'react-hook-form';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font } from '@/styles/fontStyles';

import HelperMessage from './HelperMessage';
import Label from './Label';

interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  id: string;
  labelText: string;
  labelOptionText?: string;
  placeholder: string;
  isError?: boolean;
  message?: string | null;
  register?: UseFormRegisterReturn;
  onClear?: () => void;
}

function Input({
  id,
  labelText,
  onClear,
  disabled,
  readOnly,
  labelOptionText, value, defaultValue, placeholder, message, isError, register, ...rest
}: Props, ref: ForwardedRef<HTMLInputElement>): ReactElement {
  const theme = useTheme();
  const [state, setState] = useState(defaultValue);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value);

  const handleClear = () => {
    onClear?.();
    setState('');
  };

  return (
    <InputWrapper isError={isError}>
      <Label
        htmlFor={id}
        isError={isError}
        labelText={labelText}
        labelOptionText={labelOptionText}
      />
      <InputFieldWrapper>
        <InputField
          id={id}
          value={value}
          onInput={onInput}
          defaultValue={defaultValue}
          placeholder={placeholder}
          isError={isError}
          ref={ref}
          hasValue={!!state}
          disabled={disabled}
          readOnly={readOnly}
          {...register}
          {...rest}
        />
        {onClear && (
          <ClearIcon
            size="20px"
            color={theme.background}
            fill={theme.accent5}
            onClick={handleClear}
            display={(!state || disabled || readOnly) ? 'none' : 'block'}
            data-testid="clear-icon"
          />
        )}
      </InputFieldWrapper>
      <HelperMessage
        message={message}
        isError={isError}
      />
    </InputWrapper>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);

const InputWrapper = styled.div<{ isError?: boolean; }>`
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

const InputField = styled.input<{ isError?: boolean; hasValue: boolean; }>`
  ${body1Font()}
  width: 100%;
  height: 48px;
  outline: none;
  color: ${({ theme }) => theme.foreground};
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 11px 50px 11px 16px;
  transition: border .2s;

  &::placeholder {
    color: ${({ theme }) => theme.accent4};
  }

  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: ${({ theme }) => theme.accent5};
    color: ${({ theme }) => theme.accent5};
    background: ${({ theme }) => theme.accent1};
  }

  &:read-only {
    opacity: 1;
    -webkit-text-fill-color: ${({ theme }) => theme.accent5};
    color: ${({ theme }) => theme.accent5};
    background: ${({ theme }) => theme.accent1};
  }

  ${({ isError, theme }) => (isError ? css`
    border: 1px solid ${theme.warning};
  ` : css`
    border: 1px solid ${theme.accent2};

    &:not(:read-only):not(:disabled):focus {
      border: 1px solid ${theme.success};
    }
  `)};
`;

const ClearIcon = styled(XCircle)`
  position: absolute;
  cursor: pointer;
  top: 14px;
  right: 16px;
`;

const InputFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

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

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

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
  onClear: () => void;
}

function Input({
  id,
  labelText,
  onClear,
  disabled,
  readOnly,
  labelOptionText, value, defaultValue, placeholder, message, isError, register, ...rest
}: Props, ref: ForwardedRef<HTMLInputElement>): ReactElement {
  const [state, setState] = useState(defaultValue);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value);

  const handleClear = () => {
    onClear();
    setState('');
  };

  return (
    <InputWrapper isError={isError}>
      <Label htmlFor={id} isError={isError}>
        <span>
          {labelText}
          {labelOptionText && (<span className="option-span">{`(${labelOptionText})`}</span>)}
        </span>
      </Label>
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
        <ClearIcon
          size="20px"
          color={palette.background}
          fill={palette.accent5}
          onClick={handleClear}
          display={(!state || disabled || readOnly) ? 'none' : 'block'}
          data-testid="clear-icon"
        />
      </InputFieldWrapper>
      {message && (
        <HelperText isError={isError}>
          {message}
        </HelperText>
      )}
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
      ${({ isError }) => !isError && css`
        color: ${palette.success};
      `}
    }
  }
`;

const Label = styled.label<{ isError?: boolean; }>`
  & > span {
    ${body2Font(true)}
    display: inline-flex;
    transition: color .2s ease-in-out;
    margin: 0px 0px 6px 4px;

    ${({ isError }) => (isError ? css`
      color: ${palette.warning};
    ` : css`
      color: ${palette.accent6};
    `)};
  }

  .option-span {
    ${body2Font()};
    color: ${palette.accent4};
    margin-left: 4px;
  }
`;

const InputField = styled.input<{ isError?: boolean; hasValue: boolean; }>`
  ${body1Font()}
  width: 100%;
  height: 48px;
  outline: none;
  background-color: ${palette.background};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 11px 50px 11px 16px;
  transition: border .2s;

  &::placeholder {
    color: ${palette.accent4};
  }

  &:disabled {
    background: ${palette.accent1};
  }

  &:read-only {
    color: ${palette.accent5};
    background: ${palette.accent1};
  }

  ${({ isError }) => (isError ? css`
    border: 1px solid ${palette.warning};
  ` : css`
    border: 1px solid ${palette.accent2};

    &:not(:read-only):not(:disabled):focus {
      border: 1px solid ${palette.success};
    }
  `)};
`;

const HelperText = styled.small<{ isError?: boolean; }>`
  ${subtitle1Font()}
  margin: 6px 0px 0px 4px;

  ${({ isError }) => (isError ? css`
    color: ${palette.warning};
  ` : css`
    color: ${palette.accent5};
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

import React, { ReactElement } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SelectOption } from '@/models';
import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import HelperMessage from './HelperMessage';
import Label from './Label';

type Size = 'large' | 'medium' | 'small';

interface Props<T> {
  options: OptionsOrGroups<SelectOption<T>, GroupBase<SelectOption<T>>>;
  id: string;
  defaultValue?: SelectOption<T>;
  onChange: (value: T) => void;
  size?: Size;
  placeholder?: string;
  labelText?: string;
  labelOptionText?: string;
  errorMessage?: string;
  helperMessage?: string;
  disabled?: boolean;
}

function SelectBox<Option>({
  id,
  options,
  defaultValue,
  onChange,
  placeholder,
  size = 'large',
  errorMessage,
  helperMessage,
  labelText,
  labelOptionText,
  disabled = false,
}: Props<Option>): ReactElement {
  const handleChange = (newValue: SelectOption<Option>) => {
    onChange(newValue?.value);
  };

  return (
    <SelectForm isError={!!errorMessage}>
      {labelText && (
        <Label
          htmlFor={id}
          isError={!!errorMessage}
          labelText={labelText}
          labelOptionText={labelOptionText}
        />
      )}
      <StyledSelect
        instanceId={id}
        inputId={id}
        classNamePrefix="select"
        options={options}
        defaultValue={defaultValue}
        onChange={(newValue) => handleChange(newValue as SelectOption<Option>)}
        placeholder={placeholder}
        size={size}
        isSearchable={false}
        isError={!!errorMessage}
        isDisabled={disabled}
        data-testid="select"
      />
      <HelperMessage
        message={errorMessage || helperMessage}
        isError={!!errorMessage}
      />
    </SelectForm>
  );
}

export default SelectBox;

const SelectForm = styled.div<{ isError?: boolean; }>`
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

const StyledSelect = styled(Select)<{ size: Size; isError: boolean; }>`
  transition: color border-color background-color 0.2s ease-in-out;
  ${body1Font()}

  ${({ size }) => size === 'large' && css`
    width: 100%;
  `};

  & .select__control {
    ${({ size }) => size === 'large' && css`
      height: 48px;
    `};

    ${({ size }) => size === 'medium' && css`
      width: 100px;
      height: 36px;
    `};

    ${({ size }) => size === 'small' && css`
      width: 107px;
    `};

    align-items: center;
    cursor: pointer;
    text-align: left;
    box-sizing: border-box;
    border-radius: 8px;

    ${({ isError }) => (isError ? css`
      border: 1px solid ${palette.warning};
    ` : css`
      border: 1px solid ${palette.accent2};
    `)}
  }

  &.select--is-disabled {
    & > .select__control--is-disabled {
      background-color: ${palette.accent1};

      & > .select__value-container--has-value {
        & > .select__single-value--is-disabled {
          color: ${palette.accent6};
        }
      }
    }
  }

  & .select__control--is-focused {
    ${({ isError }) => !isError && css`
      border-color: ${palette.success} !important;
    `}
    box-shadow: none;
  }

  & .select__option {
    cursor: pointer;
    color: ${palette.foreground};
    text-align: left;
    background-color: ${palette.background};
    padding: 7px 16px;
  }
  
  & .select__placeholder {
    color: ${palette.accent4};
  }

  & .select__menu {
    border-radius: 8px;
  }

  & .select__option--is-focused {
    background-color: ${palette.accent1};
  }

  & .select__option--is-selected {
    background-color: ${palette.accent1};
  }

  & .select__single-value {
    color: ${palette.foreground};
    text-align: left;
  }

  & .select__indicator-separator {
    display: none;
  }

  & .select__value-container {
    padding: 0 0 0 16px;
  }

  & .select__indicator {
    padding: 0 16px 0 0;
  }
`;

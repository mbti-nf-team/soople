import React, { ReactElement, useState } from 'react';
import { XCircle } from 'react-feather';
import { ClearIndicatorProps, GroupBase, OptionsOrGroups } from 'react-select';
import CreatableSelect from 'react-select/creatable';

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
  helperMessage?: string | null;
  labelText: string;
  labelOptionText?: string;
  placeholder: string;
  errorMessage: string;
}

function ClearIndicator(props: ClearIndicatorProps<unknown, boolean, GroupBase<unknown>>) {
  const {
    children = <XCircle
      cursor="pointer"
      size="20px"
      color={palette.background}
      fill={palette.accent5}
      data-testid="clear-icon"
    />,
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restInnerProps}
      ref={ref}
      style={{ display: 'flex', marginRight: '8px' }}
    >
      {children}
    </div>
  );
}

function CreatableSelectBox<Option>({
  id,
  options,
  defaultValue,
  onChange,
  size = 'large',
  labelText,
  labelOptionText,
  placeholder,
  helperMessage,
  errorMessage,
}: Props<Option>): ReactElement {
  const [isError, setError] = useState<boolean>(false);
  const [message, setMessage] = useState(helperMessage);

  const handleChange = (newValue: SelectOption<Option>) => {
    onChange(newValue?.value);

    if (!newValue) {
      setError(true);
      setMessage(errorMessage);
      return;
    }

    setError(false);
    setMessage(helperMessage);
  };

  return (
    <SelectForm isError={isError}>
      <Label
        htmlFor={id}
        isError={isError}
        labelText={labelText}
        labelOptionText={labelOptionText}
      />
      <StyledSelect
        isClearable
        instanceId={id}
        inputId={id}
        classNamePrefix="select"
        options={options}
        defaultValue={defaultValue}
        onChange={(newValue) => handleChange(newValue as SelectOption<Option>)}
        formatCreateLabel={(inputValue) => `입력 : ${inputValue}`}
        components={{ ClearIndicator }}
        data-testid="select"
        placeholder={placeholder}
        size={size}
        isError={isError}
      />
      <HelperMessage
        message={message}
        isError={isError}
      />
    </SelectForm>
  );
}

export default CreatableSelectBox;

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

const StyledSelect = styled(CreatableSelect)<{ size: Size; isError: boolean; }>`
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
      width: 129px;
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

  & .select__control--is-focused {
    ${({ isError }) => !isError && css`
      border-color: ${palette.success};
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

import React, { ChangeEvent, ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props<OptionsType> {
  id: string;
  isDirect: boolean;
  options: OptionsType;
  defaultOption?: string;
  register?: UseFormRegisterReturn;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select<OptionsType extends object>({
  register, onChange, options, defaultOption, id, isDirect, value: selectValue,
}: Props<OptionsType>): ReactElement {
  return (
    <SelectBox
      value={selectValue}
      id={id}
      name={id}
      isDirect={isDirect}
      {...register}
      onChange={onChange}
      data-testid="select"
    >
      {defaultOption && (
      <option value="">
        {defaultOption}
      </option>
      )}
      {Object.entries(options).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </SelectBox>
  );
}

const SelectBox = styled.select<{ isDirect: boolean }>`
  display: initial;

  ${({ isDirect }) => (isDirect && css`
    display: none;
  `)};
`;

export default Select;

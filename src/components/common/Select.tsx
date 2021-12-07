import React, { ChangeEvent, ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  id: string;
  register: UseFormRegisterReturn;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  defaultOption: string | null;
  isDirect: boolean;
}

function Select({
  register, onChange, options, defaultOption, id, isDirect,
}: Props): ReactElement {
  return (
    <SelectBox isDirect={isDirect} id={id} {...register} onChange={onChange} data-testid="select">
      {defaultOption && (
      <option value="">
        {defaultOption}
      </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
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

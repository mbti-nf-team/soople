import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body2Font } from '@/styles/fontStyles';

interface Props extends DetailedHTMLProps<
LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement
> {
  isError?: boolean;
  labelText: string;
  labelOptionText?: string;
}

function Label({
  labelText, htmlFor, isError, labelOptionText,
}: Props) {
  return (
    <StyledLabel htmlFor={htmlFor} isError={isError}>
      <span data-testid="label">
        {labelText}
        {labelOptionText && (<span className="option-span">{`(${labelOptionText})`}</span>)}
      </span>
    </StyledLabel>
  );
}

export default Label;

const StyledLabel = styled.label<{ isError?: boolean; }>`
  & > span {
    ${body2Font(true)}
    display: inline-flex;
    transition: color .2s ease-in-out;
    margin: 0px 0px 6px 4px;

    ${({ isError, theme }) => (isError ? css`
      color: ${theme.warning};
    ` : css`
      color: ${theme.accent6};
    `)};
  }

  .option-span {
    ${body2Font()};
    color: ${({ theme }) => theme.accent4};
    margin-left: 4px;
  }
`;

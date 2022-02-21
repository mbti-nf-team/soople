import React from 'react';
import Toggle from 'react-toggle';

import styled from '@emotion/styled';

import palette from '@/styles/palette';

import 'react-toggle/style.css';

interface Props {
  onChange: () => void;
  defaultChecked: boolean;
}

const SwitchButton = ({ onChange, defaultChecked }: Props) => (
  <SwitchButtonWrapper
    name="switch-toggle"
    defaultChecked={defaultChecked}
    title="switchButton"
    aria-label="No label tag"
    onChange={onChange}
    icons={false}
    data-testid="switch-button"
  />
);

export default SwitchButton;

const SwitchButtonWrapper = styled(Toggle)`
  &.react-toggle .react-toggle-track {
    background-color: ${palette.accent3};
  }

  &.react-toggle .react-toggle-track {
    width: 38px;
    height: 24px;
  }

  &.react-toggle .react-toggle-thumb {
    width: 24px;
    height: 24px;
    top: 0px;
    left: 0px;
    border: 2px solid ${palette.accent3};
  }

  &.react-toggle--checked .react-toggle-thumb {
    left: 14px;
    border: 2px solid ${palette.success};
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${palette.success};
  }

  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${palette.accent4};
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${palette.success10};
  }

  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: none;
  }

  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: none;
  }
`;

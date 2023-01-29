import Toggle from 'react-toggle';

import styled from '@emotion/styled';

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
    background-color: ${({ theme }) => theme.accent3};
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
    border: 2px solid ${({ theme }) => theme.accent3};
  }

  &.react-toggle--checked .react-toggle-thumb {
    left: 14px;
    border: 2px solid ${({ theme }) => theme.success};
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${({ theme }) => theme.success};
  }

  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${({ theme }) => theme.accent4};
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${({ theme }) => theme.success10};
  }

  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: none;
  }

  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: none;
  }
`;

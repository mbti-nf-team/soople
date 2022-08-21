/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  FormEvent, KeyboardEvent, PropsWithChildren, ReactElement,
} from 'react';
import { X as CloseSvg } from 'react-feather';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { h4Font } from '@/styles/fontStyles';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import type { ColorType as ButtonColorType } from './Button';
import Button from './Button';

interface Props {
  isVisible: boolean;
  title: string;
  confirmText?: string;
  closeText?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  size?: string;
  confirmButtonColor?: ButtonColorType;
}

function FormModal({
  isVisible, title, confirmText = '확인', closeText = '닫기', onSubmit, onClose, confirmButtonColor = 'success', children, size = '600px',
}: PropsWithChildren<Props>): ReactElement | null {
  const theme = useTheme();

  if (!isVisible) {
    return null;
  }

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => e.code === 'Enter' && e.preventDefault();

  return (
    <FormModalWrapper>
      <FormModalBox size={size} isVisible={isVisible} data-testid="form-modal-box">
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <HeaderWrapper>
            <h4>{title}</h4>
            <CloseIcon
              size={24}
              color={theme.accent6}
              onClick={onClose}
              data-testid="close-icon"
            />
          </HeaderWrapper>
          {children}
          <FooterWrapper>
            <Button size="small" onClick={onClose} type="button">{closeText}</Button>
            <Button size="small" color={confirmButtonColor} type="submit" data-testid="apply-button">{confirmText}</Button>
          </FooterWrapper>
        </form>
      </FormModalBox>
    </FormModalWrapper>
  );
}

export default FormModal;

const FormModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.FormModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

const FormModalBox = styled.div<{ size: string; isVisible: boolean; }>`
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  width: ${({ size }) => size};

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  box-shadow: 0px 1px 0px ${({ theme }) => theme.accent2};
  margin-bottom: 20px;

  h4 {
    margin: 0px;
    ${h4Font(true)};
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 16px 20px;
  box-shadow: inset 0px 1px 0px ${({ theme }) => theme.accent2};
`;

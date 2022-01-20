import React, { PropsWithChildren, ReactElement } from 'react';
import { X as CloseSvg } from 'react-feather';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import type { ColorType as ButtonColorType } from './Button';
import Button from './Button';

type FormModalSize = 'small' | 'medium';

interface Props {
  isVisible: boolean;
  title: string;
  confirmText?: string;
  closeText?: string;
  onSubmit: () => void;
  onClose: () => void;
  size?: FormModalSize;
  confirmButtonColor?: ButtonColorType;
}

function FormModal({
  isVisible, title, confirmText = '확인', closeText = '닫기', onSubmit, onClose, confirmButtonColor = 'success', children, size = 'medium',
}: PropsWithChildren<Props>): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <FormModalWrapper>
      <FormModalBox size={size} isVisible={isVisible} data-testid="form-modal-box">
        <form onSubmit={onSubmit}>
          <HeaderWrapper>
            <h4>{title}</h4>
            <CloseIcon
              size={24}
              color={palette.accent6}
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

const FormModalBox = styled.div<{ size: FormModalSize; isVisible: boolean }>`
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${palette.background};
  border-radius: 8px;

  ${({ size }) => size === 'medium' && css`
    width: 600px;
  `};

  ${({ size }) => size === 'small' && css`
    width: 400px;
  `};

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  box-shadow: 0px 1px 0px ${palette.accent2};

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
  box-shadow: inset 0px 1px 0px ${palette.accent2};
`;

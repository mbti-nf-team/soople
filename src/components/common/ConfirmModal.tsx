import React, { ReactElement } from 'react';
import { X as CloseSvg } from 'react-feather';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font, h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import Button from './Button';

interface Props {
  isVisible: boolean;
  title: string;
  description: string;
  confirmText?: string;
  closeText?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmButtonColor?: 'success' | 'warning';
}

function ConfirmModal({
  isVisible, title, description, confirmText = '확인', closeText = '닫기', onConfirm, onClose, confirmButtonColor = 'success',
}: Props): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <ConfirmModalWrapper>
      <ConfirmModalBox isVisible={isVisible}>
        <HeaderWrapper>
          <h4>{title}</h4>
          <CloseIcon
            size={24}
            color={palette.accent6}
            onClick={onClose}
            data-testid="close-icon"
          />
        </HeaderWrapper>
        <Description>
          {description}
        </Description>
        <FooterWrapper>
          <Button size="small" onClick={onClose}>{closeText}</Button>
          <Button size="small" color={confirmButtonColor} onClick={onConfirm}>{confirmText}</Button>
        </FooterWrapper>
      </ConfirmModalBox>
    </ConfirmModalWrapper>
  );
}

export default ConfirmModal;

const ConfirmModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.ConfirmModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

const ConfirmModalBox = styled.div<{ isVisible: boolean }>`
  width: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${palette.background};
  border-radius: 8px;

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.fadeIn} 0.4s forwards ease-in-out;
  `)};
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;

  h4 {
    margin: 0px;
    ${h4Font(true)};
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
`;

const Description = styled.div`
  ${body1Font()};
  margin: 0 20px 24px 20px;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 16px 16px 20px;
  box-shadow: inset 0px 1px 0px ${palette.accent2};

  button:first-of-type {
    margin-right: 8px;
  }
`;

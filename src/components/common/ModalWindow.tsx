import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway } from 'react-use';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import Button from './Button';

interface Props {
  isVisible: boolean;
  title: string;
  closeText?: string;
  onClose: () => void;
  size?: {
    height?: string;
    width?: string;
  };
}

function ModalWindow({
  isVisible, title, closeText = '닫기', onClose, size, children,
}: PropsWithChildren<Props>): ReactElement | null {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickAway(modalRef, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <ModalWindowWrapper>
      <ModalWindowBox size={size} isVisible={isVisible} ref={modalRef} data-testid="modal-box">
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
        </FooterWrapper>
      </ModalWindowBox>
    </ModalWindowWrapper>
  );
}

export default ModalWindow;

const ModalWindowWrapper = styled.div`
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

const ModalWindowBox = styled.div<{ size?: { height?: string; width?: string; }; isVisible: boolean }>`
  background: ${palette.background};
  border-radius: 8px;
  width: ${({ size }) => size?.width || '540px'};
  height: ${({ size }) => size?.height || '410px'};

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

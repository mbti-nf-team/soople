import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway, useLockBodyScroll } from 'react-use';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { h4Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';
import { emptyAThenB } from '@/utils/utils';

interface Props {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  size?: {
    height?: string;
    width?: string;
  };
}

function ViewModalWindow({
  isVisible, title, onClose, size, children,
}: PropsWithChildren<Props>): ReactElement | null {
  const theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isVisible);
  useClickAway(modalRef, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <ViewModalWindowWrapper>
      <ViewModalWindowBox size={size} isVisible={isVisible} ref={modalRef} data-testid="modal-box">
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
      </ViewModalWindowBox>
    </ViewModalWindowWrapper>
  );
}

export default ViewModalWindow;

const ViewModalWindowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.FormModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

const ViewModalWindowBox = styled.div<{ size?: { height?: string; width?: string; }; isVisible: boolean }>`
  ${({ size }) => mq({
    width: ['100%', emptyAThenB('540px', size?.width)],
    height: ['100%', emptyAThenB('410px', size?.height)],
    borderRadius: ['0', '8px'],
  })};

  background: ${({ theme }) => theme.background};
  overflow: hidden;

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

  h4 {
    margin: 0px;
    ${h4Font(true)};
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
`;

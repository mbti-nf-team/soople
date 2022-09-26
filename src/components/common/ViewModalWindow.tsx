import React, {
  PropsWithChildren, ReactElement, useRef,
} from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway, useLockBodyScroll } from 'react-use';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import useDelayVisible from '@/hooks/useDelayVisible';
import { h4Font } from '@/styles/fontStyles';
import mq, { mediaQueries } from '@/styles/responsive';
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
  const isOpen = useDelayVisible(isVisible, 400);

  useLockBodyScroll(isVisible);
  useClickAway(modalRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <ViewModalWindowWrapper isVisible={isVisible}>
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

const ViewModalWindowWrapper = styled.div<{ isVisible: boolean; }>`
  ${mediaQueries[0]} {
    background: rgba(0, 0, 0, 0.4);
    transition: visibility 0.4s ease-out;
  }

  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
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
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: visibility 0.4s ease-out;

  ${({ isVisible }) => !isVisible && mq({
    animation: [
      `${transitions.mobilePopOutToBottom} 0.4s forwards ease-in-out`,
      `${transitions.popOutToBottom} 0.4s forwards ease-in-out`,
    ],
  })};

  ${({ isVisible }) => isVisible && mq({
    animation: [
      `${transitions.mobilePopInFromBottom} 0.4s forwards ease-in-out`,
      `${transitions.popInFromBottom} 0.4s forwards ease-in-out`,
    ],
  })};
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

import { PropsWithChildren, ReactElement, useRef } from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway, useLockBodyScroll } from 'react-use';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import animations from '@/styles/animations';
import { h4Font } from '@/styles/fontStyles';
import mq, { mediaQueries } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';
import { emptyAThenB } from '@/utils/utils';

import DelayRenderComponent from './DelayRenderComponent';
import ModalPortal from './ModalPortal';

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

  return (
    <DelayRenderComponent isVisible={isVisible}>
      <ModalPortal>
        <ViewModalWindowWrapper isVisible={isVisible}>
          <ViewModalWindowBox
            size={size}
            isVisible={isVisible}
            ref={modalRef}
            role="dialog"
            data-testid="modal-box"
          >
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
      </ModalPortal>
    </DelayRenderComponent>
  );
}

export default ViewModalWindow;

const ViewModalWindowWrapper = styled.div<{ isVisible: boolean; }>`
  ${mediaQueries[0]} {
    background: rgba(0, 0, 0, 0.4);
    transition: visibility 0.2s ease-out;
  }

  ${animations.modalBackground};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.FormModal};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewModalWindowBox = styled.div<{ size?: { height?: string; width?: string; }; isVisible: boolean }>`
  ${({ size }) => mq({
    width: ['100%', emptyAThenB('540px', size?.width)],
    height: ['100%', emptyAThenB('410px', size?.height)],
    borderRadius: ['0', '8px'],
  })};

  ${animations.modalBox};
  background: ${({ theme }) => theme.background};
  overflow: hidden;
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

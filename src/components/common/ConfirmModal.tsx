import { ReactElement, useRef } from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway, useLockBodyScroll } from 'react-use';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { DelayRenderComponent, GlobalPortal } from '@nf-team/react';

import useResponsive from '@/hooks/useResponsive';
import animations from '@/styles/animations';
import { body1Font, h4Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
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
  const theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  useLockBodyScroll(isVisible);
  useClickAway(modalRef, onClose);

  return (
    <DelayRenderComponent isVisible={isVisible}>
      <GlobalPortal>
        <ConfirmModalWrapper isVisible={isVisible}>
          <ConfirmModalBox isVisible={isVisible} ref={modalRef} role="dialog">
            <HeaderWrapper>
              <h4>{title}</h4>
              <CloseIcon
                size={24}
                color={theme.accent6}
                onClick={onClose}
                data-testid="close-icon"
              />
            </HeaderWrapper>
            <Description>
              {description}
            </Description>
            <FooterWrapper>
              <CloseButton
                size={isMobile ? 'large' : 'small'}
                onClick={onClose}
              >
                {closeText}
              </CloseButton>
              <ConfirmButton
                size={isMobile ? 'large' : 'small'}
                color={confirmButtonColor}
                onClick={onConfirm}
                data-testid="confirm-button"
              >
                {confirmText}
              </ConfirmButton>
            </FooterWrapper>
          </ConfirmModalBox>
        </ConfirmModalWrapper>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default ConfirmModal;

const ConfirmModalWrapper = styled.div<{ isVisible: boolean; }>`
  ${mq({
    alignItems: ['flex-end', 'center'],
    transition: ['visibility 0.4s ease-out', 'visibility 0.2s ease-out'],
  })};

  ${animations.modalBackground};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.ConfirmModal};
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

const ConfirmModalBox = styled.div<{ isVisible: boolean }>`
  ${mq({
    borderRadius: ['12px 12px 0px 0px', '8px'],
    width: ['100%', '400px'],
  })};

  ${animations.modalBox};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${({ theme }) => theme.background};
`;

const HeaderWrapper = styled.div`
  ${mq({
    padding: ['20px 20px 16px 20px', '16px 20px'],
  })};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    margin: 0px;
    ${h4Font(true)};
  }
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
`;

const Description = styled.div`
  ${mq({
    whiteSpace: ['initial', 'pre-line'],
  })};

  ${body1Font()};
  margin: 0 20px 24px 20px;
`;

const FooterWrapper = styled.div`
  ${({ theme }) => mq({
    boxShadow: ['none', `inset 0px 1px 0px ${theme.accent2}`],
    padding: ['0 20px 20px 20px', '12px 16px 12px 16px'],
  })};

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  button:first-of-type {
  ${mq({
    marginRight: ['12px', '8px'],
  })}
  }
`;

const CloseButton = styled(Button)`
  ${mq({
    width: ['30%', 'initial'],
  })}
`;

const ConfirmButton = styled(Button)`
  ${mq({
    width: ['70%', 'initial'],
  })}
`;

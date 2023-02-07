import { PropsWithChildren, ReactElement, useRef } from 'react';
import { X as CloseSvg } from 'react-feather';
import { useClickAway, useLockBodyScroll } from 'react-use';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import animations from '@/styles/animations';
import { body1Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_soople.svg';
import DelayRenderComponent from '../common/DelayRenderComponent';
import GlobalPortal from '../common/GlobalPortal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function SignInModal({
  isVisible, onClose, children,
}: PropsWithChildren<Props>): ReactElement | null {
  const theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isVisible);
  useClickAway(modalRef, onClose);

  return (
    <DelayRenderComponent isVisible={isVisible}>
      <GlobalPortal>
        <SignInModalWrapper isVisible={isVisible}>
          <SignInModalBox isVisible={isVisible} ref={modalRef} role="dialog">
            <HeaderWrapper>
              <LogoIcon />
              <CloseIcon
                size={24}
                color={theme.accent6}
                onClick={onClose}
                data-testid="close-icon"
              />
            </HeaderWrapper>
            {children}
            <SignInDescription>
              스터디와 사이드 프로젝트
              <br />
              수플과 함께 시작해요
            </SignInDescription>
          </SignInModalBox>
        </SignInModalWrapper>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default SignInModal;

const LogoIcon = styled(LogoSvg)`
  width: 80px;
`;

const CloseIcon = styled(CloseSvg)`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 20px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInDescription = styled.p`
  ${body1Font()};
  color: ${({ theme }) => theme.accent7};
  text-align: center;
  margin-bottom: 2rem;
`;

const SignInModalWrapper = styled.div<{ isVisible: boolean; }>`
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
  z-index: ${zIndexes.SignInModal};
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

const SignInModalBox = styled.div<{ isVisible: boolean }>`
  ${mq({
    borderRadius: ['24px 24px 0px 0px', '8px'],
    width: ['100%', '400px'],
  })};

  ${animations.modalBox};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

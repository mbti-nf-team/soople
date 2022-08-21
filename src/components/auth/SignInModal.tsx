import React, { PropsWithChildren, ReactElement } from 'react';
import { X as CloseSvg } from 'react-feather';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_soople.svg';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function SignInModal({
  isVisible, onClose, children,
}: PropsWithChildren<Props>): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <SignInModalWrapper>
      <SignInModalBox isVisible={isVisible}>
        <HeaderWrapper>
          <LogoIcon />
          <CloseIcon
            size={24}
            color={palette.accent6}
            onClick={onClose}
            data-testid="close-icon"
          />
        </HeaderWrapper>
        {children}
        <SignInDescription>
          스터디와 사이드 프로젝트
          <br />
          수플과 함께 시작하세요
        </SignInDescription>
      </SignInModalBox>
    </SignInModalWrapper>
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
  color: ${palette.accent7};
  text-align: center;
  margin-bottom: 2rem;
`;

const SignInModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.SignInModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

const SignInModalBox = styled.div<{ isVisible: boolean }>`
  width: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: ${palette.background};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

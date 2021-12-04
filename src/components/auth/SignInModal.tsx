import React, { ReactElement, ReactNode } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

function SignInModal({ isVisible, onClose, children }: Props): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <SignInModalWrapper>
      <SignInModalBox isVisible={isVisible}>
        <div>
          <button type="button" onClick={onClose}>X</button>
          <h2>Conners</h2>
          <h4>소셜 계정으로 계속하기</h4>
        </div>
        <div>
          {children}
        </div>
      </SignInModalBox>
    </SignInModalWrapper>
  );
}

export default SignInModal;

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
  width: 606px;
  height: 480px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `)};
`;

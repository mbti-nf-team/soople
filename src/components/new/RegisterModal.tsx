import React, { ReactElement, ReactNode } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

function RegisterModal({
  isVisible, children, onClose, onSubmit,
}: Props): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <RegisterModalWrapper>
      <RegisterModalBox isVisible={isVisible}>
        <div>
          <h4>제목 없음 등록</h4>
          <button type="button" onClick={onClose}>X</button>
        </div>
        {children}
        <div>
          <button type="button" onClick={onClose}>닫기</button>
          <button type="button" onClick={onSubmit}>등록하기</button>
        </div>
      </RegisterModalBox>
    </RegisterModalWrapper>
  );
}

const RegisterModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.RegisterModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

const RegisterModalBox = styled.div<{ isVisible: boolean }>`
  width: 600px;
  height: 562px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;

  ${({ isVisible }) => (isVisible && css`
    animation: ${transitions.fadeIn} 0.4s forwards ease-in-out;
  `)};
`;

export default RegisterModal;

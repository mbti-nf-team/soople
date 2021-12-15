import React, { PropsWithChildren, ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import transitions from '@/styles/transitions';
import zIndexes from '@/styles/zIndexes';

interface Props {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function PublishModal({
  title, isVisible, onClose, onSubmit, children,
}: PropsWithChildren<Props>): ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <PublishModalWrapper>
      <PublishModalBox isVisible={isVisible}>
        <div>
          <h4>{`${title} 등록`}</h4>
          <button type="button" onClick={onClose}>X</button>
        </div>
        {children}
        <div>
          <button type="button" onClick={onClose}>닫기</button>
          <button type="button" onClick={onSubmit}>등록하기</button>
        </div>
      </PublishModalBox>
    </PublishModalWrapper>
  );
}

const PublishModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.PublishModal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

const PublishModalBox = styled.div<{ isVisible: boolean }>`
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

export default PublishModal;

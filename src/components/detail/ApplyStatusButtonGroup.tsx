import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import Button from '../common/Button';

interface Props {
  isWriter: boolean;
}

function ApplyStatusButtonGroup({ isWriter }: Props): ReactElement {
  if (!isWriter) {
    return (
      <Button
        color="success"
      >
        신청하기
      </Button>
    );
  }

  return (
    <WriterButtonWrapper>
      <Button>수정</Button>
      <Button>삭제</Button>
      <Button color="primary">신청현황 보기</Button>
    </WriterButtonWrapper>
  );
}

export default ApplyStatusButtonGroup;

const WriterButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  & button {
    margin-right: 8px;
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;

import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import Button from '../common/Button';

interface Props {
  isCompleted: boolean;
}

function WriterStatusButtons({ isCompleted }: Props): ReactElement {
  return (
    <WriterButtonWrapper>
      <Button>수정</Button>
      <Button>삭제</Button>
      {isCompleted ? (
        <Button color="primary">팀원 보기</Button>
      ) : (
        <Button color="primary">신청현황 보기</Button>
      )}
    </WriterButtonWrapper>
  );
}

export default WriterStatusButtons;

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

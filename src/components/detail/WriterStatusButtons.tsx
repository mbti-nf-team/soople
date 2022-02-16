import React, { ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import Button from '../common/Button';

import ApplicantsViewModal from './modal/ApplicantsViewModal';

interface Props {
  isCompleted: boolean;
  groupId: string;
}

function WriterStatusButtons({ groupId, isCompleted }: Props): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <WriterButtonWrapper>
      <Button>수정</Button>
      <Button>삭제</Button>
      {isCompleted ? (
        <>
          <Button
            color="primary"
            onClick={() => setIsVisible(true)}
          >
            팀원 보기
          </Button>
          <ApplicantsViewModal
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      ) : (
        <Button href={`/detail/${groupId}/applicants`} color="primary">신청현황 보기</Button>
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

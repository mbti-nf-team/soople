import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import useRemoveGroup from '@/hooks/api/group/useRemoveGroup';
import useRemoveGroupThumbnail from '@/hooks/api/storage/useRemoveGroupThumbnail';
import useBoolean from '@/hooks/useBoolean';
import { Group } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';

import AskRemoveGroupModal from './modal/AskRemoveGroupModal';
import MembersViewModal from './modal/MembersViewModal';

interface Props {
  isCompleted: boolean;
  group: Group;
}

function WriterStatusButtons({ group, isCompleted }: Props): ReactElement {
  const router = useRouter();
  const { mutate: removeGroupMutate } = useRemoveGroup();
  const { mutate: removeGroupThumbnailMutate } = useRemoveGroupThumbnail();

  const setWriteFields = useSetRecoilState(writeFieldsState);

  const [isVisibleApplicantsModal, openApplicantModal, closeApplicantModal] = useBoolean(false);
  const [
    isVisibleAskRemoveGroupModal, openAskRemoveGroupModal, closeAskRemoveGroupModal,
  ] = useBoolean(false);

  const handleRemove = useCallback(() => {
    removeGroupMutate(group);

    if (group.thumbnail) {
      removeGroupThumbnailMutate(group.thumbnail);
    }
  }, [group, removeGroupMutate, removeGroupThumbnailMutate]);

  const onClickEdit = (initialWriteFields: Group) => {
    const {
      category, content, tags, title, recruitmentEndDate, recruitmentEndSetting, groupId,
    } = initialWriteFields;

    setWriteFields({
      category,
      content,
      tags,
      title,
      recruitmentEndDate,
      recruitmentEndSetting,
      thumbnail: stringToExcludeNull(initialWriteFields.thumbnail),
      shortDescription: stringToExcludeNull(initialWriteFields.shortDescription),
    });
    router.push(`/write?id=${groupId}`);
  };

  return (
    <WriterButtonWrapper>
      <Button
        type="button"
        onClick={() => onClickEdit(group)}
      >
        수정
      </Button>
      <Button
        type="button"
        onClick={openAskRemoveGroupModal}
      >
        삭제
      </Button>
      <AskRemoveGroupModal
        isVisible={isVisibleAskRemoveGroupModal}
        onClose={closeAskRemoveGroupModal}
        onConfirm={handleRemove}
      />
      {isCompleted ? (
        <>
          <Button
            color="primary"
            onClick={openApplicantModal}
          >
            팀원 보기
          </Button>
          <MembersViewModal
            isVisible={isVisibleApplicantsModal}
            onClose={closeApplicantModal}
          />
        </>
      ) : (
        <Button href={`/detail/${group.groupId}/applicants`} color="primary">신청현황 보기</Button>
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

import React, { ReactElement, useCallback } from 'react';
import { Edit, Trash2 } from 'react-feather';

import { useRouter } from 'next/router';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import useRemoveGroup from '@/hooks/api/group/useRemoveGroup';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import useBoolean from '@/hooks/useBoolean';
import useResponsive from '@/hooks/useResponsive';
import { Group } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { mobileMediaQuery } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';
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
  const theme = useTheme();
  const { isMobile, isClient } = useResponsive();

  const { mutate: removeGroupMutate } = useRemoveGroup();
  const { mutate: removeGroupThumbnailMutate } = useDeleteStorageFile();

  const setWriteFields = useSetRecoilState(writeFieldsState);

  const [isVisibleApplicantsModal, openApplicantModal, closeApplicantModal] = useBoolean(false);
  const [
    isVisibleAskRemoveGroupModal, openAskRemoveGroupModal, closeAskRemoveGroupModal,
  ] = useBoolean(false);

  const buttonSize = isMobile ? 'small' : 'medium';

  const handleRemove = useCallback(() => {
    removeGroupMutate(group);

    if (group.thumbnail) {
      removeGroupThumbnailMutate(group.thumbnail);
    }
  }, [group, removeGroupMutate, removeGroupThumbnailMutate]);

  const onClickEdit = (initialWriteFields: Group) => () => {
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
      {isMobile && (
        <div data-testid="writer-action-wrapper">
          <Edit
            size={20}
            role="button"
            tabIndex={0}
            color={theme.accent6}
            cursor="pointer"
            onClick={onClickEdit(group)}
          />
          <Trash2
            size={20}
            role="button"
            tabIndex={0}
            color={theme.accent6}
            cursor="pointer"
            onClick={openAskRemoveGroupModal}
          />
        </div>
      )}
      {!isMobile && isClient && (
        <>
          <Button
            type="button"
            onClick={onClickEdit(group)}
          >
            수정
          </Button>
          <Button
            type="button"
            onClick={openAskRemoveGroupModal}
          >
            삭제
          </Button>
        </>
      )}
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
            size={buttonSize}
          >
            팀원 보기
          </Button>
          <MembersViewModal
            isVisible={isVisibleApplicantsModal}
            onClose={closeApplicantModal}
          />
        </>
      ) : (
        <Button
          href={`/detail/${group.groupId}/applicants`}
          color="primary"
          size={buttonSize}
        >
          신청현황 보기
        </Button>
      )}
    </WriterButtonWrapper>
  );
}

export default WriterStatusButtons;

const WriterButtonWrapper = styled.div`
  ${mobileMediaQuery} {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    right: 0;
    box-sizing: border-box;
    background: ${({ theme }) => theme.background};
    border-top: 1px solid ${({ theme }) => theme.accent2};
    padding: 12px 16px;
    z-index: ${zIndexes.BottomFixed};

    & > div:first-of-type {
      & > svg {
        padding: 6px;
      }

      & > svg:first-of-type {
        margin-right: 4px;
      }
    }
  }

  display: flex;
  flex-direction: row;
  
  & > button {
    margin-right: 8px;
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;

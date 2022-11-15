import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useEffectOnce, useUnmount } from 'react-use';

import { useRouter } from 'next/router';

import { useHelpers, useRemirrorContext } from '@remirror/react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import PublishModalForm from '@/components/write/PublishModalForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useEditGroup from '@/hooks/api/group/useEditGroup';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import useGroupRecruitmentStatus from '@/hooks/useGroupRecruitmentStatus';
import { Profile } from '@/models/auth';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { isEmpty } from '@/utils/utils';

function PublishModalContainer(): ReactElement {
  const router = useRouter();

  const { mutate: publishGroup } = usePublishNewGroup();
  const { mutate: editGroup } = useEditGroup();
  const { data: group } = useFetchGroup();
  const { data: profile } = useFetchUserProfile();

  const { getState } = useRemirrorContext();
  const { getHTML } = useHelpers();

  const [isVisible, setPublishModalVisible] = useRecoilState(publishModalVisibleState);
  const [writeFields, changeFields] = useRecoilState(writeFieldsState);
  const resetFields = useResetRecoilState(writeFieldsState);
  const recruitmentStatus = useGroupRecruitmentStatus(group);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteTags, setDeleteTags] = useState<string[]>([]);

  const onClose = () => setPublishModalVisible(false);

  const onPublish = useCallback(() => {
    publishGroup({
      profile: profile as Profile,
      writeFields: {
        ...writeFields,
        content: getHTML(getState()),
      },
    });
  }, [publishGroup, profile, writeFields, getHTML, getState]);

  const onEdit = useCallback(() => {
    editGroup({
      deleteTags,
      writeFields: {
        ...writeFields,
        content: getHTML(getState()),
      },
      groupId: group.groupId,
    });
  }, [writeFields, group, editGroup, getHTML, getState, deleteTags]);

  const onChangeFields = useCallback((form: Partial<WriteFields>) => changeFields((prevState) => ({
    ...prevState, ...form,
  })), [changeFields]);

  useEffect(() => {
    if (router.query?.id) {
      setIsEdit(true);
    }
  }, [router.query]);

  useEffectOnce(() => {
    if (!isEmpty(writeFields.tags)) {
      setDeleteTags(writeFields.tags);
    }
  });

  useUnmount(resetFields);

  return (
    <PublishModalForm
      isRecruiting={!recruitmentStatus || recruitmentStatus === 'automaticRecruiting' || recruitmentStatus === 'manualRecruiting'}
      isEdit={isEdit}
      fields={writeFields}
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={isEdit ? onEdit : onPublish}
      onChangeFields={onChangeFields}
    />
  );
}

export default PublishModalContainer;

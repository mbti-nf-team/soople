import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useLocalStorage } from 'react-use';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import ImageSetting from '@/components/myInfo/ImageSetting';
import SettingForm from '@/components/myInfo/SettingForm';
import useAccountWithdrawal from '@/hooks/api/auth/useAccountWithdrawal';
import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useReauthenticateWithProvider from '@/hooks/api/auth/useReauthenticateWithProvider';
import useUpdateUser from '@/hooks/api/auth/useUpdateUser';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import useUploadStorageFile from '@/hooks/api/storage/useUploadStorageFile';
import { DetailLayout } from '@/styles/Layout';
import { successToast } from '@/utils/toast';

function MyInfoSettingContainer(): ReactElement | null {
  const { replace } = useRouter();
  const [isReauthenticate, setIsReauthenticate] = useLocalStorage('isReauthenticate', false);

  const { data: user, isLoading, isSuccess } = useFetchUserProfile();
  const { data: auth } = useAuthRedirectResult();
  const { mutate: reauthenticate } = useReauthenticateWithProvider();
  const { mutate: deleteUser } = useAccountWithdrawal();
  const { mutate: deleteStorageUserImage } = useDeleteStorageFile();
  const {
    data: profileImageUrl, mutate: uploadStorageUserImage,
    isSuccess: isSuccessUpload, reset: resetUploadStorage,
  } = useUploadStorageFile();
  const {
    mutate: updateProfile, isSuccess: isSuccessUpdate, reset: resetUpdateProfile,
  } = useUpdateUser();

  const [imageActionType, setImageActionType] = useState<'삭제' | '수정'>();

  const onWithdrawal = useCallback(() => {
    setIsReauthenticate(true);
    reauthenticate();
  }, []);

  const onDeleteProfileImage = useCallback(() => {
    if (!user?.image) {
      return;
    }

    if (user.image.startsWith(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL)) {
      deleteStorageUserImage(user.image);
    }

    updateProfile({
      ...user,
      image: null,
    });
    setImageActionType('삭제');
  }, [user, deleteStorageUserImage, updateProfile]);

  const onUploadProfileImage = useCallback((file: File) => {
    if (user?.image?.startsWith(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL)) {
      deleteStorageUserImage(user.image);
    }

    uploadStorageUserImage({
      file,
      storagePath: `profile/${user?.uid}/${Date.now()}-${file.name}`,
    });
  }, [user, uploadStorageUserImage, deleteStorageUserImage]);

  useEffect(() => {
    if (!isLoading && isSuccess && !user) {
      replace('/?error=unauthenticated');
    }
  }, []);

  useEffect(() => {
    if (isReauthenticate && auth) {
      deleteUser();
    }
  }, [isReauthenticate, auth]);

  useEffect(() => {
    if (isSuccessUpload && profileImageUrl && user) {
      updateProfile({
        ...user,
        image: profileImageUrl,
      });
      setImageActionType('수정');
      resetUploadStorage();
    }
  }, [isSuccessUpload, user, profileImageUrl]);

  useEffect(() => {
    if (isSuccessUpdate) {
      successToast(`이미지가 ${imageActionType}되었어요.`);
      setImageActionType(undefined);
      resetUpdateProfile();
    }
  }, [isSuccessUpdate, imageActionType]);

  if (isLoading || !isSuccess) {
    return null;
  }

  return (
    <SettingFormLayout>
      <ImageSetting
        imageUrl={user?.image}
        onDelete={onDeleteProfileImage}
        onUpload={onUploadProfileImage}
      />
      <SettingForm user={user} onWithdrawal={onWithdrawal} />
    </SettingFormLayout>
  );
}

export default MyInfoSettingContainer;

const SettingFormLayout = styled(DetailLayout)`
  margin-top: 36px;
  margin-bottom: 72px;
  width: 320px !important;
  display: flex;

  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
    margin-bottom: 20px;
  }
`;

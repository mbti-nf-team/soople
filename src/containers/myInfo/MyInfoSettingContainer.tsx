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
import { SignUpAdditionalForm } from '@/models/auth';
import { DetailLayout } from '@/styles/Layout';
import { successToast } from '@/utils/toast';
import { stringToExcludeNull } from '@/utils/utils';

type MyInfoActionType = 'deleteImage' | 'uploadImage' | 'updateUser';

function MyInfoSettingContainer(): ReactElement | null {
  const { replace } = useRouter();
  const [isReauthenticate, setIsReauthenticate] = useLocalStorage('isReauthenticate', false);

  const { data: user, isLoading, isSuccess } = useFetchUserProfile();
  const { data: auth } = useAuthRedirectResult();
  const { mutate: reauthenticate } = useReauthenticateWithProvider();
  const { mutate: deleteUser } = useAccountWithdrawal();
  const {
    mutate: deleteStorageUserImage, isLoading: isLoadingDeleteUserImage,
  } = useDeleteStorageFile();
  const {
    data: profileImageUrl, mutate: uploadStorageUserImage,
    isSuccess: isSuccessUpload, reset: resetUploadStorage, isLoading: isLoadingUpload,
  } = useUploadStorageFile();
  const {
    mutate: updateProfile, isSuccess: isSuccessUpdate,
    reset: resetUpdateProfile, isLoading: isLoadingUpdate,
  } = useUpdateUser();

  const toastMessage: Partial<Record<MyInfoActionType, string>> = {
    deleteImage: '이미지가 삭제되었어요.',
    updateUser: '수정된 정보를 저장했어요.',
    uploadImage: '이미지가 수정되었어요.',
  };

  const [myInfoActionType, setMyInfoActionType] = useState<MyInfoActionType>();

  const onSubmit = useCallback((formData: SignUpAdditionalForm) => {
    if (user) {
      updateProfile({
        ...user,
        ...formData,
      });
      setMyInfoActionType('updateUser');
    }
  }, [user, updateProfile]);

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
    setMyInfoActionType('deleteImage');
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
      setMyInfoActionType('uploadImage');
      resetUploadStorage();
    }
  }, [isSuccessUpload, user, profileImageUrl]);

  useEffect(() => {
    if (isSuccessUpdate && toastMessage && myInfoActionType) {
      successToast(stringToExcludeNull(toastMessage[myInfoActionType]));
      setMyInfoActionType(undefined);
      resetUpdateProfile();
    }
  }, [isSuccessUpdate, toastMessage, myInfoActionType]);

  if (isLoading || !isSuccess) {
    return null;
  }

  return (
    <SettingFormLayout>
      <ImageSetting
        imageUrl={user?.image}
        onDelete={onDeleteProfileImage}
        onUpload={onUploadProfileImage}
        isLoadingDeleteUserImage={isLoadingDeleteUserImage || (isLoadingUpdate && myInfoActionType === 'deleteImage')}
        isLoadingUpload={isLoadingUpload || (isLoadingUpdate && myInfoActionType === 'uploadImage')}
      />
      <SettingForm
        user={user}
        onSubmit={onSubmit}
        onWithdrawal={onWithdrawal}
        isLoading={isLoadingUpdate && myInfoActionType === 'updateUser'}
      />
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
`;

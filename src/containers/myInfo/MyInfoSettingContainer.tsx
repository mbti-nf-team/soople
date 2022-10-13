import React, { ReactElement, useCallback, useEffect } from 'react';
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
import { Profile } from '@/models/auth';
import { DetailLayout } from '@/styles/Layout';

function MyInfoSettingContainer(): ReactElement | null {
  const { replace } = useRouter();
  const [isReauthenticate, setIsReauthenticate] = useLocalStorage('isReauthenticate', false);

  const { data: user, isLoading, isSuccess } = useFetchUserProfile();
  const { data: auth } = useAuthRedirectResult();
  const { mutate: reauthenticate } = useReauthenticateWithProvider();
  const { mutate: deleteUser } = useAccountWithdrawal();
  const { mutate: deleteStorageUserImage } = useDeleteStorageFile();
  const { mutate: deleteProfileImage } = useUpdateUser();

  const onWithdrawal = useCallback(() => {
    setIsReauthenticate(true);
    reauthenticate();
  }, []);

  const onDeleteProfileImage = useCallback(() => {
    if (user?.image?.startsWith(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL)) {
      deleteStorageUserImage(user.image);
    }

    deleteProfileImage({
      ...user as Profile,
      image: null,
    });
  }, [user, deleteStorageUserImage, deleteProfileImage]);

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

  if (isLoading || !isSuccess) {
    return null;
  }

  return (
    <SettingFormLayout>
      <ImageSetting imageUrl={user?.image} onDelete={onDeleteProfileImage} />
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

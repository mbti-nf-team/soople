import React, { ReactElement, useCallback, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import ImageSetting from '@/components/myInfo/ImageSetting';
import SettingForm from '@/components/myInfo/SettingForm';
import useAccountWithdrawal from '@/hooks/api/auth/useAccountWithdrawal';
import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useReauthenticateWithProvider from '@/hooks/api/auth/useReauthenticateWithProvider';
import { DetailLayout } from '@/styles/Layout';

function MyInfoSettingContainer(): ReactElement {
  const { replace } = useRouter();
  const [isReauthenticate, setIsReauthenticate] = useLocalStorage('isReauthenticate', false);

  const { data: user, isLoading, isSuccess } = useFetchUserProfile();
  const { data: auth } = useAuthRedirectResult();
  const { mutate: reauthenticate } = useReauthenticateWithProvider();
  const { mutate: deleteUser } = useAccountWithdrawal();

  const onWithdrawal = useCallback(() => {
    setIsReauthenticate(true);
    reauthenticate();
  }, []);

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
    return <>로딩중...</>;
  }

  return (
    <SettingFormLayout>
      <ImageSetting image={user?.image} />
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

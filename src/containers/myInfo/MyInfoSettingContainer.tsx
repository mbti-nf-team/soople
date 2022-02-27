import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import ImageSetting from '@/components/myInfo/ImageSetting';
import SettingForm from '@/components/myInfo/SettingForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import { DetailLayout } from '@/styles/Layout';

function MyInfoSettingContainer(): ReactElement {
  const { data: user, isLoading, isSuccess } = useFetchUserProfile();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLoading && isSuccess && !user) {
      replace('/?error=unauthenticated');
    }
  }, []);

  if (isLoading || !isSuccess) {
    return <>로딩중...</>;
  }

  return (
    <SettingFormLayout>
      <ImageSetting image={user?.image} />
      <SettingForm user={user} />
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

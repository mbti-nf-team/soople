import React, { ReactElement } from 'react';
import { useUnmount } from 'react-use';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import RegisterForm from '@/components/RegisterForm';
import { Profile, RegisterAdditionalForm } from '@/models/auth';
import { clearAuth, requestUpdateProfile } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';

function RegisterContainer(): ReactElement {
  const [session] = useSession();

  const router = useRouter();
  const dispatch = useAppDispatch();

  useUnmount(() => dispatch(clearAuth()));

  if (!session) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  const { user } = session;

  const onSubmit = (formData: RegisterAdditionalForm) => {
    const { email, uid, image } = user;

    dispatch(requestUpdateProfile({
      email,
      uid,
      thumbnail: image,
      ...formData,
    }));

    router.replace('/');
  };

  const fields: Profile = {
    thumbnail: user.image,
    ...user,
  };

  return (
    <div>
      <h2>기본 회원 정보를 등록해주세요.</h2>
      <RegisterForm
        fields={fields}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default RegisterContainer;

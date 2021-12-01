import React, { ReactElement } from 'react';
import { useUnmount } from 'react-use';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignUpForm from '@/components/auth/SignUpForm';
import { Profile, SignUpAdditionalForm } from '@/models/auth';
import { clearAuth, requestUpdateProfile } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';

function SignUpContainer(): ReactElement {
  const [session] = useSession();

  const router = useRouter();
  const dispatch = useAppDispatch();

  useUnmount(() => dispatch(clearAuth()));

  if (!session) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  const { user } = session;

  const onSubmit = (formData: SignUpAdditionalForm) => {
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
      <h2>시작하기</h2>
      <h4>코너스를 시작하기 위해 정보를 입력해주세요.</h4>
      <SignUpForm
        fields={fields}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SignUpContainer;

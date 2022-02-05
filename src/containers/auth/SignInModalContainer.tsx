import React, {
  ReactElement, useEffect, useState,
} from 'react';

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import SignInError from '@/components/auth/SignInError';
import SignInModal from '@/components/auth/SignInModal';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function SignInModalContainer(): ReactElement | null {
  const { query, replace } = useRouter();
  const [isVisible, setSignInModalVisible] = useRecoilState(signInModalVisibleState);
  const { data: profile } = useFetchUserProfile();
  const { data: user } = useGetUser();

  const [error, setError] = useState<string>('');

  const onClose = () => {
    setSignInModalVisible(false);
    setError('');
  };

  useEffect(() => {
    if (query?.error && query.error !== 'unauthenticated') {
      setSignInModalVisible(true);
      setError(query.error as string);
      replace('/', undefined, { shallow: true });
    }
  }, [query]);

  if (user && profile) {
    return null;
  }

  return (
    <SignInModal
      onClose={onClose}
      isVisible={isVisible}
    >
      <SignInError error={error} />
      <SocialButtonGroup />
    </SignInModal>
  );
}

export default SignInModalContainer;

import React, { ReactElement, useState } from 'react';

import { useRecoilState } from 'recoil';

import SignInError from '@/components/auth/SignInError';
import SignInModal from '@/components/auth/SignInModal';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function SignInModalContainer(): ReactElement | null {
  const [isVisible, setSignInModalVisible] = useRecoilState(signInModalVisibleState);
  const { data: profile } = useFetchUserProfile();

  const [error, setError] = useState<string>('');

  const onClose = () => {
    setSignInModalVisible(false);
    setError('');
  };

  if (profile) {
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

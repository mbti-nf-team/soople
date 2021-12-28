import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignInError from '@/components/auth/SignInError';
import SignInModal from '@/components/auth/SignInModal';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function SignInModalContainer(): ReactElement | null {
  const { query, replace } = useRouter();
  const dispatch = useAppDispatch();
  const isVisible = useSelector(getAuth('isVisible'));
  const [error, setError] = useState<string>('');
  const [session] = useSession();

  const onClose = useCallback(() => {
    dispatch(setSignInModalVisible(false));
    setError('');
  }, [dispatch]);

  useEffect(() => {
    if (query?.error) {
      dispatch(setSignInModalVisible(true));
      setError(query.error as string);
      replace('/', undefined, { shallow: true });
    }
  }, [query, dispatch]);

  if (session) {
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

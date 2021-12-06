import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import SignInModal from '@/components/auth/SignInModal';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function SignInModalContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const isVisible = useSelector(getAuth('isVisible'));

  const onClose = useCallback(() => dispatch(setSignInModalVisible(false)), [dispatch]);

  return (
    <SignInModal
      onClose={onClose}
      isVisible={isVisible}
    >
      <SocialButtonGroup />
    </SignInModal>
  );
}

export default SignInModalContainer;

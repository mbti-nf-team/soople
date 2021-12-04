import React, { ReactElement } from 'react';

import SignInModal from '@/components/auth/SignInModal';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';

interface Props {
  onClose: () => void;
  isVisible: boolean;
}

export default function SignInModalContainer({ onClose, isVisible }: Props): ReactElement {
  return (
    <SignInModal
      onClose={onClose}
      isVisible={isVisible}
    >
      <SocialButtonGroup />
    </SignInModal>
  );
}

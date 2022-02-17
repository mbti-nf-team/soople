import React, { ReactElement } from 'react';
import { X as CloseIcon } from 'react-feather';

import palette from '@/styles/palette';

type Props = {
  closeToast: any;
}

function CloseButton({ closeToast }: Props): ReactElement {
  return (
    <CloseIcon
      onClick={closeToast}
      color={palette.accent6}
      data-testid="close-icon"
      width="20px"
      height="20px"
    />
  );
}

export default CloseButton;

import React, { ReactElement } from 'react';
import { X as CloseIcon } from 'react-feather';

import { useTheme } from '@emotion/react';

type Props = {
  closeToast: any;
}

function CloseButton({ closeToast }: Props): ReactElement {
  const theme = useTheme();

  return (
    <CloseIcon
      onClick={closeToast}
      color={theme.accent6}
      data-testid="close-icon"
      width="20px"
      height="20px"
    />
  );
}

export default CloseButton;

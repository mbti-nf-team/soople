import React, { ReactElement } from 'react';
import { X as CloseIcon } from 'react-feather';
import { Bounce } from 'react-toastify';

import NextNProgress from 'nextjs-progressbar';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import GlobalStyles from '@/styles/GlobalStyles';
import palette from '@/styles/palette';
import StyledToastContainer from '@/styles/StyledToastContainer';

import 'react-toastify/dist/ReactToastify.css';

function Core(): ReactElement {
  useGetUserToken();

  return (
    <>
      <NextNProgress
        color={palette.success}
      />
      <GlobalStyles />
      <StyledToastContainer
        theme="light"
        closeOnClick
        pauseOnHover
        transition={Bounce}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        position="top-right"
        icon={false}
        closeButton={<CloseIcon color={palette.accent6} width="20px" height="20px" />}
      />
    </>
  );
}

export default Core;

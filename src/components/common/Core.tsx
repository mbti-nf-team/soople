import React, { ReactElement } from 'react';
import { Bounce } from 'react-toastify';

import NextNProgress from 'nextjs-progressbar';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import GlobalStyles from '@/styles/GlobalStyles';
import palette from '@/styles/palette';
import StyledToastContainer from '@/styles/StyledToastContainer';

import CloseButton from './CloseButton';

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
        autoClose={3000}
        icon={false}
        closeButton={CloseButton}
      />
    </>
  );
}

export default Core;

import React, { ReactElement } from 'react';
import { Bounce } from 'react-toastify';

import NextNProgress from 'nextjs-progressbar';

import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useCheckSignUp from '@/hooks/api/auth/useCheckSignUp';
import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import GlobalStyles from '@/styles/GlobalStyles';
import palette from '@/styles/palette';
import StyledToastContainer from '@/styles/StyledToastContainer';

import useRefreshToken from '../../hooks/api/auth/useRefreshToken';

import CloseButton from './CloseButton';

import 'react-toastify/dist/ReactToastify.css';

function Core(): ReactElement {
  useGetUserToken();
  useRefreshToken();
  useAuthRedirectResult();
  useCheckSignUp();

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

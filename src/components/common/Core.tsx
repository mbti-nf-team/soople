import React, { ReactElement } from 'react';
import { Bounce } from 'react-toastify';

import { useTheme } from '@emotion/react';
import NextNProgress from 'nextjs-progressbar';

import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useCheckSignUp from '@/hooks/api/auth/useCheckSignUp';
import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import useResponsive from '@/hooks/useResponsive';
import GlobalStyles from '@/styles/GlobalStyles';
import StyledToastContainer from '@/styles/StyledToastContainer';

import useRefreshToken from '../../hooks/api/auth/useRefreshToken';

import CloseButton from './CloseButton';

import 'react-toastify/dist/ReactToastify.css';

function Core(): ReactElement {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  useGetUserToken();
  useRefreshToken();
  useAuthRedirectResult();
  useCheckSignUp();

  return (
    <>
      <NextNProgress
        color={theme.success}
        options={{
          showSpinner: false,
          easing: 'ease',
          speed: 300,
          trickle: false,
        }}
      />
      <GlobalStyles />
      <StyledToastContainer
        closeOnClick
        pauseOnHover
        transition={Bounce}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        position="top-right"
        autoClose={3000}
        icon={false}
        isMobile={isMobile}
        closeButton={!isMobile && CloseButton}
      />
    </>
  );
}

export default Core;

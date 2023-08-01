import { ReactElement } from 'react';
import { Bounce } from 'react-toastify';

import NextNProgress from 'nextjs-progressbar';

import { useTheme } from '@emotion/react';
import { GlobalPortal } from '@nf-team/react';

import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useCheckSignUp from '@/hooks/api/auth/useCheckSignUp';
import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import useRefreshToken from '@/hooks/api/auth/useRefreshToken';
import useResponsive from '@/hooks/useResponsive';
import GlobalStyles from '@/styles/GlobalStyles';
import StyledToastContainer from '@/styles/StyledToastContainer';

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
      <GlobalPortal>
        <StyledToastContainer
          closeOnClick
          pauseOnHover
          transition={Bounce}
          hideProgressBar
          pauseOnFocusLoss
          draggable
          position="top-center"
          autoClose={3000}
          icon={false}
          isMobile={isMobile}
          closeButton={!isMobile && CloseButton}
        />
      </GlobalPortal>
    </>
  );
}

export default Core;

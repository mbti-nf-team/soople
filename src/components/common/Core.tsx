import React, { ReactElement } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import GlobalStyles from '@/styles/GlobalStyles';

import 'react-toastify/dist/ReactToastify.css';

function Core(): ReactElement {
  useGetUserToken();

  return (
    <>
      <GlobalStyles />
      <ToastContainer
        theme="light"
        closeOnClick
        pauseOnHover
        autoClose={5000}
        transition={Bounce}
        pauseOnFocusLoss
        draggable
        position="top-right"
        bodyClassName="toast-body"
      />
    </>
  );
}

export default Core;

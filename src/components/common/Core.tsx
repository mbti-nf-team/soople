import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

import GlobalStyles from '@/styles/GlobalStyles';

import 'react-toastify/dist/ReactToastify.css';

const Core = () => (
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

export default Core;

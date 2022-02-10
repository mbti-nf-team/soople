import { ReactElement } from 'react';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';

function SignUpPage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <SignUpContainer />
    </>
  );
}

export default SignUpPage;

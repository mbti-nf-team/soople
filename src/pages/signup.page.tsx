import { ReactElement } from 'react';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import Layout from '@/styles/Layout';

function SignUpPage(): ReactElement {
  return (
    <Layout>
      <SignUpContainer />
    </Layout>
  );
}

export default SignUpPage;

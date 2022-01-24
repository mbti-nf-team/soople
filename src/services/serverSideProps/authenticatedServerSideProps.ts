import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import firebaseAdmin from '@/services/firebase/firebaseAdmin';

const authenticatedServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/?error=unauthenticated',
      },
      props: {},
    };
  }
};

export default authenticatedServerSideProps;

import type { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import firebaseAdmin from '@/services/firebase/firebaseAdmin';

async function authenticated(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = nookies.get(res);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default authenticated;

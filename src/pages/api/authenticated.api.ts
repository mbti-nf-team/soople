import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

import firebaseAdmin from '@/services/firebase/firebaseAdmin';

async function authenticated(req: NextApiRequest, res: NextApiResponse<unknown>) {
  try {
    const cookies = nookies.get(res);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(401);
  }
}

export default authenticated;

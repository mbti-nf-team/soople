import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

import firebaseAdmin from '@/services/firebase/firebaseAdmin';

type Data = {
  token: DecodedIdToken;
}

async function authenticated(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const cookies = nookies.get(res);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(401);
  }
}

export default authenticated;

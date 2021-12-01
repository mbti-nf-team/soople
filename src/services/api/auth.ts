import { Profile } from '@/models/auth';

import firestore from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, name, thumbnail,
}: Profile) => {
  const user = firestore.collection('users').doc(uid);

  await user.update({
    name,
    image: thumbnail,
    portfolioUrl,
  });
};

export const temp = [];

import { Profile } from '@/models/auth';

import firestore from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, userId, name, thumbnail,
}: Profile) => {
  const user = firestore.collection('users').doc(uid);

  await user.update({
    name,
    image: thumbnail,
    userId,
    portfolioUrl,
  });
};

export const temp = [];

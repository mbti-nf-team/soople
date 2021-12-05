import { Profile } from '@/models/auth';

import { collection } from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, name, image,
}: Profile) => {
  const user = collection('users').doc(uid);

  await user.update({
    name,
    image,
    portfolioUrl,
  });
};

export const temp = [];

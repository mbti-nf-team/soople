import { Profile } from '@/models/auth';

import { collection } from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, name, image, position,
}: Profile) => {
  const user = collection('users').doc(uid);

  await user.update({
    name,
    image,
    portfolioUrl,
    position,
  });
};

export const temp = [];

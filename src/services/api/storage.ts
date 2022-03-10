import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';

import { storageRef } from '../firebase';

export const uploadGroupThumbnail = async ({
  userUid, thumbnail,
}: { userUid: string; thumbnail: File}) => {
  const imageRef = storageRef(`thumbnail/${userUid}/${nanoid()}/${thumbnail.name}`);

  const result = await uploadBytes(imageRef, thumbnail);

  const url = await getDownloadURL(result.ref);

  return url;
};

export const deleteGroupThumbnail = async (thumbnailUrl: string) => {
  const httpsReference = storageRef(thumbnailUrl);

  await deleteObject(httpsReference);
};

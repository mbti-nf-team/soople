import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

import { storageRef } from '../firebase';

export const uploadStorageFile = async ({
  storagePath, file,
}: { storagePath: string; file: File }) => {
  const imageRef = storageRef(storagePath);

  const result = await uploadBytes(imageRef, file);

  const url = await getDownloadURL(result.ref);

  return url;
};

export const deleteStorageFile = async (fileUrl: string) => {
  const httpsReference = storageRef(fileUrl);

  await deleteObject(httpsReference);
};

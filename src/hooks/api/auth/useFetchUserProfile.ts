import { useQuery } from 'react-query';

import { AuthError } from 'firebase/auth';

import { Profile } from '@/models/auth';
import { getUserProfile } from '@/services/api/auth';

function useFetchUserProfile(userUid: string) {
  const query = useQuery<Profile, AuthError>(['user', userUid], () => getUserProfile(userUid), {
    enabled: !!userUid,
  });

  return query;
}

export default useFetchUserProfile;

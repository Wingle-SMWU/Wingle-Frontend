import { useQuery } from 'react-query';
import { getProfile } from '@/src/api/mypage/profileData';
import { ProfileStateType } from '@/src/types/mypage/profileType';

export default function useGetProfile() {
  const { data: profileData, isLoading, isError, isIdle } = useQuery<ProfileStateType>('profile', getProfile, {
    retry: 0,
  });

  return { profileData, isLoading, isError, isIdle };
}

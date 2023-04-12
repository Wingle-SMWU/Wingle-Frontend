import { adminPerAPI } from '@/src/api/admin';
import { useMutation } from 'react-query';

type MutateFactor = {
  userId: string | undefined;
  reason?: string;
}

export default function usePostPermission({ userId, reason }: MutateFactor) {

  let path = reason ? 'rejection' : 'acceptance';

  const { mutate, isLoading, error } = useMutation(() => adminPerAPI.post({path, userId, reason}), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  });

  return { mutate, isLoading, error };
}
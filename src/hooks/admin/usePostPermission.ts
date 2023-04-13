import { adminPerAPI } from '@/src/api/admin';
import { useMutation } from 'react-query';


export default function usePostPermission(userId: string | undefined, reason: string) {

  const path = reason ? 'rejection' : 'acceptance';

  const body = { userId: userId };
  if(reason) body['reason'] = reason;

  const { mutate, isLoading, error } = useMutation(() => adminPerAPI.post(path, body), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  });

  return { mutate, isLoading, error };
}
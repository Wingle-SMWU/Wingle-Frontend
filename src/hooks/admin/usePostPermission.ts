import { adminPerAPI } from '@/src/api/admin';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';


export default function usePostPermission(userId: number, reason: string) {

  const path = reason ? 'rejection' : 'acceptance';

  const body = { userId };
  if(reason) body['reason'] = reason;

  const router = useRouter();

  const { mutate, isLoading, error } = useMutation(() => adminPerAPI.post(path, body), {
    onSuccess: (res) => router.push('/admin'),
    onError: (res) => console.log(res),
  });

  return { mutate, isLoading, error };
}
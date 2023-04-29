import { adminPerAPI } from '@/src/api/admin/admin';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';


export default function usePostPermission(userId: number, reason: string | null | undefined) {

  const path = reason ? 'rejection' : 'acceptance';

  const body = { userId };
  if(reason) Object.assign(body, {'reason': reason})
  

  const router = useRouter();

  const { mutate, isLoading, error } = useMutation(() => adminPerAPI.post(path, body), {
    onSuccess: () => router.push('/admin'),
  });

  return { mutate, isLoading, error };
}
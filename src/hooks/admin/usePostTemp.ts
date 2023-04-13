import { useMutation } from 'react-query';
import { adminTempAPI } from '../../api/admin';
import { ReactNode } from 'react';
import { ADMIN_TEMP_STORE } from '@/src/constants/constants';

export default function usePostTemp(children: ReactNode, userId: number, val: string) {

  const path = ADMIN_TEMP_STORE[children];
  const body = { userId };
  body[ADMIN_TEMP_STORE[children]] = val;


  const { mutate, isLoading, error } = useMutation(() => adminTempAPI.post(path, body), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })

  return { mutate, isLoading, error };
}
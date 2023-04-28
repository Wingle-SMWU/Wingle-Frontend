import { useMutation } from 'react-query';
import { adminTempAPI } from '../../api/admin';
import { ReactNode } from 'react';

export default function usePostTemp(
  children: ReactNode, 
  userId: number, 
  val: { reject: string, memo: string }) {

  let path = '';
  let body = { userId };
  if(children === '거절사유') {
    path = 'reject';
    Object.assign(body, {'reject': val.reject})
  }
  if(children === '메모') {
    path = 'memo';
    Object.assign(body, {'memo': val.memo})
  }

  const { mutate, isLoading, error } = useMutation(() => adminTempAPI.post(path, body), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })

  return { mutate, isLoading, error };
}
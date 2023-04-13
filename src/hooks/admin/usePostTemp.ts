import { useMutation } from 'react-query';
import { adminTempAPI } from '../../api/admin';
import { ReactNode } from 'react';

export default function usePostTemp(
  children: ReactNode, 
  userId: number, 
  val: { reject: string, memo: string }) {

  let path = '', body = {userId, path};
  if(children === '거절사유') {
    path = 'reject';
    body = { userId, path: val.reject }
  }
  if(children === '메모') {
    path = 'memo';
    body = { userId, path: val.memo }
  }

  const { mutate, isLoading, error } = useMutation(() => adminTempAPI.post(path, body), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })

  return { mutate, isLoading, error };
}
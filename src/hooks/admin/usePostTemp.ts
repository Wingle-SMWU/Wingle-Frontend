import { useMutation } from 'react-query';
import { adminTempAPI } from '../../api/admin';
import { ReactNode } from 'react';

export default function usePostTemp(
  children: ReactNode, 
  userId: number, 
  val: { reject: string, memo: string }) {

  let path = '';
  let body = {};
  if(children === '거절사유') {
    path = 'reject';
    body = { userId, 'reject': val.reject }
  }
  if(children === '메모') {
    path = 'memo';
    body = { userId, 'memo': val.memo }
  }

  const { mutate, isLoading, error } = useMutation(() => adminTempAPI.post(path, body), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })

  return { mutate, isLoading, error };
}
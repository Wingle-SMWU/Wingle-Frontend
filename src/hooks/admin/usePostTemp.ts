import { useMutation } from 'react-query';
import { adminTempAPI } from '../../api/admin/admin';
import { ReactNode } from 'react';

export default function usePostTemp(children: ReactNode, userId: number, val: { reject: string, memo: string }) {

  let path = '';
  let body = { userId };
  if(children === '거절사유') {
    path = 'rejection';
    Object.assign(body, {'reason': val.reject})
  }
  if(children === '메모') {
    path = 'memo';
    Object.assign(body, {'memo': val.memo})
  }

  const { mutate, isLoading, error } = useMutation(() => adminTempAPI.post(path, body), {
    onSuccess: () => alert('임시저장이 완료되었습니다.'),
  })

  return { mutate, isLoading, error };
}
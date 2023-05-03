import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { postOrderStateAtom } from '../../atoms/admin/admin';
import { adminListAPI } from '../../api/admin/admin';
import usePostPermission from './usePostPermission';

export default function useDetailDispatch() {
  const [isOpen, setIsOpen] = useState('');
  const userId = Number(useRouter().asPath.split('?').at(-2));
  const postOrder = Number(useRouter().asPath.split('?').at(-1));
  const setPostOrder = useSetRecoilState(postOrderStateAtom);
  const [inputs, setInputs] = useState({
    reject: '',
    memo: '',
  })

  const { data, isError } = useQuery(['getUser', userId], () => adminListAPI.getUser({path: 'waiting', userId}), { cacheTime: 0, retry: 0 });

  const { mutate, isLoading } = usePostPermission(userId, inputs.reject);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  }

  useEffect(() => {
    setPostOrder(postOrder)
    data && data.data.reason && data.data.memo && setInputs({reject: data.data.reason, memo: data.data.memo});
  }, [data, postOrder, setPostOrder])

  return {
    isOpen,
    setIsOpen,
    userId,
    inputs,
    setInputs,
    data,
    isError,
    isLoading,
    handleSubmit,
  }
}
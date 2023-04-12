import usePostPermission from '@/src/hooks/admin/usePostPermission';
import { AdminUserResp } from '@/src/types/admin.type';
import { useState, useCallback } from 'react';
import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'
import { useMutation } from 'react-query';
import { adminPerAPI } from '@/src/api/admin';

type ContentsFactor = {
  data: AdminUserResp;
  userId: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contents({ data, userId, setIsOpen }: ContentsFactor) {

  const [reason, setReason] = useState('');
  
  const handleChangeReason = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value), []);
  
  const { mutate, isLoading, error } = usePostPermission({userId, reason});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  }

  return (
    <S.Contents id='form' onSubmit={handleSubmit}>
      <Profile data={data} />
      <Reject setIsOpen={setIsOpen} handleChangeReason={handleChangeReason}>거절사유</Reject>
      <Reject setIsOpen={setIsOpen}>메모</Reject>
    </S.Contents>
  )
}

const S = {
  Contents: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 944px;
    position: absolute;
    left: 248px;
    top: 739px;
  `
}
import { useState } from 'react';
import usePostPermission from '@/src/hooks/admin/usePostPermission';
import { AdminUserResp } from '@/src/types/admin.type';
import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'

type ContentsFactor = {
  data: AdminUserResp;
  userId: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contents({ data, userId, setIsOpen }: ContentsFactor) {

  const [reason, setReason] = useState('');
  
  const { mutate, isLoading, error } = usePostPermission(userId, reason);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  }

  return (
    <S.Contents id='form' onSubmit={handleSubmit}>
      <Profile data={data} />
      <Reject setIsOpen={setIsOpen} reason={reason} setReason={setReason} userId={userId}>거절사유</Reject>
      <Reject setIsOpen={setIsOpen} reason={reason} setReason={setReason} userId={userId}>메모</Reject>
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
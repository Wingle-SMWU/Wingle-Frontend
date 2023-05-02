import { useState, useEffect } from 'react';
import usePostPermission from '@/src/hooks/admin/usePostPermission';
import { AdminUserResp } from '@/src/types/admin/admin';
import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'

type ContentsFactor = {
  data: AdminUserResp;
  userId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contents({ data, userId, setIsOpen }: ContentsFactor) {

  const [inputs, setInputs] = useState({
    reject: '',
    memo: '',
  })

  const { mutate } = usePostPermission(userId, inputs.reject);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  }

  useEffect(() => {
    data && data.reason && data.memo && setInputs({reject: data.reason, memo: data.memo});
  }, [data])

  return (
    <S.Contents id='form' onSubmit={handleSubmit}>
      <Profile data={data} />
      <Reject setIsOpen={setIsOpen} inputs={inputs} setInputs={setInputs} userId={userId} data={data}>거절사유</Reject>
      <Reject setIsOpen={setIsOpen} inputs={inputs} setInputs={setInputs} userId={userId} data={data}>메모</Reject>
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
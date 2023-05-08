import { AdminUserResp } from '@/src/types/admin/admin';
import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'

type ContentsFactor = {
  data: AdminUserResp;
  userId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  inputs: { reject: string, memo: string };
  setInputs: React.Dispatch<React.SetStateAction<{reject: string, memo: string }>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Contents({ data, userId, setIsOpen, inputs, setInputs, handleSubmit }: ContentsFactor) {

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
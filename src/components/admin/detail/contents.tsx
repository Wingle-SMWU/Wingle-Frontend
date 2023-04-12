import { AdminUserResp } from '@/src/types/admin.type';
import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'

type ContentsFactor = {
  data: AdminUserResp;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contents({ data, setIsOpen }: ContentsFactor) {
  return (
    <S.Contents id='form'>
      <Profile data={data} />
      <Reject setIsOpen={setIsOpen}>거절사유</Reject>
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
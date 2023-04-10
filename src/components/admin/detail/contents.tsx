import styled from 'styled-components'
import Profile from './profile'
import Reject from './reject'

export default function Contents() {
  return (
    <S.Contents id='form'>
      <Profile />
      <Reject>거절사유</Reject>
      <Reject>메모</Reject>
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
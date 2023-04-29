import styled from 'styled-components'
import { AdminUserResp } from '../../../types/admin/admin';
import { USER_NATIONALITY } from '@/src/constants/admin';
import { useRecoilValue } from 'recoil';
import { postOrderStateAtom } from '../../../atoms/admin/admin';

type ProfileFactor = {
  data: AdminUserResp;
}

export default function Profile({ data }: ProfileFactor) {

  const postOrder = useRecoilValue(postOrderStateAtom);

  return (
    <S.Profile>
      <div><p>No</p><p>{postOrder}</p></div>
      <div><p>이름</p><p>{data?.name}</p></div>
      <div><p>구분</p><p>{data?.nation === 'KR' ? USER_NATIONALITY[0] : USER_NATIONALITY[1]}</p></div>
      <div><p>가입신청일</p><p>{data?.createdTime.split('T')[0]}</p></div>
    </S.Profile>
  )
}

const S = {
  Profile: styled.div`
    > div {
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #EEEEF2;
      > p {
        font-family: 'Pretendard';
        font-style: normal;
        font-size: 14px;
        line-height: 140%;
        padding: 20px 16px;
        color: #222223;
      }
      > p:nth-child(1) {
        width: 144px;
        font-weight: 700;
      }
      > p:nth-child(2) {
        width: 788px;
        padding: 20px 0;
        font-weight: 400;
      }

    }
  `
}
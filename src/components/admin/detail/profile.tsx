import styled from 'styled-components'

export default function Profile() {

  const data = {
    "userId": 5,
    "name": "성이름",
    "createdTime": "2023-02-21T01:06:53.014058",
    "idCardImage": "https://wingle-bucket.s3.ap-northeast-2.amazonaws.com/idCardImage/20230221010652431045299841939.png",
    "nation": "KR"
  }

  return (
    <S.Profile>
      <div><p>No</p><p>{data.userId}</p></div>
      <div><p>이름</p><p>{data.name}</p></div>
      <div><p>구분</p><p>{data.nation}</p></div>
      <div><p>가입신청일</p><p>{data.createdTime}</p></div>
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
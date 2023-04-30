// 네트워크 호출 관련, axiosModul로 더욱 간편하게! 이야!

import instance from "../axiosModule";
// axios도 가능
import axios from "../axiosModule";

export const getPickers = async () => {
  const response = await axios.get("/groups");
  return response.data;
};

export const createPickers = async (name: string, groupImgIndex: number): Promise<void> => {
  const response = await instance.post("/groups", {
    name,
    groupImgIndex,
  });
  return response.data;
};


const getForums = async() => {
  const response = await axios.get("/community/forums", /* config */)
  return response.data
};


// 리액트 쿼리 실제 사용 예시

// const { data: TabArr, isLoading, isError } = useQuery({
//   queryFn: getForums,
//   queryKey: ['forums'],
// })

// const { mutate: login, isLoading } = useMutation(
//   async () => {
//     const response = await axios.post(`${SERVER_URL}/api/login`, {
//       email,
//       password,
//     });
//     return response.data;
//   },
//   {
//     onSuccess: (data) => {
//       console.log(`로그인 성공! ${data}`);
//       // TODO: 나중에 토큰 로컬스토리지 넣기, 메인 페이지로 라우팅
//     },
//     onError: (error) => {
//       console.log(`로그인 실패! ${error}`);
//     },
//   }
// );

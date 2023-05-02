import axios from "axios";
import {
  getRefreshTokenFromLocalStorage,
  saveRefreshTokenToLocalStorage,
} from "../utils/refreshTokenHandler";
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from "../utils/accessTokenHandler";

export const SERVER_URL = `https://server-prod.wingle.kr/api/v1`;

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${getAccessTokenFromLocalStorage()}}`,
    // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaXphQGFhLmNvbSIsIkFVVEgiOiJST0xFX0FETUlOIiwiZXhwIjoyMDA1NzUwMjQ2fQ.Ya6V_66n0CwgOXyl8-AwE90lCIf5CSV3-mxaJart_o4g6JOYcfp1yAT-K9qhl9zBI7MfoPhrrxsCzOoejeF6kw`
  },
});

export default instance;

// instance.interceptors.request.use(
//   async (config) => {
//     console.log(config, getAccessTokenFromLocalStorage());

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;

//     // 에러 응답이 없으면 error 리턴 - 다른 에러로 response.status 가 없을 수 있음.
//     if (!response) {
//       return Promise.reject(error);
//     }

//     // 400 에러는 사용자의 잘못된 요청으로 인한 에러이므로 에러 메시지를 띄워주고 throw
//     if (response.status === 400) {
//       throw new Error(`${response.data.message}`);
//     }

//     // 리프레시 토큰으로 엑세스 토큰 재발급
//     const accessToken = await getAccessToken();

//     if (response.status === 401) {
//       saveAccessTokenToLocalStorage(`Bearer ${accessToken}`);
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       return axios(config);
//     }

//     if (
//       response.status === 404 &&
//       response.data.message === "다시 로그인해주세요." &&
//       response.config.url === "/auth/refresh"
//     ) {
//       localStorage.clear();
//       window.location.href = "/auth/login";
//     }

//     return Promise.reject(error);
//   }
// );

// // 기능 : 리프레시 토큰으로 엑세스 토큰 재발급
// const getAccessToken = async () => {
//   try {
//     const refresh = getRefreshTokenFromLocalStorage();

//     // null 처리
//     if (refresh === null) {
//       throw new Error("리프레시 토큰이 존재하지 않습니다.");
//     }

//     const response = await instance.get("/auth/refresh", {
//       headers: {
//         refreshToken: refresh,
//       },
//     });

//     // 토큰 재발급에 성공한 경우
//     if (response.status === 200) {
//       const {
//         data: { grantType, accessToken, refreshToken },
//       } = response;

//       // 새로운 access token을 로컬 스토리지에 저장
//       saveAccessTokenToLocalStorage(`${grantType} ${accessToken}`);

//       // 새로운 refresh token이 발급된 경우에는 해당 토큰도 로컬 스토리지에 저장
//       saveRefreshTokenToLocalStorage(`${refreshToken}`);

//       return accessToken;
//     }

//     // refresh token이 만료된 경우 1개
//     if (
//       response.status === 404 &&
//       response.data.message === "다시 로그인해주세요." &&
//       response.config.url === "/auth/refresh"
//     ) {
//       throw new Error(`${response.data.message}`);
//     }

//     // 그 외의 경우에는 에러를 발생시킴
//     throw new Error(
//       `토큰 재발급에 실패했습니다. 상태 코드: ${response.status}`
//     );
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

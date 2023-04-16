import axios, { AxiosResponse } from "axios";

export const SERVER_URL = `https://server-prod.wingle.kr/api/v1`;

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWJAYWEuY29tIiwiQVVUSCI6IlJPTEVfVVNFUiIsImV4cCI6MjAwMzM4OTE0MH0.mD1FqQkgMTKZB-Pkwd1qWIWMK4tl_hGInEDG1aP7rB7ZZOJIlj6AmlCxJvwJSXTtui7vl3bpyMLf__v_gJyTnA`,
  },
});

instance.interceptors.response.use((response: AxiosResponse):Promise<AxiosResponse> => {
  const { status, data } = response;
  if(status !== 200) {
    return Promise.reject(response);
  }
  return data;
})

export default instance;
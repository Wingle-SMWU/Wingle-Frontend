import axios from "axios";

const useAPI = () => {
  const config = {
    baseURL: process.env.REACT_APP_HOST,
    withCredentials: true,
    headers: {
      ContentType: "application/json",
      Authorization: "access token",
    },
  };

  const axiosWithAccessToken = axios.create(config);
  axiosWithAccessToken.interceptors.response.use(
    (response) => response,
    (err) => {
      // console.log(err);
      if (err.response.data.message !== "Token Expired") return;
    }
  );

  return axiosWithAccessToken;
};

export default useAPI;

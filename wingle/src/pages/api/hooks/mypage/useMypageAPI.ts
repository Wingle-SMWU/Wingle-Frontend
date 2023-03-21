import useAPI from "../useAPI";
import axios from "axios";
import { SERVER_URL } from "..";
import { getAccessTokenFromLocalStorage } from "../../../../utils/accessTokenHandler";

function useMypageAPI() {
  const api = useAPI();

  const saveProfile = async (image: string, imageDelete: boolean, nickname: string) => {
    const formData = new FormData()
    formData.append("image", image)

    const value = [{
        imageDelete,
        nickname
    }]

    const blob = new Blob([JSON.stringify(value)], {type: "application/json"})
    formData.append("data", blob) // 또는  formData.append("data", JSON.stringify(value)); // JSON 형식으로 파싱.(백엔드의 요청에 따라 전송방식이 달라진다.)
    await axios({
        baseURL: SERVER_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
        data: formData,
    })
    .then((response) => response)
    .catch((err) => err)
  }

  return {
    saveProfile,
  };
}


export default useMypageAPI;

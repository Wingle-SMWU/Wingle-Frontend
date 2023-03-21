import useAPI from "../useAPI";


function useCommunityAPI() {
  const api = useAPI();

//   const getArticle = () =>
//     api.get(`/community/:forumId/articles/:articleId`).then((res) => res);
    
//   const deleteArticle = () =>
//     api.delete(`/community/:forumId/articles/:articleId`).then((res) => res);

// TODO: article formdata 인터페이스 작성
  const axiosCreateArticle = (article: FormData) => api.post(`/community/articles`, article, {
    headers: {
      "Content-Type": "multipart/form-data",
    }})
  .then((res) => res.data)
  .catch((err) => {
    
  });

  return {
    // getArticle,
    // deleteArticle,
    axiosCreateArticle,
  };
}

export default useCommunityAPI;

import useAPI from "../useAPI";

function useCommunityAPI() {
  const api = useAPI();

  const deleteComment = (forumId: number, articleId: number, commentId: number) =>
    api.delete(`/community/${forumId}/articles/${articleId}/comments/${commentId}`).then((res) => res);

  return {
    deleteComment,
  };
}

export default useCommunityAPI;

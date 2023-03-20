import useCommunityAPI from "./useCommunityAPI";

const useDeleteComment = () => {
  const { deleteComment } = useCommunityAPI();

  const deletedComment = async (forumId: number, articleId: number, commentId: number) => {
    try {
      await deleteComment(forumId, articleId, commentId);
    } catch (data) {
      console.log(data);
      console.log("댓글 삭제 실패");
    }
  };

  return { deletedComment };
};

export default useDeleteComment;

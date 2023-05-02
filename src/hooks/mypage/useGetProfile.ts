import { useQuery } from "react-query";
import { getProfile } from "@/src/api/mypage/profileData";

const useGetProfile = () => {
  const { data: profileData, isLoading, isError } = useQuery({
    queryKey : ['profile'],
    queryFn : () => { return getProfile()},
  });


  return { data:profileData, isLoading, isError };
};

export default useGetProfile;

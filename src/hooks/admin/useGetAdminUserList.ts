import { useQuery } from "react-query";
import { adminListAPI } from "@/src/api/admin/admin";
import { useRouter } from "next/router";

type QueryFactor = {
  path: string;
  page: number;
};

export default function useGetAdminUserList({ path, page }: QueryFactor) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    [path, { path, page }],
    () => adminListAPI.get({ path, page: page - 1 }),
    {
      retry: 0,
      cacheTime: 0,
      onError: () => {
        alert("권한이 없습니다");
        router.back();
      },
    }
  );

  return { data, isLoading, isError };
}

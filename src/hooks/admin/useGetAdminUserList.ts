import { useQuery } from 'react-query';
import { adminAPI } from '@/src/api/admin';

type QueryFactor = {
  path: string;
  page: number;
}

export default function useGetAdminUserList({ path, page }: QueryFactor) {
  
  const { data, isLoading, error } = useQuery(
    [path, { path, page }],
    () => adminAPI.getList({ path, page: page - 1 }),
    {
      onSuccess: (res) => console.log(res),
      onError: (res) => console.log(res),
    }
  );

  return { data, isLoading, error };
}
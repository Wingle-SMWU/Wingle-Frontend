import { useQuery } from 'react-query';
import { adminListAPI } from '@/src/api/admin/admin';

type QueryFactor = {
  path: string;
  page: number;
}

export default function useGetAdminUserList({ path, page }: QueryFactor) {
  
  const { data, isLoading, error } = useQuery(
    [path, { path, page }],
    () => adminListAPI.get({ path, page: page - 1 }),
  );

  return { data, isLoading, error };
}
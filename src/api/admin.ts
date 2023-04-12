import instance from './axiosModul'

type GetList = {
  path: string;
  page: number;
}

export const adminListAPI = {
  url: '/admin/list',

  get: async ({ path, page }: GetList) => {
    const res = await instance.get(`${adminListAPI.url}/${path}/${page}`);
    return res.data;
  },
}
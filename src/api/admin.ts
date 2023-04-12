import instance from './axiosModul'

type GetList = {
  path: string;
  page: number;
}

export const adminAPI = {
  url: '/admin',

  getList: async ({ path, page }: GetList) => {
    const res = await instance.get(`${adminAPI.url}/list/${path}/${page}`);
    return res.data;
  },
}
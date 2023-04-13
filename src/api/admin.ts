import instance from './axiosModul'

type GetList = {
  path: string;
  page?: number;
  userId?: string | string[] | undefined;
}

type PostPermission = {
  userId: string | undefined;
  reason?: string;
}

type postTempStore = {
  userId: string | undefined;
  reason?: string;
  memo?: string;
}

export const adminListAPI = {
  url: '/admin/list',

  get: async ({ path, page }: GetList) => {
    const res = await instance.get(`${adminListAPI.url}/${path}/${page}`);
    return res.data;
  },

  getUser: async ({ path, userId }: GetList) => {
    const res = await instance.get(`${adminListAPI.url}/${path}/${userId}`);
    return res.data;
  } 
}

export const adminPerAPI = {
  url: '/admin/permission',

  post: async(path: string, body: PostPermission) => {
    const res = await instance.post(`${adminPerAPI.url}/${path}`, body);
    return res.data;
  }
}

export const adminTempAPI = {
  url: '/admin/user',

  post: async(path: string, body: postTempStore) => {
    const res = await instance.post(`${adminTempAPI.url}/${path}`, body);
    return res.data;
  }
}
import instance from './axiosModul'

type GetList = {
  path: string;
  page?: number;
  userId?: string | string[] | undefined;
}

type PostPermission = {
  path: string;
  userId: string | undefined;
  reason?: string;
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

  // postAccept: async({ path, userId }: PostPermission) => {
  //   const res = await instance.post(`${adminPerAPI.url}/${path}`, {userId});
  //   return res.data;
  // },

  // postReject: async({ path, userId, reason}: PostPermission) => {
  //   const res = await instance.post(`${adminPerAPI.url}/${path}`, {userId, reason});
  //   return res.data;
  // },

  post: async({ path, userId, reason }: PostPermission) => {
    const res = await instance.post(`${adminPerAPI.url}/${path}`, {userId, reason});
    return res.data;
  }
}
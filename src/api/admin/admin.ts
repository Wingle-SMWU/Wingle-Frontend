import { AdminUserResp, DataResp, ReturnResp } from '@/src/types/admin/admin';
import instance from '../axiosModule'

type GetList = {
  path: string;
  page?: number;
  userId?: number;
}

type PostPermission = {
  userId: number
  reason?: string;
}

type PostTempStore = {
  userId?: number;
  reject?: string;
  memo?: string;
}

export const adminListAPI = {
  url: '/admin',

  get: async ({ path, page }: GetList): Promise<ReturnResp<DataResp>> => {
    const res = await instance.get(`${adminListAPI.url}/list/${path}/${page}`);
    return res.data;
  },

  getUser: async ({ path, userId }: GetList): Promise<ReturnResp<AdminUserResp>> => {
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

  post: async(path: string, body: PostTempStore) => {
    const res = await instance.post(`${adminTempAPI.url}/${path}`, body);
    return res.data;
  }
}
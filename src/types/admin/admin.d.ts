export interface ReturnResp<T> {
  data: T;
  message: string;
  status: string;
}

export interface DataResp {
  list: AdminUserResp[];
  totalPages: number;
}

export interface AdminUserResp {
  userId: number;
  createdTime: string;
  name: string;
  nation: string | null;
  idCardImage?: string;
  memo?: string | null;
  reason?: string | null;
}
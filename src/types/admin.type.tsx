export interface AdminUserResp {
  userId: number;
  createdTime: string;
  name: string;
  nation: string | null;
  idCardImage?: string;
  memo?: string | null;
  reason?: string | null;
}
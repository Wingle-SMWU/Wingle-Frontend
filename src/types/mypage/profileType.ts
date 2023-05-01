type languagesType = {
  order: number;
  interest: string;
};

export type ProfileStateType = {
  gender : boolean;
  nickname: string;
  age: number;
  interests : string[];
  introduce: string;
  languages : languagesType[];
  nation : string;
  sns : any;
  image: string;
};

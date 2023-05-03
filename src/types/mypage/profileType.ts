type languagesType = {
  order: number;
  code : string;
  country: string;
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

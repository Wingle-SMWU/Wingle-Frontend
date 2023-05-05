export type LanguagesType = {
  order: number;
  interest : string;
};

export type ProfileStateType = {
  gender : boolean;
  nickname: string;
  age: number;
  interests : string[];
  introduce: string;
  languages : LanguagesType[];
  nation : string;
  sns : any;
  image: string;
};

export type ProfileUpdateType = {
  image: FormData | any;
  imageDelete: boolean;
  nickname: string;
};

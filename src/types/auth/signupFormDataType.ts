export interface SignUpFormData {
  idCardImage: FormData | null;
  email: string;
  password: string;
  name: string;
  isNicknameChecked: boolean;
  nickname: string;
  nation: string;
  gender: boolean;
  termsOfUse: boolean;
  termsOfPersonalInformation: boolean;
  termsOfPromotion: boolean;
}

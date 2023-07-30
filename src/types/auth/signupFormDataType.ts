export interface SignUpFormData {
  idCardImageUrl: string;
  email: string;
  password: string;
  schoolCode: string;
  department: string;
  studentNumber: string;
  name: string;
  isNicknameChecked: boolean;
  nickname: string;
  nation: string;
  gender: boolean;
  termsOfUse: boolean;
  termsOfPersonalInformation: boolean;
  termsOfPromotion: boolean;
}

export interface SignupInputData {
  email: string;
  emailCertification: string;
  password: string;
  passwordCheck: string;
  name: string;
  nickname: string;
}

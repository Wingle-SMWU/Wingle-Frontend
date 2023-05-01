export interface EmailAuthResponse {
  status: number;
  message: string;
  data: {
    certificationKey?: string;
  };
}

export interface EmailCertificationRequest {
  email: string;
  emailCertification: string;
}

export interface EmailCertificationResponse {
  status: number;
  message: string;
  data: {
    available?: boolean;
  };
}

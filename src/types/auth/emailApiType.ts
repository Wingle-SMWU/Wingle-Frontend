export interface EmailAuthResponse {
  status: number;
  message: string;
  data: {
    certificationKey?: string;
    requestCount?: number;
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

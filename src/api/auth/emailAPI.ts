import axios from "axios";
import instance from "../axiosModul";

interface EmailAuthResponse {
  status: number;
  message: string;
  data: {
    certificationKey?: string;
  };
}

interface EmailCertificationRequest {
  certificationKey: string;
  certificationCode: string;
}

interface EmailCertificationResponse {
  status: number;
  message: string;
  data: {
    available?: boolean;
  };
}

export const sendEmailAuth = async (email: string): Promise<string> => {
  const response = await instance.post<EmailAuthResponse>("/auth/email", { email });
  return response.data.data.certificationKey || "";
};

export const verifyEmailCertification = async (
  data: EmailCertificationRequest
): Promise<boolean> => {
  const response = await instance.post<EmailCertificationResponse>(
    "/auth/email/certification",
    data
  );
  return response.data.data.available || false;
};

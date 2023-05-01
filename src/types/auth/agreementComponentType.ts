export interface AgreementComponentProps {
  agreementTitle: string;
  isRequired: boolean;
  handleCheck: (check: boolean) => void;
  detail: string;
}

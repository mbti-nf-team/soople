export interface Profile {
  uid: string;
  name?: string | null;
  email: string;
  thumbnail?: string | null;
  portfolioUrl?: string | null;
}

export interface SignUpAdditionalForm {
  name: string;
  portfolioUrl: string;
}

export interface Profile {
  uid: string;
  name?: string | null;
  email: string;
  image?: string | null;
  portfolioUrl?: string | null;
  position?: string | null;
}

export interface SignUpAdditionalForm {
  name: string;
  portfolioUrl: string;
  position: string;
}

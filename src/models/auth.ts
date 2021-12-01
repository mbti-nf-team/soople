export interface Profile {
  uid: string;
  name?: string | null;
  email: string;
  thumbnail?: string | null;
  userId?: string | null;
  portfolioUrl?: string | null;
}

export interface RegisterAdditionalForm {
  userId: string;
  name: string;
  portfolioUrl: string;
}

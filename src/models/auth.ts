export interface Profile {
  uid: string;
  displayName: string | null;
  email: string | null;
  thumbnail: string | null;
  id?: string | null;
  portfolioUrl?: string | null;
}

export interface RegisterAdditionalForm extends Profile {
  id: string;
  displayName: string;
  portfolioUrl: string;
}

export interface Profile {
  uid: string;
  displayName: string | null;
  email: string | null;
  thumbnail: string | null;
  id?: string;
  portfolioUrl?: string;
}

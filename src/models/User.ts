// models/User.ts
export interface User {
  uid: string;
  email: string | null;
  role: string | null; // 'carOwner' or 'mechanic'
  displayName?: string | null;
}

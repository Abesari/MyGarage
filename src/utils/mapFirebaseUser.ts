// utils/mapFirebaseUser.ts
import { User } from '../models/User';

export function mapFirebaseUser(firebaseUser: any, role: string | null): User {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    role: role,
    displayName: firebaseUser.displayName || null,
  };
}

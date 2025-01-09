// context/AuthContext.ts
import { createContext } from 'react';
import { AppUser } from '../models/User';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  updateUserProfile: (updates: Partial<AppUser>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  updateUserProfile: async () => {},
});
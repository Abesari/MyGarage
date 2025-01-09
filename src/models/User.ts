// models/User.ts

// The roles a user can have
export type UserRole = 'mechanic' | 'carOwner';

// Base interface for all user types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  profileComplete: boolean;
}

// Mechanic-specific data
export interface MechanicUser extends User {
  role: 'mechanic';
  specialties: string[];
  availability: boolean;
  rating: number;
}

// Car owner-specific data
export interface CarOwnerUser extends User {
  role: 'carOwner';
  vehicles: Array<{
    make: string;
    model: string;
    year: number;
  }>;
}

// Type guard functions to help TypeScript understand our types
export function isMechanic(user: User): user is MechanicUser {
  return user.role === 'mechanic';
}

export function isCarOwner(user: User): user is CarOwnerUser {
  return user.role === 'carOwner';
}

// Helper type for auth context
export type AppUser = MechanicUser | CarOwnerUser;
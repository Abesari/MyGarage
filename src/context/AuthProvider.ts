import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { AuthContext } from './AuthContext';
import { AppUser, MechanicUser, CarOwnerUser, UserRole, isMechanic } from '../models/User';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();

          if (userData) {
            const baseUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: userData.displayName || null,
              profileComplete: userData.profileComplete ?? false,
              role: userData.role as UserRole,
            };

            let appUser: AppUser;
            
            if (userData.role === 'mechanic') {
              appUser = {
                ...baseUserData,
                role: 'mechanic',
                specialties: userData.specialties || [],
                availability: userData.availability || false,
                rating: userData.rating || 0,
              } as MechanicUser;
            } else {
              appUser = {
                ...baseUserData,
                role: 'carOwner',
                vehicles: userData.vehicles || [],
              } as CarOwnerUser;
            }

            setUser(appUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fixed type-safe profile updates
  const updateUserProfile = async (updates: Partial<AppUser>) => {
    if (!user) return;

    try {
      // First, update Firestore
      await updateDoc(doc(db, 'users', user.uid), updates);
      
      // Then update local state with type safety
      setUser((prevUser): AppUser | null => {
        if (!prevUser) return null;
        
        // Create updated user while maintaining role-specific types
        const updatedUser = { ...prevUser, ...updates };
        
        // Ensure we maintain the correct type based on role
        if (isMechanic(updatedUser)) {
          return {
            ...updatedUser,
            role: 'mechanic',
            specialties: updatedUser.specialties || prevUser.specialties,
            availability: updatedUser.availability ?? prevUser.availability,
            rating: updatedUser.rating ?? prevUser.rating,
          } as MechanicUser;
        } else {
          return {
            ...updatedUser,
            role: 'carOwner',
            vehicles: updatedUser.vehicles || prevUser.vehicles,
          } as CarOwnerUser;
        }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
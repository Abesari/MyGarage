import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import OwnerTabs from './OwnerTabs';
import MechanicTabs from './MechanicTabs';
import { auth, db } from '../config/firebase';
import { ActivityIndicator, View } from 'react-native';

export default function RootNavigator() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is logged in, fetch role
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
        setUser(currentUser);
      } else {
        // Not logged in
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : role === 'carOwner' ? (
        <OwnerTabs />
      ) : (
        <MechanicTabs />
      )}
    </NavigationContainer>
  );
}

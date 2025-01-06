// navigation/RootNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import OwnerTabs from './OwnerTabs';
import MechanicTabs from './MechanicTabs';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

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
      ) : user.role === 'carOwner' ? (
        <OwnerTabs />
      ) : (
        <MechanicTabs />
      )}
    </NavigationContainer>
  );
}

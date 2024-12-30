import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OwnerHomeScreen from '../screens/Owner/OwnerHomeScreen';

const Tab = createBottomTabNavigator();

export default function OwnerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="OwnerHome" component={OwnerHomeScreen} />
      {/* Add more tabs as needed */}
    </Tab.Navigator>
  );
}

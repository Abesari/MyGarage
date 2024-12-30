import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MechanicHomeScreen from '../screens/Mechanic/MechanicHomeScreen';

const Tab = createBottomTabNavigator();

export default function MechanicTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MechanicHome" component={MechanicHomeScreen} />
      {/* Add more tabs for claimed requests, etc. */}
    </Tab.Navigator>
  );
}

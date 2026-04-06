import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import VenueApprovalScreen from '../screens/admin/VenueApprovalScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'podium' : 'podium-outline';
          else if (route.name === 'Venues') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'Users') iconName = focused ? 'people' : 'people-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: 5, paddingTop: 5, height: 60 },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} options={{ tabBarLabel: 'Admin' }} />
      <Tab.Screen name="Venues" component={VenueApprovalScreen} options={{ tabBarLabel: 'Terrains' }} />
      <Tab.Screen name="Users" component={UserManagementScreen} options={{ tabBarLabel: 'Utilisateurs' }} />
    </Tab.Navigator>
  );
}

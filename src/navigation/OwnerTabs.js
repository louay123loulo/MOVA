import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
import BookingRequestsScreen from '../screens/owner/BookingRequestsScreen';
import VenueManagementScreen from '../screens/owner/VenueManagementScreen';
import EarningsScreen from '../screens/owner/EarningsScreen';

const Tab = createBottomTabNavigator();

export default function OwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Requests') iconName = focused ? 'time' : 'time-outline';
          else if (route.name === 'Venues') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'Earnings') iconName = focused ? 'wallet' : 'wallet-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: 5, paddingTop: 5, height: 60 },
      })}
    >
      <Tab.Screen name="Dashboard" component={OwnerDashboardScreen} options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Requests" component={BookingRequestsScreen} options={{ tabBarLabel: 'Demandes' }} />
      <Tab.Screen name="Venues" component={VenueManagementScreen} options={{ tabBarLabel: 'Terrains' }} />
      <Tab.Screen name="Earnings" component={EarningsScreen} options={{ tabBarLabel: 'Revenus' }} />
    </Tab.Navigator>
  );
}

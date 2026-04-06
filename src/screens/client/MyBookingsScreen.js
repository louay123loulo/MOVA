import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import BookingCard from '../../components/BookingCard';
import { mockBookings } from '../../data/mockBookings';

const TABS = ['upcoming', 'past'];

export default function MyBookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcoming = mockBookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const past = mockBookings.filter(b => b.status === 'rejected' || b.date < '2026-04-07');
  const data = activeTab === 'upcoming' ? upcoming : past;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Mes Réservations</Text>
        <Text style={styles.subtitle}>{upcoming.length} en cours</Text>
      </View>

      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.tabActive]} activeOpacity={0.7}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'upcoming' ? 'À venir' : 'Passées'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookingCard booking={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aucune réservation</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.emptyBtn}>
              <Text style={styles.emptyBtnText}>Explorer les terrains</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  tabs: { flexDirection: 'row', marginHorizontal: 24, backgroundColor: colors.surface, borderRadius: 14, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.textInverse },
  list: { paddingHorizontal: 24, paddingBottom: 100 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { color: colors.textMuted, fontSize: 16, marginTop: 12 },
  emptyBtn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.primaryMuted },
  emptyBtnText: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});

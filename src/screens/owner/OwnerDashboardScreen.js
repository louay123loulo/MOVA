import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import StatCard from '../../components/StatCard';
import BookingCard from '../../components/BookingCard';
import { mockStats, mockBookings } from '../../data/mockBookings';

export default function OwnerDashboardScreen({ navigation }) {
  const { owner } = mockStats;
  const recentRequests = mockBookings.filter(b => b.status === 'pending').slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Tableau de bord</Text>
            <Text style={styles.date}>Aujourd'hui, {new Date().toLocaleDateString('fr-FR')}</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            {owner.pendingRequests > 0 && <View style={styles.notifBadge} />}
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard icon="calendar-number" iconColor={colors.primary} title="Réservations du jour" value={owner.todayBookings} trend={5} />
            <StatCard icon="wallet" iconColor={colors.secondary} title="Revenus (semaine)" value={`${owner.weeklyRevenue} TND`} trend={12} />
          </View>
          <View style={styles.statsRow}>
            <StatCard icon="time" iconColor={colors.warning} title="En attente" value={owner.pendingRequests} />
            <StatCard icon="people" iconColor="#9C27B0" title="Taux d'occupation" value={`${owner.occupancyRate}%`} trend={2} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Demandes récentes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
            <Text style={styles.seeAll}>Voir tout ({owner.pendingRequests})</Text>
          </TouchableOpacity>
        </View>

        {recentRequests.length > 0 ? (
          recentRequests.map(req => (
            <BookingCard key={req.id} booking={req} showActions onAccept={() => {}} onReject={() => {}} />
          ))
        ) : (
          <View style={styles.empty}>
            <Ionicons name="checkmark-done-circle-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aucune demande en attente</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 26, fontWeight: '800', color: '#fff' },
  date: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  notifBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  notifBadge: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error },
  statsGrid: { gap: 12, marginBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  seeAll: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  emptyText: { color: colors.textMuted, marginTop: 12, fontSize: 14 },
});

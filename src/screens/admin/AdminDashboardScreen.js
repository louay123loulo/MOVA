import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import StatCard from '../../components/StatCard';
import { mockStats } from '../../data/mockBookings';

export default function AdminDashboardScreen() {
  const { admin } = mockStats;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Administration</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard icon="people" iconColor={colors.secondary} title="Utilisateurs" value={admin.totalUsers} trend={12} />
            <StatCard icon="business" iconColor={colors.primary} title="Terrains actifs" value={admin.activeVenues} />
          </View>
          <View style={styles.statsRow}>
            <StatCard icon="calendar" iconColor="#9C27B0" title="Réservations (Mois)" value={admin.totalBookings} />
            <StatCard icon="shield-checkmark" iconColor={colors.warning} title="En attente" value={admin.pendingApprovals} />
          </View>
        </View>
        
        <View style={styles.revenueCard}>
          <Text style={styles.revLabel}>Revenu total généré</Text>
          <Text style={styles.revValue}>{admin.monthlyRevenue.toLocaleString()} TND</Text>
          <Text style={styles.revGrowth}>+{admin.monthlyGrowth}% par rapport au mois dernier</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  statsGrid: { gap: 12, marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12 },
  revenueCard: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  revLabel: { fontSize: 14, color: colors.textMuted, marginBottom: 8 },
  revValue: { fontSize: 32, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  revGrowth: { fontSize: 13, color: colors.success, fontWeight: '600' },
});

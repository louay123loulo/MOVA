import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Revenus</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceVal}>1,250.00 TND</Text>
          <View style={styles.withdrawBtn}>
            <Text style={styles.withdrawText}>Retirer les fonds</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transactions récentes</Text>
        {[1, 2, 3].map(i => (
          <View key={i} style={styles.txRow}>
            <View style={styles.txIcon}><Ionicons name="arrow-down" size={20} color={colors.primary} /></View>
            <View style={styles.txInfo}>
              <Text style={styles.txTitle}>Réservation Terrain El Menzah</Text>
              <Text style={styles.txDate}>07 Avr 2026 • Flouci</Text>
            </View>
            <Text style={styles.txAmt}>+80 TND</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  scroll: { paddingHorizontal: 24 },
  balanceCard: { backgroundColor: colors.primary, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 32 },
  balanceLabel: { color: 'rgba(0,0,0,0.6)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  balanceVal: { color: '#000', fontSize: 32, fontWeight: '800', marginBottom: 20 },
  withdrawBtn: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  withdrawText: { color: colors.primary, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 16 },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  txIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0, 230, 118, 0.15)', alignItems: 'center', justifyContent: 'center' },
  txInfo: { flex: 1, marginLeft: 12 },
  txTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
  txDate: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  txAmt: { color: colors.primary, fontSize: 15, fontWeight: '700' },
});

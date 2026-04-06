import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

const statusConfig = {
  pending: { bg: 'rgba(255, 183, 77, 0.15)', text: colors.pending, label: 'En attente' },
  confirmed: { bg: 'rgba(0, 230, 118, 0.15)', text: colors.confirmed, label: 'Confirmé' },
  rejected: { bg: 'rgba(255, 82, 82, 0.15)', text: colors.rejected, label: 'Refusé' },
  paid: { bg: 'rgba(0, 230, 118, 0.15)', text: colors.confirmed, label: 'Payé' },
  refunded: { bg: 'rgba(255, 183, 77, 0.15)', text: colors.warning, label: 'Remboursé' },
  active: { bg: 'rgba(0, 230, 118, 0.15)', text: colors.confirmed, label: 'Actif' },
  inactive: { bg: 'rgba(255, 82, 82, 0.15)', text: colors.rejected, label: 'Inactif' },
  verified: { bg: 'rgba(68, 138, 255, 0.15)', text: colors.secondary, label: 'Vérifié' },
};

export default function Badge({ status, label, style }) {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>
        {label || config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

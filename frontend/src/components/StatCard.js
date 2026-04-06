import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

export default function StatCard({ icon, iconColor, title, value, subtitle, trend }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && (
        <View style={styles.subtitleRow}>
          {trend && (
            <Ionicons
              name={trend > 0 ? 'trending-up' : 'trending-down'}
              size={12}
              color={trend > 0 ? colors.success : colors.error}
            />
          )}
          <Text style={[styles.subtitle, trend > 0 && { color: colors.success }]}>
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
    minWidth: 140,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 2,
  },
  title: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 3,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
});

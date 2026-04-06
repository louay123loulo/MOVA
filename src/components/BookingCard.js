import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';
import Badge from './Badge';

export default function BookingCard({ booking, onPress, showActions, onAccept, onReject }) {
  const sportColor = booking.sport === 'football' ? colors.football : colors.padel;
  const sportIcon = booking.sport === 'football' ? 'football' : 'tennisball';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.sportDot, { backgroundColor: sportColor }]}>
            <Ionicons name={sportIcon} size={16} color={colors.textInverse} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.venueName} numberOfLines={1}>{booking.venueName}</Text>
            <Text style={styles.userName}>{booking.userName || 'Client'}</Text>
          </View>
          <Badge status={booking.status} />
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={15} color={colors.textMuted} />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={15} color={colors.textMuted} />
            <Text style={styles.detailText}>{booking.timeSlot}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="card-outline" size={15} color={colors.textMuted} />
            <Text style={styles.detailText}>
              {booking.amount} {booking.currency} • {booking.paymentMethod.toUpperCase()}
            </Text>
          </View>
        </View>

        {showActions && booking.status === 'pending' && (
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.rejectBtn} 
              onPress={() => onReject && onReject(booking.id)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={18} color={colors.error} />
              <Text style={styles.rejectText}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.acceptBtn} 
              onPress={() => onAccept && onAccept(booking.id)}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={18} color={colors.textInverse} />
              <Text style={styles.acceptText}>Accepter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sportDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  venueName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  userName: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  details: {
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 82, 82, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
  },
  rejectText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 5,
  },
  acceptBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
  },
  acceptText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 5,
  },
});

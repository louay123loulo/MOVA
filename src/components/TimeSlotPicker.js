import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

export default function TimeSlotPicker({ slots, selectedSlot, onSelectSlot }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isAvailable = slot.isAvailable;

          return (
            <TouchableOpacity
              key={slot.id}
              onPress={() => isAvailable && onSelectSlot(slot)}
              activeOpacity={isAvailable ? 0.7 : 1}
              style={[
                styles.slot,
                isSelected && styles.slotSelected,
                !isAvailable && styles.slotDisabled,
              ]}
            >
              <Text style={[
                styles.slotTime,
                isSelected && styles.slotTimeSelected,
                !isAvailable && styles.slotTimeDisabled,
              ]}>
                {slot.time}
              </Text>
              <Text style={[
                styles.slotPrice,
                isSelected && styles.slotPriceSelected,
                !isAvailable && styles.slotPriceDisabled,
              ]}>
                {isAvailable ? `${slot.price} TND` : 'Réservé'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  slot: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    minWidth: 85,
  },
  slotSelected: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  slotDisabled: {
    backgroundColor: colors.surfaceLight,
    borderColor: 'transparent',
    opacity: 0.4,
  },
  slotTime: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  slotTimeSelected: {
    color: colors.primary,
  },
  slotTimeDisabled: {
    color: colors.textMuted,
  },
  slotPrice: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  slotPriceSelected: {
    color: colors.primaryLight,
  },
  slotPriceDisabled: {
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});

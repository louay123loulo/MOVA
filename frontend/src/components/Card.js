import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing, shadows } from '../theme/spacing';

export default function Card({ children, style, variant = 'default' }) {
  return (
    <View style={[
      styles.card, 
      variant === 'highlighted' && styles.highlighted,
      variant === 'elevated' && styles.elevated,
      style,
    ]}>
      {children}
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
  },
  highlighted: {
    borderColor: colors.primaryMuted,
    backgroundColor: colors.surfaceLight,
  },
  elevated: {
    ...shadows.md,
    borderColor: 'transparent',
    backgroundColor: colors.surfaceLight,
  },
});

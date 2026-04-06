import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  loading = false, 
  disabled = false,
  icon,
  style,
}) {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';
  const isSmall = size === 'sm';

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.wrapper, isSmall && styles.wrapperSm, style]}
      >
        <LinearGradient
          colors={disabled ? ['#333', '#444'] : ['#00E676', '#00C853']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, isSmall && styles.gradientSm]}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} size="small" />
          ) : (
            <>
              {icon}
              <Text style={[styles.textPrimary, isSmall && styles.textSm, icon && { marginLeft: 8 }]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        isSmall && styles.buttonSm,
        isOutline && styles.outline,
        isSecondary && styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator 
          color={isOutline ? colors.primary : colors.textPrimary} 
          size="small" 
        />
      ) : (
        <>
          {icon}
          <Text style={[
            styles.text,
            isSmall && styles.textSm,
            isOutline && styles.outlineText,
            isSecondary && styles.secondaryText,
            icon && { marginLeft: 8 },
          ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  wrapperSm: {
    borderRadius: borderRadius.md,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: borderRadius.lg,
  },
  gradientSm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: borderRadius.md,
  },
  textPrimary: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
  },
  buttonSm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: borderRadius.md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondaryMuted,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  textSm: {
    fontSize: 14,
  },
  outlineText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.secondary,
  },
});

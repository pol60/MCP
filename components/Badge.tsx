import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from '@/constants/colors';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'medium',
  style,
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'info':
        return colors.inactive;
      default:
        return colors.primary;
    }
  };
  
  const getPadding = () => {
    return size === 'small'
      ? { paddingVertical: 2, paddingHorizontal: 6 }
      : { paddingVertical: 4, paddingHorizontal: 8 };
  };
  
  const getFontSize = () => {
    return size === 'small' ? 10 : 12;
  };
  
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getBackgroundColor() },
        getPadding(),
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: getFontSize() }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.card,
    fontWeight: '600',
  },
});
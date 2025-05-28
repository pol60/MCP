import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '@/constants/colors';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  status?: 'online' | 'offline' | 'typing';
}

export default function Avatar({
  source,
  name,
  size = 'medium',
  status,
}: AvatarProps) {
  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };
  
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: 12 };
      case 'medium':
        return { width: 48, height: 48, fontSize: 16 };
      case 'large':
        return { width: 64, height: 64, fontSize: 24 };
      default:
        return { width: 48, height: 48, fontSize: 16 };
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return colors.success;
      case 'offline':
        return colors.inactive;
      case 'typing':
        return colors.warning;
      default:
        return 'transparent';
    }
  };
  
  const getStatusSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'medium':
        return 12;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };
  
  const { width, height, fontSize } = getDimensions();
  const statusSize = getStatusSize();
  
  return (
    <View style={styles.container}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            { width, height, borderRadius: width / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { width, height, borderRadius: width / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>
            {getInitials()}
          </Text>
        </View>
      )}
      
      {status && (
        <View
          style={[
            styles.status,
            {
              backgroundColor: getStatusColor(),
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              right: size === 'small' ? 0 : 2,
              bottom: size === 'small' ? 0 : 2,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: colors.inactive,
  },
  placeholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.card,
    fontWeight: '600',
  },
  status: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.card,
  },
});
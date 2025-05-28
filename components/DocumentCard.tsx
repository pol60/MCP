import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FileText, Image as ImageIcon, FileDigit } from 'lucide-react-native';
import { Document } from '@/types/document';
import { formatDate } from '@/utils/date';
import colors from '@/constants/colors';
import Card from './Card';

interface DocumentCardProps {
  document: Document;
  onPress?: () => void;
}

export default function DocumentCard({ document, onPress }: DocumentCardProps) {
  const getDocumentIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <FileText size={24} color={colors.error} />;
      case 'image':
        return <ImageIcon size={24} color={colors.primary} />;
      case 'dicom':
        return <FileDigit size={24} color={colors.secondary} />;
      default:
        return <FileText size={24} color={colors.text} />;
    }
  };
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="outlined" style={styles.card}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {document.thumbnailUrl ? (
              <Image
                source={{ uri: document.thumbnailUrl }}
                style={styles.thumbnail}
              />
            ) : (
              <View style={styles.iconBackground}>
                {getDocumentIcon()}
              </View>
            )}
          </View>
          
          <View style={styles.details}>
            <Text style={styles.fileName} numberOfLines={1}>
              {document.fileName}
            </Text>
            
            <Text style={styles.date}>
              {formatDate(document.uploadedAt)}
            </Text>
            
            {document.ocrText && (
              <Text style={styles.preview} numberOfLines={2}>
                {document.ocrText}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  content: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
import React, { useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Calendar, Download, FileText, Trash2 } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useDocumentStore } from '@/store/documentStore';
import { formatDate } from '@/utils/date';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function DocumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { documents, selectedDocument, selectDocument, deleteDocument } = useDocumentStore();
  
  useEffect(() => {
    if (id) {
      selectDocument(id);
    }
  }, [id, documents]);
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            if (id) {
              await deleteDocument(id);
              router.back();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  if (!selectedDocument) {
    return (
      <View style={styles.container}>
        <Text>Document not found</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: 'Document Details',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {selectedDocument.type === 'pdf' ? (
            <FileText size={48} color={colors.error} />
          ) : selectedDocument.type === 'image' ? (
            <Image
              source={{ uri: selectedDocument.thumbnailUrl || selectedDocument.fileUrl }}
              style={styles.thumbnail}
            />
          ) : (
            <FileText size={48} color={colors.primary} />
          )}
        </View>
        
        <Text style={styles.fileName}>{selectedDocument.fileName}</Text>
        
        <Text style={styles.fileInfo}>
          {selectedDocument.type.toUpperCase()} • Uploaded on {formatDate(selectedDocument.uploadedAt)}
        </Text>
      </View>
      
      {selectedDocument.ocrText && (
        <Card variant="outlined" style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Document Content</Text>
          <Text style={styles.contentText}>{selectedDocument.ocrText}</Text>
        </Card>
      )}
      
      <Card variant="outlined" style={styles.previewCard}>
        <Text style={styles.sectionTitle}>Preview</Text>
        
        {selectedDocument.type === 'image' ? (
          <Image
            source={{ uri: selectedDocument.fileUrl }}
            style={styles.previewImage}
          />
        ) : (
          <View style={styles.pdfPreview}>
            <FileText size={64} color={colors.error} />
            <Text style={styles.pdfText}>PDF Preview</Text>
          </View>
        )}
      </Card>
      
      <View style={styles.actions}>
        <Button
          title="Download"
          onPress={() => Alert.alert('Download', 'Document download started')}
          variant="primary"
          icon={<Download size={16} color={colors.card} />}
        />
        
        <View style={{ width: 16 }} />
        
        <Button
          title="Delete"
          onPress={handleDelete}
          variant="outline"
          icon={<Trash2 size={16} color={colors.error} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  fileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  fileInfo: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  contentCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.heading3,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  previewCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  pdfPreview: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  pdfText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useDocumentStore } from '@/store/documentStore';
import DocumentCard from '@/components/DocumentCard';
import Button from '@/components/Button';

export default function DocumentsScreen() {
  const { documents, fetchDocuments, uploadDocument } = useDocumentStore();
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    fetchDocuments();
  }, []);
  
  const handleUpload = async () => {
    try {
      setIsUploading(true);
      
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        setIsUploading(false);
        return;
      }
      
      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // Simulate document upload
        await uploadDocument({
          type: 'image',
          fileUrl: asset.uri,
          fileName: asset.fileName || 'Uploaded Image.jpg',
          thumbnailUrl: asset.uri,
        });
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.heading1}>Medical Documents</Text>
        <Button
          title="Upload"
          onPress={handleUpload}
          variant="primary"
          size="small"
          icon={<Plus size={16} color={colors.card} />}
          loading={isUploading}
        />
      </View>
      
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocumentCard
            document={item}
            onPress={() => router.push(`/documents/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No documents yet</Text>
            <Button
              title="Upload Document"
              onPress={handleUpload}
              variant="primary"
              loading={isUploading}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
});
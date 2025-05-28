import { create } from 'zustand';
import { Document } from '@/types/document';
import { documents } from '@/mocks/documents';

interface DocumentState {
  documents: Document[];
  selectedDocument: Document | null;
  isLoading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>;
  uploadDocument: (document: Partial<Document>) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  selectDocument: (documentId: string) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  selectedDocument: null,
  isLoading: false,
  error: null,
  
  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ documents, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch documents', isLoading: false });
    }
  },
  
  uploadDocument: async (documentData: Partial<Document>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        patientId: '1', // Current user
        type: documentData.type || 'pdf',
        fileUrl: documentData.fileUrl || '',
        fileName: documentData.fileName || 'Unnamed Document',
        ocrText: documentData.ocrText,
        uploadedAt: new Date().toISOString(),
        thumbnailUrl: documentData.thumbnailUrl,
      };
      
      const updatedDocuments = [...get().documents, newDocument];
      set({ documents: updatedDocuments, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to upload document', isLoading: false });
    }
  },
  
  deleteDocument: async (documentId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const updatedDocuments = get().documents.filter(
        doc => doc.id !== documentId
      );
      
      set({ documents: updatedDocuments, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to delete document', isLoading: false });
    }
  },
  
  selectDocument: (documentId: string) => {
    const document = get().documents.find(doc => doc.id === documentId) || null;
    set({ selectedDocument: document });
  },
}));
export type DocumentType = 'pdf' | 'dicom' | 'image';

export interface Document {
  id: string;
  patientId: string;
  type: DocumentType;
  fileUrl: string;
  fileName: string;
  ocrText?: string;
  uploadedAt: string;
  thumbnailUrl?: string;
}
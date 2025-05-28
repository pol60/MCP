mport { Document } from '@/types/document';

export const documents: Document[] = [
  {
    id: 'doc-1',
    patientId: '1',
    type: 'pdf',
    fileUrl: 'https://example.com/documents/blood-test-results.pdf',
    fileName: 'Blood Test Results.pdf',
    ocrText: 'Hemoglobin: 14.2 g/dL\nWhite Blood Cells: 7,500/µL\nPlatelets: 250,000/µL',
    uploadedAt: '2023-10-15T14:30:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
  },
  {
    id: 'doc-2',
    patientId: '1',
    type: 'image',
    fileUrl: 'https://example.com/documents/xray-chest.jpg',
    fileName: 'Chest X-Ray.jpg',
    ocrText: 'No abnormalities detected. Lungs clear.',
    uploadedAt: '2023-09-22T10:15:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28',
  },
  {
    id: 'doc-3',
    patientId: '1',
    type: 'pdf',
    fileUrl: 'https://example.com/documents/cardiology-report.pdf',
    fileName: 'Cardiology Report.pdf',
    ocrText: 'Normal sinus rhythm. No evidence of ischemia.',
    uploadedAt: '2023-11-05T16:45:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
  },
  {
    id: 'doc-4',
    patientId: '1',
    type: 'dicom',
    fileUrl: 'https://example.com/documents/mri-brain.dcm',
    fileName: 'Brain MRI.dcm',
    uploadedAt: '2023-08-10T09:20:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c',
  },
];
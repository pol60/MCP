import { Clinic, Department, Service } from '@/types/clinic';

export const clinics: Clinic[] = [
  {
    id: 'clinic-1',
    name: 'MedCenter General Hospital',
    address: '123 Healthcare Ave, Medical District',
    lat: 40.7128,
    lng: -74.0060,
    specialization: 'General Medicine',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
  },
  {
    id: 'clinic-2',
    name: 'Wellness Family Clinic',
    address: '456 Wellness Blvd, Healthtown',
    lat: 40.7308,
    lng: -73.9973,
    specialization: 'Family Medicine',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1516549655669-df64a4ad7d12',
  },
  {
    id: 'clinic-3',
    name: 'Specialized Care Center',
    address: '789 Specialist St, Medical City',
    lat: 40.7418,
    lng: -74.0101,
    specialization: 'Specialized Care',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29',
  },
];

export const departments: Department[] = [
  { id: 'dept-1', clinicId: 'clinic-1', name: 'Cardiology' },
  { id: 'dept-2', clinicId: 'clinic-1', name: 'Neurology' },
  { id: 'dept-3', clinicId: 'clinic-2', name: 'Pediatrics' },
  { id: 'dept-4', clinicId: 'clinic-2', name: 'Family Medicine' },
  { id: 'dept-5', clinicId: 'clinic-3', name: 'Orthopedics' },
  { id: 'dept-6', clinicId: 'clinic-3', name: 'Dermatology' },
];

export const services: Service[] = [
  {
    id: 'service-1',
    departmentId: 'dept-1',
    name: 'Cardiac Consultation',
    description: 'Initial consultation with a cardiologist',
    price: 150,
  },
  {
    id: 'service-2',
    departmentId: 'dept-1',
    name: 'ECG Test',
    description: 'Electrocardiogram test to monitor heart activity',
    price: 100,
  },
  {
    id: 'service-3',
    departmentId: 'dept-2',
    name: 'Neurological Examination',
    description: 'Comprehensive neurological assessment',
    price: 180,
  },
  {
    id: 'service-4',
    departmentId: 'dept-3',
    name: 'Pediatric Check-up',
    description: 'Regular check-up for children',
    price: 120,
  },
  {
    id: 'service-5',
    departmentId: 'dept-4',
    name: 'Family Health Assessment',
    description: 'Comprehensive family health evaluation',
    price: 200,
  },
];
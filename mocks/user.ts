import { Doctor, Patient, User, UserRole } from '@/types/user';

export const currentUser: Patient = {
  id: '1',
  username: 'johndoe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  role: 'patient',
  status: 'online',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  insuranceId: 'ins-123',
  insuranceNumber: 'POL-12345-XYZ',
  insuranceValidUntil: '2025-12-31',
};

export const doctors: Doctor[] = [
  {
    id: '2',
    username: 'dr.smith',
    email: 'dr.smith@medclinic.com',
    phone: '+1987654321',
    role: 'doctor',
    status: 'online',
    firstName: 'Sarah',
    lastName: 'Smith',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    departmentId: 'dept-1',
    clinicId: 'clinic-1',
    licenseNumber: 'MD-12345',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.8,
    about: 'Dr. Smith is a board-certified cardiologist with over 12 years of experience in treating heart conditions.',
  },
  {
    id: '3',
    username: 'dr.johnson',
    email: 'dr.johnson@medclinic.com',
    phone: '+1567891234',
    role: 'doctor',
    status: 'offline',
    firstName: 'Michael',
    lastName: 'Johnson',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    departmentId: 'dept-2',
    clinicId: 'clinic-1',
    licenseNumber: 'MD-67890',
    specialization: 'Neurology',
    experience: 8,
    rating: 4.6,
    about: 'Dr. Johnson specializes in neurological disorders and has conducted extensive research in the field.',
  },
  {
    id: '4',
    username: 'dr.williams',
    email: 'dr.williams@medclinic.com',
    phone: '+1456789012',
    role: 'doctor',
    status: 'online',
    firstName: 'Emily',
    lastName: 'Williams',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
    departmentId: 'dept-3',
    clinicId: 'clinic-2',
    licenseNumber: 'MD-54321',
    specialization: 'Pediatrics',
    experience: 15,
    rating: 4.9,
    about: 'Dr. Williams has been caring for children for over 15 years and is beloved by her patients.',
  },
];

export const getUserByRole = (role: UserRole): User[] => {
  if (role === 'doctor') return doctors;
  if (role === 'patient') return [currentUser];
  return [];
};
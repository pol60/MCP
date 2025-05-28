export type UserRole = 'patient' | 'doctor' | 'clinic_admin' | 'app_admin' | 'insurer_staff';

export type UserStatus = 'online' | 'offline' | 'typing';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Patient extends User {
  insuranceId?: string;
  insuranceNumber?: string;
  insuranceValidUntil?: string;
}

export interface Doctor extends User {
  departmentId: string;
  clinicId: string;
  licenseNumber: string;
  specialization: string;
  experience: number;
  rating: number;
  about?: string;
}

export interface ClinicAdmin extends User {
  clinicId: string;
}

export interface InsurerStaff extends User {
  companyId: string;
}
export type AppointmentStatus = 'booked' | 'confirmed' | 'canceled' | 'completed';
export type AppointmentType = 'online' | 'offline' | 'home_visit';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  serviceName: string;
  startsAt: string;
  endsAt: string;
  status: AppointmentStatus;
  type: AppointmentType;
  clinicName?: string;
  clinicAddress?: string;
  doctorName?: string;
  doctorSpecialization?: string;
  price: number;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
}
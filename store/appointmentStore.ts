import { create } from 'zustand';
import { Appointment, AppointmentStatus, TimeSlot } from '@/types/appointment';
import { appointments, generateTimeSlots } from '@/mocks/appointments';

interface AppointmentState {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  selectedAppointment: Appointment | null;
  timeSlots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  fetchTimeSlots: (doctorId: string) => Promise<void>;
  bookAppointment: (appointment: Partial<Appointment>) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  selectAppointment: (appointmentId: string) => void;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  upcomingAppointments: [],
  pastAppointments: [],
  selectedAppointment: null,
  timeSlots: [],
  isLoading: false,
  error: null,
  
  fetchAppointments: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const now = new Date();
      const upcoming = appointments.filter(
        (apt) => new Date(apt.startsAt) > now && apt.status !== 'canceled'
      );
      const past = appointments.filter(
        (apt) => new Date(apt.startsAt) <= now || apt.status === 'canceled'
      );
      
      set({ 
        appointments, 
        upcomingAppointments: upcoming, 
        pastAppointments: past,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch appointments', isLoading: false });
    }
  },
  
  fetchTimeSlots: async (doctorId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const slots = generateTimeSlots(doctorId);
      set({ timeSlots: slots, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch time slots', isLoading: false });
    }
  },
  
  bookAppointment: async (appointmentData: Partial<Appointment>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        patientId: '1', // Current user
        doctorId: appointmentData.doctorId || '',
        serviceId: appointmentData.serviceId || '',
        serviceName: appointmentData.serviceName || '',
        startsAt: appointmentData.startsAt || '',
        endsAt: appointmentData.endsAt || '',
        status: 'booked' as AppointmentStatus,
        type: appointmentData.type || 'offline',
        clinicName: appointmentData.clinicName,
        clinicAddress: appointmentData.clinicAddress,
        doctorName: appointmentData.doctorName,
        doctorSpecialization: appointmentData.doctorSpecialization,
        price: appointmentData.price || 0,
      };
      
      const updatedAppointments = [...get().appointments, newAppointment];
      const updatedUpcoming = [...get().upcomingAppointments, newAppointment];
      
      set({ 
        appointments: updatedAppointments,
        upcomingAppointments: updatedUpcoming,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to book appointment', isLoading: false });
    }
  },
  
  cancelAppointment: async (appointmentId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const updatedAppointments = get().appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'canceled' as AppointmentStatus } : apt
      );
      
      const updatedUpcoming = get().upcomingAppointments.filter(
        apt => apt.id !== appointmentId
      );
      
      const canceledAppointment = get().appointments.find(apt => apt.id === appointmentId);
      const updatedPast = canceledAppointment 
        ? [...get().pastAppointments, { ...canceledAppointment, status: 'canceled' as AppointmentStatus }]
        : get().pastAppointments;
      
      set({ 
        appointments: updatedAppointments,
        upcomingAppointments: updatedUpcoming,
        pastAppointments: updatedPast,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to cancel appointment', isLoading: false });
    }
  },
  
  selectAppointment: (appointmentId: string) => {
    const appointment = get().appointments.find(apt => apt.id === appointmentId) || null;
    set({ selectedAppointment: appointment });
  },
}));
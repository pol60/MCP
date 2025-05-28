import { create } from 'zustand';
import { Clinic, Department, Service } from '@/types/clinic';
import { Doctor } from '@/types/user';
import { clinics, departments, services } from '@/mocks/clinics';
import { doctors } from '@/mocks/users';

interface ClinicState {
  clinics: Clinic[];
  departments: Department[];
  services: Service[];
  doctors: Doctor[];
  selectedClinic: Clinic | null;
  selectedDoctor: Doctor | null;
  isLoading: boolean;
  error: string | null;
  fetchClinics: () => Promise<void>;
  fetchDepartments: (clinicId: string) => Promise<void>;
  fetchServices: (departmentId: string) => Promise<void>;
  fetchDoctors: (departmentId: string) => Promise<void>;
  selectClinic: (clinicId: string) => void;
  selectDoctor: (doctorId: string) => void;
  searchClinics: (query: string) => Promise<void>;
}

export const useClinicStore = create<ClinicState>((set, get) => ({
  clinics: [],
  departments: [],
  services: [],
  doctors: [],
  selectedClinic: null,
  selectedDoctor: null,
  isLoading: false,
  error: null,
  
  fetchClinics: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ clinics, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch clinics', isLoading: false });
    }
  },
  
  fetchDepartments: async (clinicId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const filteredDepartments = departments.filter(
        dept => dept.clinicId === clinicId
      );
      
      set({ departments: filteredDepartments, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch departments', isLoading: false });
    }
  },
  
  fetchServices: async (departmentId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const filteredServices = services.filter(
        service => service.departmentId === departmentId
      );
      
      set({ services: filteredServices, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch services', isLoading: false });
    }
  },
  
  fetchDoctors: async (departmentId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Filter doctors by department
      const filteredDoctors = doctors.filter(
        doctor => doctor.departmentId === departmentId
      );
      
      set({ doctors: filteredDoctors, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch doctors', isLoading: false });
    }
  },
  
  selectClinic: (clinicId: string) => {
    const clinic = get().clinics.find(c => c.id === clinicId) || null;
    set({ selectedClinic: clinic });
  },
  
  selectDoctor: (doctorId: string) => {
    const doctor = get().doctors.find(d => d.id === doctorId) || null;
    set({ selectedDoctor: doctor });
  },
  
  searchClinics: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (!query) {
        set({ clinics, isLoading: false });
        return;
      }
      
      const searchQuery = query.toLowerCase();
      const filteredClinics = clinics.filter(
        clinic => 
          clinic.name.toLowerCase().includes(searchQuery) ||
          clinic.address.toLowerCase().includes(searchQuery) ||
          clinic.specialization.toLowerCase().includes(searchQuery)
      );
      
      set({ clinics: filteredClinics, isLoading: false });
    } catch (error) {
      set({ error: 'Search failed', isLoading: false });
    }
  },
}));
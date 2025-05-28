export interface Clinic {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  specialization: string;
  rating: number;
  imageUrl?: string;
}

export interface Department {
  id: string;
  clinicId: string;
  name: string;
}

export interface Service {
  id: string;
  departmentId: string;
  name: string;
  description: string;
  price: number;
}
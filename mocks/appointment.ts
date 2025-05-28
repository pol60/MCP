import { Appointment, TimeSlot } from '@/types/appointment';
import { addDays, addHours, format, setHours, setMinutes } from '@/utils/date';

const today = new Date();

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: '1',
    doctorId: '2',
    serviceId: 'service-1',
    serviceName: 'Cardiac Consultation',
    startsAt: format(addDays(setHours(setMinutes(today, 0), 10), 1)),
    endsAt: format(addDays(setHours(setMinutes(today, 0), 11), 1)),
    status: 'confirmed',
    type: 'offline',
    clinicName: 'MedCenter General Hospital',
    clinicAddress: '123 Healthcare Ave, Medical District',
    doctorName: 'Dr. Sarah Smith',
    doctorSpecialization: 'Cardiology',
    price: 150,
  },
  {
    id: 'apt-2',
    patientId: '1',
    doctorId: '3',
    serviceId: 'service-3',
    serviceName: 'Neurological Examination',
    startsAt: format(addDays(setHours(setMinutes(today, 30), 14), 3)),
    endsAt: format(addDays(setHours(setMinutes(today, 30), 15), 3)),
    status: 'booked',
    type: 'online',
    doctorName: 'Dr. Michael Johnson',
    doctorSpecialization: 'Neurology',
    price: 180,
  },
  {
    id: 'apt-3',
    patientId: '1',
    doctorId: '4',
    serviceId: 'service-4',
    serviceName: 'Pediatric Check-up',
    startsAt: format(addDays(setHours(setMinutes(today, 0), 9), -5)),
    endsAt: format(addDays(setHours(setMinutes(today, 0), 10), -5)),
    status: 'completed',
    type: 'offline',
    clinicName: 'Wellness Family Clinic',
    clinicAddress: '456 Wellness Blvd, Healthtown',
    doctorName: 'Dr. Emily Williams',
    doctorSpecialization: 'Pediatrics',
    price: 120,
  },
];

// Generate time slots for the next 7 days
export const generateTimeSlots = (doctorId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startDate = new Date();
  
  for (let day = 0; day < 7; day++) {
    const currentDate = addDays(startDate, day);
    
    // Skip generating slots for past dates
    if (day === 0 && currentDate.getHours() >= 17) continue;
    
    // Generate slots from 9 AM to 5 PM with 30-minute intervals
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = new Date(currentDate);
        slotStart.setHours(hour, minute, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30);
        
        // Skip slots in the past
        if (day === 0 && slotStart <= new Date()) continue;
        
        // Randomly mark some slots as unavailable
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          id: `slot-${doctorId}-${format(slotStart)}`,
          doctorId,
          startsAt: format(slotStart),
          endsAt: format(slotEnd),
          isAvailable,
        });
      }
    }
  }
  
  return slots;
};
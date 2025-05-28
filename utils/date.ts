// Date utility functions

export const format = (date: Date): string => {
  return date.toISOString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export const setHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(hours);
  return result;
};

export const setMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(minutes);
  return result;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isTomorrow = (date: Date): boolean => {
  const tomorrow = addDays(new Date(), 1);
  return isSameDay(date, tomorrow);
};

export const isPast = (date: Date): boolean => {
  return date < new Date();
};

export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getShortDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getShortMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short' });
};
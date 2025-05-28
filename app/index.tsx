import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  
  // If the user is authenticated, redirect to the home screen
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  // Otherwise, redirect to the login screen
  return <Redirect href="/auth/login" />;
}
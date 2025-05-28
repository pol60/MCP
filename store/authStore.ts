import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { currentUser } from '@/mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // For demo purposes, we'll just check if the email matches our mock user
          if (email === currentUser.email) {
            set({ user: currentUser, isAuthenticated: true, isLoading: false });
          } else {
            set({ error: 'Invalid credentials', isLoading: false });
          }
        } catch (error) {
          set({ error: 'Login failed', isLoading: false });
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({ error: 'Logout failed', isLoading: false });
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // For demo purposes, we'll just set the current user
          set({ 
            user: { ...currentUser, ...userData } as User, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ error: 'Registration failed', isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
import { create } from 'zustand';
import { AuthResponse, User, UserProfile } from '@types';
import ApiService from '@services/api';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, passwordConfirm: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const api = ApiService.getInstance();
      const response: AuthResponse = await api.login(email, password);
      
      await api.setToken(response.token, response.refreshToken);
      
      set({
        isAuthenticated: true,
        token: response.token,
        refreshToken: response.refreshToken,
        user: {
          id: response.userId,
          email: response.email,
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        loading: false,
      });
      throw error;
    }
  },

  register: async (email: string, password: string, passwordConfirm: string) => {
    set({ loading: true, error: null });
    try {
      const api = ApiService.getInstance();
      const response: AuthResponse = await api.register(email, password, passwordConfirm);
      
      await api.setToken(response.token, response.refreshToken);
      
      set({
        isAuthenticated: true,
        token: response.token,
        refreshToken: response.refreshToken,
        user: {
          id: response.userId,
          email: response.email,
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Registration failed',
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      const api = ApiService.getInstance();
      await api.logout();
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  refreshAuthToken: async () => {
    try {
      const { refreshToken } = get();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const api = ApiService.getInstance();
      const response: AuthResponse = await api.refreshToken(refreshToken);
      
      await api.setToken(response.token, response.refreshToken);
      
      set({
        token: response.token,
        refreshToken: response.refreshToken,
      });
    } catch (error: any) {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        error: 'Token refresh failed',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user: User) => set({ user }),
}));

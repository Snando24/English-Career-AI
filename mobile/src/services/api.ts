import axios, { AxiosInstance, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ApiResponse, ApiError, AuthResponse } from '@types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;
  private static instance: ApiService;

  private constructor(baseURL: string = 'http://localhost:8080/api') {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await this.api.post('/auth/refresh', {
              refreshToken,
            });

            const { token, refreshToken: newRefreshToken } = response.data;
            await SecureStore.setItemAsync('authToken', token);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.api(originalRequest);
          } catch (err) {
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('refreshToken');
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(baseURL?: string): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(baseURL);
    }
    return ApiService.instance;
  }

  // Auth endpoints
  async register(email: string, password: string, passwordConfirm: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post('/auth/register', {
        email,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Health endpoints
  async getHealth(): Promise<any> {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getInfo(): Promise<any> {
    try {
      const response = await this.api.get('/health/info');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Courses endpoints
  async getCourses(professionalArea?: string, difficulty?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (professionalArea) params.append('professional_area', professionalArea);
      if (difficulty) params.append('difficulty', difficulty);

      const response = await this.api.get('/courses', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCourseById(courseId: string): Promise<any> {
    try {
      const response = await this.api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lessons endpoints
  async getLessonsByModule(moduleId: string): Promise<any> {
    try {
      const response = await this.api.get(`/modules/${moduleId}/lessons`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLessonById(lessonId: string): Promise<any> {
    try {
      const response = await this.api.get(`/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async downloadLesson(lessonId: string): Promise<any> {
    try {
      const response = await this.api.get(`/lessons/${lessonId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markLessonStarted(lessonId: string): Promise<any> {
    try {
      const response = await this.api.post(`/lessons/${lessonId}/mark-started`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Exercises endpoints
  async getExercisesByLesson(lessonId: string): Promise<any> {
    try {
      const response = await this.api.get(`/lessons/${lessonId}/exercises`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async submitExerciseAnswer(exerciseId: string, answerText: string): Promise<any> {
    try {
      const response = await this.api.post(`/exercises/${exerciseId}/submit`, {
        answer_text: answerText,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserAttempts(lessonId: string): Promise<any> {
    try {
      const response = await this.api.get('/users/me/attempts', {
        params: { lesson_id: lessonId },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLessonProgress(lessonId: string): Promise<any> {
    try {
      const response = await this.api.get(`/users/me/lesson-progress/${lessonId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Dashboard endpoints
  async getDashboard(): Promise<any> {
    try {
      const response = await this.api.get('/users/me/dashboard');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserSkills(): Promise<any> {
    try {
      const response = await this.api.get('/users/me/skills');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserErrors(): Promise<any> {
    try {
      const response = await this.api.get('/users/me/errors');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRecommendations(): Promise<any> {
    try {
      const response = await this.api.get('/users/me/recommendations');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Sync endpoints
  async syncChanges(data: any): Promise<any> {
    try {
      const response = await this.api.post('/sync', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        status: error.response.data?.status || 'ERROR',
        code: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        errors: error.response.data?.errors,
        path: error.response.data?.path,
        timestamp: error.response.data?.timestamp || new Date().toISOString(),
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        status: 'NO_RESPONSE',
        code: 0,
        message: 'No response from server',
        timestamp: new Date().toISOString(),
      };
    } else {
      // Error in request setup
      return {
        status: 'ERROR',
        code: 0,
        message: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Utility methods
  public async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = await SecureStore.getItemAsync('authToken');
    return !!token;
  }

  public async getStoredToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('authToken');
  }

  public async setToken(token: string, refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  }
}

export default ApiService;

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { refreshAccessToken } from './tokenRefresh';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Track if we're currently refreshing to avoid multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Add a callback to be executed when token refresh completes
 */
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

/**
 * Execute all callbacks waiting for token refresh
 */
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Request interceptor - adds authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, wait for the refresh to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Update the authorization header with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // Notify all subscribers that token has been refreshed
          onTokenRefreshed(newAccessToken);
          isRefreshing = false;

          // Retry the original request with new token
          return apiClient(originalRequest);
        } else {
          // Refresh failed, redirect to login
          isRefreshing = false;
          if (typeof window !== 'undefined') {
            window.location.href = '/login-truck';
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        isRefreshing = false;
        if (typeof window !== 'undefined') {
          window.location.href = '/login-truck';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

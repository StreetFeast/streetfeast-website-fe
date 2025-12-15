import { UserResponse } from '@/types/api';
import { apiClient } from './axiosConfig';

/**
 * Fetches the user profile from the backend API
 * The access token is automatically included via axios interceptor
 * If the token is expired, it will be automatically refreshed
 */
export const getUserProfile = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/api/v1/User/Profile');
  return response.data;
};

import { UserResponse, TruckDetailResponse } from '@/types/api';
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

/**
 * Fetches truck details by truck ID
 * This endpoint is public and does not require authentication
 */
export const getTruckDetails = async (truckId: string): Promise<TruckDetailResponse> => {
  const response = await apiClient.get<TruckDetailResponse>(`/api/v1/Truck/${truckId}`);
  return response.data;
};

/**
 * Fetches truck occurrences for a date range
 * This endpoint is public and does not require authentication
 */
export const getTruckOccurrences = async (
  truckId: string,
  startLocal: string,
  endLocal: string
): Promise<import('@/types/api').TruckOccurrence[]> => {
  const response = await apiClient.get<import('@/types/api').TruckOccurrence[]>(
    `/api/v1/Truck/${truckId}/Schedule/Occurrences`,
    {
      params: {
        startLocal,
        endLocal,
      },
    }
  );
  return response.data;
};

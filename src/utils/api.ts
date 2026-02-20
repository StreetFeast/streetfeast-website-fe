import { UserResponse, TruckDetailResponse, Menu } from '@/types/api';
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
 * Fetches a specific menu for a truck by menu ID
 * This endpoint is public and does not require authentication
 */
export const getTruckMenu = async (truckId: string, menuId: number): Promise<Menu> => {
  const response = await apiClient.get<Menu>(
    `/api/v1/Truck/${truckId}/Menu`,
    {
      params: { menuId },
      skipAuthRedirect: true,
    } as import('axios').AxiosRequestConfig & { skipAuthRedirect?: boolean }
  );
  const data = response.data;
  // API may return an array of categories directly instead of a Menu object
  if (Array.isArray(data)) {
    return {
      id: menuId,
      truckId: Number(truckId),
      name: '',
      description: null,
      categories: data[0].categories,
      isDefault: true,
    };
  }
  return data;
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

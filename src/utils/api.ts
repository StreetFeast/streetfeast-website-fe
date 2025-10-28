import axios from 'axios';
import { UserProfileSummary } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserProfile = async (accessToken: string): Promise<UserProfileSummary> => {
  const response = await axios.get<UserProfileSummary>(
    `${API_BASE_URL}/api/v1/User/Profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// API Response Types based on swagger.json

export interface UserProfileMetadataSupabaseResponse {
  firstName?: string | null;
  lastName?: string | null;
  userType?: number | null;
}

export interface UserProfileSupabaseResponse {
  id?: string | null;
  email?: string | null;
  phone?: string | null;
  existsInDb: boolean;
  stripeCustomerId?: string | null;
  isTruckSubscriptionActive?: boolean | null;
  user_metadata?: UserProfileMetadataSupabaseResponse;
}

export interface TruckImageMap {
  id: number;
  truckId: number;
  imageUri?: string | null;
  sortOrder: number;
}

export interface Truck {
  id: number;
  ownerUserId?: string | null;
  name: string;
  cuisine?: string | null;
  description?: string | null;
  phone?: string | null;
  website?: string | null;
  isActive: boolean;
  createdAt: string;
  lastNotificationSentTimestampUtc: string;
  images?: TruckImageMap[] | null;
}

export interface UserProfileSummary {
  userInformation?: UserProfileSupabaseResponse;
  favorites?: Truck[] | null;
  ownedTrucks?: Truck[] | null;
}

// API Response Types based on swagger.json

export interface UserProfileMetadataSupabaseResponse {
  firstName?: string | null;
  lastName?: string | null;
  userType?: number | null;
}

export interface StripeMetadata {
  stripeCustomerId?: string | null;
  isTruckSubscriptionActive?: boolean | null;
  stripeCheckoutLinks?: {
    [key: string]: string;
  } | null;
}

export interface UserProfileSupabaseResponse {
  id?: string | null;
  email?: string | null;
  phone?: string | null;
  existsInDb: boolean;
  user_metadata?: UserProfileMetadataSupabaseResponse;
  stripeMetadata?: StripeMetadata;
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

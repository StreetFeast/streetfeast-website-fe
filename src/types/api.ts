// API Response Types based on swagger.json

export interface UserProfileMetadataSupabaseResponse {
  truckName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  userType?: number | null;
  phoneNumber?: string | null;
  existsInDb: boolean;
  isTruckSubscriptionActive?: boolean | null;
  stripeMetadata?: StripeMetadata | null;
}

export interface StripeMetadata {
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCheckoutLinks?: {
    [key: string]: string;
  } | null;
}

export interface UserProfileSupabaseResponse {
  id?: string | null;
  email?: string | null;
  phone?: string | null;
  user_metadata?: UserProfileMetadataSupabaseResponse;
  ownedTrucks?: Truck[] | null;
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

export interface UserFavoriteMap {
  id: number;
  userId: string;
  truckId: number;
  createdAt: string;
}

export interface UserFCMTokenMap {
  id: number;
  userId: string;
  fcmToken: string;
}

export interface UserResponse {
  id: string;
  createdAt: string;
  userTypeId: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCheckoutLinkYearly?: string | null;
  stripeCheckoutLinkMonthly?: string | null;
  isTruckSubscriptionActive: boolean;
  timeZone?: string | null;
  unreadNotifications: number;
  ownedTrucks?: Truck[] | null;
  truckToCreate?: Truck | null;
  favorites?: UserFavoriteMap[] | null;
  fcmTokens?: UserFCMTokenMap[] | null;
}
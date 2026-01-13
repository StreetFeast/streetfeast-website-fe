export interface TutorialSection {
  id: string;
  heading: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  sections: TutorialSection[];
}

export const TUTORIAL_CATEGORIES = {
  "profile-identity": "Profile & Identity",
  "customer-communication": "Customer Communication",
  scheduling: "Scheduling",
  "menu-management": "Menu Management",
  "business-intelligence": "Business Intelligence",
} as const;

export const tutorials: Tutorial[] = [
  {
    slug: "update-profile",
    title: "Update Your Truck Profile",
    description:
      "Add and manage profile images, update your truck description, set your website URL, and select your cuisine type.",
    category: "profile-identity",
    order: 1,
    sections: [
      { id: "accessing-the-edit-profile-screen", heading: "Accessing the Edit Profile Screen" },
      { id: "updating-your-profile-image", heading: "Updating Your Profile Image" },
      { id: "updating-your-description", heading: "Updating Your Description" },
      { id: "adding-your-website", heading: "Adding Your Website" },
      { id: "selecting-your-cuisine-type", heading: "Selecting Your Cuisine Type" },
      { id: "saving-your-changes", heading: "Saving Your Changes" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
  {
    slug: "share-qr-code",
    title: "Share Your Truck Using QR Code",
    description:
      "Access your unique QR code, share your truck link, and download QR code for print materials.",
    category: "profile-identity",
    order: 2,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-your-qr-code", heading: "Accessing Your QR Code" },
      { id: "sharing-options", heading: "Sharing Options" },
      { id: "best-practices-for-qr-code-use", heading: "Best Practices for QR Code Use" },
      { id: "tips-for-success", heading: "Tips for Success" },
    ],
  },
  {
    slug: "push-notifications",
    title: "Send Push Notifications to Followers",
    description:
      "Compose and send notifications, understand rate limits, and best practices for engagement.",
    category: "customer-communication",
    order: 3,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-push-notifications", heading: "Accessing Push Notifications" },
      { id: "composing-a-notification", heading: "Composing a Notification" },
      { id: "understanding-rate-limits", heading: "Understanding Rate Limits" },
      { id: "best-practices", heading: "Best Practices" },
      { id: "notification-ideas", heading: "Notification Ideas" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
  {
    slug: "scheduled-events",
    title: "Create Scheduled Events",
    description:
      "Set up single events, create repeating schedules, common repeating patterns, and set event locations and menus.",
    category: "scheduling",
    order: 4,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-the-schedule", heading: "Accessing the Schedule" },
      { id: "creating-a-new-event", heading: "Creating a New Event" },
      { id: "setting-up-repeating-events", heading: "Setting Up Repeating Events" },
      { id: "common-repeating-patterns", heading: "Common Repeating Patterns" },
      { id: "selecting-a-menu-for-the-event", heading: "Selecting a Menu for the Event" },
      { id: "creating-the-event", heading: "Creating the Event" },
      { id: "managing-existing-events", heading: "Managing Existing Events" },
      { id: "tips-for-effective-scheduling", heading: "Tips for Effective Scheduling" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
  {
    slug: "create-products",
    title: "Create Products for Your Menu",
    description:
      "Add new products, set prices and descriptions, add product photos, and manage product availability.",
    category: "menu-management",
    order: 5,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-products", heading: "Accessing Products" },
      { id: "creating-a-new-product", heading: "Creating a New Product" },
      { id: "editing-an-existing-product", heading: "Editing an Existing Product" },
      { id: "managing-product-availability", heading: "Managing Product Availability" },
      { id: "finding-products", heading: "Finding Products" },
      { id: "best-practices", heading: "Best Practices" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
  {
    slug: "create-menu",
    title: "Create a Menu",
    description:
      "Build menus with categories, add products to menus, set menu-specific pricing, and manage multiple menus.",
    category: "menu-management",
    order: 6,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-menus", heading: "Accessing Menus" },
      { id: "creating-a-new-menu", heading: "Creating a New Menu" },
      { id: "adding-categories", heading: "Adding Categories" },
      { id: "adding-products-to-a-category", heading: "Adding Products to a Category" },
      { id: "menu-actions", heading: "Menu Actions" },
      { id: "reordering-categories-and-products", heading: "Reordering Categories and Products" },
      { id: "managing-multiple-menus", heading: "Managing Multiple Menus" },
      { id: "best-practices", heading: "Best Practices" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
  {
    slug: "analytics",
    title: "View and Understand Analytics",
    description:
      "Discovery sources, push notification performance, customer engagement metrics, and using data to improve your business.",
    category: "business-intelligence",
    order: 7,
    sections: [
      { id: "overview", heading: "Overview" },
      { id: "accessing-analytics", heading: "Accessing Analytics" },
      { id: "discovery-sources", heading: "Discovery Sources" },
      { id: "push-notification-metrics", heading: "Push Notification Metrics" },
      { id: "engagement-metrics", heading: "Engagement Metrics" },
      { id: "favorites", heading: "Favorites" },
      { id: "filtering-by-time-period", heading: "Filtering by Time Period" },
      { id: "understanding-your-data", heading: "Understanding Your Data" },
      { id: "tips-for-improving-metrics", heading: "Tips for Improving Metrics" },
      { id: "important-notes", heading: "Important Notes" },
    ],
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}

export function getTutorialsByCategory(): Record<string, Tutorial[]> {
  const grouped: Record<string, Tutorial[]> = {};

  for (const tutorial of tutorials) {
    if (!grouped[tutorial.category]) {
      grouped[tutorial.category] = [];
    }
    grouped[tutorial.category].push(tutorial);
  }

  // Sort tutorials within each category by order
  for (const category of Object.keys(grouped)) {
    grouped[category].sort((a, b) => a.order - b.order);
  }

  return grouped;
}

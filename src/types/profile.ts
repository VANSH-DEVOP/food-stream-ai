export interface UserProfile {
  id: string;

  // The owning account; written by createProfile and enforced by the
  // Firestore rules.
  userId: string;

  name: string;

  avatar?: string;

  favoriteCategory: string;

  spiceLevel: string;

  cuisine: string;
}
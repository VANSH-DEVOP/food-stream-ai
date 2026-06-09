export interface AppUser {
  id: string;

  email: string;

  role: "user" | "admin";

  createdAt?: unknown;
}
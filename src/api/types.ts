export interface RegisterRequest {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface Food {
  description: string;
  id: string;
  image_url: string;
  name: string;
  price: number;
  restaurant: string;
}

export interface Restaurant {
  address: string;
  id: string;
  name: string;
  phone: string;
}

export interface SearchFoodResponse {
  hits: Food[];
  limit: number;
  processingTimeMs: number;
  query: string;
}

export interface SearchRestaurantResponse {
  hits: Restaurant[];
  limit: number;
  processingTimeMs: number;
  query: string;
}

export interface GetFoodResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  restaurant_id: string;
  image_url: string;
}

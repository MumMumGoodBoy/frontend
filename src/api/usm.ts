import api from '@/lib/axios';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from './types';

export const signUp = async (user: RegisterRequest) => {
  const response = await api.post('/auth/register', user);
  if (response.status === 204) {
    return null;
  }
  return response.data;
};

export const login = async (user: LoginRequest) => {
  const response = await api.post<LoginResponse>('/auth/login', user);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<User>('/auth/me');
  return response.data;
};

export const editProfile = async (user: UpdateProfileRequest) => {
  const response = await api.put('/auth/me', user);
  return response.data;
};

export const changePassword = async (user: ChangePasswordRequest) => {
  const response = await api.patch('/auth/me/password', user);
  return response.data;
};

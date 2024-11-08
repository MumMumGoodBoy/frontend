import api from '@/lib/axios';
import { GetMyFavoritesResponse, GetReviewsByFoodIdResponse } from './types';

export const GetReviewsByFoodId = async (foodId: string) => {
  const response = await api.get<GetReviewsByFoodIdResponse[]>('/food/' + foodId + '/reviews');

  return response.data;
};

export const addFoodToFavorites = async (foodId: string) => {
  const response = await api.post('/favorite/' + foodId);

  return response.data;
};

export const removeFoodFromFavorites = async (foodId: string) => {
  const response = await api.delete('/favorite/' + foodId);

  return response.data;
};

export const getMyFavorites = async () => {
  const response = await api.get<GetMyFavoritesResponse>('/favorite/');
  return response.data;
};

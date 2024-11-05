import api from '@/lib/axios';
import { GetReviewsByFoodIdResponse } from './types';

export const GetReviewsByFoodId = async (foodId: string) => {
  const response = await api.get<GetReviewsByFoodIdResponse[]>('/food/' + foodId + '/reviews');

  return response.data;
};

import api from '@/lib/axios';
import { GetFoodResponse } from './types';

export const getFoodByFoodId = async (foodId: string) => {
  const response = await api.get<GetFoodResponse>('/food/' + foodId);

  return response.data;
};

import api from '@/lib/axios';
import { GetFoodResponse, GetFoodsByRestaurantResponse, GetRestaurantResponse } from './types';

export const getFoodByFoodId = async (foodId: string) => {
  const response = await api.get<GetFoodResponse>('/food/' + foodId);

  return response.data;
};

export const getRestaurantByRestaurantId = async (restaurantId: string) => {
  const response = await api.get<GetRestaurantResponse>('/restaurant/' + restaurantId);

  return response.data;
};

export const getFoodsByRestaurantId = async (restaurantId: string) => {
  const response = await api.get<GetFoodsByRestaurantResponse>('/restaurant/' + restaurantId + '/foods');
  if (Object.keys(response.data).length === 0) {
    return { foods: [] };
  }

  return response.data;
};

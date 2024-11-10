import api from '@/lib/axios';
import {
  CreateFoodRequest,
  CreateRestaurantRequest,
  GetFoodResponse,
  GetFoodsByRestaurantResponse,
  GetRestaurantResponse,
  UpdateFoodRequest,
  UpdateRestaurantRequest,
} from './types';

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

export const deleteFoodByFoodId = async (foodId: string) => {
  const response = await api.delete('/food/' + foodId);

  return response.data;
};

export const createFood = async (data: CreateFoodRequest) => {
  const response = await api.post('/food', data);

  return response.data;
};

export const updateFoodByFoodId = async (foodId: string, data: UpdateFoodRequest) => {
  const response = await api.put('/food/' + foodId, data);

  return response.data;
};

export const createRestaurant = async (data: CreateRestaurantRequest) => {
  const response = await api.post('/restaurant', data);

  return response.data;
};

export const updateRestaurantByRestaurantId = async (restaurantId: string, data: UpdateRestaurantRequest) => {
  const response = await api.put('/restaurant/' + restaurantId, data);

  return response.data;
};

export const deleteRestaurantByRestaurantId = async (restaurantId: string) => {
  const response = await api.delete('/restaurant/' + restaurantId);

  return response.data;
};

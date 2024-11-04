import api from '@/lib/axios';
import { SearchFoodResponse, SearchRestaurantResponse } from './types';

export const searchFood = async (query: string, limit?: string) => {
  const response = await api.get<SearchFoodResponse>('/search/foods', {
    params: {
      search: query,
      limit: limit || 100,
    },
  });

  return response.data;
};

export const searchRestaurant = async (query: string, limit?: string) => {
  const response = await api.get<SearchRestaurantResponse>('/search/restaurants', {
    params: {
      search: query,
      limit: limit || 100,
    },
  });

  return response.data;
};

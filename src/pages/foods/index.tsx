import { searchFood } from '@/api/search';
import InputDebounce from '@/components/input-debounce';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import FoodCard from './components/card';
import { getMyFavorites } from '@/api/review';

const Foods = () => {
  const [search, setSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['foods', search, minPrice, maxPrice],
    queryFn: () => searchFood(search, undefined, minPrice, maxPrice),
  });

  const { data: myFavoritesData } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getMyFavorites(),
  });

  const myFavorites = myFavoritesData?.foods || [];

  const combinedFoods = useMemo(() => {
    if (!searchResults?.hits) return myFavorites;

    const favoritesIds = new Set(myFavorites.map((fav) => fav.id));
    const nonFavoriteSearchResults = searchResults.hits.filter((food) => !favoritesIds.has(food.id));

    return [...myFavorites, ...nonFavoriteSearchResults];
  }, [myFavorites, searchResults]);

  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            Foods
          </Typography>
        </div>
        <InputDebounce
          placeholder="Search food"
          className="w-full"
          value={search}
          onChange={(val) => setSearch(val as string)}
        />
        <div className="flex flex-row gap-2">
          <InputDebounce
            placeholder="min price"
            className="w-full"
            value={minPrice}
            onChange={(val) => {
              setMinPrice(val as number);
            }}
            type="number"
          />
          <InputDebounce
            placeholder="max price"
            className="w-full"
            value={maxPrice}
            onChange={(val) => {
              setMaxPrice(val as number);
            }}
            type="number"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              Loading... 🥗🥐
            </Typography>
          </div>
        ) : combinedFoods.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              No Foods Found 🥗🥐
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {combinedFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                restaurantId={food.restaurant}
                isFavorite={myFavorites.some((fav) => fav.id === food.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Foods;

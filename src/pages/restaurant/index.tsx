import { getFoodsByRestaurantId, getRestaurantByRestaurantId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import FoodCard from '../foods/components/card';
import { CreateFoodButton } from '../foods/components/create-food-modal';
import { getMyFavorites } from '@/api/review';
import { useMemo } from 'react';
import { useUser } from '@/providers/user';

const Restaurant = () => {
  const user = useUser();
  const isAdmin = user.isAdmin;
  const restaurantId = useParams<{ id: string }>().id;

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurantByRestaurantId(restaurantId!),
  });

  const { data: foods, isLoading: isLoadingFood } = useQuery({
    queryKey: ['food', restaurantId],
    queryFn: () => getFoodsByRestaurantId(restaurantId!),
  });

  //   const [rating, setRating] = useState(0);

  //   const handleRating = (rate: number) => {
  //     setRating(rate);
  //   };
  const { data: myFavoritesData } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getMyFavorites(),
  });

  const myFavorites = myFavoritesData?.foods || [];

  const combinedFoods = useMemo(() => {
    if (!foods) {
      return [];
    }

    const favoritesIds = new Set(myFavorites.map((fav) => fav.id));
    const nonFavorites = foods.foods.filter((food) => !favoritesIds.has(food.id));
    const favorites = foods.foods.filter((food) => favoritesIds.has(food.id));

    return [...favorites, ...nonFavorites];
  }, [foods, myFavorites]);
  const navigate = useNavigate();

  if (isLoadingRestaurant || isLoadingFood) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Typography variant="h1" className="text-slate-600">
          Loading... 🥗🥐
        </Typography>
      </div>
    );
  }

  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <Button variant="outline" className="w-fit" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Typography variant="h2" fontWeight="bold">
          Restaurant Detail
        </Typography>
        <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 ">
              <Typography variant="body1" fontWeight="bold">
                ร้าน {restaurant?.name}
              </Typography>
              <Typography variant="body1">ที่อยู่ {restaurant?.address}</Typography>
              <Typography variant="body1">โทร {restaurant?.phone}</Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <Typography variant="h3" fontWeight="bold">
              Our Foods
            </Typography>

            {isAdmin && <CreateFoodButton restaurantId={restaurantId || ''} />}
          </div>
          {isLoadingFood && <Typography>Loading...</Typography>}

          {combinedFoods.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {combinedFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  restaurantId={restaurantId || ''}
                  isFavorite={myFavorites.some((fav) => fav.id === food.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <Typography variant="h1" className="text-slate-600">
                No Foods Found 🥗🥐
              </Typography>{' '}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Restaurant;

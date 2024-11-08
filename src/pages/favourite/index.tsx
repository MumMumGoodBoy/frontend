import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { getMyFavorites } from '@/api/review';
import FoodCard from '../foods/components/card';

const Favorite = () => {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getMyFavorites,
  });

  const myFavorites = favorites?.foods || [];
  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <Typography variant="h2" fontWeight="bold">
          My Favorite
        </Typography>
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              Loading... 🥗🥐
            </Typography>
          </div>
        ) : myFavorites.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              No Favorites Found 🥗🥐
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myFavorites.map((food) => (
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

export default Favorite;

import { getFoodsByRestaurantId, getRestaurantByRestaurantId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import FoodCard from '../foods/components/card';
import { CreateFoodButton } from '../foods/components/create-food-modal';

const Restaurant = () => {
  const isAdmin = true;
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

  const navigate = useNavigate();

  if (isLoadingRestaurant || isLoadingFood) {
    return <Typography>Loading...</Typography>;
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
          {isAdmin && (
            <div className="flex flex-col gap-2">
              {/* <EditProfile />
              <ChangePassword /> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <Typography variant="h3" fontWeight="bold">
              Our Foods
            </Typography>
            <CreateFoodButton restaurantId={restaurantId || ''} />
          </div>
          {isLoadingFood && <Typography>Loading...</Typography>}

          {foods?.foods.length !== 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {foods?.foods.map((food) => <FoodCard key={food.id} food={food} resutaurantId={restaurantId || ''} />)}
            </div>
          ) : (
            <Typography className="w-full text-center">No food found</Typography>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Restaurant;

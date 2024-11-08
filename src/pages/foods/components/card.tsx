import { Food } from '@/api/types';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';
import { DeleteFoodButton } from './delete-food-modal';
import { EditFoodButton } from './edit-food-modal';
import ReactStars from 'react-stars';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFoodToFavorites, removeFoodFromFavorites } from '@/api/review';

interface FoodCardProps {
  food: Food;
  restaurantId: string;
  isFavorite?: boolean;
}

export default function FoodCard({ food, restaurantId, isFavorite }: FoodCardProps) {
  const isAdmin = true;

  const queryClient = useQueryClient();
  const { mutate: addToFavorites } = useMutation({
    mutationKey: ['addToFavorites'],
    mutationFn: addFoodToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const { mutate: removeFromFavorites } = useMutation({
    mutationKey: ['removeFromFavorites'],
    mutationFn: removeFoodFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 max-lg:flex-col gap-4 border rounded-md shadow-sm bg-white">
      <div className="flex justify-between w-full items-center">
        <Link to={`/food/${food.id}`}>
          <Typography variant="h4" fontWeight="bold" className="hover:underline hover:cursor-pointer">
            {food.name}
          </Typography>
        </Link>
        <ReactStars
          count={1}
          value={isFavorite ? 1 : 0}
          size={24}
          half={false}
          color2={'#ffd700'}
          onChange={() => {
            if (isFavorite) {
              removeFromFavorites(food.id);
            } else {
              addToFavorites(food.id);
            }
          }}
        />
      </div>
      <img src={food.image_url} alt="food" className="w-full h-60 object-cover rounded-md" />

      <div className="flex flex-col gap-1 text-start w-full">
        <Typography variant="h4" className="break-all">
          ราคา {food.price} บาท
        </Typography>
        <Typography variant="body2" className="break-all">
          {food.description}
        </Typography>
      </div>
      <Link to={`/food/${food.id}`} className="w-full">
        <Button className="w-full" variant="outline">
          Detail
        </Button>
      </Link>
      {isAdmin && (
        <div className="flex gap-2 w-full">
          <EditFoodButton food={food} />
          <DeleteFoodButton foodId={food.id} restaurantId={restaurantId} />
        </div>
      )}
    </div>
  );
}

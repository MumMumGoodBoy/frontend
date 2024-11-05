import { Food, GetFoodResponse } from '@/api/types';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';

interface FoodCardProps {
  food: Food | GetFoodResponse;
}

export default function FoodCard({ food }: FoodCardProps) {
  const isAdmin = true;

  return (
    <div className="flex flex-col items-center justify-center p-6 max-lg:flex-col gap-4 border rounded-md shadow-sm bg-white">
      <div className="flex justify-between w-full items-center">
        <Link to={`/food/${food.id}`}>
          <Typography className="hover:underline hover:cursor-pointer">{food.name}</Typography>
        </Link>
      </div>
      <img src={food.image_url} alt="food" className="w-[150px] h-[150px]" />

      <div className="flex flex-col gap-1 text-start w-full">
        <Typography variant="body2" className="break-all">
          {food.description}
        </Typography>
        <Typography variant="body2" className="break-all">
          ราคา {food.price} บาท
        </Typography>
      </div>
      <Link to={`/food/${food.id}`} className="w-full">
        <Button className="w-full" variant="outline">
          Detail
        </Button>
      </Link>
      {isAdmin && (
        <div className="flex gap-2 w-full">
          <Button className="w-1/2" variant="secondary">
            Edit
          </Button>
          <Button className="w-1/2">Delete</Button>
        </div>
      )}
    </div>
  );
}

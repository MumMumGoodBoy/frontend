import { Restaurant } from '@/api/types';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useUser } from '@/providers/user';
import { Link } from 'react-router-dom';
import { EditRestaurantButton } from './edit-restaurant-modal';
import { DeleteRestaurantButton } from './delete-restaurant-modal';

interface ResrtaurantCardProps {
  restaurant: Restaurant;
}
export default function ResrtaurantCard({ restaurant }: ResrtaurantCardProps) {
  const user = useUser();
  const isAdmin = user.isAdmin;
  return (
    <div className="flex flex-col items-center justify-center p-6 max-lg:flex-col gap-4 border rounded-md shadow-sm bg-white">
      <div className="flex justify-between w-full items-center">
        <Link to={`/restaurant/${restaurant.id}`}>
          <Typography className="hover:underline hover:cursor-pointer">{restaurant.name}</Typography>
        </Link>
      </div>
      <div className="flex flex-col gap-1 text-start w-full">
        <Typography variant="body2" className="break-all">
          ที่อยู่ {restaurant.address}
        </Typography>
        <Typography variant="body2" className="break-all">
          เบอร์ {restaurant.phone}
        </Typography>
      </div>
      <Link to={`/restaurant/${restaurant.id}`} className="w-full">
        <Button className="w-full" variant="outline">
          Detail
        </Button>
      </Link>
      {isAdmin && (
        <div className="flex gap-2 w-full">
          <EditRestaurantButton restaurant={restaurant} />
          <DeleteRestaurantButton restaurantId={restaurant.id} />
        </div>
      )}
    </div>
  );
}

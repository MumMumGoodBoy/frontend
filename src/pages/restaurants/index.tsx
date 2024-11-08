import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';

import { searchRestaurant } from '@/api/search';
import InputDebounce from '@/components/input-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import RestaurantCard from './components/restaurant-card';

const Restaurants = () => {
  const isAdmin = true;

  const [search, setSearch] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['foods', search],
    queryFn: () => searchRestaurant(search),
  });
  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            Restaurants
          </Typography>
          {isAdmin && <Button variant="outline">Create restaurant</Button>}
        </div>
        <InputDebounce
          placeholder="Search restaurant"
          className="w-full"
          value={search}
          onChange={(val) => {
            setSearch(val as string);
          }}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <Typography>Loading...</Typography>}
          {data?.hits.length === 0 ? (
            <Typography>No restaurant found</Typography>
          ) : (
            data?.hits.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
          )}
        </div>
      </div>
    </Container>
  );
};

export default Restaurants;

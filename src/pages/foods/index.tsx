import { searchFood } from '@/api/search';
import InputDebounce from '@/components/input-debounce';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import FoodCard from './components/card';

const Foods = () => {
  const isAdmin = true;

  const [search, setSearch] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['foods', search],
    queryFn: () => searchFood(search),
  });

  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            Foods
          </Typography>
          {isAdmin && <Button variant="outline">Create food</Button>}
        </div>
        <InputDebounce
          placeholder="Search food"
          className="w-full"
          value={search}
          onChange={(val) => {
            setSearch(val as string);
            console.log(search);
          }}
        />
        {/* In the Future, If available in search service*/}
        {/* <div className="space-y-2">
          <Typography variant="h5" fontWeight="bold">
            Filter price
          </Typography>
          <FilterTap />
        </div> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <Typography>Loading...</Typography>}
          {data?.hits.length === 0 ? (
            <Typography>No food found</Typography>
          ) : (
            data?.hits.map((food) => <FoodCard key={food.id} food={food} />)
          )}
        </div>
      </div>
    </Container>
  );
};

export default Foods;

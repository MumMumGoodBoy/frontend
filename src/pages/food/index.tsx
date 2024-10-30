import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import FoodCard from './components/card';
import FilterTap from './components/filter-tap';

const Foods = () => {
  const isAdmin = true;
  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            Foods
          </Typography>
          {isAdmin && <Button variant="outline">Create food</Button>}
        </div>
        <Input placeholder="Search food" className="w-full" />
        <div className="space-y-2">
          <Typography variant="h5" fontWeight="bold">
            Filter price
          </Typography>
          <FilterTap />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
        </div>
      </div>
    </Container>
  );
};

export default Foods;

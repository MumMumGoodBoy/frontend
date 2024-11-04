import { getFoodByFoodId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Food = () => {
  const isAdmin = true;
  const foodId = useParams<{ id: string }>().id;

  const { data, isLoading } = useQuery({
    queryKey: ['food', foodId],
    queryFn: () => getFoodByFoodId(foodId!),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <Button variant="outline" className="w-fit" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Typography variant="h2" fontWeight="bold">
          Food Detail
        </Typography>
        <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
          <div className="flex gap-5">
            <img src={data?.image_url} alt="food" className="w-[150px] h-[150px]" />
            <div className="flex flex-col gap-2 ">
              <Typography variant="body1" fontWeight="bold">
                {data?.name}
              </Typography>
              <Typography variant="body1">{data?.description}</Typography>
              <Typography variant="body1">ราคา {data?.price} บาท</Typography>
              <Link to={`/restaurant/${data?.restaurant_id}`}>
                <Button variant="link">See Restaurant</Button>
              </Link>
            </div>
          </div>
          {isAdmin && (
            <div className="flex flex-col gap-2">
              {/* <EditProfile />
              <ChangePassword /> */}
            </div>
          )}
        </div>
        <Typography variant="h2" fontWeight="bold">
          Review
        </Typography>
      </div>
    </Container>
  );
};

export default Food;

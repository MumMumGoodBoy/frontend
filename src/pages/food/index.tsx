import { getFoodByFoodId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Textarea } from '@/components/ui/textarea';
import Typography from '@/components/ui/typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { addReview, GetReviewsByFoodId } from '@/api/review';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/providers/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-stars';
import { z } from 'zod';
import { ReviewCard } from './components/review-card';

const formSchema = z.object({
  review: z.string(),
});
const Food = () => {
  const user = useUser();
  const isAdmin = user.isAdmin;
  const foodId = useParams<{ id: string }>().id;

  const { data: food, isLoading } = useQuery({
    queryKey: ['food', foodId],
    queryFn: () => getFoodByFoodId(foodId!),
  });

  const { data: reviews, isLoading: isLoadingReview } = useQuery({
    queryKey: ['review', foodId],
    queryFn: () => GetReviewsByFoodId(foodId!),
  });

  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createReview, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: addReview,
    onSuccess: () => {
      toast({
        title: 'Create review successful',
      });
      queryClient.invalidateQueries({ queryKey: ['review', foodId] });
      reset();
      setRating(0);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Create review failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return createReview({
      content: data.review,
      rating,
      food_id: foodId ?? '',
      restaurant_id: food?.restaurant_id ?? '',
    });
  };

  if (isLoading || isLoadingReview) {
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
          Food Detail
        </Typography>
        <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
          <div className="flex gap-5">
            <img src={food?.image_url} alt="food" className="w-[150px] h-[150px]" />
            <div className="flex flex-col gap-2 ">
              <Typography variant="body1" fontWeight="bold">
                {food?.name}
              </Typography>
              <Typography variant="body1">{food?.description}</Typography>
              <Typography variant="body1">ราคา {food?.price} บาท</Typography>
              <Link to={`/restaurant/${food?.restaurant_id}`}>
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

        <div className="flex flex-col gap-4">
          <Typography variant="h3" fontWeight="bold">
            Review
          </Typography>
          <div className="flex flex-col gap-2">
            <Typography variant="h5" fontWeight="bold">
              Write your review
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea placeholder="Write your review" {...register('review')} />
              <div className="flex justify-end gap-2">
                <ReactStars
                  count={5}
                  value={rating}
                  size={24}
                  half={false}
                  color2={'#ffd700'}
                  onChange={(e) => {
                    handleRating(e);
                  }}
                />
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            {reviews?.map((review) => <ReviewCard key={review.review_id} review={review} />)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Food;

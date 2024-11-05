import { GetReviewsByFoodIdResponse } from '@/api/types';
import Typography from '@/components/ui/typography';

interface ReviewCardProps {
  review: GetReviewsByFoodIdResponse;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  //   const { data: user } = useQuery({
  //     queryKey: ['user', review.user_id],
  //     queryFn: () => getUserByUserId(review.user_id),
  //   });

  return (
    <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
      <div className="flex flex-col gap-2 ">
        <Typography variant="body1" fontWeight="bold">
          Reviewer: <span className="font-normal">{review.user_id}</span>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Rating: <span className="font-normal">{review.rating}</span>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Comment: <span className="font-normal">{review.content}</span>
        </Typography>
      </div>
    </div>
  );
};

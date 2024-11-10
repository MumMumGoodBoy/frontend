import { GetReviewsByFoodIdResponse } from '@/api/types';
import Typography from '@/components/ui/typography';
import ReactStars from 'react-stars';
import { DeleteReviewButton } from './delete-food-modal';
import { useUser } from '@/providers/user';

interface ReviewCardProps {
  review: GetReviewsByFoodIdResponse;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  // const { data: user } = useQuery({
  //   queryKey: ['user', review.user_id],
  //   queryFn: () => getUserByUserId(review.user_id),
  // });
  const user = useUser();
  const isAdmin = user.isAdmin;

  return (
    <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
      <div className="flex flex-col gap-2 ">
        {/* <Typography variant="body1" fontWeight="bold">
          Reviewer: <span className="font-normal">{review.user_id}</span>
        </Typography> */}
        <Typography variant="body1" fontWeight="bold">
          Rating:
          <ReactStars count={5} value={review.rating ?? 0} size={24} half={false} color2={'#ffd700'} edit={false} />
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Comment: <span className="font-normal">{review.content}</span>
        </Typography>
      </div>
      {isAdmin && <DeleteReviewButton review={review} />}
    </div>
  );
};

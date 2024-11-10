import { deleteReview } from '@/api/review';
import { GetReviewsByFoodIdResponse } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface ReviewCardProps {
  review: GetReviewsByFoodIdResponse;
}

export function DeleteReviewButton({ review }: ReviewCardProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    mutate({
      review_id: review.review_id,
    });
    setOpen(false);
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: deleteReview,
    onSuccess: () => {
      toast({
        title: 'Delete review successful',
      });
      queryClient.invalidateQueries({ queryKey: ['review', review.food_id] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Delete review failed',
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
        </DialogHeader>
        <Button onClick={onSubmit} variant="destructive">
          Delete
        </Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

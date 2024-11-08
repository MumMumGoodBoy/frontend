import { deleteFoodByFoodId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface DeleteFoodButtonProps {
  foodId: string;
  restaurantId: string;
}

export function DeleteFoodButton({ foodId, restaurantId }: DeleteFoodButtonProps) {
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ['deleteFood'],
    mutationFn: deleteFoodByFoodId,
    onSuccess: async () => {
      toast({
        title: 'Delete food success',
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['foods'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] }),
        queryClient.invalidateQueries({ queryKey: ['food', restaurantId] }),
      ]);
    },
    onError: () => {
      toast({
        title: 'Delete food failed',
        variant: 'destructive',
      });
    },
  });

  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutate(foodId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-1/2">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Food</DialogTitle>
        </DialogHeader>
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

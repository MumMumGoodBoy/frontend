import { deleteFoodByFoodId } from '@/api/food-restaurant';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function DeleteFoodButton({ foodId }: { foodId: string }) {
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ['deleteFood'],
    mutationFn: deleteFoodByFoodId,
    onSuccess: () => {
      toast({
        title: 'Delete food success',
        variant: 'destructive',
      });
      queryClient.invalidateQueries({
        queryKey: ['foods'],
      });
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

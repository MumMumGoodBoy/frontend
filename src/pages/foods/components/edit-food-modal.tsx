import { updateFoodByFoodId } from '@/api/food-restaurant';
import { Food, UpdateFoodRequest } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  image_url: z.string().min(1, 'Image url is required'),
});

export function EditFoodButton({ food }: { food: Food }) {
  const [open, setOpen] = useState(false);
  const restaurantId = food.restaurant ?? food.restaurant_id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: food.name,
      description: food.description,
      price: food.price,
      image_url: food.image_url,
    },
  });

  useEffect(() => {
    reset({
      name: food.name,
      description: food.description,
      price: food.price,
      image_url: food.image_url,
    });
  }, [reset, open]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['updateFood'],
    mutationFn: (data: UpdateFoodRequest) => updateFoodByFoodId(food.id, data),
    onSuccess: async () => {
      toast({
        title: 'Update food success',
      });
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['foods'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] }),
        queryClient.invalidateQueries({ queryKey: ['food', restaurantId] }),
      ]);
    },
    onError: () => {
      toast({
        title: 'Update food failed',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return mutate({
      name: data.name,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      restaurant_id: restaurantId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-1/2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-2 w-full">
              <Input label="Name" {...register('name')} defaultValue={food.name} />
              {errors.name && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.name.message}
                </Typography>
              )}
              <Input label="Description" {...register('description')} />
              {errors.description && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.description.message}
                </Typography>
              )}
              <Input label="Price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
              {errors.price && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.price.message}
                </Typography>
              )}
              <Input label="Image URL" {...register('image_url')} />
              {errors.image_url && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.image_url.message}
                </Typography>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" disabled={false}>
              <Typography variant="body1">Edit</Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
